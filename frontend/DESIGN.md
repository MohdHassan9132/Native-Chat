# Native Chat — Design System

> Source: derived from `UI/Landing/code.html` + `UI/Landing/screen.png` (the first screen
> implemented). No design system document existed in the repo prior to this file. As
> additional screens (`UI/Login`, `UI/InitialDetails`, `UI/Verification`, etc.) are
> implemented, extend this document rather than starting a competing one — their own
> `DESIGN.md` files may add screen-specific notes, but shared tokens/components belong here.

## Identity

Native Chat should feel: tactile, friendly, editorial, playful, premium, human, modern — a
physical paper/comic interface translated into a modern digital product.

Avoid: WhatsApp green, generic SaaS blue, purple AI gradients, glassmorphism, excessive blur,
soft floating shadows, random gradients, generic Material/iOS clones.

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `brand-cyan` | `#4CC6C6` | Primary accent — CTAs, primary icons |
| `brand-cyanDark` | `#38A9A9` | Primary hover/active state, link hover |
| `brand-cyanLight` | `#E8F8F8` | Primary tint — badge backgrounds, subtle fills |
| `brand-coral` | `#FF6B6B` | Secondary accent — alerts, secondary icons/CTAs |
| `brand-coralLight` | `#FFEAEA` | Secondary tint |
| `brand-yellow` | `#F5C95B` | Tertiary accent — badges, small callouts |
| `brand-yellowLight` | `#FEF8EA` | Tertiary tint |
| `brand-charcoal` | `#222222` | Ink outlines, primary text |
| `brand-warmCanvas` | `#FAFAF8` | Page/paper background |
| `brand-surface` | `#F1F2F2` | Neutral panel fill |

Neutral text/utility grays (`neutral-400/500/600/700/800`) come from Tailwind's default
palette and are used for secondary/tertiary copy on top of the brand tokens above.

## Typography

- **Sans (body/UI):** Plus Jakarta Sans — weights 400, 500, 600, 700, 800.
- **Mono (display/accents):** Space Grotesk — weights 500, 700. Used for the logo lockup,
  timestamps, and small numeric/tech accents — not for body copy.
- Headline scale: `text-4xl`→`text-6xl` extrabold, tight tracking, tight leading, for hero/
  section H1-H2. Section intros use `text-3xl`→`text-5xl` extrabold.
- Body copy: `text-base`/`text-lg`, medium weight, relaxed leading, `neutral-600/700` color.
- Eyebrow/label text: `text-xs`, bold, uppercase, wide tracking.

## Shadows & Borders ("Ink" system)

Tactile hard-offset shadow system — no soft/blurred shadows anywhere.

- `ink-border`: `2px solid` charcoal
- `ink-border-3`: `3px solid` charcoal (heavier emphasis, e.g. badge rings)
- `ink-border-dashed`: `2px dashed` charcoal (decorative-only elements)
- `shadow-ink-sm`: `2px 2px 0px` charcoal
- `shadow-ink`: `4px 4px 0px` charcoal (default for cards/buttons)
- `shadow-ink-lg`: `6px 6px 0px` charcoal (hero panels, large feature cards)
- `shadow-ink-active`: `1px 1px 0px` charcoal (pressed state)

### Hand-wiggle interaction

Primary interactive surfaces (buttons, cards) use the `hand-wiggle` pattern:

- Rest: base `ink-border` + `shadow-ink-sm` (or `shadow-ink`)
- Hover: `translate(-2px, -2px)` + shadow grows one step (e.g. `shadow-ink-sm` → `shadow-ink`)
- Active/press: `translate(2px, 2px)` + shadow shrinks to `shadow-ink-active`
- Transition: `transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out`

Do not replace this with generic soft/blurred shadow hover effects.

## Geometry

- Buttons: pill (`rounded-full`)
- Cards/panels: large rounded corners (`rounded-2xl`/`rounded-3xl`)
- Avatars/icon tiles: `rounded-lg`/`rounded-xl`/`rounded-full` depending on context
- Speech bubbles get one "cusp" corner (`rounded-bl-sm` outgoing / `rounded-br-sm` incoming)
  plus a small triangular tail (`speech-cusp-left`/`speech-cusp-right`)

## Decorative Elements

Small editorial/comic details (stars, dots, doodles, badges, hand-drawn connector lines,
rotated "stamp" badges) are welcome when they support hierarchy — never scattered randomly.

## Component Patterns (established by Landing)

- **Brand pill / logo lockup**: `native` in mono font + a cyan pill reading `Chat` with a
  pulsing coral dot. Reused in header and footer.
- **Section eyebrow badge**: small pill, tinted background, `ink-border`, `shadow-ink-sm`,
  bold uppercase micro-label, optional emoji/icon.
- **Primary CTA button**: pill, `ink-border`, `shadow-ink`(-sm), `hand-wiggle`, bold label +
  trailing arrow icon. Cyan fill for primary emphasis, white fill for secondary (e.g. nav
  Log In).
- **Feature/content card**: `rounded-3xl`, `ink-border`, `shadow-ink`, `hand-wiggle`,
  icon tile (`rounded-2xl`, `ink-border`, `shadow-ink-sm`, tinted brand color) + eyebrow +
  title + description, optional footer stat row separated by a `border-t-2` rule.
- **Floating status/preview card** (hero-only pattern): small white `ink-border` card,
  `shadow-ink`, used for contextual mockups (group chat, call status, chat list preview,
  message bubbles). Hidden below `sm`/`md` breakpoints — decorative, not core content.

## Responsive Rules

- The desktop marketing site and the mobile application screens are different contexts —
  do not force mobile-app dimensions onto the website, and don't just shrink the desktop
  layout for mobile.
- Website: desktop composition is intentional (e.g. hero floating cards absolutely
  positioned around a center illustration); on mobile these decorative floating cards
  should be hidden or restacked rather than crammed in — preserve hierarchy over density.
- Mobile app screens (future): optimize around ~390px, respect safe areas, maintain touch
  targets (out of scope for this document until those screens are implemented).

## Navigation Rules

- Website section links (`#hero`, `#features`, `#about`) may use in-page anchors.
- Application routes (`/login`, `/chat`, etc.) must use real Next.js routing
  (`next/link`), never anchor placeholders.
