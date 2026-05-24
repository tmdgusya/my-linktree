const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const paper = document.querySelector("#machinePaper");
const output = document.querySelector("#typedOutput");
const impact = document.querySelector("#impactMark");
const ribbon = document.querySelector("#ribbonWindow");
const typeSlug = document.querySelector("#typeSlug");
const stage = document.querySelector(".stage");
const soundButton = document.querySelector("#soundButton");

const lines = [
  {
    text: "field note / roach_log",
    className: "row-meta",
    height: 28,
  },
  {
    text: "roach",
    className: "row-title",
    height: 60,
  },
  {
    text: "자동화 그리고 AI Native에 관심이 많은 엔지니어입니다.",
    className: "row-intro",
    height: 40,
  },
  {
    text: "email .......... dev0jsh@gmail.com",
    href: "mailto:dev0jsh@gmail.com",
    label: "business email",
    height: 26,
  },
  {
    text: "youtube ........ youtube.com/@dev_roach_log",
    href: "https://www.youtube.com/@dev_roach_log",
    label: "youtube",
    height: 26,
  },
  {
    text: "threads ........ threads.com/@roach_log",
    href: "https://www.threads.com/@roach_log",
    label: "threads",
    height: 26,
  },
  {
    text: "linkedin ....... linkedin.com/in/승현-정-376842221",
    href: "https://www.linkedin.com/in/%EC%8A%B9%ED%98%84-%EC%A0%95-376842221/",
    label: "linkedin",
    height: 26,
  },
  {
    text: "lecture ........ soon",
    href: "#",
    label: "lecture coming soon",
    pending: true,
    height: 26,
  },
];

let currentOffset = 0;
let currentRun = 0;
let audioContext;
let soundEnabled = false;
let soundUnlocking = false;
let lastSoundStartAt = 0;

const AudioContextCtor = window.AudioContext || window.webkitAudioContext;

function getAudioContext() {
  if (!AudioContextCtor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextCtor();
  }

  return audioContext;
}

function updateSoundButton() {
  if (!soundButton) {
    return;
  }

  soundButton.classList.toggle("is-on", soundEnabled);
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  soundButton.setAttribute(
    "aria-label",
    soundEnabled ? "타자기 소리 켜짐. 클릭하면 다시 재생" : "타자기 소리 켜기",
  );
}

async function startSoundPlayback() {
  if (soundUnlocking) {
    return false;
  }

  soundUnlocking = true;
  const context = getAudioContext();

  if (!context) {
    soundUnlocking = false;
    return false;
  }

  try {
    if (context.state === "suspended") {
      await context.resume();
    }
  } catch {
    soundUnlocking = false;
    return false;
  }

  if (context.state !== "running") {
    soundUnlocking = false;
    return false;
  }

  soundEnabled = true;
  lastSoundStartAt = Date.now();
  updateSoundButton();
  playPrimerSound();
  runTypewriter({ withSound: true });
  soundUnlocking = false;
  return true;
}

function connectToOutput(input, gain, pan = 0) {
  if (!audioContext) {
    return;
  }

  if (audioContext.createStereoPanner) {
    const panner = audioContext.createStereoPanner();
    panner.pan.value = pan;
    input.connect(panner);
    panner.connect(gain);
  } else {
    input.connect(gain);
  }

  gain.connect(audioContext.destination);
}

function createNoiseSource(duration) {
  const sampleRate = audioContext.sampleRate;
  const frameCount = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = audioContext.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    const decay = 1 - index / frameCount;
    data[index] = (Math.random() * 2 - 1) * decay * decay;
  }

  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  return source;
}

function playPrimerSound() {
  if (!soundEnabled || !audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const noise = createNoiseSource(0.036);
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  const body = audioContext.createOscillator();
  const bodyGain = audioContext.createGain();

  filter.type = "bandpass";
  filter.frequency.value = 3200;
  filter.Q.value = 0.9;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

  noise.connect(filter);
  connectToOutput(filter, gain, -0.04);
  noise.start(now);
  noise.stop(now + 0.052);

  body.type = "triangle";
  body.frequency.setValueAtTime(146, now);
  body.frequency.exponentialRampToValueAtTime(78, now + 0.05);
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.035, now + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.066);

  connectToOutput(body, bodyGain, -0.04);
  body.start(now);
  body.stop(now + 0.074);
}

