# Content verification

Audit date: July 18, 2026. Public observations can change and must be rechecked against the approved WooCommerce export and client policy documents before implementation.

## Verified public observations used in the prototype

| Content | Public source | Prototype use | Confidence / action |
|---|---|---|---|
| Temima Cabinets logo | Current site media, `wp-content/uploads/2025/08/Transparent.png` | Global header/footer/checkout | High public-source confidence; request original master |
| Phone `(469) 209-6518` | Current public header/footer/contact content | Utility/header/footer/checkout | Reconfirm ownership and call routing |
| `info@temimacabinets.com` | Current public contact content | Support links | Reconfirm mailbox and delivery |
| Monday–Friday, 9 AM–5 PM | Current public footer | Footer | Confirm timezone and holiday handling |
| White Shaker collection and product types | Public catalogue and WooCommerce Store API | Home cabinet types, Category, Product | Re-sync taxonomy and counts from production data |
| Product names and observed starting prices | WooCommerce Store API product responses | Featured/category/cart recommendation cards | Dynamic production data required |
| 18-inch wall cabinet variations/SKUs/prices | Public product page/API | PDP selection and cart persistence | Revalidate each live variation before staging approval |
| Product construction and shelf copy | Current 18-inch wall-cabinet product content | PDP specification and Home quality tabs | Supplier confirmation remains required |
| Free 3D Design service name | Current public navigation/service page | Header/Home/Quote | Scope, timing, deliverables and routing need client sign-off |
| Public terms and return policy URLs | Current public site | Resources links | Legal owner must approve final content and URL mapping |

## Neutralized or removed

- No invented collection names or finishes.
- No fake contact details, ratings, testimonials, sale states, savings or urgency.
- No hardcoded freight price, shipping threshold, delivery speed or design turnaround.
- No warranty-duration, installation or certification claim.
- No customer-facing internal “verify,” “placeholder,” or development annotations.
- Category counts shown inside filters describe this eight-item standalone subset, not the full live catalogue.

## Dynamic WordPress/WooCommerce ownership

Product title, SKU, price/range, stock state, images, dimensions, attributes, variation availability, coupons, shipping, tax, cart totals, order totals and related products must come from WooCommerce. Elementor should own editorial composition, but not duplicate commercial data in static widgets.

## Required client decisions

1. Approve logo master, brand colors and clear-space rules.
2. Approve support phone/email/hours and timezone.
3. Supply signed warranty, shipping, returns, privacy and terms.
4. Approve design-service scope, operational response and confirmation-email copy.
5. Validate product construction/assembly fields by SKU and variation.
6. Confirm whether pickup, installation, reviews and certifications are offered/publishable.
7. Approve all lifestyle photography for production use or replace with client project photography.

Related: [`claims-audit.md`](claims-audit.md), [`asset-register.md`](asset-register.md), [`wordpress-implementation.md`](wordpress-implementation.md).
