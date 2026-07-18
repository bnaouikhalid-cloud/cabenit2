# Figma handoff specification

## Status

Direct Figma access or Figma MCP was not available, so **no native Figma file was created**. The tested browser prototype and exported screenshots are the contest-stage source of truth. Manual Figma assembly remains if the client requires editable native frames.

The 12 required final frames were freshly exported from the final local browser build on July 18, 2026 and are in [`screenshots/`](screenshots/). A browser-based visual board is available at [`../presentation/index.html`](../presentation/index.html).

## Required pages

`Cover`, `Foundations`, `Components`, `Home`, `Category`, `Product`, `Free Quote`, `Cart`, `Checkout`, `Mobile`, `Prototype Flow`, `Content Notes`, `Developer Handoff`.

## Required frames

| Frame | Route | Width |
|---|---|---:|
| Home Desktop 1440 | `/index.html` | 1440 |
| Home Mobile 390 | `/index.html` | 390 |
| Category Desktop 1440 | `/category/` | 1440 |
| Category Mobile 390 | `/category/` | 390 |
| Product Desktop 1440 | `/product/` | 1440 |
| Product Mobile 390 | `/product/` | 390 |
| Free Quote Desktop 1440 | `/free-quote/` | 1440 |
| Free Quote Mobile 390 | `/free-quote/` | 390 |
| Cart Desktop 1440 | `/cart/` | 1440 |
| Cart Mobile 390 | `/cart/` | 390 |
| Checkout Desktop 1440 | `/checkout/` | 1440 |
| Checkout Mobile 390 | `/checkout/` | 390 |

Add audit frames at 360, 430, 768, 1024, 1280 and 1920px, plus interactive-state frames for Search, Filters, Quick View, selected Product variation, Quote success, Checkout error and confirmation.

## Foundations

Import variables from `docs/design-system.md`: color, spacing (4–128), radius, shadow, container, motion, Manrope text styles and Source Serif 4 editorial emphasis. Use a centered 12-column desktop grid (24px gutter) and 4-column mobile grid (16px gutter, 20px margin at 390).

## Component sets and variants

- `Global/Header`: desktop, compact, mobile; `Global/Mobile nav`; `Global/Footer`
- `Search`: idle, results, keyboard-selected, empty
- `Button`: primary/outline/light/quiet × default/hover/focus/disabled/loading
- `Field`: input/select/textarea × default/focus/error/disabled
- `Choice`: radio/checkbox/variation × default/selected/unavailable/error
- `Product card`: standard/featured × default/hover
- `Filter group`, `Filter chip`, `Filter drawer`
- `Gallery`, `Thumbnail`, `Dimension diagram`, `Mobile purchase bar`
- `Quote stepper`, `Upload`, `Review row`, `Success`
- `Cart line`, `Quantity`, `Undo`, `Project support`, `Order summary`
- `Checkout progress`, `Checkout section`, `Payment method`, `Confirmation`
- `Accordion`, `Modal`, `Toast`

Use Auto Layout, components, variants, variables, text/color styles, responsive constraints and descriptive layer names. Do not flatten UI into screenshots inside the working component file.

## Prototype connections

- Header Search → result/no-result states; Shop → Category; Quote → Free Quote; Cart → Cart.
- Category Filter → drawer; chip removal → filtered grid; Quick View → modal; card → Product.
- Product size → exact price/SKU/mobile bar; Add to Cart → toast; cart icon → Cart.
- Quote 1 → 2 → 3 → 4 → success; Save Progress and file-state variants.
- Cart quantity/remove/undo → updated summary; Checkout → Checkout.
- Checkout summary toggle; validation error; declined number ending `0002`; success `4242 4242 4242 4242` → confirmation.

## Developer annotations

Annotate Elementor-owned editorial blocks, WooCommerce dynamic fields, hook-driven UI, variation data, form/CRM boundaries, sticky behavior, breakpoints, schema ownership, empty/error/loading states and cache exclusions. Tag public observations `REVALIDATE AT IMPLEMENTATION`; keep internal verification notes outside customer-facing copy.

## Assets

Import the official local logo, WebP product images and licensed WebP kitchen photography listed in `docs/asset-register.md`. Retained SVG files are diagrams/decorative references, not substitutes for product photography. Export optimized AVIF/WebP in production, with JPEG fallback only where required.
