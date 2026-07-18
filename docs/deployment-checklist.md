# Deployment and rollback checklist

## Standalone prototype deployment status

- Target Vercel project: `cabenit01`
- Target public production alias: `https://cabenit01.vercel.app/`
- Final customer-facing deployment: July 18, 2026
- Local final Chromium run: 103 passed, 0 failed (`docs/qa-browser-results.json`)
- Public production Chromium run: 103 passed, 0 failed (`docs/qa-live-results.json`)
- All seven customer routes and the shared CSS/JavaScript returned HTTP 200; nested Product refresh passed
- Public access required no Vercel login, and response headers returned `X-Robots-Tag: noindex, nofollow, noarchive`
- `robots.txt`, page metadata and Vercel configuration keep the concept noindex

This status applies only to the standalone Vercel prototype. The live WordPress/WooCommerce store was not deployed or modified.

The WordPress/WooCommerce migration checklist below remains unexecuted because hosting/staging access was not supplied.

## Ownership

Assign named owners for technical lead, content approval, commerce operations, SEO, forms/CRM, payment, QA, launch authority and rollback authority.

## Before staging

- [ ] Confirm maintenance window and order-volume constraints.
- [ ] Full database backup with timestamp/checksum.
- [ ] Full files backup with timestamp/checksum.
- [ ] Test restore on disposable host; record result.
- [ ] Export plugin/theme/PHP/WordPress/WooCommerce versions.
- [ ] Export Elementor templates/site kit.
- [ ] Export product/order/customer/coupon/tax/shipping counts.
- [ ] Capture current DNS/CDN/cache rules and TTLs.

## Staging safety

- [ ] Password/HTTP-auth protection and `noindex,nofollow`.
- [ ] Live gateway keys removed; sandbox keys active.
- [ ] Staging email captured/allow-listed; real customers cannot be contacted.
- [ ] Webhooks point to sandbox/staging only.
- [ ] Analytics/ads isolated.
- [ ] Cron/background actions healthy and staging-safe.

## Implementation acceptance

- [ ] Six templates approved at 1440 and 390.
- [ ] Responsive checks at 360, 430, 768, 1024, 1280 and 1920.
- [ ] Product/category/page URL and ID diff passes.
- [ ] Products, attributes, variations, stock and prices pass sample and count checks.
- [ ] Filters and sort work with URL/history and keyboard.
- [ ] Required product variation blocks invalid Add to Cart.
- [ ] Cart quantity, remove, coupon, shipping and totals pass.
- [ ] Guest checkout and optional account creation pass.
- [ ] Sandbox success/failure, tax, stock and webhooks pass.
- [ ] Quote CRM email, customer confirmation, secure files and failure retry pass.
- [ ] No critical console errors, PHP warnings, raw shortcodes or broken assets.
- [ ] Crawl shows no unintended 404/5xx and no redirect chains.
- [ ] Metadata/schema/sitemap comparison passes.
- [ ] Six GTmetrix reports recorded with constraints explained.
- [ ] Keyboard, screen reader, zoom, contrast and reduced-motion checks recorded.
- [ ] Staff completes editing tasks without code access.

## Production migration

- [ ] Freeze approved content/config changes; record staging build version.
- [ ] Choose a migration method that does **not** overwrite new production orders/customers with an old staging database.
- [ ] Back up production again immediately before change.
- [ ] Enable controlled maintenance only if required; keep duration minimal.
- [ ] Deploy theme/plugin/templates/assets using versioned artifacts.
- [ ] Apply explicitly reviewed configuration/data migrations.
- [ ] Flush Elementor CSS, WordPress object cache, page cache and CDN in the documented order.
- [ ] Confirm WooCommerce cache exclusions.
- [ ] Re-enable production gateway/webhook/mail keys from protected configuration.
- [ ] Remove production noindex only after hostname check.

## Immediate production verification

- [ ] Home, Category, Product, Quote, Cart, Checkout and Thank You return expected status/title.
- [ ] Header navigation/search/cart count and mobile drawer work.
- [ ] Variable product selection and Add to Cart work.
- [ ] Place one authorized low-risk production verification order only if client approves; otherwise use gateway-approved production test method.
- [ ] Verify CRM/customer/admin emails with approved recipients.
- [ ] Check gateway/webhook/action-scheduler logs.
- [ ] Crawl high-value URLs and inspect console/network/PHP logs.
- [ ] Confirm sitemap/robots/canonical/analytics/consent.

## Rollback triggers

- Checkout cannot complete or totals/tax/shipping are wrong.
- Product/variation/stock/order data mismatch.
- CRM form loses submissions or exposes files.
- Widespread 5xx/404, broken templates or critical console/PHP errors.
- Accidental noindex/canonical to staging.
- Material performance regression without rapid fix.

## Rollback method

1. Stop new deploy actions and record exact failure time.
2. Preserve logs and any orders/submissions received after launch.
3. Roll back code/templates/config artifact first when possible.
4. Do **not** restore the old database over post-launch orders. Reconcile commerce data with WooCommerce/host specialist if a database rollback is unavoidable.
5. Purge caches and run minimum commerce smoke test.
6. Inform stakeholders with impact, data status and next action.
