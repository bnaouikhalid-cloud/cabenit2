# Performance report

Audit date: July 18, 2026. This is a static-file and browser-behavior assessment, not a claimed GTmetrix, Core Web Vitals or production-hosting result.

## Local file weights

| Asset | Uncompressed size |
|---|---:|
| Shared CSS | 89.9 KB |
| Shared JavaScript | 40.9 KB |
| Manrope WOFF2 | 24.3 KB |
| Source Serif 4 WOFF2 | 50.3 KB |
| Official 300px logo PNG | 53.8 KB |
| Largest used desktop lifestyle image | 87.7 KB |
| Largest repository image (licensed alternate) | 160.8 KB |
| Mobile hero derivative | 27.4 KB |
| Product WebP files | 1.4–6.5 KB each |

Primary HTML pages range from 10.5–25.8 KB uncompressed. Server compression is expected to reduce HTML/CSS/JS transfer further.

## Executed local browser transfer profile

These figures come from the final Chromium resource-timing run at 1440px with cache disabled. They are local HTTP transfer totals, not GTmetrix or field Core Web Vitals.

| Route | Browser transfer | Decoded total |
|---|---:|---:|
| Home | 327.3 KB | 323.8 KB |
| Category | 275.9 KB | 272.1 KB |
| Product | 321.4 KB | 318.2 KB |
| Free Quote | 282.0 KB | 279.9 KB |
| Cart | 227.6 KB | 225.2 KB |
| Checkout | 222.6 KB | 220.9 KB |
| Resources | 274.2 KB | 272.4 KB |

The shared stylesheet was the largest transferred resource at about 90.2 KB including response overhead. The official 300px PNG logo followed at about 54.1 KB. Pages using the editorial font transferred its 50.6 KB WOFF2 file; shared JavaScript was about 41.2 KB. The Home browser selected the 800px responsive hero derivative at about 27.7 KB rather than the 1600px source.

## Implemented controls

- No framework, dependency bundle, animation library or remote runtime request.
- Shared script is deferred; no synchronous JavaScript blocks rendering.
- Self-hosted WOFF2 fonts use `font-display: swap`.
- Customer-facing photography uses WebP, responsive `srcset` where multiple crops exist, explicit dimensions and below-fold lazy loading.
- Initial Home hero uses fetch priority and a desktop/mobile source set.
- Product packshots use consistent aspect ratios to prevent card reflow.
- Reduced-motion rules remove nonessential transitions.
- Header compression does not replace DOM content or create a layout jump.

## Render-blocking resources

The single shared stylesheet is render-blocking by design to avoid unstyled content. Fonts are discovered from CSS but swap safely. No remote third-party CSS, tracking, chat, tag manager or embed is loaded. The next static optimization would minify CSS/JS and remove legacy selectors after visual regression testing; splitting by page is not currently justified at this prototype size.

## Largest-asset observations

The unused 160.8 KB alternate image remains for handoff reference and does not transfer on the current customer routes. The largest used lifestyle image is 87.7 KB. The official 300px logo was selected instead of the 230.5 KB full public source. The current product media is extremely lightweight but visually dependent on the quality of the client source; production should use sharper masters rather than enlarging these compressed files.

## WordPress/WooCommerce recommendations

1. Generate AVIF/WebP sizes at upload and use responsive attachment functions.
2. Exclude Cart, Checkout, My Account and form-confirmation routes from full-page cache.
3. Keep WooCommerce fragments/scripts conditional where supported and verified.
4. Minify and version custom CSS/JS; enqueue only on templates that use it.
5. Preload only the active above-fold font/hero resource; avoid blanket preloads.
6. Audit Elementor DOM depth, unused widgets/icons and global CSS after template assembly.
7. Delay nonessential analytics/marketing tags until consent and keep checkout instrumentation lightweight.
8. Test object cache, CDN, HTTP compression and image negotiation on staging.
9. Run Lighthouse, WebPageTest and real-device checks against public staging, then capture LCP/CLS/INP evidence.

## Limitations

There is no production hosting, CDN, database, WordPress admin, analytics, tag stack or public staging environment. Network latency, cache headers, PHP/database work, plugin overhead and real-user Core Web Vitals cannot be measured from the standalone local prototype. No GTmetrix score is claimed.
