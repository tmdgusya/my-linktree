const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const lines = [
  ...document.querySelectorAll(".typed-line"),
  ...document.querySelectorAll(".typed-link"),
];

const typewriter = document.querySelector(".typewriter");
const soundButton = document.querySelector(".sound-toggle");

let audioContext;
let soundEnabled = false;

function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playClick() {
  if (!soundEnabled || !audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const click = audioContext.createOscillator();
  const clack = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  click.type = "square";
  click.frequency.setValueAtTime(145 + Math.random() * 80, now);
  clack.type = "triangle";
  clack.frequency.setValueAtTime(760 + Math.random() * 180, now);
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1800, now);
  filter.Q.setValueAtTime(0.8, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

  click.connect(filter);
  clack.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  click.start(now);
  clack.start(now);
  click.stop(now + 0.06);
  clack.stop(now + 0.04);
}

function playBell() {
  if (!soundEnabled || !audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const bell = audioContext.createOscillator();
  const gain = audioContext.createGain();

  bell.type = "sine";
  bell.frequency.setValueAtTime(1280, now);
  bell.frequency.exponentialRampToValueAtTime(920, now + 0.16);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  bell.connect(gain);
  gain.connect(audioContext.destination);
  bell.start(now);
  bell.stop(now + 0.5);
}

function renderLink(link, label, value) {
  link.dataset.renderedLabel = label;
  link.dataset.renderedValue = value;
}

function strikeKey(index) {
  typewriter?.classList.add("is-striking");
  typewriter?.style.setProperty("--carriage-x", `${Math.min(index * 2.2, 42)}px`);
  window.setTimeout(() => typewriter?.classList.remove("is-striking"), 72);
}

async function typeText(element) {
  const isLink = element.classList.contains("typed-link");
  const label = element.dataset.label || "";
  const value = element.dataset.value || element.dataset.text || "";
  const text = isLink ? value : element.dataset.text || "";

  element.classList.add("is-active");

  if (isLink) {
    renderLink(element, label, "");
    await sleep(150);
  }

  for (let index = 0; index <= text.length; index += 1) {
    if (isLink) {
      renderLink(element, label, text.slice(0, index));
    } else {
      element.textContent = text.slice(0, index);
    }

    if (index > 0) {
      playClick();
      strikeKey(index);
    }

    const character = text[index - 1] || "";
    const pause = /[./@]/.test(character) ? 92 : 34 + Math.random() * 44;
    await sleep(pause);
  }

  element.classList.remove("is-active");
  typewriter?.style.setProperty("--carriage-x", "0px");
  playBell();
  await sleep(230);
}

async function runTyping() {
  for (const line of lines) {
    await typeText(line);
  }
}

soundButton?.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    ensureAudio();
  }
  soundButton.textContent = soundEnabled ? "Sound off" : "Sound on";
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
});

window.addEventListener(
  "pointerdown",
  () => {
    if (!audioContext && soundEnabled) {
      ensureAudio();
    }
  },
  { once: true }
);

runTyping();
