# Plugin register

No authenticated inventory was available. Public asset paths are observations, not a reliable active-plugin list. Record exact versions/licenses in staging before changes.

| Plugin / component | Status | Purpose | Free / paid | Version | License owner | Configuration / impact | Replacement risk |
|---|---|---|---|---|---|---|---|
| WooCommerce | Publicly observed | Catalogue, variations, cart, checkout, orders | Free core | Unknown | Client | Mission-critical; preserve data/settings | Critical |
| Elementor | Publicly observed | Page/template builder | Free | Public generator said 4.1.5 | Client | DOM/CSS impact; keep widgets lean | High |
| Elementor Pro | Publicly observed | Theme Builder/forms/dynamic widgets | Paid | Unknown | Client | License/compatibility required | High |
| Hello Elementor | Publicly observed | Parent theme | Free | Unknown | Client | Lightweight shell | Medium |
| Hello Elementor Child | Publicly observed | Existing custom layer | Custom | Unknown | Client | Audit every file before editing | High |
| WooPayments | Asset path observed on PDP/cart | Payment gateway | Extension | Unknown | Client | PCI/webhooks/scripts | Critical if active |
| PayPal Payments | Asset path observed on Cart | Payment gateway | Extension | Unknown | Client | Sandbox/webhooks/scripts | Critical if active |
| Woo Ajax Add to Cart | Asset path observed | Ajax cart behavior | Unknown | Unknown | Client | Potential overlap with theme/cart logic | Medium |
| Load More Products for WooCommerce | Asset path observed on archive | Archive pagination | Unknown | Unknown | Client | SEO/history/accessibility review | Medium |
| SiteGround Optimizer (inferred) | Combined asset filename / server signals | Cache/minify/images | Free/host | Unknown | Client/host | Public header said cache disabled; audit | High |
| SEO plugin | Not identified | Metadata/sitemap/schema | Unknown | Unknown | Client | Common sitemap paths returned 404 | Critical |
| Transactional email / SMTP | Not identified | Form/order delivery | Unknown | Unknown | Client | Must log, align SPF/DKIM/DMARC | Critical |

## Proposed additions—only after audit

| Capability | Preferred decision rule | Performance impact | Replacement risk |
|---|---|---|---|
| Faceted filters | Use an existing compatible plugin if it produces accessible attribute filters, stable URLs and crawl control; otherwise choose one focused product | Medium; query/cache testing required | High once URLs are indexed |
| Quote form | Elementor Pro Form only if secure uploads, multi-step, idempotency, CRM delivery and logs pass proof; otherwise one established form plugin | Low–medium | High for stored submissions/workflows |
| SMTP/transactional email | Reuse an existing licensed provider when healthy; otherwise one focused integration | Low | Medium |
| Image optimization/CDN | Use host/CDN capability before adding another overlapping optimizer | Low–medium | Medium |

Do not add an all-in-one Elementor addon pack, separate checkout designer, variation plugin, schema plugin or duplicate cache plugin merely for styling.
