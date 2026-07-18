# GPT Image 2 production prompt pack

Status: **generation pending**. On July 18, 2026, `OPENAI_API_KEY` was not configured in the working environment. No API request was made, no generated asset is claimed, and the live site continues to use the documented client-public and licensed imagery in `docs/asset-register.md`.

This pack is ready for the bundled OpenAI image CLI with model `gpt-image-2`. Generate two independent candidates for every prompt at `quality=high`; never approve candidate 1 automatically. Keep the PNG output as the master, inspect at 100% zoom, select the strongest candidate, then derive WebP and AVIF files. Do not expose credentials in commands, source files, logs, browser code or Git history.

## Collection-wide visual contract

Apply this contract to every prompt below:

- Professional architectural and commercial interior photography, not generic AI imagery or a stylized render.
- Contemporary American residential context; premium cabinetry is the primary subject.
- Natural architectural perspective, buildable layouts, plausible cabinet modules and correct gravity.
- Restrained warm-neutral grading, soft natural daylight, controlled highlights and credible contact shadows.
- Real wood grain, painted finishes, hardware, stone and joinery; no airbrushed or plastic surfaces.
- No text, letters, numbers, UI copy, logo, watermark, people or unrelated branded objects.
- No warped doors, broken handles, repeated props, impossible drawer spacing, misaligned appliances, floating shelves, discontinuous countertops, distorted floor lines, inconsistent wood grain or unnatural reflections.
- Generated environmental images are inspiration only. Official client imagery remains mandatory for exact SKUs, product cards, purchasable finishes, dimensions and door configurations.

## Approval gate

Reject an image if any cabinet reveal is uneven, a rail/stile changes width, doors or drawers intersect, paired doors do not align, hardware placement drifts, shelves lack support, hinges/glides are mechanically implausible, countertops or toe-kicks break perspective, appliance clearances are unsafe, wood grain repeats unnaturally, reflections conflict with lighting, text-like marks appear, or important cabinetry is soft at full size. A candidate passes only after desktop and mobile crops both remain useful.

For each approved master:

1. Retain the original PNG outside the public runtime bundle.
2. Export AVIF and WebP at visually lossless settings, preserving sharp cabinet edges.
3. Record exact pixel dimensions and file sizes in `docs/asset-register.md`.
4. Use explicit `width` and `height`, responsive `srcset`, `sizes`, and meaningful alt text.
5. Preload only the final Home hero. Lazy-load every below-fold generated image.

## 01 — Home hero

**Purpose:** Primary Home conversion image; establish cabinet quality in the first viewport.  
**Page location:** `index.html`, `.hero-visual`.  
**Aspect ratio / master:** 16:9, `3840x2160`, high-quality PNG.  
**Composition:** Wide eye-level architectural photograph from the edge of an open-plan room. Contemporary transitional kitchen with accurately proportioned warm-white Shaker perimeter cabinets, a natural-oak island accent, pale stone countertops, restrained aged-brass or dark bronze hardware, realistic under-cabinet lighting and a few simple neutral objects. Keep the left 35–40% calm and low-detail for headline/CTA safety; place the strongest cabinetry mass across the center and right. No people.  
**Lighting:** Soft morning daylight from plausible windows, balanced interior fill, natural shadow direction, no dramatic sunset or heavy HDR.  
**Mobile crop:** The selected scene must support a deliberate portrait edit at `1536x2048` that retains the island, a complete tall or wall-cabinet run and countertop geometry. Do not simply center-crop away the cabinet story.  
**Negative prompt:** Generic CGI showroom, ultra-luxury mansion, ornate styling, farmhouse clichés, excessive decor, open cabinet doors, duplicated pendant lights, warped island, uneven Shaker rails, impossible appliance doors, broken handles, bent faucet, discontinuous backsplash, fake text, logo, watermark, people, shallow blurry cabinetry.

**Production prompt:**

