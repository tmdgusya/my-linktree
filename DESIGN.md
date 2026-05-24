# Design System

## Direction

This Linktree should feel like a small personal desk turned into a kinetic artwork: warm, calm, technical, tactile, and slightly cinematic. The profile icon is the anchor, while the main experience is a vintage typewriter typing roach's links onto a heavy sheet of paper.

## Voice

- Clear, compact Korean copy.
- Friendly but not cute.
- Useful labels first, short context second.
- Avoid marketing-heavy slogans.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#f3ddb2` | Page background, warmth from profile image |
| Paper soft | `#fff7e8` | Avatar border, high-contrast text on dark green |
| Ink | `#1e211a` | Primary text |
| Muted | `#6d644e` | Secondary text |
| Moss | `#607351` | Brand accent from character body |
| Moss deep | `#354734` | Primary CTA and high-emphasis surfaces |
| Teal | `#2f6570` | Threads and profile accent |
| Saddle | `#72563b` | Lecture/future content accent |
| Sun | `#d99f3f` | Small highlights only |

## Layout

- One centered column, max width `440px`.
- First screen is a full-viewport animated scene.
- Heavy paper is the main reading surface.
- The typewriter sits in the lower visual field and must not block the active typed content.
- Links remain real anchors even though they are presented as typed text.

## Link Types

- `typed-line`: profile name and intro copy.
- `typed-link`: active destinations typed line by line.
- `pending`: future lecture/course links before launch.

## Motion And Sound

- Text appears character by character.
- Each typed character triggers a short synthetic key click.
- Each completed line triggers a subtle typewriter bell.
- Sound starts only after user interaction through the sound toggle, respecting browser autoplay rules.
- Reduced-motion users should still see the content without disruptive movement.

## Icon Set

Core icons needed now:

- Email
- YouTube
- Threads
- LinkedIn
- Lecture/course
- External arrow

Future icons to add:

- Newsletter
- GitHub
- Calendar/booking
- Portfolio
- Download/resource

## GitHub Pages Notes

This site is intentionally static: `index.html`, `styles.css`, and local assets only. It can be published from the repository root using GitHub Pages without a build step.
