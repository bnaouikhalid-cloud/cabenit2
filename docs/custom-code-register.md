# Custom code register

## Standalone prototype code

| Purpose | File | Dependency | Maintenance notes | Removal |
|---|---|---|---|---|
| Full responsive design system and template styles | `assets/css/styles.css` | None | Framework-agnostic; prototype class names are not guaranteed WordPress production names | Remove file and its seven `<link>` references after migration |
| Navigation, product search, filters, variation selection, local cart, quote steps and checkout simulation | `assets/js/script.js` | Browser DOM + `localStorage` | No network requests; local-only commercial/form behavior must not be copied over WooCommerce | Remove file and its seven `<script>` references after migration |
| Official logo and client public product imagery | `assets/images/brand/`, `assets/images/products/` | Local files | Obtain client masters; production media library/WooCommerce owns derivatives | Replace static URLs with attachment/product image APIs |
| Licensed kitchen photography | `assets/images/lifestyle/` | Pexels/Unsplash licences | Source and usage recorded in `asset-register.md`; client approval still required | Import approved files to WordPress media library |
| Legacy architectural/product illustrations | `assets/images/kitchen-hero.svg`, `assets/images/cabinet-*.svg` | None | Archive only; no longer customer-facing | Delete after approval/reference check |
| Design-board illustration | `assets/images/design-board.svg` | None | Process diagram used on Home/Quote | Recreate as an optimized accessible production component or approve asset |

The prototype contains no PHP, database write, API key, password, email credential, tracking code or remote runtime asset.

## Proposed production custom-code boundary

Do not copy the prototype cart/checkout simulation into WordPress. WooCommerce remains authoritative. After authenticated audit, create a small site-specific plugin such as:

```text
wp-content/plugins/temima-storefront/
├── temima-storefront.php
├── src/
│   ├── Product_Specs.php
│   ├── Variation_Presentation.php
│   ├── Quote_Submission.php
│   ├── Checkout.php
│   └── Assets.php
└── assets/
    ├── css/storefront.css
    └── js/storefront.js
```

Namespace: `Temima\Storefront`. Text domain: `temima-storefront`. Every feature must be independently removable and fail safely when Elementor/WooCommerce is unavailable.

## Proposed production items

| Purpose | Proposed location | Hook / integration | Dependencies | Maintenance / removal |
|---|---|---|---|---|
| Structured cabinet specification fields/output | `src/Product_Specs.php` | Product meta/approved field API; Woo product tabs or Elementor dynamic tag | WooCommerce | Remove hook; retain data unless migration approved |
| Mirror variation SKU/dimensions into summary UI | `src/Variation_Presentation.php`, `assets/js/storefront.js` | Woo variation JS events; native form remains source | WooCommerce variable product scripts | Dequeue module/remove hook; native form continues |
| Mobile sticky purchase control | Same as above | Mirrors/submits native variation form | WooCommerce | Remove UI; no data impact |
| Quote ID, validation, idempotency and CRM queue | `src/Quote_Submission.php` | Elementor action or chosen form-plugin hooks | Form provider, mail service | Disable integration only after preserving approved records/logs |
| Checkout shell/support messaging | `src/Checkout.php` | WooCommerce hooks or Blocks extensibility | WooCommerce/gateways | Remove callbacks; native checkout remains |
| Scoped asset loading | `src/Assets.php` | `wp_enqueue_scripts` with page/template conditions | WordPress | Disable plugin/dequeue cleanly |

## Security requirements

- Sanitize input by field type and validate again server-side.
- Escape all output for its HTML/attribute/URL context.
- Use nonces for state-changing WordPress actions; verify capability for admin actions.
- Do not trust MIME extension alone; enforce allow-list, size, MIME inspection and secure storage.
- Use prepared database APIs; no direct unparameterized queries.
- Store no SMTP, CRM or gateway secret in JavaScript, Elementor HTML or repository.
- Log operational IDs/errors without copying unnecessary personal/file data.
- Prefix/namespace every function, option, event and CSS class.

## Template overrides

None exist in this repository. If production requires a WooCommerce override, register its exact path, source WooCommerce version, diff, reason and review date here. Prefer hooks and Blocks extensibility first.