```text
Use case: photorealistic-natural
Asset type: premium ecommerce homepage hero
Primary request: Create a professional architectural interior photograph of a contemporary transitional American kitchen where premium cabinetry is the unmistakable subject.
Scene/backdrop: Believable open-plan residential kitchen with warm-white painted Shaker perimeter cabinetry, a natural-oak island accent, pale honed stone countertops, restrained aged-brass or dark-bronze hardware, realistic under-cabinet lighting, integrated storage and minimal neutral styling.
Style/medium: High-end commercial interior photography with natural material texture, accurate verticals and restrained warm-neutral color grading; it must look photographed, not like generic CGI.
Composition/framing: 16:9 wide eye-level view with a natural 28–35mm architectural lens. Preserve calm low-detail negative space across the left 35–40 percent for website copy. Place the island and strongest cabinetry composition in the center and right. Keep full cabinet doors, toe-kicks, countertop edges and appliance clearances visible and geometrically coherent.
Lighting/mood: Soft warm natural morning daylight from plausible windows, subtle interior fill and realistic under-cabinet light; controlled highlights and consistent shadows.
Materials/textures: Fine painted-wood texture, believable oak grain, honed stone, solid metal hardware and realistic glass reflections.
Constraints: Buildable cabinet layout and accurate module proportions; no people; no text; no letters or numbers; no logo; no watermark. The scene must also support an intentional portrait mobile crop retaining the island and a complete cabinet run.
Avoid: warped doors or drawers, uneven Shaker rails, broken or duplicated handles, repeated pendants, impossible island/countertop geometry, misaligned appliances, floating cabinets, bent faucet, distorted floor lines, inconsistent wood grain, fake text, glossy CGI surfaces, excessive luxury decor, heavy HDR, blur on cabinetry.
```

**Recommended files:**

- Master archive: `temima-home-hero-master.png`
- Desktop: `home-hero/temima-home-hero-desktop-2560.webp` and `.avif` — 2560×1440
- Tablet: `home-hero/temima-home-hero-tablet-1600.webp` and `.avif` — 1600×1200, intentional 4:3 crop
- Mobile: `home-hero/temima-home-hero-mobile-1200.webp` and `.avif` — 1200×1600, intentional 3:4 crop
- Alt text: `Warm-white Shaker kitchen with an oak island and pale stone countertops`

**Portrait crop/edit prompt:** Use the approved master as Image 1. “Reframe only into a 3:4 portrait Home hero. Preserve the same kitchen, materials, lighting and geometry. Keep the island foreground and one complete wall/tall-cabinet run visible. Do not redesign, add or remove cabinetry; no text, logo or watermark.”

## 02 — Cabinet category hero

**Purpose:** Explain cabinet types while keeping shopping controls near the fold.  
**Page location:** `category/index.html`, `.category-art`.  
**Aspect ratio / master:** 3:2, `3072x2048`, high-quality PNG.  
**Composition:** Clean showroom-like kitchen elevation with a wall cabinet, base cabinet, three-drawer base, tall pantry and visibly intentional panels/fillers in one coherent run. Neutral architecture, direct three-quarter view, realistic American cabinet scale. Leave restrained low-detail wall space in the upper left; do not bake labels into the image.  
**Negative space:** Reserve approximately 15% calm upper-left wall area; cabinetry must still occupy the majority of the frame.  
**Mobile crop:** 4:3 crop that retains at least wall, drawer-base and tall-pantry forms.  
**Negative prompt:** Display wall of disconnected miniatures, floating cabinets, missing toe-kick, mismatched door rails, impossible fillers, text labels, dimensions, people, logos, watermark, exaggerated lens distortion.

```text
Use case: photorealistic-natural
Asset type: cabinet category hero
Primary request: Photograph a minimal premium cabinetry showroom vignette that clearly demonstrates multiple cabinet functions in a single buildable kitchen wall.
Scene/backdrop: Neutral architectural setting with one coherent Shaker cabinet run including a wall cabinet, standard base cabinet, three-drawer base, tall pantry cabinet, finished side panel and believable filler strips.
Style/medium: Commercial cabinetry photography with accurate product-readability, realistic scale and restrained warm-neutral grading.
Composition/framing: 3:2 three-quarter eye-level view using a natural 40–50mm perspective. All cabinet types must remain clearly distinguishable. Keep modest calm wall space at upper left for adjacent category copy, without sacrificing the cabinet run.
Lighting/mood: Large soft daylight source plus controlled studio fill; consistent shadows and crisp door reveals.
Materials/textures: Warm-white painted Shaker fronts, subtle oak interior/accent, pale stone worktop and restrained dark metal hardware.
Constraints: Buildable American kitchen modules, continuous toe-kick, aligned rails and reveals, credible panel/filler placement; no text or labels; no people; no logo; no watermark.
Avoid: floating/disconnected cabinets, miniature showroom samples, warped doors, uneven drawer gaps, broken handles, impossible pantry depth, discontinuous counter, repeated hardware, distorted verticals, fake text, glossy CGI.
```

