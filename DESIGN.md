---
name: CAPITAL
description: Business centre on Astana's Left Bank, presented as night glass, travertine stone and one window-lamp amber.
colors:
  amber: "#d6a15c"
  amber-strong: "#e2b375"
  amber-deep: "#8a5a1c"
  night-950: "#0c1220"
  night-900: "#121a2e"
  night-800: "#1a2440"
  night-700: "#26314f"
  stone-50: "#f4f0e9"
  stone-100: "#ece6db"
  stone-200: "#ddd5c6"
  stone-300: "#c9bfad"
  ink-on-night: "#ece6db"
  ink-on-night-2: "#a7aec0"
  ink-on-stone: "#151d33"
  ink-on-stone-2: "#4a5168"
  rule-on-night: "rgb(236 230 219 / 0.16)"
  rule-on-stone: "rgb(21 29 51 / 0.16)"
  error: "#a1361f"
  success: "#2f6b3e"
typography:
  display:
    fontFamily: "Alumni Sans, Alumni Fallback, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 2rem + 5vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Alumni Sans, Alumni Fallback, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.8rem + 3vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 1
  headline:
    fontFamily: "Alumni Sans, Alumni Fallback, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.05
  numeral:
    fontFamily: "Alumni Sans, Alumni Fallback, Arial Narrow, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "'tnum' 1, 'lnum' 1"
  body-large:
    fontFamily: "Onest, Onest Fallback, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Onest, Onest Fallback, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest, Onest Fallback, system-ui, sans-serif"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1rem, 4vw, 4rem)"
  section-y: "clamp(5rem, 12vw, 11rem)"
  container-max: "90rem"
  row: "1.15rem"
  stack: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night-950}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.amber-strong}"
    textColor: "{colors.night-950}"
  button-primary-compact:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night-950}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.55rem 1.15rem"
    height: "2.75rem"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink-on-night}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "3.25rem"
  button-line-hover:
    textColor: "{colors.amber}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ink-on-stone}"
    typography: "{typography.body-large}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0"
    height: "3.25rem"
  floor-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-on-stone}"
    typography: "{typography.numeral}"
    padding: "0.4rem 0.6rem"
  floor-button-hover:
    backgroundColor: "{colors.stone-200}"
  floor-button-selected:
    backgroundColor: "{colors.night-900}"
    textColor: "{colors.ink-on-night}"
  unit-chip:
    backgroundColor: "{colors.stone-50}"
    textColor: "{colors.ink-on-stone}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.85rem"
    height: "2.75rem"
  unit-chip-selected:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night-950}"
  unit-sheet:
    backgroundColor: "{colors.night-900}"
    textColor: "{colors.ink-on-night}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
    width: "17rem"
---

# Design System: CAPITAL

## Overview

**Creative North Star: "The Lit Facade at Dusk"**

The building is the grammar. Its vertical crown fins become the page's hairline vertical rules, its floors become the floor stack in the plan picker, and the warm light in its windows at dusk becomes the only accent. Sections alternate between night glass (deep navy) and travertine stone (warm off-white), the two materials of the facade, so scrolling reads as moving between the glazing and the podium.

Density is low and architectural: full-bleed renders, very large condensed light headings set like tall glazing, and information delivered as spec-sheet rows separated by hairlines rather than as cards, icon tiles or stat blocks. Everything is square-cornered. Motion is slow and scrubbed to scroll: parallax on renders, fins growing downward from the top edge, a pinned 3D turn where windows light up.

The world explicitly refuses the real-estate template of hero, icon-card grid and stat tiles.

**Key Characteristics:**
- Two grounds (night glass, travertine) alternating by section; one accent (window-lamp amber).
- Condensed light display (Alumni Sans 300) at very large sizes; neutral Cyrillic text face (Onest).
- Hairline rules (1px at 16% opacity) as the only dividers; spec-sheet rows instead of cards.
- Zero radius everywhere; no shadows on UI.
- The vertical fin cluster as the recurring mark.
- Slow, scrubbed, expo-out motion; full static fallback under reduced motion.

