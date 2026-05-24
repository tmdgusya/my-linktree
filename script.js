const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const paper = document.querySelector("#machinePaper");
const output = document.querySelector("#typedOutput");
const impact = document.querySelector("#impactMark");
const ribbon = document.querySelector("#ribbonWindow");
const typeSlug = document.querySelector("#typeSlug");
const stage = document.querySelector(".stage");

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

function strike(span, char) {
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
}

async function typeLine(row, line) {
  row.classList.add("is-current");

  for (let index = 0; index < line.text.length; index += 1) {
    const char = line.text[index];
    const span = document.createElement("span");
    span.className = "ink-char";
    span.textContent = char === " " ? "\u00a0" : char;
    row.appendChild(span);

    strike(span, char);

    const punctuationPause = /[./@_-]/.test(char) ? 5 : 0;
    const spacePause = char === " " ? 2 : 0;
    const pause = 3 + Math.random() * 6 + punctuationPause + spacePause;
    await sleep(pause);
  }

  row.classList.remove("is-current");
  await sleep(28);
}

async function carriageReturn(nextOffset) {
  paper.classList.remove("is-striking");
  paper.classList.add("is-returning");
  paper.style.setProperty("--carriage-x", "9%");

  await sleep(24);
  setFeed(nextOffset, true);
  await sleep(90);
  paper.classList.remove("is-returning");
}

async function runTypewriter() {
  let offset = 0;
  const rows = lines.map((line, index) => {
    const row = createRow(line, index, offset);
    offset += line.height;
    return row;
  });

  for (let index = 0; index < lines.length; index += 1) {
    currentOffset = rows[index].offsetTop;
    setFeed(currentOffset, index > 0);
    await sleep(index === 0 ? 180 : 36);
    await typeLine(rows[index], lines[index]);

    if (index < lines.length - 1) {
      await carriageReturn(rows[index + 1].offsetTop);
    }
  }

  paper.classList.add("is-complete");
}

runTypewriter();