**Recommended files:** `category/cabinet-category-hero-1600.webp`, `.avif` (1600×1067); `category/cabinet-category-hero-mobile-960.webp`, `.avif` (960×720).  
**Alt text:** `Shaker cabinet display showing wall, base, drawer and tall pantry cabinet types`

## 03 — Free 3D Design consultation

**Purpose:** Make the measurement-to-plan service tangible.  
**Page location:** `free-quote/index.html` hero and Home `.design-visual`.  
**Aspect ratio / master:** 16:10, `3200x2000`, high-quality PNG.  
**Composition:** Premium but believable overhead/oblique workspace. Printed dimensioned room sketch, unlabeled cabinet schedule rows, material/finish samples, tape measure, pencil and a laptop or tablet showing a clean perspective kitchen render with no readable interface text. The relationship between measurement and designed kitchen must be obvious.  
**Negative space:** Keep a clean 10% perimeter and one quiet tabletop zone so adjacent section copy does not compete with props; do not create a large empty dark field.  
**Mobile crop:** Portrait 4:5 edit retaining plan, finish samples, tape measure and screen.  
**Negative prompt:** Readable private data, gibberish UI, floating paper, extra hands, people, warped device, broken perspective, duplicated samples, impossible ruler, logos, watermark.

```text
Use case: photorealistic-natural
Asset type: Free 3D Design service hero
Primary request: Create a realistic professional kitchen-design consultation workspace that visibly connects room measurements to a finished cabinet plan.
Scene/backdrop: Warm neutral designer worktable with a printed floor-plan sketch and dimension lines that contain no readable private information, organized cabinet-schedule rows with no legible words, cabinet finish samples, a stone sample, tape measure, pencil and a slim laptop or tablet displaying a clean photoreal kitchen perspective without interface copy.
Style/medium: Premium commercial workspace photography, believable and tactile rather than staged advertising CGI.
Composition/framing: 16:10 high oblique view, arranged with a clear visual path from measurements on one side through samples to the 3D kitchen view. Keep every prop fully supported on the table and preserve useful crop room.
Lighting/mood: Soft window daylight with gentle warm fill and realistic paper/device reflections.
Materials/textures: Uncoated plan paper, real wood and painted finish samples, stone, metal tape measure and matte device surfaces.
Constraints: Screen perspective must be rectangular and coherent; no readable names, addresses, prices, UI text or private information; no people or hands; no logos; no watermark.
Avoid: gibberish text, distorted screen, impossible plan geometry, floating paper, repeated samples, bent tape measure, random office clutter, exaggerated luxury, harsh CGI lighting, shallow focus that hides the plan.
```

**Recommended files:** `free-design/free-design-consultation-1920.webp`, `.avif` (1920×1200); `free-design/free-design-consultation-tablet-1440.webp`, `.avif` (1440×1080); `free-design/free-design-consultation-mobile-1000.webp`, `.avif` (1000×1250).  
**Alt text:** `Kitchen measurements, cabinet finish samples and a 3D kitchen plan on a designer worktable`

**Portrait crop/edit prompt:** Use approved master as Image 1. “Reframe only to 4:5 portrait. Preserve the same plan, samples, tape measure and device with the same lighting and object geometry. Keep the measurement-to-render story legible without inventing UI text. No people, logos, watermark or readable private information.”

## 04 — Cabinet construction detail set