## Colors

A two-material palette (cool navy glass, warm travertine) lit by a single warm amber.

### Primary
- **Window-Lamp Amber** (amber): the action and the selection. Primary buttons, the selected unit on the plan and in the unit chips, the 3D progress line, the focus ring on night grounds, text selection. Nothing decorative.
- **Lamp Glow** (amber-strong): the hover state of amber buttons only.
- **Bronze Lamp** (amber-deep): amber's legible stand-in on stone. Used for the [ЗАПОЛНИТЬ] gap marker, the form caret and the form focus ring wherever the ground is travertine (4.75:1 on stone-100, where plain amber is 1.86:1).

### Neutral
- **Deep Night** (night-950): the darkest glass. Hero ground, 3D stage, solid nav bar, mobile menu, text on amber.
- **Night Glass** (night-900): the default dark section ground and the page background; also the selected floor button and the unit sheet on stone.
- **Dusk Navy** (night-800): image wells behind loading renders (infrastructure frame, map).
- **Mullion Navy** (night-700): scrollbar thumb.
- **Pale Travertine** (stone-50): plan canvas and unit chips inside a stone section.
- **Travertine** (stone-100): the light section ground. Also the primary ink on night (ink-on-night shares this value).
- **Honed Travertine** (stone-200): floor-button hover; gallery image wells.
- **Veined Travertine** (stone-300): plan scrollbar thumb.
- **Night Ink** (ink-on-stone): headings, body and the strong top rule on stone sections.
- **Slate Ink** (ink-on-stone-2): secondary text on stone (labels, captions, leads).
- **Lamplit Paper** (ink-on-night): primary text on night.
- **Haze** (ink-on-night-2): secondary text on night.
- **Hairlines** (rule-on-night, rule-on-stone): every divider, at 16% of the opposite ink.

### Status
- **Brick** (error) and **Pine** (success): form validation and submission state only, on stone.

### Named Rules
**The One Lamp Rule.** Amber marks what the visitor can act on or has chosen: the primary action, the selected unit, progress. It never fills a section, decorates a heading or colours an illustration.

**The Bronze-on-Stone Rule.** On travertine, amber is never used as text or as a thin line; it becomes amber-deep. Amber may still fill a button or a selected chip on stone, where the dark ink sits on it.

**The Two Materials Rule.** Each section is either night or stone, set by switching the ground and its ink, secondary ink and rule together. Never mix grounds inside one section except for the unit sheet (night) inside the stone plan picker.

## Typography

**Display Font:** Alumni Sans (variable 100–900, Latin + Cyrillic subsets, metric-matched narrow fallback)
**Body Font:** Onest (variable 100–900, Latin + Cyrillic subsets, metric-matched fallback)
**Wordmark:** not a font. CAPITAL is drawn as SVG outlines (wide geometric uppercase, from Unbounded 600) and used at three sizes: nav (8.5rem wide, 7rem under 560px), hero (up to 62rem / 84vw), footer (up to 40rem).

**Character:** A tall, light, condensed display that reads like glazing panels against a calm, neutral text face; the contrast between the wide wordmark and the narrow display is the building's own contrast of crown and shaft.

### Hierarchy
- **Display** (Alumni Sans 300, fluid 3.25–6rem, line-height 0.95, -0.01em): every section heading (h2), balanced wrapping.
- **Lead** (Alumni Sans 300, fluid 2.5–4.25rem, line-height 1): the hero's one strong line, the selected unit's area in the unit sheet. Max ~22ch.
- **Headline** (Alumni Sans 400, fluid 1.75–2.5rem, line-height 1.05): sub-items (h3): infrastructure rows, 3D steps, plan titles.
- **Numeral** (Alumni Sans 400, 1.6rem, tabular lining figures): floor numbers in the floor stack.
- **Body Large** (Onest 400, fluid 1.25–1.5rem, line-height 1.5): section intros, address, form inputs. Max 42–46ch.
- **Body** (Onest 400, fluid 1–1.125rem, line-height 1.6): running text, spec values, buttons (weight 500).
- **Label** (Onest 400, fluid 0.8125–0.875rem): spec keys, captions, nav links (+0.02em), field labels, meta lines.

