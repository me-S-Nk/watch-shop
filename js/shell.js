// ===== CHRONOS ELITE - PAGE SHELL (nav, footer, drawers, modals) =====
// This file injects shared HTML into every page once DOM is ready.
(function () {
  'use strict';

  function initShell() {
    // Detect current page for active nav link
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const isHome    = page === '' || page === 'index.html';
    const isCatalog = page === 'catalog.html';
    const isAbout   = page === 'about.html';
    const isContact = page === 'contacts.html';

    function activeIf(condition) { return condition ? 'active' : ''; }

    // ── NAV ──────────────────────────────────────────────────────────────
    const navHTML = `
<div class="scroll-progress"><div class="scroll-progress-bar" id="scrollProgress"></div></div>
<div id="loading-screen">
  <div class="loading-logo">MEGA LUX</div>
  <div class="loading-bar"></div>
</div>
<div class="toast-container" id="toastContainer"></div>

<div class="announcement-bar" id="announcementBar">
  <span>✦</span>&nbsp; Бесплатная доставка при заказе от 500 000 ₽ &nbsp;<span>|</span>&nbsp;
  Гарантия подлинности &nbsp;<span>|</span>&nbsp; Поддержка 24/7 &nbsp;<span>✦</span>
</div>

<nav class="navbar" id="navbar">
  <div class="navbar-inner">
    <a href="index.html" class="nav-logo">
      <span class="nav-logo-main">MEGA LUX</span>
      <span class="nav-logo-sub">Swiss Horology Since 1987</span>
    </a>

    <ul class="nav-menu" id="navMenu">
      <li><a href="index.html" class="nav-link ${activeIf(isHome)}">Главная</a></li>
      <li class="mega-menu-wrapper">
        <a href="catalog.html" class="nav-link ${activeIf(isCatalog)}">Коллекции</a>
        <div class="mega-menu">
          <div class="mega-menu-grid">
            <div class="mega-menu-col">
              <h4>По бренду</h4>
              <a href="catalog.html?brand=Rolex"              class="mega-menu-link">Rolex</a>
              <a href="catalog.html?brand=Patek+Philippe"     class="mega-menu-link">Patek Philippe</a>
              <a href="catalog.html?brand=Audemars+Piguet"   class="mega-menu-link">Audemars Piguet</a>
              <a href="catalog.html?brand=Richard+Mille"      class="mega-menu-link">Richard Mille</a>
              <a href="catalog.html?brand=Hublot"             class="mega-menu-link">Hublot</a>
              <a href="catalog.html"                          class="mega-menu-link" style="color:var(--gold);margin-top:6px;">Все бренды →</a>
            </div>
            <div class="mega-menu-col">
              <h4>По стилю</h4>
              <a href="catalog.html?category=sport"    class="mega-menu-link">Спортивные</a>
              <a href="catalog.html?category=dress"    class="mega-menu-link">Классические</a>
              <a href="catalog.html?badge=limited"     class="mega-menu-link">Лимитированные</a>
              <a href="catalog.html?badge=new"         class="mega-menu-link">Новинки</a>
              <a href="catalog.html?badge=sale"        class="mega-menu-link">Специальные цены</a>
            </div>
            <div class="mega-menu-col">
              <h4>По цене</h4>
              <a href="catalog.html?maxprice=2000000"         class="mega-menu-link">до 2 000 000 ₽</a>
              <a href="catalog.html?minprice=2000000&maxprice=6000000" class="mega-menu-link">2 — 6 млн ₽</a>
              <a href="catalog.html?minprice=6000000"         class="mega-menu-link">от 6 млн ₽</a>
            </div>
          </div>
        </div>
      </li>
      <li><a href="catalog.html?badge=new"     class="nav-link">Новинки</a></li>
      <li><a href="catalog.html?badge=limited" class="nav-link">Лимитированные</a></li>
      <li><a href="about.html"    class="nav-link ${activeIf(isAbout)}">О нас</a></li>
      <li><a href="contacts.html" class="nav-link ${activeIf(isContact)}">Контакты</a></li>
    </ul>

    <div class="nav-actions">
      <button class="nav-btn" id="searchToggleBtn" onclick="toggleSearch()" aria-label="Поиск">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </button>
      <button class="nav-btn" onclick="toggleWishlist()" aria-label="Избранное" title="Избранное">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <span class="badge wishlist-badge">0</span>
      </button>
      <button class="nav-btn" onclick="toggleCart()" aria-label="Корзина" title="Корзина">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span class="badge cart-badge">0</span>
      </button>
      <button class="hamburger" id="hamburger" onclick="toggleMobileMenu()" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Search Bar -->
  <div id="searchBar" style="display:none;background:rgba(5,5,5,0.98);border-top:1px solid rgba(201,168,76,0.2);padding:16px 24px;backdrop-filter:blur(20px);">
    <div style="max-width:600px;margin:0 auto;position:relative;">
      <svg style="position:absolute;left:14px;top:50%;transform:translateY(-50%);width:18px;height:18px;color:var(--gray-2);" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input id="navSearchInput" type="search" placeholder="Поиск: бренд, модель, артикул…"
        style="width:100%;background:var(--dark-3);border:1px solid rgba(201,168,76,0.2);color:var(--white);padding:12px 16px 12px 46px;border-radius:var(--radius);font-size:0.92rem;outline:none;"
        onkeydown="if(event.key==='Enter')handleNavSearch(this.value)"
        oninput="if(this.value.length>2)handleNavSearch(this.value)"/>
    </div>
  </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu" id="mobileMenu">
  <ul class="mobile-menu-links">
    <li><a href="index.html"              class="mobile-menu-link" onclick="closeMobileMenu()">Главная</a></li>
    <li><a href="catalog.html"            class="mobile-menu-link" onclick="closeMobileMenu()">Все коллекции</a></li>
    <li><a href="catalog.html?category=sport"   class="mobile-menu-link" onclick="closeMobileMenu()">Спортивные часы</a></li>
    <li><a href="catalog.html?category=dress"   class="mobile-menu-link" onclick="closeMobileMenu()">Классические часы</a></li>
    <li><a href="catalog.html?badge=limited"    class="mobile-menu-link" onclick="closeMobileMenu()">Лимитированные</a></li>
    <li><a href="catalog.html?badge=new"        class="mobile-menu-link" onclick="closeMobileMenu()">Новинки</a></li>
    <li><a href="about.html"              class="mobile-menu-link" onclick="closeMobileMenu()">О нас</a></li>
    <li><a href="contacts.html"           class="mobile-menu-link" onclick="closeMobileMenu()">Контакты</a></li>
  </ul>
  <div style="margin-top:32px;padding-top:24px;border-top:1px solid var(--dark-4);">
    <div style="font-size:0.68rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--gold);margin-bottom:14px;">Связаться с нами</div>
    <a href="tel:+74958001000" style="display:block;font-size:0.95rem;color:var(--gray-3);margin-bottom:8px;">+7 (495) 800-10-00</a>
    <a href="mailto:info@chronoselite.ru" style="display:block;font-size:0.9rem;color:var(--gray-3);">info@chronoselite.ru</a>
  </div>
</div>`;

    // ── FOOTER ───────────────────────────────────────────────────────────
    const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="nav-logo" style="display:inline-flex;margin-bottom:4px;">
          <span class="nav-logo-main">MEGA LUX</span>
          <span class="nav-logo-sub">Swiss Horology Since 1987</span>
        </a>
        <p class="footer-brand-desc">Ведущий российский бутик швейцарских часов класса люкс. Более 37 лет мы помогаем ценителям находить их идеальный хронограф.</p>
        <div class="footer-socials">
          <a href="#" class="social-btn" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="Telegram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          </a>
          <a href="#" class="social-btn" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Коллекции</div>
        <a href="catalog.html?category=sport"  class="footer-link">Спортивные часы</a>
        <a href="catalog.html?category=dress"  class="footer-link">Классические часы</a>
        <a href="catalog.html?badge=limited"   class="footer-link">Лимитированные</a>
        <a href="catalog.html?badge=new"       class="footer-link">Новинки сезона</a>
        <a href="catalog.html?badge=sale"      class="footer-link">Специальные цены</a>
      </div>
      <div>
        <div class="footer-col-title">Сервис</div>
        <a href="about.html"    class="footer-link">О компании</a>
        <a href="contacts.html" class="footer-link">Контакты</a>
        <a href="#"             class="footer-link">Гарантия подлинности</a>
        <a href="#"             class="footer-link">Доставка и оплата</a>
        <a href="#"             class="footer-link">Возврат и обмен</a>
        <a href="#"             class="footer-link">Trade-in</a>
      </div>
      <div>
        <div class="footer-col-title">Контакты</div>
        <a class="footer-link" href="tel:+74958001000">+7 (495) 800-10-00</a>
        <a class="footer-link" href="mailto:info@chronoselite.ru">info@chronoselite.ru</a>
        <div class="footer-link" style="cursor:default;">г. Москва, ул. Тверская, 1</div>
        <div class="footer-link" style="cursor:default;color:var(--dark-5);font-size:0.78rem;margin-top:4px;">Пн–Вс: 10:00–21:00</div>
        <div style="margin-top:18px;">
          <div class="footer-col-title" style="margin-bottom:10px;">Принимаем к оплате</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <span style="background:var(--dark-4);border-radius:4px;padding:4px 10px;font-size:0.7rem;color:var(--gray-3);">Visa</span>
            <span style="background:var(--dark-4);border-radius:4px;padding:4px 10px;font-size:0.7rem;color:var(--gray-3);">Mastercard</span>
            <span style="background:var(--dark-4);border-radius:4px;padding:4px 10px;font-size:0.7rem;color:var(--gray-3);">МИР</span>
            <span style="background:var(--dark-4);border-radius:4px;padding:4px 10px;font-size:0.7rem;color:var(--gray-3);">СБП</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom">
      <div class="footer-copy">© 2024 MEGA LUX. Все права защищены.</div>
      <div class="footer-legal">
        <a href="#">Конфиденциальность</a>
        <a href="#">Условия использования</a>
        <a href="#">Публичная оферта</a>
      </div>
    </div>
  </div>
</footer>

<!-- Cart Drawer -->
<div class="cart-overlay" id="cartOverlay" onclick="handleOverlayClick(event)"></div>
<div class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Корзина">
  <div class="cart-header">
    <div><span class="cart-title">Корзина</span><span class="cart-count-badge cart-badge">0</span></div>
    <button class="cart-close" onclick="toggleCart()" aria-label="Закрыть">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-footer" id="cartFooter" style="display:none;">
    <div class="cart-subtotal">
      <span>Итого:</span>
      <strong id="cartTotal">0 ₽</strong>
    </div>
    <div class="cart-subtotal" style="margin-bottom:16px;">
      <span style="font-size:0.75rem;color:var(--gray-2);">Доставка:</span>
      <span style="font-size:0.8rem;color:var(--success);">Бесплатно</span>
    </div>
    <p class="cart-note">🔒 Безопасная оплата. Гарантия подлинности каждого изделия</p>
    <button class="btn-checkout" onclick="openCheckout()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      Оформить заказ
    </button>
  </div>
</div>

<!-- Wishlist Drawer -->
<div class="wishlist-drawer" id="wishlistDrawer" role="dialog" aria-modal="true" aria-label="Избранное">
  <div class="cart-header">
    <div><span class="cart-title">Избранное</span><span class="cart-count-badge wishlist-badge">0</span></div>
    <button class="cart-close" onclick="toggleWishlist()" aria-label="Закрыть">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="cart-items" id="wishlistItems"></div>
</div>

<!-- Checkout Modal -->
<div class="modal-overlay" id="checkoutOverlay" onclick="closeCheckout(event)" role="dialog" aria-modal="true" aria-label="Оформление заказа">
  <div class="checkout-modal" id="checkoutModal">
    <div class="checkout-header">
      <button class="cart-close" onclick="closeCheckoutDirect()" aria-label="Закрыть">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="checkout-steps" id="checkoutSteps">
        <div class="checkout-step active" id="step-1"><div class="step-num">1</div><div class="step-label">Данные</div></div>
        <div class="checkout-step" id="step-2"><div class="step-num">2</div><div class="step-label">Доставка</div></div>
        <div class="checkout-step" id="step-3"><div class="step-num">3</div><div class="step-label">Оплата</div></div>
      </div>
    </div>
    <div class="checkout-body" id="checkoutBody"></div>
  </div>
</div>

<!-- Back to Top -->
<button class="back-to-top" id="backToTop" onclick="scrollToTop()" aria-label="Наверх">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
</button>`;

    // ── INJECT ───────────────────────────────────────────────────────────
    if (!document.getElementById('shell-nav')) {
      const navDiv = document.createElement('div');
      navDiv.id = 'shell-nav';
      navDiv.innerHTML = navHTML;
      document.body.insertBefore(navDiv, document.body.firstChild);
    }

    if (!document.getElementById('shell-footer')) {
      const footerDiv = document.createElement('div');
      footerDiv.id = 'shell-footer';
      footerDiv.innerHTML = footerHTML;
      document.body.appendChild(footerDiv);
    }

    updateCartBadges();
    updateWishlistBadges();
    initScrollEffects();
    initReveal();

    // Loading screen
    setTimeout(() => {
      const ls = document.getElementById('loading-screen');
      if (ls) { ls.classList.add('hidden'); setTimeout(() => ls.remove(), 800); }
    }, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShell);
  } else {
    initShell();
  }

  // Overlay click — close whichever drawer is open
  window.handleOverlayClick = function(event) {
    if (!event.target.classList.contains('cart-overlay')) return;
    const cartOpen = document.getElementById('cartDrawer')?.classList.contains('open');
    const wishOpen = document.getElementById('wishlistDrawer')?.classList.contains('open');
    if (cartOpen) toggleCart();
    if (wishOpen) toggleWishlist();
  };
})();
