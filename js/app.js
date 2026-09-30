// ===== CHRONOS ELITE - SHARED UTILITIES =====
'use strict';

// ===== CART & WISHLIST STATE (shared across pages) =====
let cart = JSON.parse(localStorage.getItem('ce_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('ce_wishlist') || '[]');

// ===== SAVE =====
function saveCart() { localStorage.setItem('ce_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('ce_wishlist', JSON.stringify(wishlist)); }

// ===== FORMAT PRICE =====
function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price * 88);
}

// ===== CART OPERATIONS =====
function addToCart(productId, event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.inStock) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty += 1; } else { cart.push({ id: productId, qty: 1 }); }
  saveCart();
  updateCartBadges();
  renderCartItems();
  showToast('Добавлено в корзину', product.name, 'cart');
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadges();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartBadges();
  renderCartItems();
}

function updateCartBadges() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total;
    el.classList.toggle('visible', total > 0);
  });
}

// ===== WISHLIST OPERATIONS =====
function toggleWishlistItem(productId, event) {
  if (event) { event.stopPropagation(); event.preventDefault(); }
  const product = PRODUCTS.find(p => p.id === productId);
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    if (product) showToast('Добавлено в избранное', product.name, 'wish');
  } else {
    wishlist.splice(idx, 1);
  }
  saveWishlist();
  updateWishlistBadges();
  // update all wish-buttons for this product on page
  document.querySelectorAll(`.wish-btn[data-id="${productId}"]`).forEach(btn => {
    const isNow = wishlist.includes(productId);
    btn.classList.toggle('wishlisted', isNow);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isNow ? 'currentColor' : 'none');
  });
  renderWishlistItems();
}

function updateWishlistBadges() {
  document.querySelectorAll('.wishlist-badge').forEach(el => {
    el.textContent = wishlist.length;
    el.classList.toggle('visible', wishlist.length > 0);
  });
}

