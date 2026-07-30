# Homepage Island full-width rail

Date: 2026-07-30

## Goal

Move Here Island to a full-width bottom card; keep small-card chrome; show two notch peeks flush to the bottom with 10% crop. Keep Wallpaper as the featured left card spanning two rows, with phone shots kept clear of copy.

## Layout

Desktop grid: `2 × 3` equal tracks.

| Cell | Content |
|------|---------|
| Col 1, rows 1–2 | Wallpaper feature card |
| Col 2, row 1 | Links small card |
| Col 2, row 2 | Sidefy small card |
| Col 1–2, row 3 | Island wide small card |

Island height equals one small-card row (same as Links/Sidefy).

Mobile (`≤800px`): single column stack — Wallpaper, Links, Sidefy, Island.

## Island card

- Same classes/treatment as other non-feature home cards (icon left, platforms, title, subhead, corner arrow).
- Modifier `home-app-card--island` for `grid-column: 1 / -1` and peeks.
- Peeks: `shot-compact.jpg` + `shot-expanded.jpg`, flush to card bottom, `aspect-ratio: 890 / 324` (crop bottom 10%), top-only radius, card `overflow: hidden`.

## Wallpaper feature shots

- Constrain peeks to the right half of the card (`left` ≈ 48%+), reduce height, keep copy `z-index` above so text never sits under phones.

## Out of scope

- Product page redesign, new screenshot assets, animation.
