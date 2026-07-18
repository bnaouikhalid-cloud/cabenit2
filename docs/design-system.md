# Design system

Concept: **Designed for the Kitchen. Built for Confidence.** The system pairs editorial interiors with the precision of a cabinet schedule. Trust is created through product clarity, calm hierarchy and project support.

## Brand assets

The prototype uses a locally stored copy of the official logo observed on the public client website on July 18, 2026. The original high-resolution client master and formal clear-space rules were not supplied; replace the web-derived file only when the approved master is available.

## CSS tokens

All global values are centralized in `:root` inside `assets/css/styles.css`.

| Group | Core values |
|---|---|
| Brand | Deep Forest `#1f342c`, Forest `#29483b`, Oak `#b58a5a`, Soft Sage `#dde5dd` |
| Surfaces | Warm White `#faf8f4`, Paper `#fffdf9`, Canvas `#f4f1eb` |
| Text | Ink `#17211d`, body `#171b19`, muted `#646b67` |
| Status | Success `#257553`, warning `#a8651b`, error `#bc4545`, focus `#b58a5a` |
| Border | `#dddcd6` plus strong/divider aliases |
| Radius | 4, 8, 10, 16 and 24px; editorial images generally remain square |
| Shadow | Small, medium and large overlay elevations |
| Spacing | 4–128px token scale based on an 8px rhythm |
| Containers | Narrow 760px, content 1280px, wide 1440px |
| Motion | Fast 160ms, base 240ms, slow 360ms |
| Breakpoints | 430, 700, 960 and 1180px token references; media queries use equivalent static values |

## Typography

- Primary: self-hosted Manrope variable WOFF2, fallback Segoe UI/Helvetica/Arial.
- Editorial emphasis: self-hosted Source Serif 4 italic WOFF2, used sparingly.
- Two families maximum; no remote font runtime.
- Body: 16px desktop and mobile, 1.6–1.7 line-height.
- Product/utility UI: minimum 14px where essential.
- Hero: responsive `clamp()` with a deliberately reduced mobile maximum so imagery appears in the initial viewport.

## Layout

- Desktop reference: 1440px; content maximum 1280px.
- Desktop conceptual grid: 12 columns; template layouts use 2–4 functional columns.
- Mobile: 4-column concept, 16px outer margin at 360px and 20px at 390px+.
- Section spacing: responsive 56–112px; commercial controls remain closer to headings.
- Product image ratios are consistent and defined to prevent layout shift.

## Component inventory

- Utility bar, compact-on-scroll header and accessible mobile navigation
- Product-search dialog with combobox suggestions, keyboard navigation and empty state
- Primary, outline, light and quiet buttons
- Trust strip, cabinet-type cards, design transformation and quality tabs
- Product cards, quick-view modal, filters/chips/drawer and sort
- Gallery, thumbnails, dimension diagram, variation choices and mobile purchase bar
- Quote stepper, fields, choices, local upload states, draft save, review and success
- Cart line item, quantity, remove/undo, support checklist and sticky summary
- Checkout labeled stepper, inline errors, payment simulator, mobile summary and confirmation
- FAQ, resource/policy sections, toast and footer

## Interaction and accessibility states

Controls cover default, hover, focus-visible, active/selected, disabled, error and loading. Variation selection uses border, fill and text—not color alone. Dialogs expose `aria-hidden`, trap focus, close with Escape/backdrop controls and restore focus. Search uses combobox/listbox semantics. Cart and form changes use live status regions. Touch targets are at least 44px for primary controls.

Heading order, landmark structure, explicit labels, error associations, keyboard navigation, alt text and reduced-motion handling are implemented in the prototype. Formal WCAG conformance still requires assistive-technology and production-template testing after content/plugins are integrated.

## Motion

Use 160–360ms opacity/translate transitions for header compression, cards, drawers, modals, gallery changes and form steps. `prefers-reduced-motion: reduce` removes nonessential animation. No scroll hijacking, parallax, autoplay video or looping decoration.
