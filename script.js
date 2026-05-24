const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

const lines = [
  ...document.querySelectorAll(".typed-line"),
  ...document.querySelectorAll(".typed-link"),
];

function renderLink(link, label, value) {
  link.dataset.renderedLabel = label;
  link.dataset.renderedValue = value;
}

async function typeText(element) {
  const isLink = element.classList.contains("typed-link");
  const label = element.dataset.label || "";
  const value = element.dataset.value || element.dataset.text || "";
  const text = isLink ? value : element.dataset.text || "";

  element.classList.add("is-active");

  if (isLink) {
    renderLink(element, label, "");
    await sleep(120);
  }

  for (let index = 0; index <= text.length; index += 1) {
    if (isLink) {
      renderLink(element, label, text.slice(0, index));
    } else {
      element.textContent = text.slice(0, index);
    }

    const character = text[index - 1] || "";
    const pause = /[./@]/.test(character) ? 70 : 24 + Math.random() * 36;
    await sleep(pause);
  }

  element.classList.remove("is-active");
  await sleep(160);
}

async function runTyping() {
  for (const line of lines) {
    await typeText(line);
  }
}

runTyping();
