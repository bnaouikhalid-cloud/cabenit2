# Elementor template map

## Global kit

Create a dedicated `Temima 2026` Elementor Site Settings kit using the tokens in [`design-system.md`](design-system.md). Configure global colors, fonts, link styles, buttons, inputs, container width and breakpoints before building templates.

Suggested breakpoints: mobile ≤767, tablet 768–1024, laptop 1025–1279, desktop ≥1280. Verify against content rather than devices alone.

## Templates and ownership

| Elementor template | Type / display condition | Editable in Elementor | Dynamic / code owner |
|---|---|---|---|
| `TC — Header — Global` | Header / entire site except focused checkout | Announcement, menu labels, quote CTA | Woo menu/cart/search, account visibility |
| `TC — Header — Checkout` | Checkout only | Logo, support copy | Cart return URL, secure state |
| `TC — Footer — Global` | Footer / entire site except focused checkout | Link groups, support content | Policy URLs |
| `TC — Home — 2026` | Page / Home | Headline, body, images, CTA labels, trust copy, FAQ | Categories/products/reviews via dynamic queries |
| `TC — Archive — Product Category` | Product Archive / all product categories | Header composition, support banner | Archive query, terms, product count, filters, sort |
| `TC — Single Product — Cabinets` | Single Product / cabinet products | Supporting labels, CTA copy | Gallery, variation form, price, SKU, stock, specs |
| `TC — Quote — Guided Brief` | Page / Free 3D Design page | Hero, benefits, FAQ, approved expectations | Secure form behavior, CRM, uploads, IDs |
| `TC — Cart Shell` | Cart | Support copy / surrounding shell only | Woo cart items, coupon, totals, shipping |
| `TC — Checkout Shell` | Checkout | Support microcopy only | Woo checkout fields, shipping, tax, gateway, totals |
| `TC — Thank You` | Order received | Approved next-step/support copy | Order data and account invitation |
| `TC — CTA — Free Design` | Saved container | Headline, body, CTA | Destination URL |
| `TC — Trust Row — Global` | Saved container | Approved wording | Conditional/dynamic details if needed |

## Naming and structure

- Prefix every template, saved component and class with `TC`.
- Container names: `section / purpose`, `inner / width`, `grid / columns`, `content / role`.
- CSS classes use `tc-` prefix in WordPress.
- Never place prices, product IDs, SKUs, stock, shipping thresholds, review counts or ratings in Elementor text widgets.
- Keep one source of truth for every reusable CTA and trust message.

## Home dynamic fields

- Hero: normal Elementor fields/media.
- Collections: WooCommerce product-category query ordered by an approved term-order field. Optional term meta: promotional image, short benefit and featured flag.
- Featured products: curated product IDs/query in WooCommerce or a dedicated relationship field; render current price dynamically.
- Reviews: approved review integration or a controlled data source; hide component when empty.
- FAQ: Elementor nested accordion; visible content can receive valid FAQ schema from the SEO owner only.

## Archive

Elementor owns collection header and support panels. WooCommerce owns query/pagination. Filter plugin/native layer must read product attributes, preserve accessibility and expose URL state. Avoid Elementor Loop Grid logic that bypasses WooCommerce visibility, tax, stock or ordering behavior.

## Product

Use native Product Images, Title, Rating (conditional), Price, Short Description, Add to Cart, Meta and Related Products widgets/hooks where stable. Custom specification fields render through a single documented shortcode/widget only if native dynamic tags cannot provide the table.

## Cart and checkout

Do not rebuild transactional forms with ordinary Elementor form widgets. Use WooCommerce Cart/Checkout blocks or native templates inside a restrained Elementor/theme shell. Test all gateway blocks before choosing Blocks.

## Staff-editable fields

Staff can edit copy, approved imagery, CTA labels, announcement content, trust wording, featured-term selection and Quote/FAQ content. Product facts remain in WooCommerce/global product fields.