**Purpose:** Replace generic/illustrative construction visuals with technically credible supporting photography.  
**Page locations:** Home quality tabs and Product construction/specification sections.  
**Aspect ratio / master:** Generate each detail independently at `2048x1536` (4:3), high-quality PNG, then derive 1600×1200 WebP/AVIF and 1000×1000 square crops.  
**Shared composition:** Neutral warm-grey studio sweep, close three-quarter or macro view, consistent softbox from upper left and subtle fill, no labels. These are representative construction details only until the client verifies each SKU.
**Shared negative space / mobile crop:** Maintain a clean 10–15% border around each subject so a square center crop does not cut hardware, panel edges or joinery. The square derivative is the intentional mobile/tab crop.

Use this shared prompt prefix for every detail:

```text
Use case: product-mockup
Asset type: representative cabinet construction detail photography
Style/medium: Ultra-realistic macro commercial product photography on a seamless warm-neutral studio background, consistent softbox lighting from upper left, crisp technical detail and natural material texture.
Constraints: Mechanically plausible cabinet construction, clean isolated subject, complete important edges, no text, labels, dimensions, people, hands, logos or watermark. This is representative construction imagery, not an exact purchasable SKU.
Avoid: impossible joinery, warped panels, uneven gaps, duplicated hardware, floating parts, melted metal, inconsistent grain, fake labels, excessive depth-of-field blur, CGI plastic surfaces.
```

### 04A — Shaker door construction

**Subject/composition:** One warm-white Shaker door at a slight angle, with a discreet cutaway/sample edge revealing believable rails, stiles and inset panel construction; all corners square.  
**Prompt suffix:** `Primary request: Show one precisely made warm-white Shaker cabinet door, including clear rail, stile and recessed center-panel construction. Composition/framing: 4:3 close three-quarter product view with one corner/detail area readable; keep the full door geometry coherent and all rail widths consistent.`  
**Filename:** `construction/cabinet-door-construction-detail.webp` / `.avif`  
**Alt:** `Close view of Shaker cabinet door rails, stiles and recessed center panel`

### 04B — Cabinet box

**Subject/composition:** Frameless or face-frame box consistent within itself, square plywood carcass, back, top/bottom and finished front edge visible.  
**Prompt suffix:** `Primary request: Show a square plywood cabinet box with believable side, top, bottom, back and finished front-edge construction. Composition/framing: 4:3 three-quarter studio view with the open front visible; panels must meet at accurate right angles and remain consistent in thickness.`  
**Filename:** `construction/cabinet-box-detail.webp` / `.avif`  
**Alt:** `Plywood cabinet box showing side, back and finished front-edge construction`

### 04C — Adjustable shelf

**Subject/composition:** Interior corner with one correctly supported adjustable shelf and aligned pin holes.  
**Prompt suffix:** `Primary request: Show a cabinet interior corner with one adjustable wood shelf seated level on four plausible shelf pins and a clean evenly spaced pin-hole system. Composition/framing: tight 4:3 macro view that clearly shows shelf edge, support and interior finish.`  
**Filename:** `construction/cabinet-adjustable-shelf-detail.webp` / `.avif`  
**Alt:** `Adjustable cabinet shelf supported by aligned shelf pins`

### 04D — Soft-close hinge

**Subject/composition:** One concealed European cup hinge mounted correctly between door and cabinet side.  
**Prompt suffix:** `Primary request: Show one mechanically accurate concealed soft-close European cup hinge correctly mounted between a warm-white Shaker door and cabinet side. Composition/framing: 4:3 macro product view with the hinge cup, arm, mounting plate and screw positions crisp and undistorted.`  
**Filename:** `construction/cabinet-soft-close-hinge-detail.webp` / `.avif`  
**Alt:** `Concealed soft-close hinge mounted between cabinet door and side panel`

### 04E — Drawer glide

**Subject/composition:** Partial drawer extension showing a matched undermount glide and locking connection.  
**Prompt suffix:** `Primary request: Show a partially extended cabinet drawer with a mechanically plausible matched undermount soft-close glide system, straight runners and correct connection to the drawer box. Composition/framing: 4:3 technical close-up with one side and underside readable.`  
**Filename:** `construction/cabinet-drawer-glide-detail.webp` / `.avif`  
**Alt:** `Undermount cabinet drawer glide beneath a partially extended drawer`

