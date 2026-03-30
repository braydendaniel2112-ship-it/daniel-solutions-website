# Daniel Solutions — Project Handoff

Single-page portfolio and services website for **Daniel Solutions**, a Calgary-based AI and web design business. Built as one self-contained file with no build tools, no frameworks, no dependencies beyond Google Fonts.

**Owner:** Brayden
**File:** `daniel-solutions-website/index.html`
**Status:** Feature-complete. Contact form needs a real backend before go-live.

---

## Page Sections (in order)

| # | Section | Background | Notes |
|---|---------|-----------|-------|
| 1 | Navigation | Transparent → dark frosted glass on scroll | Floating pill-shaped, fixed position |
| 2 | Hero | `#1E2A3A` dark | Canvas dot grid, staggered headline animation |
| 3 | Services | `#F8F7F4` warm off-white | 2×2 card grid |
| 4 | How It Works | `#FFFFFF` white | 3-step horizontal timeline |
| 5 | Portfolio | `#F8F7F4` warm off-white | 2×2 grid, 2 real + 2 placeholder cards |
| 6 | Testimonials | `#FFFFFF` white | 2 placeholder cards (styled intentionally) |
| 7 | About | `#F8F7F4` warm off-white | 2-col layout, founder bio, 3 stat blocks |
| 8 | Contact | `#1E2A3A` dark | 5-field form, visual-only submission |
| 9 | Footer | `#1E2A3A` dark | Continues from contact section |

---

## Design System

### Colors
```
--bg-page:      #F8F7F4   warm off-white (page background)
--bg-surface:   #FFFFFF   white (cards, surfaces)
--bg-dark:      #1E2A3A   deep navy (hero, contact, footer)
--text-primary: #1E2A3A   primary text
--text-muted:   #6B7A8D   secondary/muted text
--accent:       #2563EB   primary blue (actions, highlights)
--accent-hover: #1D4ED8   darker blue on hover
--accent-light: #EFF6FF   pale blue tint
--border:       #E8E8E4   subtle border
```

### Fonts (Google Fonts)
| Font | Weights | Used For |
|------|---------|----------|
| Plus Jakarta Sans | 400, 600, 800 | Headings, logo, display text |
| Inter | 400, 500 | Body copy, labels, buttons |
| JetBrains Mono | 500 | Eyebrow labels only (uppercase, tracked) |

### Spacing
- **Container:** max-width 1160px, 24px side padding
- **Section padding:** 96px vertical
- **Card radius:** 16px (`--radius-card`)
- **Button/pill radius:** 999px (`--radius-pill`)
- **Global transition:** `all 0.3s cubic-bezier(0.23, 1, 0.32, 1)`

### Breakpoints
- `768px` — tablet: grids collapse to 1 col, nav hamburger shown
- `480px` — mobile: hero CTAs stack full-width, card padding reduced

---

## Brand Treatment

The logo reads **"Daniel Solutions"** but the letters `a` and `i` inside "Daniel" are individually styled in `#2563EB` (accent blue), making the word "AI" readable within the name without disrupting the normal capitalization.

```html
D<span class="logo-ai">a</span>n<span class="logo-ai">i</span>el Solutions
```

The `.logo-ai` class applies a continuous 2s pulse animation (`aiPulse`) — opacity oscillates 1.0 → 0.7, subtle and non-distracting. Applied in both the nav logo and the footer logo.

---

## Animations

### CSS Keyframes

| Name | Effect | Applied To |
|------|--------|-----------|
| `heroFadeUp` | opacity 0→1, translateY 30px→0 | Hero eyebrow, each headline line, subtext, CTAs |
| `aiPulse` | opacity 1→0.7→1, 2s infinite | `.logo-ai` letters in nav + footer |

### Hero Load Animation (staggered delays)
```
Eyebrow:  0.1s
Line 1:   0.2s
Line 2:   0.37s
Line 3:   0.54s
Subtext:  0.72s
CTAs:     0.88s
```

### Scroll Reveal (Intersection Observer)
- All `.reveal` elements animate on scroll: `opacity: 0, translateY: 20px` → `opacity: 1, translateY: 0`
- Transition: `0.6s ease-out`
- Threshold: `0.1` (triggers at 10% visibility)
- **Replays in both directions** — `visible` class is removed when element leaves viewport, re-added when it re-enters
- Child stagger via `--i` CSS variable: `transition-delay: calc(var(--i, 0) * 0.1s)`

