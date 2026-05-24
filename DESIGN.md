# Design System

## Direction

This Linktree should feel like a small personal desk: warm, calm, technical, and approachable. The profile icon is the anchor, so the system borrows its parchment background, moss green body, teal glasses, saddle brown shell, and small amber warmth.

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
- Avatar first, then identity, then links.
- Link cards are fixed-height enough for scanning and thumb tapping.
- Cards use `8px` radius; only the outer shell and avatar are rounder.

## Link Types

- `primary`: business email or the link with the strongest conversion goal.
- `default`: YouTube, Threads, LinkedIn, and other active destinations.
- `muted`: future lecture/course links before launch.

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
