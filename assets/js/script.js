/* Temima Cabinets customer-interface concept. Integration boundaries are documented in /docs. */
(function () {
  'use strict';

  const body = document.body;
  const root = body.dataset.root || '';
  const page = body.dataset.page || '';
  const CART_KEY = 'temimaCart';
  const COUPON_KEY = 'temimaCoupon';
  const QUOTE_KEY = 'temimaQuoteDraft';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const searchProducts = [
    { name: 'White Shaker 18″ Wall Cabinet', type: 'Wall cabinet', detail: '18″ wide · 3 heights', price: 174.32, image: 'assets/images/generated/products/white-shaker-wall-cabinet-v2-600.webp' },
    { name: 'White Shaker 24″ Wall Cabinet', type: 'Wall cabinet', detail: '24″ wide · 3 heights', price: 234.67, image: 'assets/images/generated/products/white-shaker-wall-24-cabinet-v2-600.webp' },
    { name: 'White Shaker 24″–27″ Base Cabinet', type: 'Base cabinet', detail: '24″ or 27″ wide', price: 333.75, image: 'assets/images/generated/products/white-shaker-base-cabinet-v2-600.webp' },
    { name: 'White Shaker Three Drawer Cabinet', type: 'Drawer base', detail: '12″–36″ wide', price: 343.44, image: 'assets/images/generated/products/white-shaker-drawer-base-v2-600.webp' },
    { name: 'White Shaker 18″ Pantry / Utility Cabinet', type: 'Tall cabinet', detail: '18″ wide', price: 650.37, image: 'assets/images/generated/products/white-shaker-pantry-cabinet-v2-600.webp' },
    { name: 'White Shaker 24″ Pantry / Utility Cabinet', type: 'Tall cabinet', detail: '24″ wide', price: 671.97, image: 'assets/images/generated/products/white-shaker-pantry-cabinet-v2-600.webp' },
    { name: 'White Shaker 30″–36″ Sink Base', type: 'Sink base', detail: '30″–36″ wide', price: 312.89, image: 'assets/images/generated/products/white-shaker-sink-base-v2-600.webp' },
    { name: 'White Shaker Sample Door', type: 'Sample', detail: 'Finish and door profile', price: 21.99, image: 'assets/images/generated/products/white-shaker-sample-door-v2-600.webp' }
  ];

  let removedItem = null;
  let toastTimer = null;
  let activeOverlay = null;
  let restoreFocusTo = null;
  let searchIndex = -1;

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);
  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const scrollBehavior = () => reducedMotion ? 'auto' : 'smooth';

  function getCart() {
    const existing = localStorage.getItem(CART_KEY);
    if (existing === null) return [];
    try {
      const parsed = JSON.parse(existing);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function cartQuantity(cart = getCart()) {
    return cart.reduce((total, item) => total + Math.max(0, Number(item.qty) || 0), 0);
  }

  function updateCartCount() {
    const count = cartQuantity();
    $$('[data-cart-count]').forEach(element => {
      element.textContent = count;
      element.setAttribute('aria-label', `${count} ${count === 1 ? 'item' : 'items'} in cart`);
    });
  }

  function showToast(message) {
    const toast = $('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function setOverlayState(overlay, open, focusTarget) {
    if (!overlay) return;
    overlay.classList.toggle('is-open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('modal-open', open);
    if (open) {
      restoreFocusTo = document.activeElement;
      activeOverlay = overlay;
      window.setTimeout(() => (focusTarget || $(focusableSelector, overlay))?.focus(), 30);
    } else {
      activeOverlay = null;
      const target = restoreFocusTo;
      restoreFocusTo = null;
      target?.focus?.();
    }
  }

  function openOverlay(overlay, focusTarget) { setOverlayState(overlay, true, focusTarget); }
  function closeOverlay(overlay) { setOverlayState(overlay, false); }

  function trapFocus(event) {
    if (event.key !== 'Tab' || !activeOverlay) return;
    const focusables = $$(focusableSelector, activeOverlay).filter(element => element.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function closeMobileNav(restoreFocus = true) {
    const nav = $('[data-mobile-nav]');
    const button = $('[data-menu-toggle]');
    const wasOpen = nav?.classList.contains('is-open');
    nav?.classList.remove('is-open');
    nav?.setAttribute('aria-hidden', 'true');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'Open menu');
    body.classList.remove('nav-open');
    if (activeOverlay === nav) activeOverlay = null;
    if (wasOpen && restoreFocus) button?.focus();
    if (restoreFocusTo === button) restoreFocusTo = null;
  }

  function initReviewMode() {
    if (new URLSearchParams(window.location.search).get('review') !== '1') return;
    const notice = document.createElement('aside');
    notice.className = 'review-notice';
    notice.setAttribute('aria-label', 'Concept preview notice');
    notice.innerHTML = '<span><strong>Concept preview</strong><br>Forms, cart and payment interactions stay on this device.</span><button type="button" aria-label="Dismiss concept preview notice">×</button>';
    notice.querySelector('button').addEventListener('click', () => notice.remove());
    body.appendChild(notice);
  }

  function initShell() {
    updateCartCount();
    initReviewMode();

    const header = $('[data-header]');
    const updateHeader = () => header?.classList.toggle('is-compact', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const menuButton = $('[data-menu-toggle]');
    const mobileNav = $('[data-mobile-nav]');
    menuButton?.addEventListener('click', () => {
      const opening = !mobileNav.classList.contains('is-open');
      if (!opening) { closeMobileNav(); return; }
      restoreFocusTo = menuButton;
      activeOverlay = mobileNav;
      mobileNav.classList.add('is-open');
      mobileNav.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close menu');
      body.classList.add('nav-open');
      $('a', mobileNav)?.focus();
    });
    $$('[data-mobile-nav] a').forEach(link => link.addEventListener('click', () => closeMobileNav(false)));

    initSearch();

    document.addEventListener('keydown', event => {
      trapFocus(event);
      if (event.key !== 'Escape') return;
      if (activeOverlay) closeOverlay(activeOverlay);
      closeMobileNav();
    });
  }

  function productSearchText(product) {
    return `${product.name} ${product.type} ${product.detail}`.toLowerCase().replace(/[″”]/g, ' inch ');
  }

  function initSearch() {
    const panel = $('[data-search-panel]');
    const input = $('[data-search-input]');
    const results = $('[data-search-results]');
    const form = $('[data-search-form]');
    if (!panel || !input || !results) return;
    results.setAttribute('aria-live', 'polite');
    const clearButton = document.createElement('button');
    clearButton.className = 'search-clear';
    clearButton.dataset.searchClear = '';
    clearButton.type = 'button';
    clearButton.hidden = true;
    clearButton.textContent = 'Clear';
    clearButton.setAttribute('aria-label', 'Clear product search');
    input.insertAdjacentElement('afterend', clearButton);

    const render = query => {
      const normalized = query.trim().toLowerCase().replace(/[″”]/g, ' inch ');
      const matches = searchProducts.filter(product => !normalized || productSearchText(product).includes(normalized)).slice(0, 6);
      clearButton.hidden = !query;
      searchIndex = -1;
      input.removeAttribute('aria-activedescendant');
      input.setAttribute('aria-expanded', String(matches.length > 0));
      if (!matches.length) {
        results.innerHTML = '<div class="search-empty"><strong>No matching cabinets</strong><span>Try a cabinet type, width or “White Shaker”.</span><a href="' + root + 'category/">Browse all cabinets</a></div>';
        return;
      }
      results.innerHTML = matches.map((product, index) => `<a id="search-option-${index}" class="search-result" href="${root}product/" role="option" aria-selected="false" data-search-option><img src="${root}${product.image}" alt="" width="72" height="72"><span><small>${escapeHtml(product.type)}</small><strong>${escapeHtml(product.name)}</strong><em>${escapeHtml(product.detail)} · From ${money(product.price)}</em></span><b aria-hidden="true">→</b></a>`).join('');
    };

    const selectIndex = next => {
      const options = $$('[data-search-option]', results);
      if (!options.length) return;
      searchIndex = (next + options.length) % options.length;
      options.forEach((option, index) => option.setAttribute('aria-selected', String(index === searchIndex)));
      input.setAttribute('aria-activedescendant', options[searchIndex].id);
      options[searchIndex].scrollIntoView({ block: 'nearest' });
    };

    $$('[data-search-open]').forEach(button => button.addEventListener('click', () => {
      render('');
      openOverlay(panel, input);
    }));
    $('[data-search-close]')?.addEventListener('click', () => closeOverlay(panel));
    panel.addEventListener('click', event => { if (event.target === panel) closeOverlay(panel); });
    input.addEventListener('input', () => render(input.value));
    clearButton.addEventListener('click', () => {
      input.value = '';
      render('');
      input.focus();
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); selectIndex(searchIndex + 1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); selectIndex(searchIndex - 1); }
      if (event.key === 'Enter' && searchIndex >= 0) {
        event.preventDefault();
        $$('[data-search-option]', results)[searchIndex]?.click();
      }
    });
    form?.addEventListener('submit', event => {
      event.preventDefault();
      const first = $$('[data-search-option]', results)[Math.max(0, searchIndex)];
      if (first) first.click();
      else render(input.value);
    });
  }

  function initQualityTabs() {
    const tabs = $$('[data-quality-tab]');
    if (!tabs.length) return;
    const detailImage = $('[data-quality-image-target]');
    const detailCaption = $('[data-quality-caption-target]');
    const selectTab = tab => {
      tabs.forEach(candidate => candidate.setAttribute('aria-selected', String(candidate === tab)));
      $$('[data-quality-panel]').forEach(panel => {
        const active = panel.dataset.qualityPanel === tab.dataset.qualityTab;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });
      if (detailImage && tab.dataset.qualityImage) {
        detailImage.src = tab.dataset.qualityImage;
        if (tab.dataset.qualitySrcset) detailImage.srcset = tab.dataset.qualitySrcset;
        else detailImage.removeAttribute('srcset');
        if (tab.dataset.qualitySizes) detailImage.sizes = tab.dataset.qualitySizes;
        else detailImage.removeAttribute('sizes');
        detailImage.alt = tab.dataset.qualityAlt || '';
      }
      if (detailCaption && 'qualityCaption' in tab.dataset) detailCaption.textContent = tab.dataset.qualityCaption;
      tab.focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        selectTab(tabs[next]);
      });
    });
  }

  function initQuickView() {
    const modal = $('[data-quick-modal]');
    if (!modal) return;
    $$('[data-quick-view]').forEach(button => button.addEventListener('click', () => {
      const card = button.closest('[data-product-card]');
      const name = card?.dataset.name || 'Cabinet';
      const price = card?.dataset.price || 0;
      const image = card?.dataset.image || `${root}assets/images/generated/products/white-shaker-wall-cabinet-v2-600.webp`;
      $('[data-quick-name]', modal).textContent = name;
      $('[data-quick-price]', modal).textContent = `From ${money(price)}`;
      $('[data-quick-image]', modal).src = image;
      $('[data-quick-image]', modal).alt = name;
      openOverlay(modal, $('[data-modal-close]', modal));
    }));
    $('[data-modal-close]', modal)?.addEventListener('click', () => closeOverlay(modal));
    modal.addEventListener('click', event => { if (event.target === modal) closeOverlay(modal); });
  }

  function getFilterState() {
    const state = {};
    $$('[data-filter]:checked').forEach(input => {
      const group = input.dataset.filter;
      (state[group] ||= []).push(input.value);
    });
    return state;
  }

  function productMatches(card, state) {
    return Object.entries(state).every(([group, values]) => {
      if (!values.length) return true;
      if (group === 'price') {
        const price = Number(card.dataset.price);
        return values.some(value => value === 'under-250' ? price < 250 : value === '250-500' ? price >= 250 && price <= 500 : price > 500);
      }
      return values.includes(card.dataset[group]);
    });
  }

  function renderActiveFilters(state) {
    const holder = $('[data-active-filters]');
    if (!holder) return;
    holder.innerHTML = '<span class="filter-chip" data-default-chip>Collection: White Shaker</span>';
    const labels = { type: 'Type', width: 'Width', config: 'Configuration', price: 'Price' };
    Object.entries(state).forEach(([group, values]) => values.forEach(value => {
      const chip = document.createElement('span');
      chip.className = 'filter-chip';
      const readable = value.replace('under-', 'Under $').replace('over-', 'Over $').replace('250-500', '$250–$500').replace(/\b\w/g, letter => letter.toUpperCase());
      chip.innerHTML = `${labels[group]}: ${escapeHtml(readable)} <button type="button" aria-label="Remove ${escapeHtml(readable)} filter">×</button>`;
      chip.querySelector('button').addEventListener('click', () => {
        $$(`[data-filter="${group}"][value="${CSS.escape(value)}"]`).forEach(input => { input.checked = false; });
        $$(`[data-mobile-filter="${group}"][value="${CSS.escape(value)}"]`).forEach(input => { input.checked = false; });
        applyFilters();
      });
      holder.appendChild(chip);
    }));
  }

  function sortProducts() {
    const grid = $('[data-product-grid]');
    const sort = $('[data-sort]')?.value || 'featured';
    if (!grid) return;
    const cards = $$('[data-product-card]', grid);
    const sorted = [...cards].sort((a, b) => {
      if (sort === 'price-asc') return Number(a.dataset.price) - Number(b.dataset.price);
      if (sort === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price);
      if (sort === 'width-asc') return Number(a.dataset.width) - Number(b.dataset.width);
      return 0;
    });
    sorted.forEach(card => grid.appendChild(card));
  }

  function applyFilters() {
    const state = getFilterState();
    let shown = 0;
    $$('[data-product-grid] [data-product-card]').forEach(card => {
      const matches = productMatches(card, state);
      card.classList.toggle('hidden', !matches);
      if (matches) shown += 1;
    });
    if ($('[data-result-count]')) $('[data-result-count]').textContent = shown;
    $('[data-no-results]')?.classList.toggle('hidden', shown !== 0);
    const total = Object.values(state).reduce((sum, values) => sum + values.length, 0);
    if ($('[data-filter-total]')) $('[data-filter-total]').textContent = total ? `(${total})` : '';
    renderActiveFilters(state);
    sortProducts();
  }

  function initCategory() {
    if (page !== 'category') return;
    $$('[data-filter]').forEach(input => input.addEventListener('change', () => {
      $$(`[data-mobile-filter="${input.dataset.filter}"][value="${CSS.escape(input.value)}"]`).forEach(mobile => { mobile.checked = input.checked; });
      applyFilters();
    }));
    $$('[data-mobile-filter]').forEach(input => input.addEventListener('change', () => {
      $$(`[data-filter="${input.dataset.mobileFilter}"][value="${CSS.escape(input.value)}"]`).forEach(desktop => { desktop.checked = input.checked; });
    }));
    $$('[data-clear-filters]').forEach(button => button.addEventListener('click', () => {
      $$('[data-filter], [data-mobile-filter]').forEach(input => { input.checked = false; });
      applyFilters();
    }));
    $('[data-sort]')?.addEventListener('change', sortProducts);
    const drawer = $('[data-filter-drawer]');
    $('[data-filter-open]')?.addEventListener('click', () => openOverlay(drawer, $('[data-filter-close]')));
    $('[data-filter-close]')?.addEventListener('click', () => closeOverlay(drawer));
    $('[data-filter-apply]')?.addEventListener('click', () => { applyFilters(); closeOverlay(drawer); });
    drawer?.addEventListener('click', event => { if (event.target === drawer) closeOverlay(drawer); });

    const requestedType = new URLSearchParams(window.location.search).get('type');
    if (requestedType) {
      $$(`[data-filter="type"][value="${CSS.escape(requestedType)}"], [data-mobile-filter="type"][value="${CSS.escape(requestedType)}"]`).forEach(input => { input.checked = true; });
    }
    applyFilters();
  }

  function adjustQuantity(wrapper, difference) {
    const input = $('[data-qty-input]', wrapper);
    if (!input) return 1;
    const next = Math.min(99, Math.max(1, (Number(input.value) || 1) + difference));
    input.value = next;
    return next;
  }

  function initProduct() {
    if (page !== 'product') return;
    const price = $('[data-product-price]');
    const sku = $('[data-product-sku]');
    const detail = $('[data-selection-detail]');
    const dimensions = $('[data-spec-dimensions]');
    const shelves = $('[data-spec-shelves]');
    const addButton = $('[data-add-product]');
    const mobileAdd = $('[data-mobile-add]');
    let selected = null;

    $$('input[name="size"]').forEach(input => input.addEventListener('change', () => {
      selected = input;
      price.textContent = money(input.dataset.price);
      sku.textContent = input.dataset.sku;
      detail.textContent = `${input.dataset.dimensions} · ${input.dataset.shelves} adjustable shelves`;
      detail.classList.remove('selection-error');
      dimensions.textContent = input.dataset.dimensions;
      shelves.textContent = `${input.dataset.shelves} adjustable shelves`;
      addButton.disabled = false;
      mobileAdd.disabled = false;
      mobileAdd.dataset.mobileState = 'add';
      mobileAdd.textContent = 'Add to Cart';
      $('[data-mobile-selection]').textContent = input.dataset.dimensions;
      $('[data-mobile-price]').textContent = money(input.dataset.price);
    }));

    const addSelected = () => {
      if (!selected) {
        detail.textContent = 'Choose a cabinet size before adding it to your cart.';
        detail.classList.add('selection-error');
        $('#choose-size')?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
        window.setTimeout(() => $('input[name="size"]')?.focus(), reducedMotion ? 0 : 450);
        return;
      }
      const qty = Number($('[data-qty-input]')?.value) || 1;
      const cart = getCart();
      const existing = cart.find(item => item.id === selected.dataset.sku);
      if (existing) existing.qty += qty;
      else cart.push({ id: selected.dataset.sku, name: 'White Shaker 18″ Wall Cabinet', type: 'Wall cabinet', variation: selected.dataset.dimensions, price: Number(selected.dataset.price), sku: selected.dataset.sku, qty, image: 'assets/images/generated/products/white-shaker-wall-cabinet-v2-600.webp' });
      setCart(cart);
      showToast(`${qty} × ${selected.dataset.dimensions} added to cart.`);
    };
    addButton?.addEventListener('click', addSelected);
    mobileAdd?.addEventListener('click', addSelected);
    $$('[data-quantity]').forEach(wrapper => {
      $('[data-qty-minus]', wrapper)?.addEventListener('click', () => adjustQuantity(wrapper, -1));
      $('[data-qty-plus]', wrapper)?.addEventListener('click', () => adjustQuantity(wrapper, 1));
    });

    const mainImage = $('[data-gallery-main]');
    $$('[data-gallery-thumb]').forEach(button => button.addEventListener('click', () => {
      $$('[data-gallery-thumb], [data-gallery-diagram]').forEach(thumb => thumb.setAttribute('aria-current', 'false'));
      button.setAttribute('aria-current', 'true');
      if (button.dataset.gallerySrcset) mainImage.srcset = button.dataset.gallerySrcset;
      else mainImage.removeAttribute('srcset');
      if (button.dataset.gallerySizes) mainImage.sizes = button.dataset.gallerySizes;
      else mainImage.removeAttribute('sizes');
      mainImage.src = button.dataset.galleryThumb;
      mainImage.alt = button.dataset.galleryAlt;
      mainImage.classList.toggle('is-cover', button.dataset.galleryFit === 'cover');
    }));
    $('[data-gallery-diagram]')?.addEventListener('click', event => {
      $$('[data-gallery-thumb], [data-gallery-diagram]').forEach(thumb => thumb.setAttribute('aria-current', 'false'));
      event.currentTarget.setAttribute('aria-current', 'true');
      showToast('Exact dimensions update after a cabinet size is selected.');
      $('#choose-size')?.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
    });
    const galleryModal = $('[data-gallery-modal]');
    $('[data-gallery-zoom]')?.addEventListener('click', () => {
      $('[data-gallery-modal-image]').src = mainImage.currentSrc || mainImage.src;
      $('[data-gallery-modal-image]').alt = mainImage.alt;
      openOverlay(galleryModal, $('[data-gallery-close]'));
    });
    $('[data-gallery-close]')?.addEventListener('click', () => closeOverlay(galleryModal));
    galleryModal?.addEventListener('click', event => { if (event.target === galleryModal) closeOverlay(galleryModal); });
  }

  function fieldValue(form, name) {
    const field = form.elements[name];
    if (!field) return '';
    if (field instanceof RadioNodeList) return field.value;
    return field.type === 'checkbox' ? (field.checked ? 'Yes' : 'No') : field.value.trim();
  }

  function validateQuoteStep(form, step) {
    let valid = true;
    let firstInvalid = null;
    const panel = $(`[data-form-step="${step}"]`, form);
    $$('[required]', panel).forEach(field => {
      let fieldValid = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
      if (field.type === 'email' && field.value) fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      field.setAttribute('aria-invalid', String(!fieldValid));
      const error = $(`[data-error-for="${field.name}"]`, form);
      if (error) {
        error.textContent = fieldValid ? '' : field.type === 'checkbox' ? 'Please confirm before submitting.' : `Enter a valid ${field.name === 'fullName' ? 'name' : field.name}.`;
        field.setAttribute('aria-describedby', error.id);
      }
      if (!fieldValid && !firstInvalid) firstInvalid = field;
      valid = valid && fieldValid;
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  function saveQuoteDraft(form, announce = true) {
    const fields = {};
    $$('[name]', form).forEach(field => {
      if (field.type === 'file') return;
      if (field.type === 'radio') {
        if (field.checked) fields[field.name] = field.value;
      } else if (field.type === 'checkbox') fields[field.name] = field.checked;
      else fields[field.name] = field.value;
    });
    localStorage.setItem(QUOTE_KEY, JSON.stringify(fields));
    if (announce) showToast('Progress saved on this device. Selected files are not saved.');
  }

  function restoreQuoteDraft(form) {
    try {
      const draft = JSON.parse(localStorage.getItem(QUOTE_KEY) || '{}');
      Object.entries(draft).forEach(([name, value]) => {
        const field = form.elements[name];
        if (!field) return;
        if (field instanceof RadioNodeList) {
          $$(`[name="${CSS.escape(name)}"]`, form).forEach(radio => { radio.checked = radio.value === value; });
        } else if (field.type === 'checkbox') field.checked = Boolean(value);
        else field.value = value;
      });
    } catch (error) {
      localStorage.removeItem(QUOTE_KEY);
    }
  }

  function initQuote() {
    const form = $('[data-quote-form]');
    if (!form) return;
    restoreQuoteDraft(form);
    let currentStep = 1;
    const status = $('[data-form-status]', form);
    const showStep = (step, shouldScroll = true) => {
      currentStep = Math.min(4, Math.max(1, step));
      $$('[data-form-step]', form).forEach(panel => panel.classList.toggle('is-active', Number(panel.dataset.formStep) === currentStep));
      $$('[data-step-indicator]', form).forEach(indicator => {
        const number = Number(indicator.dataset.stepIndicator);
        indicator.classList.toggle('is-active', number === currentStep);
        indicator.classList.toggle('is-complete', number < currentStep);
        indicator.toggleAttribute('aria-current', number === currentStep);
        $('.step-circle', indicator).textContent = number < currentStep ? '✓' : String(number);
      });
      status.textContent = `Step ${currentStep} of 4: ${$(`[data-form-step="${currentStep}"] h3`, form)?.textContent || ''}`;
      if (shouldScroll) $('.form-content', form)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    };
    const buildReview = () => {
      const rows = [
        ['Name', fieldValue(form, 'fullName')], ['Contact', `${fieldValue(form, 'email')} · ${fieldValue(form, 'phone')}`],
        ['Preference', fieldValue(form, 'contactMethod')], ['Project', `${fieldValue(form, 'projectType')} · ${fieldValue(form, 'kitchenType')}`],
        ['ZIP / timeline', `${fieldValue(form, 'zip')} · ${fieldValue(form, 'timeline')}`], ['Collection', fieldValue(form, 'collection') || 'Not selected'],
        ['Measurements', fieldValue(form, 'measurements') || 'Not supplied'], ['Notes', fieldValue(form, 'notes') || 'Not supplied']
      ];
      $('[data-quote-review]', form).innerHTML = rows.map(([label, value]) => `<div class="review-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
    };
    $$('[data-next-step]', form).forEach(button => button.addEventListener('click', () => {
      if (!validateQuoteStep(form, currentStep)) { status.textContent = 'Please correct the highlighted field before continuing.'; return; }
      saveQuoteDraft(form, false);
      if (currentStep === 3) buildReview();
      showStep(currentStep + 1);
    }));
    $$('[data-prev-step]', form).forEach(button => button.addEventListener('click', () => showStep(currentStep - 1)));
    $('[data-save-quote]')?.addEventListener('click', () => saveQuoteDraft(form));
    $$('[data-file-input]', form).forEach(input => {
      const zone = input.closest('.upload-zone');
      const list = $('[data-file-list]', zone);
      input.addEventListener('change', () => {
        const files = Array.from(input.files || []);
        if (!files.length) { list.textContent = ''; return; }
        const allowed = /\.(pdf|jpe?g|png|heic)$/i;
        list.innerHTML = files.map(file => {
          const issue = !allowed.test(file.name) ? 'Unsupported type' : file.size > 12 * 1024 * 1024 ? 'Over 12 MB' : 'Selected';
          return `<span class="file-status ${issue === 'Selected' ? 'is-ready' : 'is-error'}">${escapeHtml(file.name)} · ${issue}</span>`;
        }).join('');
      });
      ['dragenter', 'dragover'].forEach(eventName => zone.addEventListener(eventName, event => { event.preventDefault(); zone.classList.add('is-dragging'); }));
      ['dragleave', 'drop'].forEach(eventName => zone.addEventListener(eventName, () => zone.classList.remove('is-dragging')));
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!validateQuoteStep(form, 4)) { status.textContent = 'Please confirm the required privacy statement.'; return; }
      const button = $('[data-quote-submit]', form);
      if (button.disabled) return;
      button.disabled = true;
      button.textContent = 'Preparing brief…';
      window.setTimeout(() => {
        form.classList.add('is-complete');
        $('[data-quote-success]', form).classList.add('is-visible');
        $('[data-submission-id]', form).textContent = `TC-DESIGN-${String(Date.now()).slice(-6)}`;
        localStorage.removeItem(QUOTE_KEY);
        $('[data-quote-success]', form).focus();
      }, reducedMotion ? 0 : 500);
    });
    $('[data-reset-quote]', form)?.addEventListener('click', () => {
      localStorage.removeItem(QUOTE_KEY);
      form.reset();
      form.classList.remove('is-complete');
      $('[data-quote-success]', form).classList.remove('is-visible');
      $('[data-quote-submit]', form).disabled = false;
      $('[data-quote-submit]', form).textContent = 'Complete Design Brief';
      showStep(1);
    });
    showStep(1, false);
  }

  function cartSubtotal(cart) {
    return cart.reduce((total, item) => total + Number(item.price) * Number(item.qty), 0);
  }

  function cartDiscount(subtotal) {
    return localStorage.getItem(COUPON_KEY) === 'DESIGN100' ? Math.min(100, subtotal) : 0;
  }

  function renderCart() {
    if (page !== 'cart') return;
    const cart = getCart();
    const holder = $('[data-cart-lines]');
    const layout = $('[data-cart-layout]');
    const empty = $('[data-empty-cart]');
    const isEmpty = cart.length === 0;
    holder?.setAttribute('tabindex', '-1');
    layout?.classList.toggle('hidden', isEmpty);
    empty?.classList.toggle('is-visible', isEmpty);
    if (!holder || isEmpty) { updateCartCount(); return; }
    holder.innerHTML = cart.map((item, index) => `<article class="cart-line" data-cart-index="${index}"><div class="cart-line-image"><img src="${root}${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" width="600" height="600"></div><div class="cart-line-copy"><span class="line-type">${escapeHtml(item.type || 'Cabinet')}</span><h2>${escapeHtml(item.name)}</h2><div class="line-meta"><span>${escapeHtml(item.variation)}</span><span>SKU: ${escapeHtml(item.sku)}</span></div><div class="line-unit-price">${money(item.price)} each</div><div class="line-actions"><div class="quantity"><button type="button" aria-label="Decrease ${escapeHtml(item.name)} quantity" data-cart-minus>−</button><input type="number" min="1" max="99" value="${Number(item.qty)}" aria-label="${escapeHtml(item.name)} quantity" data-cart-qty><button type="button" aria-label="Increase ${escapeHtml(item.name)} quantity" data-cart-plus>+</button></div><a class="text-link" href="${root}product/">Edit selection</a><button class="remove-item" type="button" data-remove-item>Remove</button></div></div><div class="line-price"><strong>${money(Number(item.price) * Number(item.qty))}</strong><small>${Number(item.qty)} ${Number(item.qty) === 1 ? 'cabinet' : 'cabinets'}</small></div></article>`).join('');
    $$('[data-cart-index]', holder).forEach(line => {
      const index = Number(line.dataset.cartIndex);
      const updateQty = difference => {
        const latest = getCart();
        latest[index].qty = Math.min(99, Math.max(1, Number(latest[index].qty) + difference));
        setCart(latest); renderCart(); showToast('Cart quantity updated.');
      };
      $('[data-cart-minus]', line).addEventListener('click', () => updateQty(-1));
      $('[data-cart-plus]', line).addEventListener('click', () => updateQty(1));
      $('[data-cart-qty]', line).addEventListener('change', event => {
        const latest = getCart(); latest[index].qty = Math.min(99, Math.max(1, Number(event.target.value) || 1)); setCart(latest); renderCart(); showToast('Cart quantity updated.');
      });
      $('[data-remove-item]', line).addEventListener('click', () => {
        const latest = getCart(); removedItem = { item: latest[index], index }; latest.splice(index, 1); setCart(latest); $('[data-undo-bar]').classList.add('is-visible'); renderCart(); $('[data-undo]')?.focus();
      });
    });
    updateCartTotals(cart);
  }

  function updateCartTotals(cart = getCart()) {
    const subtotal = cartSubtotal(cart);
    const discount = cartDiscount(subtotal);
    if ($('[data-cart-subtotal]')) $('[data-cart-subtotal]').textContent = money(subtotal);
    if ($('[data-cart-discount]')) $('[data-cart-discount]').textContent = discount ? `−${money(discount)}` : '—';
    if ($('[data-cart-total]')) $('[data-cart-total]').textContent = money(subtotal - discount);
  }

  function initCart() {
    if (page !== 'cart') return;
    renderCart();
    $('[data-undo]')?.addEventListener('click', () => {
      if (!removedItem) return;
      const cart = getCart(); cart.splice(removedItem.index, 0, removedItem.item); setCart(cart); removedItem = null; $('[data-undo-bar]').classList.remove('is-visible'); renderCart(); $('[data-cart-lines]')?.focus();
    });
    $('[data-coupon-toggle]')?.addEventListener('click', event => {
      const form = $('[data-coupon-form]'); const open = !form.classList.contains('is-open'); form.classList.toggle('is-open', open); event.currentTarget.setAttribute('aria-expanded', String(open)); if (open) $('[data-coupon-input]').focus();
    });
    $('[data-apply-coupon]')?.addEventListener('click', () => {
      const value = $('[data-coupon-input]').value.trim().toUpperCase(); const message = $('[data-coupon-message]');
      if (value === 'DESIGN100') { localStorage.setItem(COUPON_KEY, value); message.textContent = 'Coupon applied.'; message.style.color = 'var(--success)'; }
      else { localStorage.removeItem(COUPON_KEY); message.textContent = 'That coupon code is not recognized.'; message.style.color = 'var(--error)'; }
      updateCartTotals();
    });
    $('[data-estimate-shipping]')?.addEventListener('click', () => {
      const zip = $('[data-shipping-zip]').value.trim(); const output = $('[data-cart-shipping]');
      if (!/^\d{5}(-\d{4})?$/.test(zip)) { output.textContent = 'Enter a valid ZIP'; output.style.color = 'var(--error)'; return; }
      output.textContent = 'Calculated at checkout'; output.style.color = ''; showToast('ZIP code saved. Final shipping method and cost are confirmed during checkout.');
    });
  }

  function renderCheckout() {
    if (page !== 'checkout') return;
    const cart = getCart();
    const holder = $('[data-checkout-items]');
    if (holder) holder.innerHTML = cart.length ? cart.map(item => `<div class="checkout-item"><div class="checkout-item-image"><img src="${root}${escapeHtml(item.image)}" alt="" width="600" height="600"><span class="item-count">${Number(item.qty)}</span></div><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.variation)} · ${escapeHtml(item.sku)}</small></div><span class="checkout-item-price">${money(Number(item.price) * Number(item.qty))}</span></div>`).join('') : '<p>Your cart is empty. <a href="../category/">Return to the collection</a>.</p>';
    updateCheckoutTotals();
  }

  function updateCheckoutTotals() {
    const cart = getCart();
    const subtotal = cartSubtotal(cart);
    const discount = cartDiscount(subtotal);
    const total = Math.max(0, subtotal - discount);
    if ($('[data-checkout-subtotal]')) $('[data-checkout-subtotal]').textContent = money(total);
    if ($('[data-checkout-shipping]')) $('[data-checkout-shipping]').textContent = 'To be confirmed';
    if ($('[data-checkout-total]')) $('[data-checkout-total]').textContent = money(total);
    if ($('[data-mobile-checkout-total]')) $('[data-mobile-checkout-total]').textContent = money(total);
  }

  function setCheckoutProgress(step, state = 'active') {
    $$('[data-checkout-progress]').forEach(item => {
      const number = Number(item.dataset.checkoutProgress);
      item.classList.toggle('is-active', number === step && state === 'active');
      item.classList.toggle('is-error', number === step && state === 'error');
      item.classList.toggle('is-complete', number < step || state === 'complete');
      item.toggleAttribute('aria-current', number === step && state !== 'complete');
    });
  }

  function showFieldError(field, message) {
    field.setAttribute('aria-invalid', String(Boolean(message)));
    let error = field.parentElement.querySelector('.checkout-field-error');
    if (!error) {
      error = document.createElement('span');
      error.className = 'checkout-field-error';
      error.id = `error-${field.name}`;
      field.insertAdjacentElement('afterend', error);
    }
    error.textContent = message;
    field.setAttribute('aria-describedby', error.id);
  }

  function formatCard(input) {
    const digits = input.value.replace(/\D/g, '').slice(0, 16);
    input.value = digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function initCheckout() {
    if (page !== 'checkout') return;
    renderCheckout();
    $('[data-summary-toggle]')?.addEventListener('click', event => {
      const side = $('[data-checkout-summary-side]'); const open = !side.classList.contains('is-open'); side.classList.toggle('is-open', open); event.currentTarget.setAttribute('aria-expanded', String(open)); $('span', event.currentTarget).textContent = open ? 'Hide order summary' : 'Show order summary';
    });
    $$('[data-checkout-step]').forEach(section => section.addEventListener('focusin', () => setCheckoutProgress(Number(section.dataset.checkoutStep))));
    $$('input[name="shippingMethod"]').forEach(input => input.addEventListener('change', () => {
      $$('input[name="shippingMethod"]').forEach(option => option.closest('.payment-method')?.classList.toggle('is-active', option.checked));
      updateCheckoutTotals();
    }));
    $$('input[name="paymentMethod"]').forEach(input => input.addEventListener('change', () => {
      $$('[data-payment-method]').forEach(method => method.classList.toggle('is-active', $('input[name="paymentMethod"]', method)?.checked));
      const card = input.value === 'card' && input.checked;
      ['cardNumber', 'cardExpiry', 'cardCvc', 'cardName'].forEach(name => { const field = $(`[name="${name}"]`); if (field) field.required = card; });
    }));
    $('[name="cardNumber"]')?.addEventListener('input', event => formatCard(event.target));
    $('[name="cardExpiry"]')?.addEventListener('input', event => {
      let digits = event.target.value.replace(/\D/g, '').slice(0, 4); if (digits.length > 2) digits = `${digits.slice(0, 2)} / ${digits.slice(2)}`; event.target.value = digits;
    });
    const form = $('[data-checkout-form]');
    form?.addEventListener('input', event => { if (event.target.matches('[aria-invalid="true"]')) showFieldError(event.target, ''); });
    form?.addEventListener('submit', event => {
      event.preventDefault();
      let firstInvalid = null;
      let invalidStep = 1;
      $$('[required]', form).forEach(field => {
        const hiddenPaymentField = field.closest('.payment-fields') && !field.closest('.payment-method').classList.contains('is-active');
        let valid = hiddenPaymentField || (field.type === 'checkbox' ? field.checked : field.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) : field.value.trim() !== '');
        if (!hiddenPaymentField && field.name === 'cardNumber') valid = field.value.replace(/\D/g, '').length >= 15;
        if (!hiddenPaymentField && field.name === 'cardExpiry') valid = field.value.replace(/\D/g, '').length === 4;
        if (!hiddenPaymentField && field.name === 'cardCvc') valid = field.value.replace(/\D/g, '').length >= 3;
        showFieldError(field, valid ? '' : field.type === 'checkbox' ? 'Please confirm this requirement.' : 'This field is required.');
        if (!valid && !firstInvalid) {
          firstInvalid = field;
          invalidStep = Number(field.closest('[data-checkout-step]')?.dataset.checkoutStep || 1);
        }
      });
      const error = $('[data-checkout-error]');
      if (firstInvalid) {
        error.textContent = `Please review step ${invalidStep} and correct the highlighted field.`;
        error.classList.add('is-visible');
        setCheckoutProgress(invalidStep, 'error');
        firstInvalid.focus();
        return;
      }
      const payment = $('input[name="paymentMethod"]:checked')?.value;
      const cardDigits = $('[name="cardNumber"]')?.value.replace(/\D/g, '') || '';
      if (payment === 'card' && cardDigits.endsWith('0002')) {
        error.textContent = 'The card number could not be authorized. Review the number or try another card.';
        error.classList.add('is-visible');
        showFieldError($('[name="cardNumber"]'), 'This card number could not be authorized.');
        setCheckoutProgress(3, 'error');
        $('[name="cardNumber"]').focus();
        return;
      }
      error.classList.remove('is-visible');
      setCheckoutProgress(4);
      const button = $('[data-place-order]');
      if (button.disabled) return;
      button.disabled = true;
      button.textContent = 'Reviewing details…';
      window.setTimeout(() => {
        $('[data-checkout-layout]').classList.add('hidden');
        $('[data-summary-toggle]')?.classList.add('hidden');
        const confirmation = $('[data-order-confirmation]');
        confirmation.classList.add('is-visible');
        $('[data-confirmation-name]').textContent = form.elements.firstName.value || 'customer';
        $('[data-confirmation-email]').textContent = form.elements.email.value;
        $('[data-confirmation-order]').textContent = `TC-ORDER-${String(Date.now()).slice(-5)}`;
        setCheckoutProgress(4, 'complete');
        setCart([]);
        confirmation.focus();
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
      }, reducedMotion ? 0 : 650);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initShell();
    initQualityTabs();
    initQuickView();
    initCategory();
    initProduct();
    initQuote();
    initCart();
    initCheckout();
  });
})();
