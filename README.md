# Temima Cabinets premium ecommerce prototype

“Designed for the Kitchen. Built for Confidence.”

This repository contains a standalone, responsive client-presentation prototype for six Temima Cabinets customer templates. It is a static concept for later WordPress, WooCommerce and Elementor Pro implementation; it does not modify the live store or connect to production orders, payments, uploads, email or CRM services.

## Run locally

All pages open directly from disk. A local server is recommended for browser QA:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173/`. Add `?review=1` to any route for a compact Concept Preview notice. Default presentation mode intentionally has no large prototype banner.

## Routes

- Home: [`index.html`](index.html)
- Category: [`category/index.html`](category/index.html)
- Product: [`product/index.html`](product/index.html)
- Free Quote: [`free-quote/index.html`](free-quote/index.html)
- Cart: [`cart/index.html`](cart/index.html)
- Checkout: [`checkout/index.html`](checkout/index.html)
- Customer resources and policy links: [`resources/index.html`](resources/index.html)
- Visual presentation board: [`presentation/index.html`](presentation/index.html)

Shared code lives in [`assets/css/styles.css`](assets/css/styles.css) and [`assets/js/script.js`](assets/js/script.js). All fonts, product images, lifestyle photography and SVG details are local; the prototype has no remote runtime dependency.

## Interaction walkthrough

1. Open Search, type a product name/type/size and use Arrow keys plus Enter.
2. Filter or sort Category products and open Quick View.
3. On Product, choose a size to update the exact price, SKU, dimensions and mobile purchase bar, then Add to Cart.
4. In Cart, change quantity, remove/undo, check a valid ZIP, and optionally exercise the local coupon state.
5. At Checkout, use `4242 4242 4242 4242` for success or a number ending in `0002` for the declined state. No gateway or order is created.
6. Complete the four-step design brief. Draft values may be saved in local storage; selected files are validated and displayed but never uploaded.

## Verified content scope

The official public logo, phone, email, support hours, White Shaker catalogue names, representative prices, product imagery and 18-inch wall-cabinet specifications were observed on the current public site/API on July 18, 2026. They still require client revalidation before production launch. Shipping cost, warranty scope, review metrics, sales claims, delivery time and response-time promises are deliberately absent.

See [`docs/content-verification.md`](docs/content-verification.md), [`docs/claims-audit.md`](docs/claims-audit.md) and [`docs/asset-register.md`](docs/asset-register.md).

## Documentation

- [`docs/current-site-audit.md`](docs/current-site-audit.md)
- [`docs/final-live-audit.md`](docs/final-live-audit.md)
- [`docs/design-system.md`](docs/design-system.md)
- [`docs/figma-handoff.md`](docs/figma-handoff.md)
- [`docs/wordpress-implementation.md`](docs/wordpress-implementation.md)
- [`docs/elementor-template-map.md`](docs/elementor-template-map.md)
- [`docs/plugin-register.md`](docs/plugin-register.md)
- [`docs/custom-code-register.md`](docs/custom-code-register.md)
- [`docs/claims-audit.md`](docs/claims-audit.md)
- [`docs/content-verification.md`](docs/content-verification.md)
- [`docs/asset-register.md`](docs/asset-register.md)
- [`docs/seo-migration-checklist.md`](docs/seo-migration-checklist.md)
- [`docs/performance-report.md`](docs/performance-report.md)
- [`docs/qa-report.md`](docs/qa-report.md)
- [`docs/qa-browser-results.json`](docs/qa-browser-results.json)
- [`docs/qa-live-results.json`](docs/qa-live-results.json)
- [`docs/deployment-checklist.md`](docs/deployment-checklist.md)
- [`docs/staff-editing-guide.md`](docs/staff-editing-guide.md)

## Implementation boundary

No WordPress administrator, hosting, database, Elementor template, CRM, email, gateway, analytics or official staging access was supplied. Nothing on the live store was changed. Access-dependent work and acceptance evidence are specified in [`docs/wordpress-implementation.md`](docs/wordpress-implementation.md) and [`docs/deployment-checklist.md`](docs/deployment-checklist.md).
