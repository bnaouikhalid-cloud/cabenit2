/* Automated Chromium QA for the standalone Temima Cabinets prototype.
   Start the static server on :4173 and a Chromium debug target on :9223. */
const fs = require('fs');
const path = require('path');

const base = process.env.QA_BASE || 'http://127.0.0.1:4173';
const debugPort = process.env.QA_DEBUG_PORT || '9223';
const outputDir = path.join(__dirname, 'docs', 'screenshots');
const resultFile = path.join(__dirname, 'docs', base.startsWith('https://') ? 'qa-live-results.json' : 'qa-browser-results.json');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function connect() {
  const targets = await fetch(`http://127.0.0.1:${debugPort}/json`).then(response => response.json());
  const target = targets.find(item => item.type === 'page');
  if (!target) throw new Error(`No Chromium page target is available on port ${debugPort}.`);
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let sequence = 0;
  const pending = new Map();
  const runtimeErrors = [];
  const networkErrors = [];
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const item = pending.get(message.id);
      pending.delete(message.id);
      message.error ? item.reject(new Error(message.error.message)) : item.resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text || 'Runtime exception');
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') runtimeErrors.push(message.params.entry.text);
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) networkErrors.push({ status: message.params.response.status, url: message.params.response.url });
    if (message.method === 'Network.loadingFailed' && !message.params.canceled) networkErrors.push({ error: message.params.errorText, url: message.params.requestId });
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  for (const domain of ['Page', 'Runtime', 'Log', 'Network']) await send(`${domain}.enable`);
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  return { socket, send, runtimeErrors, networkErrors };
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  const { socket, send, runtimeErrors, networkErrors } = await connect();
  const results = [];
  const record = (test, pass, value) => results.push({ test, pass: Boolean(pass), ...(value === undefined ? {} : { value }) });
  const evaluate = async expression => {
    const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text || 'Evaluation failed');
    return response.result.value;
  };
  const viewport = (width, height, mobile = false) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile, screenWidth: width, screenHeight: height });
  const navigate = async (route, width, height, mobile = false) => {
    await viewport(width, height, mobile);
    await send('Page.navigate', { url: base + route });
    await sleep(550);
    await evaluate(`document.fonts?.ready.then(()=>true)`);
  };
  const shot = async name => {
    const metrics = await send('Page.getLayoutMetrics');
    const size = metrics.cssContentSize;
    const capture = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: true, clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 } });
    fs.writeFileSync(path.join(outputDir, name), Buffer.from(capture.data, 'base64'));
  };

  const routes = [
    ['/', 'home'], ['/category/', 'category'], ['/product/', 'product'],
    ['/free-quote/', 'free-quote'], ['/cart/', 'cart'], ['/checkout/', 'checkout'],
    ['/resources/', 'resources']
  ];
  const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];

  await navigate('/', 1440, 900);
  await evaluate(`localStorage.clear(); true`);
  await navigate('/', 1440, 900);
  record('Fresh visitor cart starts empty', await evaluate(`document.querySelector('[data-cart-count]')?.textContent === '0' && !localStorage.getItem('temimaCart')`));
  record('Default presentation hides preview notice', !(await evaluate(`Boolean(document.querySelector('.review-notice'))`)));
  await navigate('/?review=1', 1440, 900);
  const reviewMode = await evaluate(`(()=>{const notice=document.querySelector('.review-notice');const visible=Boolean(notice);notice?.querySelector('button')?.click();return {visible,dismissed:!document.querySelector('.review-notice')}})()`);
  record('Optional review mode notice and dismiss', reviewMode.visible && reviewMode.dismissed, reviewMode);
  for (const [route, label] of routes) {
    if (label === 'cart') {
      await evaluate(`localStorage.setItem('temimaCart', JSON.stringify([{id:'TMM_W_W1830',name:'White Shaker 18″ Wall Cabinet',type:'Wall cabinet',variation:'18″ W × 30″ H × 12″ D',price:174.32,sku:'TMM_W_W1830',qty:2,image:'assets/images/products/cabinet-wall-600.webp'}])); true`);
    }
    for (const width of widths) {
      const mobile = width <= 430;
      const height = mobile ? 844 : width <= 768 ? 1024 : 900;
      await navigate(route, width, height, mobile);
      const measure = await evaluate(`({innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.title,h1:document.querySelector('h1')?.textContent.trim(),images:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc||i.src)})`);
      record(`${label} responsive ${width}px`, measure.innerWidth === width && measure.scrollWidth <= width && Boolean(measure.h1) && measure.images.length === 0, measure);
    }
    await navigate(route, 1440, 900);
    const pageQuality = await evaluate(`(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);const duplicateIds=[...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];const unnamedButtons=[...document.querySelectorAll('button')].filter(b=>!b.textContent.trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('aria-labelledby')).length;const unlabeledControls=[...document.querySelectorAll('input:not([type="hidden"]),select,textarea')].filter(e=>!e.labels?.length&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')).map(e=>e.name||e.id||e.type);const text=document.body.innerText.toLowerCase();const prohibited=['standalone presentation','preview mode','local simulator','credit card simulator','digital wallet concept','woocommerce','prototype banner'].filter(term=>text.includes(term));return {canonical:Boolean(document.querySelector('link[rel="canonical"]')),description:Boolean(document.querySelector('meta[name="description"]')),robots:document.querySelector('meta[name="robots"]')?.content||'',openGraph:Boolean(document.querySelector('meta[property="og:title"]')&&document.querySelector('meta[property="og:image"]')),duplicateIds,unnamedButtons,unlabeledControls,prohibited}})()`);
    record(`${label} metadata and DOM accessibility`, pageQuality.canonical && pageQuality.description && pageQuality.robots.includes('noindex') && pageQuality.openGraph && pageQuality.duplicateIds.length === 0 && pageQuality.unnamedButtons === 0 && pageQuality.unlabeledControls.length === 0 && pageQuality.prohibited.length === 0, pageQuality);
    const transferProfile = await evaluate(`(()=>{const entries=[...performance.getEntriesByType('navigation'),...performance.getEntriesByType('resource')].map(e=>({asset:new URL(e.name).pathname,transferSize:e.transferSize||0,decodedSize:e.decodedBodySize||0}));return {transferBytes:entries.reduce((sum,e)=>sum+e.transferSize,0),decodedBytes:entries.reduce((sum,e)=>sum+e.decodedSize,0),largest:[...entries].sort((a,b)=>b.transferSize-a.transferSize).slice(0,5)}})()`);
    record(`${label} browser transfer profile`, transferProfile.transferBytes > 0 && transferProfile.largest.length > 0, transferProfile);
    await shot(`${label}-desktop-1440.png`);
    const localLinks = await evaluate(`(async()=>{const links=[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.href).filter(h=>h.startsWith(location.origin)))];const checks=await Promise.all(links.map(async url=>{try{const r=await fetch(url);let fragment=true;if(new URL(url).hash){const html=await r.text();const parsed=new DOMParser().parseFromString(html,'text/html');fragment=Boolean(parsed.getElementById(decodeURIComponent(new URL(url).hash.slice(1))))}return {url,status:r.status,fragment}}catch(e){return {url,status:0,fragment:false}}}));return checks.filter(x=>x.status>=400||x.status===0||!x.fragment)})()`);
    record(`${label} internal links and fragments`, localLinks.length === 0, localLinks);
    await navigate(route, 390, 844, true);
    await shot(`${label}-mobile-390.png`);
  }

  await navigate('/', 768, 1024);
  await shot('home-tablet-768.png');
  await navigate('/product/', 1024, 900);
  await shot('product-tablet-1024.png');

  await navigate('/', 390, 844, true);
  const touchTargets = await evaluate(`(()=>[...document.querySelectorAll('[data-menu-toggle],[data-search-open],.cart-link,.header-quote,.mobile-nav a,.button,.control-button,.sort-select,.variation-option label,.quantity button')].filter(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0&&(r.width<44||r.height<44)}).map(e=>({label:e.getAttribute('aria-label')||e.textContent.trim().slice(0,40),width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height)})))()`);
  record('Primary mobile touch targets are at least 44px', touchTargets.length === 0, touchTargets);

  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await navigate('/', 390, 844, true);
  const motion = await evaluate(`(()=>({scroll:getComputedStyle(document.documentElement).scrollBehavior,transition:getComputedStyle(document.querySelector('.site-header')).transitionDuration}))()`);
  record('Reduced-motion mode suppresses smooth motion', motion.scroll === 'auto' && parseFloat(motion.transition) <= 0.01, motion);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });

  await navigate('/', 390, 844, true);
  await navigate('/category/', 390, 844, true);
  await evaluate(`history.back(); true`);
  await sleep(650);
  const backPath = await evaluate(`location.pathname`);
  await evaluate(`history.forward(); true`);
  await sleep(650);
  const forwardPath = await evaluate(`location.pathname`);
  record('Browser Back and Forward preserve nested routes', backPath === '/' && forwardPath === '/category/', { backPath, forwardPath });
  await navigate('/product/', 390, 844, true);
  await send('Page.reload', { ignoreCache: true });
  await sleep(650);
  const refreshState = await evaluate(`({path:location.pathname,title:document.title,styled:getComputedStyle(document.body).fontFamily,script:Boolean(document.querySelector('[data-mobile-add]'))})`);
  record('Nested-page refresh preserves HTML, CSS and JavaScript', refreshState.path === '/product/' && refreshState.title.includes('White Shaker') && refreshState.styled.includes('Manrope') && refreshState.script, refreshState);

  await navigate('/', 390, 844, true);
  const menu = await evaluate(`(()=>{const b=document.querySelector('[data-menu-toggle]');b.click();return {open:document.querySelector('[data-mobile-nav]').classList.contains('is-open'),expanded:b.getAttribute('aria-expanded'),hidden:document.querySelector('[data-mobile-nav]').getAttribute('aria-hidden')}})()`);
  record('Mobile menu state', menu.open && menu.expanded === 'true' && menu.hidden === 'false', menu);
  const menuKeyboard = await evaluate(`(()=>{const nav=document.querySelector('[data-mobile-nav]');const items=[...nav.querySelectorAll('a[href],button:not([disabled])')];items.at(-1).focus();document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true}));const trapped=document.activeElement===items[0];document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));return {trapped,closed:!nav.classList.contains('is-open'),focusReturned:document.activeElement===document.querySelector('[data-menu-toggle]')}})()`);
  record('Mobile menu focus trap, Escape and focus restoration', menuKeyboard.trapped && menuKeyboard.closed && menuKeyboard.focusReturned, menuKeyboard);
  const search = await evaluate(`(()=>{document.querySelector('[data-search-open]').click();const i=document.querySelector('[data-search-input]');i.value='pantry';i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));return {open:document.querySelector('[data-search-panel]').classList.contains('is-open'),count:document.querySelectorAll('[data-search-option]').length,active:i.getAttribute('aria-activedescendant')}})()`);
  record('Search results and keyboard navigation', search.open && search.count === 2 && Boolean(search.active), search);
  await shot('search-results-mobile-390.png');
  const emptySearch = await evaluate(`(()=>{const i=document.querySelector('[data-search-input]');i.value='not-a-cabinet';i.dispatchEvent(new Event('input',{bubbles:true}));return {options:document.querySelectorAll('[data-search-option]').length,empty:Boolean(document.querySelector('.search-empty'))}})()`);
  record('Search no-results state', emptySearch.options === 0 && emptySearch.empty, emptySearch);
  const clearedSearch = await evaluate(`(()=>{document.querySelector('[data-search-clear]').click();const i=document.querySelector('[data-search-input]');return {value:i.value,count:document.querySelectorAll('[data-search-option]').length,focused:document.activeElement===i}})()`);
  record('Search clear action', clearedSearch.value === '' && clearedSearch.count > 0 && clearedSearch.focused, clearedSearch);
  await evaluate(`document.querySelector('[data-search-close]').click()`);

  await navigate('/category/?type=wall', 1440, 900);
  const category = await evaluate(`(()=>{const initial=document.querySelector('[data-result-count]').textContent;document.querySelector('[data-sort]').value='price-desc';document.querySelector('[data-sort]').dispatchEvent(new Event('change'));document.querySelector('[data-quick-view]').click();return {initial,visible:[...document.querySelectorAll('[data-product-card]')].filter(c=>!c.classList.contains('hidden')).length,first:document.querySelector('[data-product-card]:not(.hidden) [data-quick-view]')?.closest('[data-product-card]')?.dataset.price,quick:document.querySelector('[data-quick-modal]').classList.contains('is-open')}})()`);
  record('Category URL filter, sort and Quick View', category.initial === '2' && category.visible === 2 && category.first === '234.67' && category.quick, category);
  await shot('category-quick-view-desktop.png');
  const quickKeyboard = await evaluate(`(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));const trigger=document.querySelector('[data-product-card]:not(.hidden) [data-quick-view]');trigger.focus();trigger.click();document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));return {closed:!document.querySelector('[data-quick-modal]').classList.contains('is-open'),focusReturned:document.activeElement===trigger}})()`);
  record('Quick View Escape and focus restoration', quickKeyboard.closed && quickKeyboard.focusReturned, quickKeyboard);

  await navigate('/category/', 390, 844, true);
  const drawer = await evaluate(`(()=>{document.querySelector('[data-filter-open]').click();const d=document.querySelector('[data-filter-drawer]');document.querySelector('[data-mobile-filter="type"][value="tall"]').click();document.querySelector('[data-filter-apply]').click();return {closed:!d.classList.contains('is-open'),count:document.querySelector('[data-result-count]').textContent}})()`);
  record('Mobile filter drawer', drawer.closed && drawer.count === '2', drawer);

  await navigate('/product/', 390, 844, true);
  const beforeChoice = await evaluate(`(()=>{const b=document.querySelector('[data-mobile-add]');b.click();return {state:b.dataset.mobileState,text:b.textContent.trim(),enabled:!b.disabled,selected:document.querySelector('input[name="size"]:checked')!==null}})()`);
  record('Mobile product bar requires size', beforeChoice.state === 'choose' && beforeChoice.text === 'Choose a size' && !beforeChoice.selected, beforeChoice);
  const product = await evaluate(`(()=>{document.querySelector('#size-1836').click();document.querySelector('[data-mobile-add]').click();return {price:document.querySelector('[data-product-price]').textContent,sku:document.querySelector('[data-product-sku]').textContent,state:document.querySelector('[data-mobile-add]').dataset.mobileState,count:document.querySelector('[data-cart-count]').textContent}})()`);
  record('Variation selection and Add to Cart', product.price.includes('197.42') && product.sku === 'TMM_W_W1836' && product.state === 'add' && Number(product.count) > 0, product);
  await shot('product-selected-mobile-390.png');

  await navigate('/cart/', 390, 844, true);
  const cart = await evaluate(`(()=>{const before=Number(document.querySelector('[data-cart-count]').textContent);document.querySelector('[data-cart-plus]').click();document.querySelector('[data-coupon-toggle]').click();const c=document.querySelector('[data-coupon-input]');c.value='DESIGN100';document.querySelector('[data-apply-coupon]').click();const z=document.querySelector('[data-shipping-zip]');z.value='33101';document.querySelector('[data-estimate-shipping]').click();return {before,after:Number(document.querySelector('[data-cart-count]').textContent),discount:document.querySelector('[data-cart-discount]').textContent,shipping:document.querySelector('[data-cart-shipping]').textContent}})()`);
  record('Cart quantity, coupon and delivery check', cart.after === cart.before + 1 && cart.discount.includes('100') && cart.shipping === 'Calculated at checkout', cart);
  const undo = await evaluate(`(()=>{const before=document.querySelector('[data-cart-count]').textContent;document.querySelector('[data-remove-item]').click();const removed=document.querySelector('[data-cart-count]').textContent;document.querySelector('[data-undo]').click();return {before,removed,restored:document.querySelector('[data-cart-count]').textContent}})()`);
  record('Cart remove and undo', Number(undo.removed) < Number(undo.before) && undo.restored === undo.before, undo);

  await navigate('/free-quote/', 390, 844, true);
  const quote = await evaluate(`(async()=>{const set=(n,v)=>{const e=document.querySelector('[name="'+n+'"]');e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))};set('fullName','Preview Customer');set('email','preview@example.com');set('phone','4692096518');document.querySelector('[data-save-quote]').click();const saved=Boolean(localStorage.getItem('temimaQuoteDraft'));document.querySelector('[data-form-step="1"] [data-next-step]').click();set('zip','33101');set('kitchenType','L-shaped');set('projectType','Remodel');document.querySelector('[data-form-step="2"] [data-next-step]').click();const upload=document.querySelector('[data-file-input]');const transfer=new DataTransfer();transfer.items.add(new File(['plan'],'kitchen-plan.pdf',{type:'application/pdf'}));upload.files=transfer.files;upload.dispatchEvent(new Event('change',{bubbles:true}));const fileReady=upload.closest('.upload-zone').querySelector('[data-file-list]').textContent.includes('Selected');document.querySelector('[data-form-step="3"] [data-next-step]').click();document.querySelector('[name="privacyConsent"]').click();document.querySelector('[data-quote-submit]').click();await new Promise(r=>setTimeout(r,700));return {saved,fileReady,success:document.querySelector('[data-quote-success]').classList.contains('is-visible'),id:document.querySelector('[data-submission-id]').textContent}})()`);
  record('Quote draft, file state, four steps and local success', quote.saved && quote.fileReady && quote.success && quote.id.startsWith('TC-DESIGN-'), quote);
  await shot('quote-success-mobile-390.png');

  await navigate('/checkout/', 390, 844, true);
  const summary = await evaluate(`(()=>{const b=document.querySelector('[data-summary-toggle]');b.click();return {expanded:b.getAttribute('aria-expanded'),open:document.querySelector('[data-checkout-summary-side]').classList.contains('is-open')}})()`);
  record('Mobile checkout summary', summary.expanded === 'true' && summary.open, summary);
  await evaluate(`document.querySelector('[data-summary-toggle]').click()`);
  const validation = await evaluate(`(()=>{document.querySelector('[data-checkout-form]').requestSubmit();return {message:document.querySelector('[data-checkout-error]').textContent,invalid:document.querySelectorAll('[aria-invalid="true"]').length,errorStep:document.querySelector('[data-checkout-progress].is-error')?.dataset.checkoutProgress}})()`);
  record('Checkout field validation', validation.invalid > 0 && validation.errorStep === '1', validation);
  await shot('checkout-validation-mobile-390.png');
  const checkoutFailure = await evaluate(`(()=>{const set=(n,v)=>{const e=document.querySelector('[name="'+n+'"]');e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))};set('email','preview@example.com');set('firstName','Preview');set('lastName','Customer');set('address','123 Test Street');set('city','Miami');set('state','FL');set('zip','33101');set('phone','4692096518');set('cardNumber','4000000000000002');set('cardExpiry','1230');set('cardCvc','123');set('cardName','Preview Customer');document.querySelector('[name="terms"]').click();document.querySelector('[data-checkout-form]').requestSubmit();return document.querySelector('[data-checkout-error]').textContent})()`);
  record('Checkout declined payment state', checkoutFailure.toLowerCase().includes('could not be authorized'), checkoutFailure);
  const checkoutSuccess = await evaluate(`(async()=>{const e=document.querySelector('[name="cardNumber"]');e.value='4242424242424242';e.dispatchEvent(new Event('input',{bubbles:true}));document.querySelector('[data-checkout-form]').requestSubmit();await new Promise(r=>setTimeout(r,850));return {confirmed:document.querySelector('[data-order-confirmation]').classList.contains('is-visible'),order:document.querySelector('[data-confirmation-order]').textContent,cart:localStorage.getItem('temimaCart')}})()`);
  record('Guest checkout success state', checkoutSuccess.confirmed && checkoutSuccess.order.startsWith('TC-ORDER-') && checkoutSuccess.cart === '[]', checkoutSuccess);
  await shot('checkout-confirmation-mobile-390.png');

  const badNetwork = networkErrors.filter(item => !String(item.url).includes('favicon.ico'));
  record('Image and network requests', badNetwork.length === 0, badNetwork);
  record('Runtime exceptions and console errors', runtimeErrors.length === 0, runtimeErrors);

  fs.writeFileSync(resultFile, JSON.stringify({ executedAt: new Date().toISOString(), base, results }, null, 2));
  console.log(JSON.stringify({ passed: results.filter(item => item.pass).length, failed: results.filter(item => !item.pass).length, results }, null, 2));
  socket.close();
  if (results.some(item => !item.pass)) process.exitCode = 1;
}

run().catch(error => { console.error(error); process.exitCode = 1; });