### Named Rules
**The Tall Glazing Rule.** Headings are set in the condensed display at weight 300 or 400, never bold, never in the text face. Size and lightness carry hierarchy.

**The Tabular Facts Rule.** Every number that is a fact (areas, floors, ceilings, dates) uses tabular lining figures.

**The Descriptor Lockup.** The only tracked uppercase text in the system is the descriptor set directly under the hero wordmark (label size, 0.08em, Haze). It belongs to the wordmark lockup and is not a section label style.

## Layout

A single centred container (max 90rem) with fluid side gutters (1rem at 360px, up to 4rem). Sections breathe with fluid vertical padding (5rem to 11rem). Content sections split into asymmetric two-column grids of roughly 5:6 or 6:5 with large fluid gaps (2–8rem); the shorter column often stays sticky (about intro, infrastructure image frame, unit sheet) while the longer column scrolls.

Full-bleed photographic plates sit between sections: 78–82vh tall, image overscanned by 12% top and bottom for parallax, with a small caption in the gutter beneath.

Information is arranged as spec-sheet rows: a key column (label size, secondary ink) and a value column, each row closed by a hairline, the block opened by a solid 1px rule in full ink.

Responsive: the nav collapses its links at 1080px and its CTA at 560px. Two-column grids stack at 900px; on stack, media moves above copy. The plan picker goes from three columns (floor stack 10.5rem / plan / 17rem unit sheet) to two at 1180px and one at 900px, where the floor stack becomes a horizontal strip and unit labels move into chips. Spec rows stack at 520px. Usable from 360px.

**The Hairline Grid Rule.** Structure is drawn with 1px rules, never with boxes. If a group needs separating, add a rule; do not add a background panel.

## Elevation & Depth

The interface is flat: no box-shadows on any UI element. Depth comes from the photography and from layering: renders under gradient shades (night-950 at 55–92% fading to transparent), the nav gaining a 94% night-950 backdrop with a bottom hairline once scrolled, sticky columns over scrolling ones, and scroll parallax on every full-bleed image.

**The Flat Glass Rule.** Panels never float. A surface reads as different because its ground changes (night sheet on stone), not because it casts a shadow.

## Shapes

Every corner is square (0 radius): buttons, inputs, chips, image frames, the unit sheet, the lightbox controls. The recurring silhouette is the fin cluster: 7–12 one-pixel vertical lines of varied heights (54–100% of the cluster height), hanging from the top edge of a section near the right gutter (left gutter on plates), each a gradient from transparent to ink at 38–55% opacity. Inputs are a single bottom rule, not a box. Line icons are drawn at 1.4–1.6 stroke in a 20-unit box: arrow (right, down, left, up-right), close, chevron.

## Components

### Buttons
Calm, square, and amber; the one warm object on the screen.
- **Shape:** square corners (0px), 1px border in the fill colour, minimum height 3.25rem (2.75rem compact in the nav).
- **Primary:** amber fill, Deep Night text, Onest 500, usually followed by a right arrow.
- **Hover / Focus:** fill eases to Lamp Glow over 0.35s; the arrow slides 4px right over 0.45s; active presses down 1px. Focus is a 2px amber outline offset 3px.
- **Line:** transparent with a currentColor border; on night it turns amber on hover, on stone it turns Night Ink with a 5% ink tint (Bronze-on-Stone Rule).
- **Text link with arrow:** inline, 1px bottom border in currentColor; hover goes amber on night, Slate Ink on stone.

### Inputs / Fields
- **Style:** no box; transparent ground, a single 1px Night Ink bottom rule, Body Large text, label above in Label size Slate Ink. Selects use the same rule with a drawn chevron.
- **Focus:** the bottom rule thickens to 2px; keyboard focus adds a 2px Bronze Lamp outline offset 4px.
- **Error:** bottom rule and message in Brick; message slot reserves its height so the form does not jump.
- **Selected-unit tag:** a compact Night Glass strip above the form carrying the chosen unit and a clear button.