// ===== RENDER CART ITEMS =====
function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p>Ваша корзина пуста</p>
        <a href="catalog.html" class="btn-primary" onclick="toggleCart()">Перейти в каталог</a>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  let totalPrice = 0;
  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    totalPrice += lineTotal;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${getImgPath(p.image)}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22/></svg>'"/>
        <div class="cart-item-info">
          <div class="cart-item-brand">${p.brand}</div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price)} / шт</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${p.id},-1)" aria-label="Уменьшить">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id},1)" aria-label="Увеличить">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${p.id})">Удалить</button>
          </div>
        </div>
        <div class="cart-item-total">
          <div class="cart-item-total-price">${formatPrice(lineTotal)}</div>
        </div>
      </div>`;
  }).join('');

  if (footer) footer.style.display = '';
  if (totalEl) totalEl.textContent = formatPrice(totalPrice);
}

// ===== RENDER WISHLIST =====
function renderWishlistItems() {
  const container = document.getElementById('wishlistItems');
  if (!container) return;
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>Список избранного пуст</p>
        <a href="catalog.html" class="btn-primary" onclick="toggleWishlist()">Перейти в каталог</a>
      </div>`;
    return;
  }
  container.innerHTML = wishlist.map(id => {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (!p) return '';
    return `
      <div class="wishlist-item">
        <img class="wishlist-item-img" src="${getImgPath(p.image)}" alt="${p.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23222%22 width=%22100%22 height=%22100%22/></svg>'"/>
        <div class="cart-item-info">
          <div class="cart-item-brand">${p.brand}</div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button class="btn-add-cart" style="flex:1;font-size:0.68rem;padding:8px;" onclick="addToCart(${p.id},event)">В корзину</button>
            <button class="qty-btn" style="width:32px;" onclick="toggleWishlistItem(${p.id},event)" aria-label="Удалить из избранного">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ===== PRODUCT CARD =====
function createProductCard(product, extraClass = '', imgPrefix = '') {
  const isWishlisted = wishlist.includes(product.id);
  const imgSrc = imgPrefix + product.image;
  const detailUrl = `${imgPrefix}product.html?id=${product.id}`;
  const badges = (product.badges || []).map(b => {
    const labels = { new:'Новинка', sale:'Скидка', exclusive:'Эксклюзив', limited:'Лимитировано' };
    return `<span class="badge-tag badge-${b}">${labels[b] || b}</span>`;
  }).join('');
  const stars = Array.from({length:5}, (_, i) =>
    `<svg class="star ${i < product.rating ? '' : 'empty'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
  ).join('');
  const priceDisplay = product.oldPrice
    ? `<span class="price-current">${formatPrice(product.price)}</span>
       <span class="price-old">${formatPrice(product.oldPrice)}</span>
       <span class="price-save">−${Math.round((1 - product.price/product.oldPrice)*100)}%</span>`
    : `<span class="price-current">${formatPrice(product.price)}</span>`;

  return `
    <div class="product-card ${extraClass}">
      <div class="product-image-wrap">
        <div class="product-badges">${badges}</div>
        <a href="${detailUrl}">
          <img class="product-image" src="${imgSrc}" alt="${product.brand} ${product.name}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><rect fill=%22%23181818%22 width=%22400%22 height=%22400%22/><text x=%22200%22 y=%22200%22 fill=%22%23444%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2240%22>⌚</text></svg>'"/>
        </a>
        <div class="product-actions-hover">
          <button class="product-action-btn wish-btn ${isWishlisted ? 'wishlisted' : ''}" data-id="${product.id}" onclick="toggleWishlistItem(${product.id}, event)" title="${isWishlisted ? 'Убрать из избранного' : 'В избранное'}" aria-label="Избранное">
            <svg xmlns="http://www.w3.org/2000/svg" fill="${isWishlisted ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="${detailUrl}" class="product-action-btn" title="Подробнее" aria-label="Подробнее">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </a>
          <button class="product-action-btn" onclick="addToCart(${product.id}, event)" title="В корзину" aria-label="В корзину">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
        <a href="${detailUrl}" class="quick-view-btn">Подробнее</a>
      </div>
      <a href="${detailUrl}" class="product-info">
        <div class="product-brand">${product.brand}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-model">${product.model}</div>
        <div class="product-rating">
          <div class="stars">${stars}</div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-price">${priceDisplay}</div>
      </a>
      <div class="product-card-footer">
        ${product.inStock
          ? `<button class="btn-add-cart" onclick="addToCart(${product.id}, event)">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
               В корзину
             </button>`
          : `<button class="btn-add-cart" disabled style="opacity:0.45;cursor:not-allowed;">Нет в наличии</button>`
        }
      </div>
    </div>`;
}

// ===== IMAGE PATH HELPER =====
// Each page may be in root or subdir — adjust prefix as needed
function getImgPath(img) {
  return img; // All pages are in root, so no prefix needed
}

// ===== CART DRAWER TOGGLE =====
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (!isOpen) {
    renderCartItems();
    const wishDrawer = document.getElementById('wishlistDrawer');
    if (wishDrawer?.classList.contains('open')) toggleWishlist();
  }
  drawer.classList.toggle('open', !isOpen);
  overlay?.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ===== WISHLIST DRAWER TOGGLE =====
function toggleWishlist() {
  const drawer = document.getElementById('wishlistDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  const isOpen = drawer.classList.contains('open');
  if (!isOpen) {
    renderWishlistItems();
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartDrawer?.classList.contains('open')) toggleCart();
  }
  drawer.classList.toggle('open', !isOpen);
  overlay?.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ===== SEARCH TOGGLE =====
let searchOpen = false;
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  if (!bar) return;
  searchOpen = !searchOpen;
  bar.style.display = searchOpen ? 'block' : 'none';
  if (searchOpen) setTimeout(() => document.getElementById('navSearchInput')?.focus(), 80);
}
function handleNavSearch(value) {
  if (!value || value.length < 2) return;
  window.location.href = `catalog.html?q=${encodeURIComponent(value)}`;
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  btn?.classList.toggle('active');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  const handler = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 50);
    document.getElementById('backToTop')?.classList.toggle('visible', scrollY > 400);
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = maxScroll > 0 ? (scrollY / maxScroll * 100) + '%' : '0%';
    initReveal();
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler(); // run once
}

// ===== REVEAL =====
function initReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60)
      el.classList.add('visible');
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(id, from, to, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))).toLocaleString('ru');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ===== CHECKOUT =====
let checkoutStep = 1;
let checkoutData = {};

