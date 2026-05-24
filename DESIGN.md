# Design System

## Direction

This Linktree should feel like a quiet personal desk artwork: warm, tactile, mechanical, and slightly cinematic. The links should not read as a UI panel. They should feel physically typed into a sheet moving through the typewriter.

## Voice

- Clear, compact Korean copy.
- Friendly but not cute.
- Useful labels first, short context second.
- Avoid marketing-heavy slogans.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#201b14` | Primary typed text |
| Ink soft | `rgba(32, 27, 20, 0.72)` | Secondary typed text |
| Teal | `#215b64` | Field note accent |
| Saddle | `#6f4c32` | Warm ink variance |
| Paper veil | `rgba(236, 213, 166, 0.055)` | Subtle material overlay aligned to the generated sheet |

## Typography

- Primary face: `YComputer`, loaded from `assets/fonts/Ycomputer.otf`.
- Source: KT Y Brand's Y콤퓨타체.
- License note: the official KT Y Brand page states that Y콤퓨타체 may be used and redistributed freely.
- Reason: Y콤퓨타체 has a bitmap/typewriter-inspired 탈네모 structure, so it gives the page a Korean mechanical text mood instead of generic monospace.

## Layout

- The generated background typewriter sets the still-life scene.
- A near-transparent material layer is aligned near the typewriter platen, letting the generated paper texture remain dominant.
- Avoid card/panel styling. The typed area should read as ink on the photographed sheet, not as a glass UI container.
- Links remain real anchors after they are typed.

## Motion

- The active line stays near a fixed strike line.
- After each line, the paper feeds upward to simulate line advance.
- Each character receives random ink pressure, small baseline drift, and a short strike flash.
- The ribbon/impact marker and type slug move with the current character as a visible strike cue.
- The machine/paper jolts subtly on each strike and snaps on carriage return.
- Sound is on by default as an intent state. Because browsers block autoplay audio, the first click/tap/key press unlocks Web Audio, restarts the sequence, and plays synthesized strike/carriage sounds.

## GitHub Pages Notes

This site is intentionally static: `index.html`, `styles.css`, `script.js`, image assets, and the licensed/free-to-redistribute font asset. It can be published from the repository root using GitHub Pages without a build step.
