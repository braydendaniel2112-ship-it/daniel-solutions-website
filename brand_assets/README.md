# Daniel Solutions — Brand Assets

This folder is the source of truth for brand assets used in the website.
Place logos, icons, images, and exported design files here.
Claude will check this folder before designing anything — if assets exist here, they are used instead of placeholders.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-page` | `#F8F7F4` | Warm off-white — page background, alternating sections |
| `--bg-surface` | `#FFFFFF` | White — cards, elevated surfaces |
| `--bg-dark` | `#1E2A3A` | Deep navy — hero, contact, footer |
| `--text-primary` | `#1E2A3A` | Primary body text |
| `--text-muted` | `#6B7A8D` | Secondary / muted text |
| `--accent` | `#2563EB` | Primary blue — actions, highlights, logo AI letters |
| `--accent-hover` | `#1D4ED8` | Darker blue on hover |
| `--accent-light` | `#EFF6FF` | Pale blue tint — backgrounds, badges |
| `--border` | `#E8E8E4` | Subtle dividers and card borders |

---

## Typography

| Font | Weights | Role |
|------|---------|------|
| Plus Jakarta Sans | 400, 600, 800 | Headings, logo, display text |
| Inter | 400, 500 | Body copy, labels, buttons |
| JetBrains Mono | 500 | Eyebrow labels only (uppercase, tracked) |

Loaded via Google Fonts. No local font files needed.

---

## Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Container max-width | `1160px` | Page content width |
| Side padding | `24px` | Container horizontal padding |
| Section padding | `96px` vertical | Top/bottom spacing for all sections |
| `--radius-card` | `16px` | Cards, form inputs |
| `--radius-pill` | `999px` | Buttons, nav, tags |
| Global transition | `all 0.3s cubic-bezier(0.23, 1, 0.32, 1)` | Default easing |

---

## Logo Treatment

The logo reads **"Daniel Solutions"** with the letters `a` and `i` inside "Daniel" styled in `#2563EB` (accent blue), making the hidden word "AI" visible within the brand name.

```html
D<span class="logo-ai">a</span>n<span class="logo-ai">i</span>el Solutions
```

- `.logo-ai` pulses continuously: opacity `1.0 → 0.7 → 1.0` over 2s (`aiPulse` keyframe)
- Applied in both the nav logo and footer logo

---

## Assets Checklist

Place files here as they become available:

- [ ] `logo.svg` — Full wordmark (Daniel Solutions)
- [ ] `logo-mark.svg` — Icon/mark only (for favicons, etc.)
- [ ] `favicon.ico` / `favicon.png`
- [ ] `og-image.png` — 1200×630px Open Graph image for link previews
- [ ] Portfolio project screenshots / mockups

---

## Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Tablet | `768px` | Grids collapse to 1 column, hamburger nav shown |
| Mobile | `480px` | Hero CTAs stack full-width, card padding reduced |