function openCheckout() {
  checkoutStep = 1;
  checkoutData = {};
  toggleCart();
  setTimeout(() => {
    const overlay = document.getElementById('checkoutOverlay');
    const stepsEl = document.getElementById('checkoutSteps');
    if (stepsEl) stepsEl.style.display = '';
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCheckoutStep();
  }, 380);
}
function closeCheckout(event) {
  if (event && event.target !== document.getElementById('checkoutOverlay')) return;
  closeCheckoutDirect();
}
function closeCheckoutDirect() {
  document.getElementById('checkoutOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function updateCheckoutStepUI() {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`step-${i}`);
    if (!el) continue;
    el.classList.remove('active', 'completed');
    if (i < checkoutStep) el.classList.add('completed');
    else if (i === checkoutStep) el.classList.add('active');
  }
}
function renderCheckoutStep() {
  updateCheckoutStepUI();
  const body = document.getElementById('checkoutBody');
  if (!body) return;
  if (checkoutStep === 1) {
    body.innerHTML = `
      <div class="checkout-section-title">Личные данные</div>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Имя *</label>
          <input type="text" class="form-input" id="co-fname" placeholder="Александр" value="${checkoutData.fname||''}" autocomplete="given-name"/>
        </div>
        <div class="form-group">
          <label class="form-label">Фамилия *</label>
          <input type="text" class="form-input" id="co-lname" placeholder="Петров" value="${checkoutData.lname||''}" autocomplete="family-name"/>
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" class="form-input" id="co-email" placeholder="alex@example.com" value="${checkoutData.email||''}" autocomplete="email"/>
        </div>
        <div class="form-group">
          <label class="form-label">Телефон *</label>
          <input type="tel" class="form-input" id="co-phone" placeholder="+7 (999) 000-00-00" value="${checkoutData.phone||''}" autocomplete="tel"/>
        </div>
      </div>
      <div class="checkout-nav">
        <button class="btn-secondary" onclick="closeCheckoutDirect()">Отмена</button>
        <button class="btn-primary" onclick="goToStep2()">Далее →</button>
      </div>`;
  } else if (checkoutStep === 2) {
    body.innerHTML = `
      <div class="checkout-section-title">Адрес доставки</div>
      <div class="form-grid">
        <div class="form-group full">
          <label class="form-label">Город *</label>
          <input type="text" class="form-input" id="co-city" placeholder="Москва" value="${checkoutData.city||''}" autocomplete="address-level2"/>
        </div>
        <div class="form-group full">
          <label class="form-label">Улица и дом *</label>
          <input type="text" class="form-input" id="co-address" placeholder="ул. Тверская, д. 1" value="${checkoutData.address||''}" autocomplete="street-address"/>
        </div>
        <div class="form-group">
          <label class="form-label">Квартира / офис</label>
          <input type="text" class="form-input" id="co-apt" placeholder="42" value="${checkoutData.apt||''}"/>
        </div>
        <div class="form-group">
          <label class="form-label">Почтовый индекс</label>
          <input type="text" class="form-input" id="co-zip" placeholder="123456" value="${checkoutData.zip||''}" autocomplete="postal-code"/>
        </div>
        <div class="form-group full">
          <label class="form-label">Комментарий</label>
          <input type="text" class="form-input" id="co-note" placeholder="Позвоните за час до приезда" value="${checkoutData.note||''}"/>
        </div>
      </div>
      <div style="background:var(--dark-3);border:1px solid rgba(201,168,76,0.12);border-radius:8px;padding:16px;margin-bottom:24px;display:flex;align-items:center;gap:14px;">
        <svg style="width:24px;height:24px;color:var(--gold);flex-shrink:0;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        <div>
          <div style="font-size:0.82rem;color:var(--white);font-weight:600;margin-bottom:2px;">Бесплатная доставка с охраной</div>
          <div style="font-size:0.75rem;color:var(--gray-3);">Инкассаторский автомобиль, страхование груза, курьер в перчатках</div>
        </div>
      </div>
      <div class="checkout-nav">
        <button class="btn-secondary" onclick="checkoutStep=1;renderCheckoutStep()">← Назад</button>
        <button class="btn-primary" onclick="goToStep3()">Далее →</button>
      </div>`;
  } else if (checkoutStep === 3) {
    const cartTotal = cart.reduce((s, i) => { const p = PRODUCTS.find(pr => pr.id === i.id); return s + (p ? p.price * i.qty : 0); }, 0);
    const orderItems = cart.map(i => { const p = PRODUCTS.find(pr => pr.id === i.id); return p ? `<div class="order-line"><span class="label">${p.brand} ${p.name} ×${i.qty}</span><span class="value">${formatPrice(p.price * i.qty)}</span></div>` : ''; }).join('');
    body.innerHTML = `
      <div class="checkout-section-title">Способ оплаты</div>
      <div class="payment-methods">
        <div class="payment-method selected" id="pm-card" onclick="selectPayment('card')">
          <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="31" height="23" rx="3.5" stroke="currentColor" stroke-opacity="0.3"/><rect y="5" width="32" height="5" fill="currentColor" fill-opacity="0.1"/><rect x="3" y="14" width="8" height="2" rx="1" fill="currentColor" fill-opacity="0.4"/></svg>
          <span>Банковская карта</span>
        </div>
        <div class="payment-method" id="pm-sbp" onclick="selectPayment('sbp')">
          <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="31" height="23" rx="3.5" stroke="currentColor" stroke-opacity="0.3"/><text x="16" y="16" fill="currentColor" font-size="8" text-anchor="middle" opacity="0.7">СБП</text></svg>
          <span>СБП</span>
        </div>
        <div class="payment-method" id="pm-transfer" onclick="selectPayment('transfer')">
          <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="31" height="23" rx="3.5" stroke="currentColor" stroke-opacity="0.3"/><text x="16" y="16" fill="currentColor" font-size="6" text-anchor="middle" opacity="0.7">Перевод</text></svg>
          <span>Банк. перевод</span>
        </div>
      </div>
      <div id="cardFields" class="form-grid">
        <div class="form-group full">
          <label class="form-label">Номер карты</label>
          <input type="text" class="form-input" id="co-cardnum" placeholder="0000 0000 0000 0000" maxlength="19" oninput="formatCard(this)" value="${checkoutData.cardnum||''}" autocomplete="cc-number"/>
        </div>
        <div class="form-group">
          <label class="form-label">Срок действия</label>
          <input type="text" class="form-input" id="co-expiry" placeholder="MM/YY" maxlength="5" oninput="formatExpiry(this)" value="${checkoutData.expiry||''}" autocomplete="cc-exp"/>
        </div>
        <div class="form-group">
          <label class="form-label">CVV</label>
          <input type="password" class="form-input" id="co-cvv" placeholder="•••" maxlength="3" value="${checkoutData.cvv||''}" autocomplete="cc-csc"/>
        </div>
        <div class="form-group full">
          <label class="form-label">Имя на карте</label>
          <input type="text" class="form-input" id="co-cardholder" placeholder="ALEXANDER PETROV" style="text-transform:uppercase;" value="${checkoutData.cardholder||''}" autocomplete="cc-name"/>
        </div>
      </div>
      <div class="checkout-section-title" style="margin-top:8px;">Ваш заказ</div>
      <div class="order-summary">
        ${orderItems}
        <div class="order-line"><span class="label">Доставка</span><span class="value" style="color:var(--success);">Бесплатно</span></div>
        <div class="order-line total"><span class="label">К оплате</span><span class="value">${formatPrice(cartTotal)}</span></div>
      </div>
      <div class="checkout-nav">
        <button class="btn-secondary" onclick="checkoutStep=2;renderCheckoutStep()">← Назад</button>
        <button class="btn-primary" id="payBtn" onclick="submitOrder()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Оплатить заказ
        </button>
      </div>`;
    checkoutData.payment = 'card';
  }
}

