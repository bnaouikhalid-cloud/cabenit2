# Claims audit

Audit date: July 18, 2026. “Public observation” means visible on the client’s public website or WooCommerce Store API at audit time; it is not a substitute for client-owned documentary proof.

| Claim or data | Evidence status | Prototype treatment | Production requirement |
|---|---|---|---|
| Official Temima Cabinets logo | Public observation | Local copy used | Replace only with client-approved master asset if supplied |
| `(469) 209-6518` | Public observation | Used as linked phone | Client reapproval and call test |
| `info@temimacabinets.com` | Public observation | Used as linked support email | Client reapproval and delivery test |
| Monday–Friday, 9 AM–5 PM | Public observation | Used in footer | Confirm timezone and holiday policy |
| White Shaker collection | Public catalogue observation | Only collection presented | Sync from WooCommerce product taxonomy |
| Product names, SKUs and starting prices | Public Store API observation | Real observed catalogue subset | WooCommerce must be runtime source; revalidate at staging freeze |
| 18-inch wall cabinet size prices | Public product/API observation | `$174.32`, `$197.42`, `$234.68` | Bind to variation records, never hardcode in production template |
| ½-inch A-grade plywood box | Public product-copy observation | Visible only on representative PDP/quality tab | Confirm supplier specification by SKU |
| Wood door with MDF inner panel | Public product-copy observation | Visible only on representative PDP/quality tab | Confirm supplier specification by SKU |
| Concealed soft-close European hinges | Public product-copy observation | Visible only on representative PDP/quality tab | Confirm supplier specification by SKU |
| Finished ends and shelf counts | Public product-copy observation | Variation-aware PDP specification | Confirm per variation in product data |
| Free 3D Design | Public service observation | Used as service name; no turnaround promise | Confirm eligibility, deliverables, consent and operational workflow |
| Professional design support | Public service direction | Neutral wording only | Confirm staffing, scope and escalation path |
| Guest checkout | Prototype behavior | Functional local flow | Enable and test WooCommerce guest checkout |
| Secure checkout | Implementation-dependent | Not claimed | Require TLS, approved gateway, PCI review and sandbox evidence |
| Shipping cost, threshold or speed | Not verified | No amount, threshold or speed shown | Source from approved WooCommerce shipping zones/rules |
| Warehouse pickup | Not verified | Marked pending in checkout concept | Remove or enable only after operational approval |
| Warranty scope / lifetime warranty | Not verified | No coverage claim; policy link only | Publish signed policy and SKU/category scope |
| Returns window or fees | Not verified | No numeric promise | Publish approved refund/return policy |
| Reviews, ratings or counts | No verified dataset | Removed | Use genuine platform data and schema only when eligible |
| Savings, wholesale pricing or sale status | No approved methodology | Removed | Require approved comparison basis and promotion rules |
| Delivery turnaround / 24-hour design | No service-level evidence | Removed | Publish only after operational approval |
| Installation service | Not verified | Not claimed | Confirm service area, provider and terms before adding |
| CARB2 or other certification | Documentary proof not supplied | Not claimed | Supplier certificate plus applicable SKU scope required |
| Coupon interaction | Local simulator | Code is not advertised; total updates locally | Replace with WooCommerce coupon engine |
| Payment success / declined state | Local simulator | Explicitly labeled; no charge | Replace with approved gateway and webhook/order-state testing |

## Removed presentation content

- Natural Oak and Soft Sage invented collections
- Fabricated `(800) 555-0184`, example-domain email and fictional hours
- Fake ratings, reviews, sale badges, savings, freight amount and delivery promises
- Internal “verify availability,” “concept finish,” “prototype placeholder” and similar notes
- Large black prototype banner (compact notice is optional through `?review=1`)

## Client approval evidence still required

- Signed warranty, shipping, returns, privacy and terms documents
- Supplier construction/certification records by product and variation
- Design-service scope, timing, consent, email and CRM routing rules
- Production contact ownership, timezone and support escalation
- Shipping zones, methods, freight handling, pickup status and tax configuration
- Genuine review source and permission if customer proof is introduced