### 04F — Drawer box

**Subject/composition:** Open natural-wood drawer box with square sides, clean joints and finished bottom.  
**Prompt suffix:** `Primary request: Show one open natural-wood cabinet drawer box with straight square sides, a clean bottom panel and precise visible corner joinery. Composition/framing: 4:3 three-quarter close product view; preserve full front-to-back proportions and crisp edges.`  
**Filename:** `construction/cabinet-drawer-box-detail.webp` / `.avif`  
**Alt:** `Natural-wood cabinet drawer box with precise corner joints`

### 04G — Interior finish

**Subject/composition:** Open cabinet interior, even finish, shelves aligned and natural grain consistent across surfaces.  
**Prompt suffix:** `Primary request: Show a clean open cabinet interior with an even natural-wood finish, straight back and side panels, and two level adjustable shelves. Composition/framing: direct 4:3 interior view with consistent grain scale and realistic corner shadows.`  
**Filename:** `construction/cabinet-interior-finish-detail.webp` / `.avif`  
**Alt:** `Natural-finish cabinet interior with two level adjustable shelves`

### 04H — Finished cabinet side

**Subject/composition:** Exterior three-quarter side view showing a finished end matching the face, with countertop/door context only as needed.  
**Prompt suffix:** `Primary request: Show a warm-white cabinet finished end panel matching the door finish, with a precise square edge and believable relationship to the face frame, door and toe-kick. Composition/framing: 4:3 three-quarter detail view; keep reveals straight and the end panel continuous.`  
**Filename:** `construction/cabinet-finished-side-detail.webp` / `.avif`  
**Alt:** `Finished cabinet side panel aligned with the door and toe-kick`

### 04I — Joinery and assembly

**Subject/composition:** Macro corner joint where two cabinet panels meet with plausible dowel/pocket/dado method; no exploded floating fantasy.  
**Prompt suffix:** `Primary request: Show a close cabinet-panel corner assembly with one clearly understandable, mechanically plausible joinery method and accurate panel thickness. Composition/framing: 4:3 macro studio view; parts may be slightly separated only enough to understand the connection and must remain correctly aligned.`  
**Filename:** `construction/cabinet-joinery-assembly-detail.webp` / `.avif`  
**Alt:** `Close view of aligned cabinet panels and a precise assembly joint`

## 05 — Kitchen inspiration collection

**Purpose:** Three coordinated environments for Home inspiration, editorial/collection cards and quote CTA.  
**Page locations:** `index.html` inspiration grid and supporting editorial placements.  
**Aspect ratio / master:** Each `3072x2048` (3:2), high-quality PNG. Export 1600×1067 and intentional 960×1200 mobile crops.  
**Consistency:** Use the same believable photographic language—28–35mm lens, soft morning daylight, moderate contrast, natural styling, no people—and vary only the cabinet palette/material direction.
**Negative space / mobile crop:** Keep roughly 10% calm architectural breathing room around the principal cabinet run. Each selected master must retain a complete cabinet focal point in a deliberate 4:5 portrait crop; empty space is secondary to product visibility.

### 05A — Warm-white Shaker kitchen

```text
Use case: photorealistic-natural
Asset type: ecommerce kitchen inspiration editorial
Primary request: Photograph an achievable contemporary American kitchen centered on warm-white Shaker cabinetry.
Scene/backdrop: Buildable L-shaped kitchen with a modest island, warm-white Shaker wall/base/tall cabinets, pale stone countertops, restrained dark-bronze hardware and a small natural-oak accent.
Style/medium: Professional architectural interior photography, natural textures and restrained premium grading.
Composition/framing: 3:2 eye-level 28–35mm view; cabinetry fills most of the frame while complete doors, drawer stacks, toe-kicks and counter edges remain readable. Preserve a portrait crop around the island and main cabinet run.
Lighting/mood: Soft natural morning daylight and subtle under-cabinet light.
Constraints: Commercially realistic residential scale; no people, text, logos or watermark.
Avoid: warped rails, broken handles, impossible island, ornate decor, duplicated pendants, misaligned appliances, glossy CGI, heavy HDR, blurry cabinetry.
```