function goToStep2() {
  const fname = document.getElementById('co-fname')?.value.trim();
  const lname = document.getElementById('co-lname')?.value.trim();
  const email = document.getElementById('co-email')?.value.trim();
  const phone = document.getElementById('co-phone')?.value.trim();
  if (!fname || !lname || !email || !phone) { showToast('Ошибка', 'Заполните все обязательные поля', 'error'); return; }
  if (!email.includes('@')) { showToast('Ошибка', 'Введите корректный email', 'error'); return; }
  Object.assign(checkoutData, { fname, lname, email, phone });
  checkoutStep = 2; renderCheckoutStep();
}

function goToStep3() {
  const city = document.getElementById('co-city')?.value.trim();
  const address = document.getElementById('co-address')?.value.trim();
  if (!city || !address) { showToast('Ошибка', 'Укажите город и адрес доставки', 'error'); return; }
  Object.assign(checkoutData, { city, address, apt: document.getElementById('co-apt')?.value, zip: document.getElementById('co-zip')?.value, note: document.getElementById('co-note')?.value });
  checkoutStep = 3; renderCheckoutStep();
}

function selectPayment(method) {
  checkoutData.payment = method;
  document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
  document.getElementById(`pm-${method}`)?.classList.add('selected');
  const cf = document.getElementById('cardFields');
  if (cf) cf.style.display = method === 'card' ? 'grid' : 'none';
}

