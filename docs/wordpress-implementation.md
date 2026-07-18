# WordPress / WooCommerce implementation specification

## Current status

This is an access-dependent plan. No live or staging implementation has occurred. Do not begin production work until backup, staging and email/payment isolation are proven.

## Architecture decision

Keep the observable stack: WordPress + WooCommerce + Hello Elementor child + Elementor Pro. There is no evidence that replacing the theme or builder is justified.

Ownership model:

- Elementor Pro: editorial layout, header/footer, Home, Quote page copy, reusable CTA blocks and dynamic template composition.
- WooCommerce: products, prices, SKUs, attributes, variations, stock, cart, checkout, orders, taxes, coupons, shipping and customer records.
- Child theme: styling layer, small template-safe enhancements and approved WooCommerce hooks.
- Site-specific plugin: namespaced behavior that must survive a theme switch.
- Form provider: Elementor Pro Form only if secure uploads, persistence, CRM routing and idempotency requirements pass a proof of concept; otherwise use one approved established form plugin.

## Phase 0 — authenticated audit and freeze

1. Capture WordPress Site Health export, PHP/MySQL versions and environment limits.
2. Export active/inactive plugins, versions, licenses and configuration owners.
3. Export active parent/child theme files and Elementor template kit.
4. Inventory all products, variations, attributes, terms, URLs, orders, customers, coupons, taxes and shipping settings; record counts and checksums where possible.
5. Export SEO metadata, redirects, sitemap URLs, schema output and Search Console coverage.
6. Capture current transactional emails, SMTP logs, payment webhooks and cron health.
7. Record six-template desktop/mobile performance baselines.
8. Establish a short content/configuration freeze window for final migration.

## Phase 1 — safety setup

1. Create restorable full database and files backups; perform a test restore to a disposable environment.
2. Clone to password-protected staging; add HTTP authentication and `noindex,nofollow` plus search-engine visibility block.
3. Confirm staging canonical/robots/sitemap do not point to indexable staging URLs.
4. Disable live gateway keys and replace with sandbox/test keys.
5. Route all staging mail to a capture inbox or block it; allow only designated test recipients.
6. Disable production analytics/ad conversion destinations or label staging data separately.
7. Document rollback triggers, owners, restore steps and maximum recovery time.

## Phase 2 — data normalization without URL changes

- Do not delete duplicate-looking terms until indexed URLs, product assignments and backlinks are known.
- Create/normalize product attributes only with a migration mapping. Candidate global attributes: cabinet type, width, height, depth, door configuration, drawer configuration, finish and collection.
- Preserve IDs, slugs, SKUs and variation relationships.
- Map filters to global taxonomies; do not parse arbitrary title strings at runtime.
- Add structured custom fields only for missing technical data such as shelf count, box construction, door material, hinges, glides, finished ends, assembly document and specification sheet.
- Use a controlled CSV/database-safe migration with dry run, backups and before/after counts.

## Phase 3 — templates

Implement the display-condition map in [`elementor-template-map.md`](elementor-template-map.md). Rebuild prototype behavior with dynamic data:

### Header

- Elementor Theme Builder header with WooCommerce menu/cart/search widgets where reliable.
- Accessible disclosure navigation; keyboard Escape/return focus.
- Cart count from WooCommerce fragments or Store API; test caching.
- Announcement controlled by editable fields with start/end time, not manually stale copy.

### Home

- Dynamic product-category query for verified collections.
- WooCommerce Products widget/query for featured products; never manually enter prices.
- Template-managed Free Design, quality, process and FAQ sections.
- Approved review source only; omit block until data is verified.

### Archive

- Elementor Product Archive template for composition.
- Use native WooCommerce query and an approved faceted filter layer based on global attributes.
- Filter state should update URL/history, announce result count and have controlled crawl rules.
- No Add to Cart for complex variable products before a valid selection.

### Single product

- WooCommerce variation form remains authoritative.
- Use variation events (`found_variation`, `reset_data`) for price/SKU/dimension display enhancements.
- Server validation remains authoritative; JS is progressive enhancement.
- Critical dimensions rendered visibly, not exclusively in accordions.
- Sticky mobile bar mirrors the native variation form and submits through the same WooCommerce action.

### Quote

- Multi-step UI with server-side validation, nonce/CSRF protection, honeypot/anti-spam, rate limiting, file allow-list, size limit, malware scan strategy, unique ID and duplicate-submit protection.
- Store uploads outside public guessing paths or issue expiring secure links.
- Do not attach large files to email; send authenticated secure links.
- Confirmation state only after WordPress record/CRM delivery completes; queue and retry failures.
- Separate service consent and marketing consent.

### Cart / checkout

- Prefer WooCommerce Blocks if existing gateways/shipping extensions are compatible and the approved design can be reached safely; otherwise customize shortcode templates/hooks minimally.
- Preserve WooCommerce notices and session behavior.
- Never cache Cart, Checkout, Account, Store API personalized responses or fragments incorrectly.
- Guest checkout must be enabled deliberately and tested with every gateway.

### Thank You

- Hook into `woocommerce_thankyou` / block extensibility as appropriate.
- Show order confirmation, number, verified email destination, details, shipping address, next step, support and optional post-purchase account creation.

## Phase 4 — form/email proof

1. Client supplies exact CRM inbox, From domain, reply-to behavior and confirmation copy.
2. Configure SPF, DKIM and DMARC-aligned transactional service.
3. Send small and large allowed-file tests; verify link permissions and expiry.
4. Verify CRM email, customer confirmation, reply-to, spam placement, retry/logging and mobile submission.
5. Test blocked extension, oversize file, duplicate click, network interruption and CRM failure.

## Phase 5 — sandbox commerce test

Execute the 20-step requested flow and failure matrix. Use a clearly named test customer and order; never use a real charge. Verify order notes, webhook logs, tax, shipping, stock reduction/restore, emails and cart cleanup.

## Phase 6 — performance and accessibility

- Self-host at most two variable font families/subsets.
- Use responsive AVIF/WebP, dimensions, below-fold lazy loading and hero preload only when proven LCP.
- Optimize Elementor DOM and CSS output; remove unused widgets/assets only after regression testing.
- Defer noncritical scripts; do not delay WooCommerce/gateway dependencies blindly.
- Run keyboard, screen reader, zoom, reduced-motion, color contrast and automated checks.

## Phase 7 — controlled launch

Use [`deployment-checklist.md`](deployment-checklist.md). Re-sync orders/customer-sensitive data through a documented migration method; do not overwrite production commerce data with an old staging database.

## Acceptance evidence

Completion requires URLs/IDs/counts before and after, backup and restore proof, staging approval, form delivery logs, sandbox order record, browser/device matrix, no critical console errors, crawl/404 report, structured-data validation, performance report and staff sign-off.