### Navigation
- Fixed top bar, 4.75rem tall, wordmark left, links right in Label size, compact amber CTA at the end. Transparent over the hero; after scroll it gains the 94% Deep Night backdrop and hairline, hides on scroll down and returns on scroll up (0.6s).
- Link hover and the current section draw a 1px underline from the left (scaleX, 0.45s).
- Mobile: a two-line burger that crosses into an X; a full-height Deep Night menu with links in Display 300 at 2.5–3.5rem, each closed by a hairline, CTA at the end.

### Spec Sheet
- Key/value rows on a hairline grid: solid 1px ink rule on top, 16% hairlines between rows, 1.15rem row padding, keys in Label size secondary ink, values in Body with tabular figures. Unknown values render the [ЗАПОЛНИТЬ] gap marker (amber on night, Bronze Lamp on stone).

### Floor Stack and Plan Picker (signature)
- **Floor stack:** a vertical list of floors bound by hairlines, each a Numeral plus a one-line summary. Hover tints to Honed Travertine; the selected floor inverts to Night Glass with Lamplit Paper text. Under 900px it becomes a horizontal strip of bordered cells, floor numbers only.
- **Plan:** the real plan drawing on Pale Travertine with an SVG overlay. Units fill amber at 35% on hover/focus and 85% when selected; sold units lose weight and colour. Under 900px unit labels move into square chips that fill amber when selected.
- **Unit sheet:** a 17rem Night Glass panel, sticky beside the plan, with the area in Lead size, a hairline key/value list and a full-width amber CTA.

### Fin Cluster (signature)
- The facade fins as a mark: placed at the top of night and stone sections, the hero, plates and the footer. Fins grow downward from the top (scaleY 0 to 1, 1.6–1.8s expo-out, 0.05–0.06s stagger) when their section enters. Never interactive, always aria-hidden.

### Scroll-Driven Scenes
- **3D turn:** a 320vh track (260vh on mobile) pins a full-viewport stage; scroll turns the model from day to night sky while windows light, one step of copy at a time, and a 1px amber line on the right fills as progress. Without motion it falls back to a static render and stacked steps.
- **Infrastructure:** a sticky image frame cross-fades (0.9s) to match the active row; inactive row headings dim to Haze.
- **Gallery:** on desktop, vertical scroll drives a horizontal strip of renders sideways (scrub 0.6); elsewhere it is a snap-scrolling strip. Images zoom 3.5% on hover over 1.1s and open in a near-black dialog with square outlined controls.

## Do's and Don'ts

### Do:
- **Do** alternate night and stone sections, switching ground, ink, secondary ink and rule together.
- **Do** reserve amber for the primary action, the selected unit and progress; switch to amber-deep for any amber text or line on stone.
- **Do** set section headings in Alumni Sans 300 at Display size with balanced wrapping.
- **Do** present facts as spec-sheet rows on hairlines, with tabular figures, and show [ЗАПОЛНИТЬ] for anything unknown.
- **Do** keep every corner square and every divider 1px.
- **Do** lead with full-bleed renders and let them parallax gently (12–18% travel).
- **Do** use the ease-out curve cubic-bezier(0.16, 1, 0.3, 1) for state changes (0.3–0.6s) and expo-out for reveals (1.1–1.6s, 18–32px rise), and keep every scene usable with motion off.

### Don't:
- **Don't** build cards, icon tiles or stat tiles; use rows, rules and photography.
- **Don't** round corners or add drop shadows to UI.
- **Don't** introduce a second accent colour or use amber as a section background.
- **Don't** set headings bold or in Onest.
- **Don't** add tracked uppercase labels above headings; the descriptor under the wordmark is the only one.
- **Don't** use plain amber for text, focus rings or thin lines on travertine.
