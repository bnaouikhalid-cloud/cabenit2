# Staff editing guide

This is the proposed production operating model. Screen names may change after the authenticated Elementor/plugin audit.

## Safe editing rules

- Use WordPress/Elementor preview and staging for structural changes.
- Do not edit WooCommerce, Elementor or parent-theme core files.
- Do not type product prices, shipping thresholds, SKUs or stock into Elementor text.
- Do not publish claims, reviews, promotions or turnaround times until approved in the claims register.
- Do not add new plugins without technical review, backup and staging test.

## Edit homepage copy

1. Open Pages → Home → Edit with Elementor.
2. Use Navigator and select the named section, such as `section / hero`.
3. Edit only the content fields; keep heading levels and Global Styles.
4. Preview desktop/tablet/mobile; save as draft or update on staging.

## Replace homepage images

1. Prepare an approved, attributable image with no baked-in text.
2. Upload an optimized source; provide accurate alt text describing meaningful content.
3. Replace via the relevant Elementor Image widget or category-term image field.
4. Check the mobile crop and LCP impact.

## Update featured collections

Use Products → Categories and the approved `Featured`/order field. Do not duplicate a category to feature it. Category name, slug and hierarchy changes require SEO approval.

## Edit quote-page content

Open the Quote page in Elementor for hero, benefit and FAQ copy. Required fields, consent, upload rules, recipients and CRM actions are configuration/code-owned and must not be changed casually.

## Header announcement

Use the named announcement control. Enter approved wording, link, start date/time and end date/time. Preview both time boundaries. Never leave event-specific copy without an expiry.

## Trust messages

Edit the saved `TC — Trust Row — Global` component only after claim approval. Changing the global component updates all placements.

## Products

1. Products → select product.
2. Update title/description only within the approved catalogue convention.
3. Maintain category assignments, featured image, gallery and alt text.
4. In Product Data, confirm type, tax, shipping class, stock and related items.
5. Preview the live variation and schema output on staging.

## Variations

1. Confirm global attributes and terms before creating variations.
2. In Variations, maintain unique SKU, enabled state, price, stock, image, dimensions and shipping data.
3. Never delete a variation tied to active orders without technical review.
4. Test every changed combination on Product → Cart → Checkout.

## Coupons

Use Marketing → Coupons. Set scope, minimum/maximum, expiry, usage limits and exclusions deliberately. Test valid, invalid and expired states on staging. Do not place long-lived public codes in Elementor.

## Quote submissions

Use the approved form/submission screen or CRM. Verify submission ID, consent, delivery/log status and secure file link. Do not download customer project files to unmanaged personal devices. Follow the approved retention/deletion policy.

## Test forms

Use a designated test identity and harmless sample file on staging. Confirm internal CRM message, customer confirmation, reply-to, secure links and logs. Do not test staging against real customer lists.

## Clear cache safely

1. Save/close Elementor editing sessions.
2. Regenerate Elementor CSS only when needed.
3. Purge page cache, then CDN cache according to the launch runbook.
4. Never cache Cart, Checkout, Account or personalized Store API responses.
5. Recheck Home, one category, one variable product, Cart and Checkout afterward.

## Escalate instead of editing

Contact the technical owner for URLs/slugs, redirects, schema, filters, checkout fields, payment/shipping/tax, emails/CRM, consent/privacy, plugins, theme files, code, cache rules or database operations.

