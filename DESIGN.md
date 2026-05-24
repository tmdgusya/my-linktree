# Design System

## Direction

This Linktree should feel like a quiet personal desk artwork: warm, calm, technical, tactile, and slightly cinematic. The profile icon is the anchor, while roach's links appear on a heavy sheet of paper with a real typewriter still life in the background.

## Voice

- Clear, compact Korean copy.
- Friendly but not cute.
- Useful labels first, short context second.
- Avoid marketing-heavy slogans.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#ead7b3` | Heavy paper surface |
| Paper light | `#fff7e6` | Soft highlights |
| Ink | `#211d17` | Primary typed text |
| Ink soft | `rgba(33, 29, 23, 0.66)` | Intro copy |
| Teal | `#2d6570` | Kicker accent |
| Saddle | `#735239` | Link labels |

## Typography

- Preferred typewriter face: `J1950Year` / `J1950년` when available locally through SandollCloud.
- CSS maps several likely local names through `J1950Local`, but the font must actually be installed or supplied as a licensed webfont to appear on GitHub Pages.
- Fallback stack: `Courier Prime`, `Courier New`, system monospace.
- Do not commit Sandoll font files into the repository unless the license explicitly permits web embedding and redistribution.

## Layout

- First screen is a full-viewport still-life scene.
- The generated background typewriter sets the mood; do not add a separate CSS-drawn typewriter.
- Heavy paper is the main reading surface and should match the background paper texture.
- Links remain real anchors even though they are presented as typed text.

## Motion

- Text appears character by character.
- No key-strike motion, synthetic typewriter, or sound toggle.
- Reduced-motion users should still see the content without disruptive movement.

## GitHub Pages Notes

This site is intentionally static: `index.html`, `styles.css`, `script.js`, and local assets only. It can be published from the repository root using GitHub Pages without a build step.