**Filename:** `inspiration/kitchen-inspiration-white.webp` / `.avif`  
**Alt:** `Warm-white Shaker kitchen with pale stone counters and a modest island`

### 05B — Natural-oak contemporary kitchen

```text
Use case: photorealistic-natural
Asset type: ecommerce kitchen inspiration editorial
Primary request: Photograph an achievable contemporary American kitchen centered on natural-oak cabinetry.
Scene/backdrop: Buildable galley or L-shaped layout with consistent natural-oak cabinet fronts, a limited warm-white upper-cabinet accent, light stone worktops, simple dark hardware and clean integrated storage.
Style/medium: Professional architectural interior photography with true oak grain scale and restrained warm-neutral grading.
Composition/framing: 3:2 eye-level 28–35mm view; prioritize full cabinet runs and practical circulation. Preserve a portrait crop around one tall run, drawer base and worktop.
Lighting/mood: Soft natural morning daylight, calm and tactile.
Constraints: Consistent grain direction on each door and matched veneer across adjacent fronts; no people, text, logos or watermark.
Avoid: repeated or liquid wood grain, orange color cast, warped doors, impossible cabinet depth, floating counter, excessive minimalism, glossy CGI, heavy HDR.
```

**Filename:** `inspiration/kitchen-inspiration-oak.webp` / `.avif`  
**Alt:** `Natural-oak contemporary kitchen with light stone countertops and dark hardware`

### 05C — Deep-green accent kitchen

```text
Use case: photorealistic-natural
Asset type: ecommerce kitchen inspiration editorial
Primary request: Photograph an achievable contemporary American kitchen with a restrained deep-green cabinet accent.
Scene/backdrop: Warm-white Shaker perimeter cabinetry paired with a deep forest-green island or one controlled tall-cabinet run, pale stone counters, subtle oak details and restrained aged-brass hardware.
Style/medium: Professional architectural interior photography, sophisticated but commercially attainable, with restrained premium grading.
Composition/framing: 3:2 eye-level 28–35mm view; make the green cabinetry a clear focal point without hiding the practical perimeter storage. Preserve a portrait crop around the green island/tall run and adjacent white cabinets.
Lighting/mood: Soft natural daylight with gentle warm interior fill.
Constraints: Buildable layout, coherent cabinet modules, no people, text, logos or watermark.
Avoid: black crushed shadows, emerald fantasy colors, excessive luxury decor, warped doors, uneven rails, broken handles, duplicated stools or lights, glossy CGI, heavy HDR.
```

**Filename:** `inspiration/kitchen-inspiration-green.webp` / `.avif`  
**Alt:** `Warm-white kitchen with a deep-green cabinet accent and pale stone counters`

**Mobile crop/edit prompt for each inspiration master:** Use the approved master as Image 1. “Reframe only to a 4:5 portrait editorial crop. Preserve the same kitchen, cabinet layout, materials, light and perspective. Retain at least one complete wall/tall run plus the principal island or drawer-base focal point. Do not redesign geometry or add objects; no text, logo, watermark or people.”

## 06 — Product environmental context

**Purpose:** Supporting Product gallery/editorial image only; never an exact SKU representation.  
**Page location:** `product/index.html` gallery contextual slot and related editorial sections. Official client packshots remain the first three gallery images and all product/search/card imagery.  
**Aspect ratio / master:** 3:2, `3072x2048`, high-quality PNG.  
**Composition:** One generic single-door Shaker wall cabinet installed naturally within a coherent kitchen run, door closed or paired with a second contextual view showing interior usability. Adjacent cabinetry establishes scale without obscuring the primary unit. No dimensions, SKU or product claims.  
**Negative space:** Keep a modest 10% clean perimeter around the primary cabinet; do not use a large empty wall that weakens product context.  
**Mobile crop:** 4:5 crop retains the complete cabinet and adjacent counter/tall reference.  
**Negative prompt:** Isolated packshot implying exact product, dimension labels, SKU, mismatched door count, implausible depth, door colliding with wall/appliance, impossible shelves, people, text, logos, watermark.

