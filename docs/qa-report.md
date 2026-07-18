# QA report

Executed: July 18, 2026 using local Chromium against `http://127.0.0.1:4173/`. Final production execution is recorded after deployment.

## Result

**Local: 103 passed · 0 failed. Public Vercel final: pending deployment.** Machine-readable evidence is in [`qa-browser-results.json`](qa-browser-results.json) and [`qa-live-results.json`](qa-live-results.json). The browser harness is [`../_cdp-test.cjs`](../_cdp-test.cjs).

## Executed coverage

| Area | Result | Evidence |
|---|---|---|
| Six mandatory routes + Resources | Pass | Correct title/H1 and successful render on every route |
| Responsive widths | Pass | Home, Category, Product, Free Quote, Cart, Checkout and Resources at 360, 390, 430, 768, 1024, 1280, 1440 and 1920px |
| Horizontal overflow | Pass | Document scroll width never exceeded viewport width |
| Images | Pass | All rendered images completed with a non-zero natural width |
| Internal links/fragments | Pass | Every local link on all six routes fetched successfully and every referenced fragment existed |
| Mobile navigation | Pass | Opens/closes, synchronized ARIA, focus trap, Escape and focus restoration |
| Search | Pass | Product filtering, pantry results, Arrow-key selection, no-results and explicit clear action |
| Category | Pass | URL type filter, product count, price sort, active grid and Quick View |
| Mobile filters | Pass | Drawer opens/applies/closes and shows matching total |
| Product | Pass | Mobile “Choose a size” guard, exact variation price/SKU, enabled Add to Cart and persistent count |
| Cart | Pass | Quantity, coupon result, delivery-availability check, remove and undo |
| Quote | Pass | Local draft, selected PDF state, four-step validation, duplicate guard and `TC-DESIGN` success ID |
| Checkout | Pass | Collapsible mobile summary, associated required-field errors and error-step state |
| Payment failure | Pass | Number ending `0002` shows an accessible authorization error |
| Payment success | Pass | `4242…` produces the deterministic confirmation state, `TC-ORDER` ID and clears cart |
| SEO/DOM | Pass | Canonical, description, noindex, Open Graph, unique IDs, named buttons, labeled controls and prohibited-language scan |
| Browser history/refresh | Pass | Back/Forward preserves routes; nested Product refresh retains HTML, CSS and JavaScript |
| Touch/motion | Pass | Sampled primary mobile targets are at least 44px; reduced-motion mode suppresses smooth transitions |
| Transfer profile | Pass | Cache-disabled local totals recorded for all seven customer routes |
| Network/404 | Pass | No failed image, CSS, JS, font or page requests during the run |
| Console | Pass | No runtime exceptions or console errors |

## Visual inspection

The 12 required full-page frames were freshly captured and inspected for hierarchy, image quality, clipping, sticky controls, dense mobile groups, hero height, footer layout and modal/form composition. Additional frames cover tablet views, Search, Quick View, selected Product, Quote success, Checkout validation and Checkout confirmation.

Screenshot folder: [`screenshots/`](screenshots/).

## Accessibility checks executed

- Keyboard-operable Search results and quality tabs
- Modal/drawer ARIA state, Escape path, focus containment and focus restoration in code review/runtime interaction
- Required variation guard and live status copy
- Form `aria-invalid`, `aria-describedby`, live/alert regions and checkout step error state
- Explicit labels, semantic landmarks, heading presence and non-color selection/error cues
- 44px primary touch-target styling and reduced-motion media query

## Limitations / production QA remaining

The in-app browser plugin runtime could not initialize because its service returned missing sandbox-policy metadata; the project Chromium/CDP harness was used as the browser fallback. VoiceOver, NVDA, JAWS, TalkBack, physical iOS/Android devices and Safari were not available. Real WooCommerce sessions, gateway iframes, shipping/tax rules, CRM/email delivery, secure uploads, caching, analytics and production WordPress hosting still require staging tests with approved credentials.
