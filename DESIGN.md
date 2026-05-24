# Design System

## Direction

This Linktree should feel like a quiet personal desk artwork: warm, calm, technical, tactile, and slightly cinematic. Roach's links should feel typed directly into the still-life scene, not placed inside a web UI panel.

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

- Primary face: `YComputer`, loaded from `assets/fonts/Ycomputer.otf`.
- Source: KT Y Brand's Y콤퓨타체. The official page says Y콤퓨타체 may be used and redistributed freely.
- Reason: Y콤퓨타 is described as a bitmap typeface with a typewriter-inspired 탈네모 serif structure, closer to the Korean typewriter mood than a generic monospace fallback.
- Fallback stack: `J1950Year` / `J1950년` if installed locally, then `Courier Prime`, `Courier New`, system monospace.

## Layout

- First screen is a full-viewport still-life scene.
- The generated background typewriter sets the mood; do not add a separate CSS-drawn typewriter.
- Avoid card/panel styling. The typed content should sit directly on the paper image.
- Links remain real anchors even though they are presented as typed text.

## Motion

- Text appears character by character.
- No key-strike motion, synthetic typewriter, or sound toggle.
- Reduced-motion users should still see the content without disruptive movement.

## GitHub Pages Notes

This site is intentionally static: `index.html`, `styles.css`, `script.js`, and local assets only. It can be published from the repository root using GitHub Pages without a build step.