function submitOrder() {
  if (checkoutData.payment === 'card') {
    const cardnum = document.getElementById('co-cardnum')?.value.replace(/\s/g,'');
    const expiry = document.getElementById('co-expiry')?.value;
    const cvv = document.getElementById('co-cvv')?.value;
    if (!cardnum || cardnum.length < 16 || !expiry || cvv?.length < 3) { showToast('Ошибка', 'Проверьте данные карты', 'error'); return; }
  }
  const btn = document.getElementById('payBtn');
  if (btn) { btn.textContent = 'Обработка…'; btn.disabled = true; }
  setTimeout(() => {
    const orderId = 'CE-' + Date.now().toString(36).toUpperCase().slice(-8);
    cart = []; saveCart(); updateCartBadges();
    const body = document.getElementById('checkoutBody');
    if (body) body.innerHTML = `
      <div class="success-screen">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 class="success-title">Заказ оформлен!</h2>
        <p class="success-text">Спасибо, ${checkoutData.fname}! Ваш заказ принят и обрабатывается.<br>Детали отправим на <strong>${checkoutData.email}</strong></p>
        <div class="order-id">Номер заказа: ${orderId}</div>
        <a href="index.html" class="btn-primary" style="margin:0 auto;" onclick="closeCheckoutDirect()">На главную</a>
      </div>`;
    document.getElementById('checkoutSteps').style.display = 'none';
  }, 2000);
}

function formatCard(input) {
  let v = input.value.replace(/\D/g,'').substring(0,16);
  input.value = v.replace(/(\d{4})(?=\d)/g,'$1 ');
}
function formatExpiry(input) {
  let v = input.value.replace(/\D/g,'').substring(0,4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  input.value = v;
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  const email = input?.value.trim();
  if (!email || !email.includes('@')) { showToast('Ошибка', 'Введите корректный email адрес', 'error'); return; }
  showToast('Подписка оформлена!', 'Вы первым узнаете о новинках и эксклюзивных предложениях', 'success');
  if (input) input.value = '';
}

// ===== TOAST =====
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const iconMap = {
    cart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" style="color:var(--gold);width:20px;height:20px;"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    wish: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" style="color:var(--red);width:20px;height:20px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:var(--success);width:20px;height:20px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color:var(--red);width:20px;height:20px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">${iconMap[type] || iconMap.success}</div>
    <div><div class="toast-title">${title}</div>${message ? `<div class="toast-text">${message}</div>` : ''}</div>
    <div class="toast-bar"></div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 350); }, 3200);
}

// ===== SCROLL TO TOP =====
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ===== KEYBOARD =====
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('cartDrawer')?.classList.contains('open')) toggleCart();
  if (document.getElementById('wishlistDrawer')?.classList.contains('open')) toggleWishlist();
  if (document.getElementById('checkoutOverlay')?.classList.contains('open')) closeCheckoutDirect();
  if (document.getElementById('productModalOverlay')?.classList.contains('open')) closeProductModalDirect?.();
  if (searchOpen) toggleSearch();
  closeMobileMenu();
});

// ===== SHARED NAV HTML SNIPPET =====
// Used by all pages — rendered inline in each HTML file