```text
Use case: photorealistic-natural
Asset type: product-page environmental inspiration image
Primary request: Photograph a generic single-door warm-white Shaker wall cabinet installed naturally inside a coherent contemporary kitchen run, showing how this cabinet type relates to adjacent cabinetry and usable countertop space.
Scene/backdrop: Modest buildable American kitchen with aligned warm-white Shaker wall/base cabinets, pale stone countertop, subtle oak detail and restrained dark hardware.
Style/medium: Professional cabinetry installation photography with accurate perspective and natural materials; environmental inspiration, not an exact catalogue packshot.
Composition/framing: 3:2 eye-level 40–50mm view. Keep the complete primary single-door wall cabinet clearly visible, correctly scaled and unobstructed. Include enough adjacent cabinets and counter to establish realistic size and function. Preserve room for an intentional 4:5 crop.
Lighting/mood: Soft natural daylight and realistic under-cabinet fill.
Constraints: Do not imply an exact SKU, size or finish; no dimension labels; no text; no people; no logos; no watermark. The primary door configuration, hinges, shelves and clearances must be mechanically plausible.
Avoid: isolated ecommerce cutout, warped cabinet, changing rail widths, impossible depth, door collision, floating shelves, repeated handles, misaligned countertop, distorted verticals, blurry cabinetry, fake text, glossy CGI.
```

**Recommended files:** `product-context/cabinet-product-context-1600.webp`, `.avif` (1600×1067); `product-context/cabinet-product-context-mobile-1000.webp`, `.avif` (1000×1250).  
**Alt text:** `Single-door Shaker wall cabinet installed within a coordinated kitchen cabinet run`  
**Required visible caption:** `Planning inspiration — confirm the exact product and dimensions before ordering.`

## Integration map after generation

| Asset | HTML placement | Loading | Required behavior |
|---|---|---|---|
| Home hero desktop/tablet/mobile | `index.html` `.hero-visual picture` and OG image | Only true hero preloaded; `fetchpriority="high"` | Art-directed `<source>` elements, explicit dimensions, stable aspect ratio |
| Category hero | `category/index.html` `.category-art picture` | Eager only if above fold | 3:2 desktop, intentional 4:3 mobile source |
| Free Design consultation | `free-quote/index.html` hero and Home design section | Hero eager; Home section lazy | Never show readable fake UI/private data |
| Construction set | Home quality tabs; Product specifications | Lazy | Tab image and text state change together; representative-image caption |
| Inspiration set | Home inspiration/editorial cards | Lazy | Responsive source, stable crop, no exact-product implication |
| Product context | Product gallery contextual slot only | Lazy until selected where practical | Official SKU imagery remains primary; visible inspiration disclaimer |

## Web export targets

- Desktop editorial images: AVIF quality visually equivalent to 55–65 and WebP 76–84; inspect hard cabinet edges before accepting.
- Mobile/editorial derivatives: normally 800–1200px wide; do not serve the 3K master to phones.
- Construction details: preserve enough resolution for hinge/joinery inspection; target 120–220 KB rather than overcompressing technical edges.
- Home hero: aim for approximately 180–320 KB AVIF and 260–450 KB WebP, subject to visual inspection.
- Keep PNG masters out of initial page requests. Do not delete masters until client approval and archived delivery.

## Completion checklist

- [ ] Two candidates generated for every prompt with `gpt-image-2`, high quality.
- [ ] Candidate review recorded; first output was not automatically published.
- [ ] Cabinet geometry and hardware pass the approval gate at 100% zoom.
- [ ] No text-like marks, private data, logos or watermark.
- [ ] Desktop/tablet/mobile crops approved independently.
- [ ] WebP and AVIF outputs stored under `assets/images/generated/`.
- [ ] Official product media remains primary wherever an exact SKU is represented.
- [ ] HTML/CSS integration uses dimensions, alt text, `srcset`, appropriate loading and no hotlinks.
- [ ] Local and production asset routes return HTTP 200.
- [ ] Visual regression, console/network, responsive and performance QA pass before deployment.