### Hover Effects
| Element | Effect |
|---------|--------|
| Service cards | `translateY(-8px)`, blue box-shadow, bottom accent line expands 0%→100% |
| Portfolio cards | `scale(1.02)`, blue glow box-shadow, overlay text fades in |
| CTA buttons | `translateY(-2px)`, deeper color, shadow |
| Nav "Get Started" | `translateY(-2px)`, accent shadow |
| Form submit button | `translateY(-2px)`, accent shadow |

### Dot Grid Canvas (Hero Background)
- `<canvas id="dotGrid">` fills entire hero, `z-index: 0`, `opacity: 0.35`
- 32px grid spacing, 1.5px dot radius
- Dot color: `rgba(99, 155, 255, 0.6)`
- Each dot pulses independently via sine wave: `0.2 + 0.8 * (0.5 + 0.5 * sin(t * speed + phase))`
- Random `phase` (0–2π) and `speed` (0.4–1.0) per dot → ripple wave effect
- 60fps via `requestAnimationFrame`
- Responsive: canvas resizes on `window resize`
- Hero has `overflow: hidden` to clip dots at boundary
- `::after` pseudo-element (gradient fade) has `z-index: 3` to sit above canvas

---

## JavaScript Features

### Nav Scroll Behavior
```js
// Adds .scrolled class to nav when scrollY > 50
// Triggers: dark frosted glass background, backdrop blur, border, shadow
```

### Mobile Menu / Hamburger
- Hamburger animates to X (span rotations + fade)
- Full-screen overlay with `backdrop-filter: blur(20px)`
- Body scroll locked (`overflow: hidden`) while open
- Closes on any menu link click

### Contact Form
```js
function handleSubmit(e) { ... }
// Visual-only: shows "Message Sent ✓" for 4s, then resets
// NO backend integration — needs email service before go-live
```

### Smooth Scroll
- All `a[href^="#"]` links use `scrollIntoView({ behavior: 'smooth' })`
- Complements `html { scroll-behavior: smooth }`

---

## External Resources

- **Google Fonts** — only external dependency
- **Live portfolio link:** `https://calgary-grille-website.vercel.app` (The Calgary Grille)
- All portfolio links use `target="_blank" rel="noopener"`

---

## Placeholder Content (needs real data)

| Location | Current | Replace With |
|----------|---------|--------------|
| Testimonial #1 name | "Client Name · Business Type · Calgary" | Real client |
| Testimonial #2 name | "Client Name · Business Type · Calgary" | Real client |
| Portfolio card #3 | "Your Project Here" (ghost card) | Real project |
| Portfolio card #4 | "Your Project Here" (ghost card) | Real project |
| Portfolio card #2 | "Live Demo Available" badge | Link when demo hosted |
| About stats | 48hrs / $0 / 100% | Update with real metrics over time |
| Footer copyright | © 2025 | Update year annually |

---

## Known Limitations / TODO

### Must-do before go-live
- [ ] **Contact form backend** — wire up to Formspree, Resend, or a Vercel serverless function so messages actually arrive
- [ ] **Meta tags** — add `<meta name="description">`, Open Graph tags (`og:title`, `og:image`, `og:description`) for link previews

### Nice-to-have
- [ ] Analytics (Google Analytics, Plausible, or Fathom)
- [ ] SEO: Schema.org structured data for local business
- [ ] Pause canvas animation when hero is not in viewport (battery/performance on mobile)
- [ ] Accessibility: `aria-expanded` on hamburger button, skip-to-content link
- [ ] `sitemap.xml` and `robots.txt` once deployed
- [ ] Real testimonial content when available
- [ ] Portfolio images (cards are currently text-only)

---

## Fixes Applied This Session

1. **Logo capitalization** — Changed `DanAIel` → `D[a]n[i]el` so individual lowercase letters are blue, not all-caps "AI"
2. **Scroll animations replay** — Removed `unobserve()` call; added `classList.remove('visible')` on exit so animations replay on scroll-up
3. **Hero headline** — Changed from "We Build Websites / That Actually / Work For You." → "Websites. / Automations. / Real Results."
4. **Hero-to-services transition** — `overflow: hidden` removed then re-added with corrected stacking: canvas `z-index: 0`, radial glow `z-index: 1` (via `::before`), content `z-index: 1`, gradient fade `::after` at `z-index: 3`
5. **Dot grid canvas** — Added animated pulsing dot grid to hero background

---

## Deployment Notes

- **No build process** — single `index.html` file, deploy as-is
- **Recommended host:** Vercel (already used for Calgary Grille project)
- **Deploy command (Vercel CLI):** `vercel --prod` from `daniel-solutions-website/`
- **Custom domain:** connect via Vercel dashboard after first deploy
- **Static hosting alternatives:** Netlify, GitHub Pages, Cloudflare Pages