function playStrikeSound(char) {
  if (!soundEnabled || !audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;
  const isSpace = char === " ";
  const duration = isSpace ? 0.026 : 0.044 + Math.random() * 0.018;
  const noise = createNoiseSource(duration);
  const highpass = audioContext.createBiquadFilter();
  const bandpass = audioContext.createBiquadFilter();
  const snapGain = audioContext.createGain();
  const body = audioContext.createOscillator();
  const bodyGain = audioContext.createGain();
  const pan = (Math.random() - 0.5) * 0.18;

  highpass.type = "highpass";
  highpass.frequency.value = 850 + Math.random() * 420;
  bandpass.type = "bandpass";
  bandpass.frequency.value = 2600 + Math.random() * 950;
  bandpass.Q.value = 0.74;

  snapGain.gain.setValueAtTime(0.0001, now);
  snapGain.gain.exponentialRampToValueAtTime(isSpace ? 0.018 : 0.072 + Math.random() * 0.026, now + 0.003);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(highpass);
  highpass.connect(bandpass);
  connectToOutput(bandpass, snapGain, pan);
  noise.start(now);
  noise.stop(now + duration + 0.01);

  body.type = "triangle";
  body.frequency.setValueAtTime(118 + Math.random() * 34, now);
  body.frequency.exponentialRampToValueAtTime(72 + Math.random() * 18, now + 0.048);
  bodyGain.gain.setValueAtTime(0.0001, now);
  bodyGain.gain.exponentialRampToValueAtTime(isSpace ? 0.006 : 0.024 + Math.random() * 0.01, now + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);

  connectToOutput(body, bodyGain, pan * 0.6);
  body.start(now);
  body.stop(now + 0.065);
}

function playCarriageSound() {
  if (!soundEnabled || !audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;

  for (let index = 0; index < 5; index += 1) {
    const tickAt = now + index * 0.028;
    const noise = createNoiseSource(0.025);
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();

    filter.type = "bandpass";
    filter.frequency.value = 1200 + index * 140;
    filter.Q.value = 0.9;
    gain.gain.setValueAtTime(0.0001, tickAt);
    gain.gain.exponentialRampToValueAtTime(0.032 - index * 0.003, tickAt + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, tickAt + 0.025);

    noise.connect(filter);
    connectToOutput(filter, gain, -0.18 + index * 0.08);
    noise.start(tickAt);
    noise.stop(tickAt + 0.04);
  }

  const bell = audioContext.createOscillator();
  const bellGain = audioContext.createGain();

  bell.type = "sine";
  bell.frequency.setValueAtTime(1450, now + 0.14);
  bell.frequency.exponentialRampToValueAtTime(980, now + 0.28);
  bellGain.gain.setValueAtTime(0.0001, now + 0.14);
  bellGain.gain.exponentialRampToValueAtTime(0.018, now + 0.145);
  bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  connectToOutput(bell, bellGain, 0.12);
  bell.start(now + 0.14);
  bell.stop(now + 0.34);
}

function createRow(line, index, top) {
  const tag = line.href ? "a" : "div";
  const row = document.createElement(tag);
  row.className = `typed-row ${line.className || "row-link"}`;
  row.style.top = `${top}px`;
  row.style.minHeight = `${line.height}px`;
  row.dataset.index = String(index);
  row.setAttribute("aria-label", line.label || line.text);

  if (line.href) {
    row.href = line.href;
    if (line.href !== "#") {
      row.target = "_blank";
      row.rel = "noreferrer";
    }
  }

  if (line.pending) {
    row.classList.add("is-pending");
    row.setAttribute("aria-disabled", "true");
  }

  output.appendChild(row);
  return row;
}

function setFeed(offset, animated = true) {
  output.classList.toggle("is-feeding", animated);
  paper.style.setProperty("--feed-y", `${-offset}px`);
  paper.style.setProperty("--surface-feed-y", `${(-offset * 0.18).toFixed(2)}px`);
}

function setCarriageFromSpan(span) {
  const paperBox = paper.getBoundingClientRect();
  const spanBox = span.getBoundingClientRect();
  const x = spanBox.right - paperBox.left;
  const y = spanBox.top + spanBox.height * 0.62 - paperBox.top;

  paper.style.setProperty("--carriage-x", `${x}px`);
  paper.style.setProperty("--carriage-y", `${y}px`);
}

function strike(span, char, withSound = false) {
  const strength = 0.78 + Math.random() * 0.22;
  const dx = (Math.random() - 0.5) * 1.45;
  const dy = (Math.random() - 0.5) * 1.1;
  const rot = (Math.random() - 0.5) * 1.7;
  const blur = Math.random() > 0.82 ? 0.34 : 0;
  const ghostX = 0.25 + Math.random() * 0.85;
  const ghostY = 0.1 + Math.random() * 0.7;
  const ghostAlpha = Math.random() > 0.72 ? 0.28 : 0.15;
  const ghostBlur = Math.random() > 0.75 ? 0.45 : 0.24;
  const bleed = Math.random() > 0.62 ? 0.48 : 0.22;
  const shadowX = (Math.random() - 0.5) * 0.8;
  const shadowY = 0.1 + Math.random() * 0.45;
  const scaleX = 0.97 + Math.random() * 0.08;
  const scaleY = 0.96 + Math.random() * 0.1;

  span.dataset.char = char === " " ? "" : char;
  span.style.setProperty("--ink-alpha", strength.toFixed(2));
  span.style.setProperty("--dx", `${dx.toFixed(2)}px`);
  span.style.setProperty("--dy", `${dy.toFixed(2)}px`);
  span.style.setProperty("--rot", `${rot.toFixed(2)}deg`);
  span.style.setProperty("--blur", `${blur.toFixed(2)}px`);
  span.style.setProperty("--ghost-x", `${ghostX.toFixed(2)}px`);
  span.style.setProperty("--ghost-y", `${ghostY.toFixed(2)}px`);
  span.style.setProperty("--ghost-alpha", ghostAlpha.toFixed(2));
  span.style.setProperty("--ghost-blur", `${ghostBlur.toFixed(2)}px`);
  span.style.setProperty("--bleed", `${bleed.toFixed(2)}px`);
  span.style.setProperty("--shadow-x", `${shadowX.toFixed(2)}px`);
  span.style.setProperty("--shadow-y", `${shadowY.toFixed(2)}px`);
  span.style.setProperty("--scale-x", scaleX.toFixed(2));
  span.style.setProperty("--scale-y", scaleY.toFixed(2));

  setCarriageFromSpan(span);

  paper.classList.remove("is-striking");
  stage.classList.remove("is-hit");
  impact.classList.remove("is-visible");
  ribbon.classList.remove("is-visible");
  typeSlug.classList.remove("is-visible");

  void paper.offsetWidth;

  paper.classList.add("is-striking");
  stage.classList.add("is-hit");
  impact.classList.add("is-visible");
  ribbon.classList.add("is-visible");
  typeSlug.classList.add("is-visible");

  if (char === " ") {
    span.classList.add("is-space");
  }

  if (withSound) {
    playStrikeSound(char);
  }
}

async function typeLine(row, line, withSound, runId) {
  row.classList.add("is-current");

  for (let index = 0; index < line.text.length; index += 1) {
    if (runId !== currentRun) {
      return false;
    }

    const char = line.text[index];
    const span = document.createElement("span");
    span.className = "ink-char";
    span.textContent = char === " " ? "\u00a0" : char;
    row.appendChild(span);

    strike(span, char, withSound);

    const punctuationPause = /[./@_-]/.test(char) ? 5 : 0;
    const spacePause = char === " " ? 2 : 0;
    const pause = withSound
      ? 34 + Math.random() * 42 + punctuationPause * 7 + spacePause * 7
      : 3 + Math.random() * 6 + punctuationPause + spacePause;
    await sleep(pause);
  }

  row.classList.remove("is-current");
  await sleep(withSound ? 72 : 28);
  return true;
}

async function carriageReturn(nextOffset, withSound, runId) {
  paper.classList.remove("is-striking");
  paper.classList.add("is-returning");
  paper.style.setProperty("--carriage-x", "9%");

  if (withSound) {
    playCarriageSound();
  }

  await sleep(withSound ? 88 : 24);

  if (runId !== currentRun) {
    return false;
  }

  setFeed(nextOffset, true);
  await sleep(withSound ? 230 : 90);
  paper.classList.remove("is-returning");
  return true;
}

function resetTypewriter() {
  output.replaceChildren();
  output.classList.remove("is-feeding");
  paper.classList.remove("is-complete", "is-returning", "is-striking");
  stage.classList.remove("is-hit");
  impact.classList.remove("is-visible");
  ribbon.classList.remove("is-visible");
  typeSlug.classList.remove("is-visible");
  paper.style.setProperty("--carriage-x", "9%");
  paper.style.setProperty("--carriage-y", "70%");
  setFeed(0, false);
}

async function runTypewriter(options = {}) {
  const runId = ++currentRun;
  const withSound = options.withSound === true && soundEnabled;

  resetTypewriter();

  let offset = 0;
  const rows = lines.map((line, index) => {
    const row = createRow(line, index, offset);
    offset += line.height;
    return row;
  });

  for (let index = 0; index < lines.length; index += 1) {
    if (runId !== currentRun) {
      return;
    }

    currentOffset = rows[index].offsetTop;
    setFeed(currentOffset, index > 0);
    await sleep(index === 0 ? 180 : withSound ? 120 : 36);

    const completedLine = await typeLine(rows[index], lines[index], withSound, runId);
    if (!completedLine || runId !== currentRun) {
      return;
    }

    if (index < lines.length - 1) {
      const completedReturn = await carriageReturn(rows[index + 1].offsetTop, withSound, runId);
      if (!completedReturn) {
        return;
      }
    }
  }

  paper.classList.add("is-complete");
}

soundButton?.addEventListener("click", async (event) => {
  event.preventDefault();

  if (Date.now() - lastSoundStartAt < 350) {
    return;
  }

  await startSoundPlayback();
});

updateSoundButton();
runTypewriter({ withSound: false });
