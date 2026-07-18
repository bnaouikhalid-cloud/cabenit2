# Asset register

All runtime assets are stored locally. No image is hotlinked. “Client public media” means downloaded from the current Temima Cabinets public website for concept use; the client should confirm ownership and provide masters for production.

## GPT Image 2 asset status

The requested generated collection was not created on July 18, 2026 because `OPENAI_API_KEY` was not configured in the working environment. No generated-image ownership, quality or integration claim is made. The production-ready prompt set, two-candidate review gate, responsive crop plan, filenames and integration map are in [`gpt-image-2-prompts.md`](gpt-image-2-prompts.md). Reserved local folders exist under `assets/images/generated/`; they contain no customer-facing generated imagery.

| Filename | Source | Ownership / licence | Page usage | Optimization |
|---|---|---|---|---|
| `brand/temima-logo.png` | Temima public media: `Transparent-300x300.png` | Client public brand asset; master/rights to reconfirm | All headers, footers, checkout | PNG, 300×300, 53.8 KB |
| `products/cabinet-wall-600.webp` | Temima public product media | Client public catalogue media | Home, Category, Product search, cart | WebP, 600×600, 1.5 KB |
| `products/cabinet-wall-1024.webp` | Temima public product media | Client public catalogue media | Home type tile, Product gallery, Product social metadata | WebP, 1024×1024, 3.5 KB |
| `products/cabinet-wall-24-600.webp` | Temima public product media | Client public catalogue media | Category/search | WebP, 600×600, 2.6 KB |
| `products/cabinet-wall-24-1024.webp` | Temima public product media | Client public catalogue media | Category `srcset` | WebP, 1024×1024, 5.7 KB |
| `products/cabinet-base-600.webp` | Temima public product media | Client public catalogue media | Home, Category/search | WebP, 600×600, 3.0 KB |
| `products/cabinet-base-1024.webp` | Temima public product media | Client public catalogue media | Category `srcset` | WebP, 1024×1024, 6.3 KB |
| `products/cabinet-drawer-600.webp` | Temima public product media | Client public catalogue media | Home, Category, Cart/search | WebP, 600×600, 2.4 KB |
| `products/cabinet-drawer-1024.webp` | Temima public product media | Client public catalogue media | Home inspiration/Category | WebP, 1024×1024, 5.1 KB |
| `products/cabinet-pantry-600.webp` | Temima public product media | Client public catalogue media | Home, Category, Cart/search | WebP, 600×600, 1.4 KB |
| `products/cabinet-pantry-1024.webp` | Temima public product media | Client public catalogue media | Category `srcset` | WebP, 1024×1024, 3.3 KB |
| `products/cabinet-sink-600.webp` | Temima public product media | Client public catalogue media | Home, Category/search | WebP, 600×600, 3.1 KB |
| `products/cabinet-sink-1024.webp` | Temima public product media | Client public catalogue media | Category `srcset` | WebP, 1024×1024, 6.5 KB |
| `products/sample-door-600.webp` | Temima public product media | Client public catalogue media | Home, Category/search | WebP, 600×600, 1.6 KB |
| `products/wall-front-closed-1024.webp` | Temima public product gallery | Client public catalogue media | Product gallery reserve | WebP, 1024×683, 2.0 KB |
| `products/wall-front-open-1024.webp` | Temima public product gallery | Client public catalogue media | Home quality/inspiration, Product gallery | WebP, 1024×683, 5.2 KB |
| `products/wall-side-closed-1024.webp` | Temima public product gallery | Client public catalogue media | Product gallery | WebP, 1024×683, 2.3 KB |
| `lifestyle/kitchen-wide-1600.webp` | [Pexels photo 15062158](https://www.pexels.com/photo/15062158/), Curtis Adams | Pexels licence; free use | Home desktop hero, Product context, Home/Quote/Cart/Checkout social metadata | WebP, 1600×1067, 87.7 KB |
| `lifestyle/kitchen-wide-800.webp` | Same Pexels source | Pexels licence; free use | Home mobile hero/Product thumb | WebP, 800×533, 27.4 KB |
| `lifestyle/kitchen-detail-1600.webp` | [Pexels photo 5071180](https://www.pexels.com/photo/5071180/), Curtis Adams | Pexels licence; free use | Home inspiration, Category/Resources social metadata | WebP, 1600×1067, 67.7 KB |
| `lifestyle/kitchen-detail-800.webp` | Same Pexels source | Pexels licence; free use | Category hero/mobile | WebP, 800×533, 25.5 KB |
| `lifestyle/kitchen-light-1600.webp` | [Pexels photo 19846364](https://www.pexels.com/photo/19846364/), Lisa Anna | Pexels licence; free use | Home inspiration | WebP, 1200×1800, 53.6 KB |
| `lifestyle/kitchen-hero-1920.webp` | [Unsplash photo rlAuft8G8SE](https://unsplash.com/photos/rlAuft8G8SE), Point3D Commercial Imaging | Unsplash Licence | Licensed alternate/reserve | WebP, 1920×1280, 160.8 KB |
| `lifestyle/kitchen-hero-960.webp` | Same Unsplash source | Unsplash Licence | Home inspiration/mobile | WebP, 960×640, 52.8 KB |
| `design-board.svg` | Existing project illustration, refined in layout | Project-owned concept artwork; client approval required | Home and Free Quote process | Local SVG, 1.7 KB |
| `favicon.svg` | Existing project mark | Provisional favicon; replace with approved official favicon | All pages | Local SVG, 0.3 KB |
| `kitchen-hero.svg` | Previous project illustration | Retained archive; not customer-facing | Unused | Local SVG, 3.9 KB |
| `cabinet-base.svg`, `cabinet-wall.svg`, `cabinet-drawer.svg`, `cabinet-pantry.svg` | Previous project illustrations | Retained archive; not customer-facing | Unused | Local SVG, each under 1.1 KB |

## Font assets

| Filename | Source / licence | Usage | Format / weight |
|---|---|---|---|
| `fonts/manrope-latin.woff2` | Manrope, SIL Open Font License | All interface/body/headings | WOFF2 variable, 24.3 KB |
| `fonts/source-serif-4-italic-latin.woff2` | Source Serif 4, SIL Open Font License | Restrained editorial emphasis | WOFF2, 50.3 KB |

## Production actions

- Generate and manually approve the coordinated GPT Image 2 collection using [`gpt-image-2-prompts.md`](gpt-image-2-prompts.md); do not replace exact product/SKU imagery with generated substitutes.
- Obtain original official logo/favicon and client product-photo masters.
- Confirm Pexels/Unsplash selections with the client; retain source attribution in project records.
- Generate AVIF plus WebP responsive derivatives during WordPress media processing.
- Do not upscale the very compressed transparent product packshots; use them at their intended card/gallery scale or replace with masters.
- Delete unused legacy SVGs only after design approval and migration reference checks.
