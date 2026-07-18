# SEO preservation and migration checklist

No SEO settings were changed. The public audit found common WordPress/SEO sitemap paths returning 404; the actual configuration requires authenticated review.

## Baseline export—before staging work

- [ ] Crawl every 2xx/3xx/4xx URL, including products, categories, pages, media and pagination.
- [ ] Export WordPress IDs, post types, status, slug, parent, canonical and last modified.
- [ ] Export titles, meta descriptions, Open Graph/Twitter fields and robots directives.
- [ ] Export product-category descriptions, product long/short descriptions and image alt text.
- [ ] Export XML sitemap index/children and compare with indexed inventory.
- [ ] Export redirects from plugin, server and CDN layers.
- [ ] Save rendered JSON-LD for Home, representative category/product, FAQ and organization/contact pages.
- [ ] Export Search Console pages, queries, sitemaps, removals, CWV and crawl stats.
- [ ] Export internal links and orphan pages.
- [ ] Capture robots.txt and all `X-Robots-Tag` behavior.

## Preservation rules

- [ ] Keep all product/page/category URLs and WordPress IDs unless a separately approved migration proves necessity.
- [ ] Keep product SKUs, prices, variations, attributes, categories and meaningful copy.
- [ ] Preserve canonicals and breadcrumbs.
- [ ] Preserve policy/support URLs linked from products and checkout.
- [ ] Never change a slug for visual consistency.
- [ ] Never delete duplicate-looking taxonomy terms before assignments, indexation, backlinks and revenue are known.
- [ ] Use one-hop 301 only for approved removals; no chains or soft 404s.

## Archive and faceted navigation

- [ ] Use real global WooCommerce attributes for filters.
- [ ] Decide which filter combinations are useful landing pages; keep all others nonindexable/canonicalized according to SEO approval.
- [ ] Prevent endless parameter combinations, multiple parameter orders and crawlable empty results.
- [ ] Maintain accessible, crawlable category pagination or approved load-more fallback URLs.
- [ ] Ensure filtered views do not overwrite category title/canonical unpredictably.
- [ ] Add useful unique copy to primary collection archives without pushing products far below the fold.

## Structured data

- [ ] Validate Organization and WebSite/SearchAction ownership; prevent duplicate plugins/themes from emitting conflicts.
- [ ] Validate Product name, image, description, SKU and brand.
- [ ] Offer price/currency/availability must match selected/current purchasable data.
- [ ] AggregateRating/Review only when genuine, eligible and visible.
- [ ] BreadcrumbList must match visible breadcrumbs and canonical hierarchy.
- [ ] FAQ schema only for visible FAQ content and only once.
- [ ] Test representative simple/variable products with Rich Results Test and Schema Validator.

## Staging controls

- [ ] HTTP-auth staging.
- [ ] `noindex,nofollow` via WordPress plus header/meta defense.
- [ ] No staging sitemap submitted or discoverable.
- [ ] Canonicals reviewed; do not create an indexable clone.
- [ ] Production tracking and feeds disabled or isolated.

## Prelaunch comparison

- [ ] Diff baseline/final URL lists, status codes, canonicals, titles, descriptions, headings and schema.
- [ ] Confirm no accidental `noindex` on production-bound templates.
- [ ] Crawl navigation, footer, product related links, cart and policy links.
- [ ] Confirm image URLs/alt text and no broken media.
- [ ] Validate sitemaps return 200 and contain canonical 200 URLs only.
- [ ] Approve any redirect map and test every source/target.

## Launch and monitoring

- [ ] Remove staging-only noindex/auth only on the production target.
- [ ] Submit/refresh the verified production sitemap.
- [ ] Crawl immediately for 404/5xx, redirect chains, canonicals and blocked assets.
- [ ] Monitor Search Console, server logs, indexed counts, rankings and conversion landing pages daily for the first week, then weekly for a month.
- [ ] Keep rollback available; never restore an old database over new orders.

