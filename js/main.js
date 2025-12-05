// ===============================
// 1. MOBILMENY
// ===============================
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('mobileMenu');
const closeBtn = document.querySelector('.menu-close');

function openMenu() {
  if (!menu || !hamburger) return;
  menu.classList.add('open');
  document.body.classList.add('menu-open');
  menu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  if (!menu || !hamburger) return;
  menu.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger) {
  hamburger.addEventListener('click', openMenu);
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

// close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});


// ===============================
// 2. HANDLEKURV / PRODUKTKNAPPER
// ===============================

const CART_STORAGE_KEY = 'framCart';

// Holder styr på antall per produkt, f.eks. { oats: 2, garlic: 1 }
const cartState = {};

// Last inn handlekurv fra localStorage
function loadCartState() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === 'object') {
      Object.assign(cartState, parsed);
    }
  } catch (err) {
    console.error('Kunne ikke lese handlekurv fra localStorage', err);
  }
}

// Lagre handlekurv til localStorage
function saveCartState() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    console.error('Kunne ikke lagre handlekurv til localStorage', err);
  }
}

// Finn handlekurv-knappen og badget
const cartBtn = document.querySelector('.cart-btn');
const cartCountEl = cartBtn ? cartBtn.querySelector('.cart-count') : null;

// Oppdaterer tallet i handlekurv-badget
function updateCartBadge() {
  if (!cartCountEl) return;

  const total = Object.values(cartState).reduce((sum, qty) => sum + qty, 0);

  if (total <= 0) {
    cartCountEl.style.display = 'none';
    cartCountEl.textContent = '0';
  } else {
    cartCountEl.style.display = 'inline-flex';
    cartCountEl.textContent = total;
  }

  // lagre hver gang noe endres
  saveCartState();
}

// Setter en knapp tilbake til "Add to basket"
function resetButton(btn) {
  btn.classList.remove('active');
  btn.innerHTML = `
    Add to basket
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 21V3 M5 10l7-7 7 7"/>
    </svg>
  `;
}

// Aktiverer én knapp i aktiv state (brukes både ved klikk og ved gjenoppretting fra localStorage)
function activateButton(btn, productId, initialQty) {
  let qty = initialQty || 1;
  cartState[productId] = qty;

  btn.classList.add('active');
  btn.innerHTML = `
    <div class="qty-control">
      <button type="button" class="qty-btn minus">-</button>
      <span class="qty-number">${qty}</span>
      <button type="button" class="qty-btn plus">+</button>
    </div>
  `;

  const minus = btn.querySelector('.minus');
  const plus = btn.querySelector('.plus');
  const number = btn.querySelector('.qty-number');

  // MINUS
  minus.addEventListener('click', (e) => {
    e.stopPropagation(); // ikke trigge parent-click
    qty = Math.max(0, qty - 1);

    if (qty === 0) {
      delete cartState[productId];
      resetButton(btn);
    } else {
      cartState[productId] = qty;
      number.textContent = qty;
    }

    updateCartBadge();
  });

  // PLUSS
  plus.addEventListener('click', (e) => {
    e.stopPropagation();
    qty++;
    cartState[productId] = qty;
    number.textContent = qty;
    updateCartBadge();
  });

  updateCartBadge();
}

// Legger på logikk på alle .add-btn-knapper
function initProductButtons() {
  const buttons = document.querySelectorAll('.add-btn');

  buttons.forEach((btn) => {
    const productId = btn.dataset.product;
    if (!productId) return;

    const existingQty = cartState[productId] || 0;

    // Hvis produktet allerede ligger i handlekurven fra før, sett knapp rett i aktiv state
    if (existingQty > 0) {
      activateButton(btn, productId, existingQty);
    }

    // Klikk når den er i "Add to basket"-state
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      activateButton(btn, productId, 1);
    });
  });
}


// ===============================
// 3. COMING SOON POPUP
// ===============================
function initComingSoonPopup() {
  const checkoutLink = document.getElementById('checkoutLink');
  const comingSoon = document.getElementById('comingSoonPopup');
  const comingSoonClose = document.querySelector('.comingsoon-close');

  if (!comingSoon) return;

  function openComingSoon() {
    // Lukk meny om den er åpen
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
    comingSoon.classList.add('is-visible');
    comingSoon.setAttribute('aria-hidden', 'false');
  }

  function closeComingSoon() {
    comingSoon.classList.remove('is-visible');
    comingSoon.setAttribute('aria-hidden', 'true');
  }

  // Åpne fra CHECKOUT-link i meny
  if (checkoutLink) {
    checkoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      openComingSoon();
    });
  }

  // Åpne fra handlekurv-knappen (grønn)
  if (cartBtn) {
    cartBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openComingSoon();
    });
  }

  // Lukk med knapp
  if (comingSoonClose) {
    comingSoonClose.addEventListener('click', function () {
      closeComingSoon();
    });
  }

  // Klikk utenfor popup for å lukke
  document.addEventListener('click', function (event) {
    if (!comingSoon.classList.contains('is-visible')) return;

    // Ikke lukk hvis vi klikker inni popupen
    if (comingSoon.contains(event.target)) return;

    // Ikke lukk hvis vi klikker på checkout-lenka eller handlekurv-knappen
    if (checkoutLink && event.target === checkoutLink) return;
    if (cartBtn && (event.target === cartBtn || cartBtn.contains(event.target))) return;

    closeComingSoon();
  });

  // Lukk COMING SOON med ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && comingSoon.classList.contains('is-visible')) {
      closeComingSoon();
    }
  });
}


// ===============================
// 4. INIT CART, PRODUKTER, COMING SOON
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // 1) Les inn handlekurv fra localStorage
  loadCartState();

  // 2) Oppdater badgen basert på eksisterende cartState
  updateCartBadge(); // skjuler automatisk hvis tom

  // 3) Aktiver "Add to basket"-knapper med evt. tidligere antall
  initProductButtons();

  // 4) Koble handlekurv + CHECKOUT-link til "Coming soon"-popup
  initComingSoonPopup();
});


// ===============================
// 5. NEWSLETTER POPUP (egen, separat)
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.footer-form');
  const popup = document.getElementById('newsletterPopup');

  if (!form || !popup) return;

  const closeBtn = popup.querySelector('.newsletter-popup-close');
  if (!closeBtn) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // show popup
    popup.classList.add('is-visible');
    popup.setAttribute('aria-hidden', 'false');

    // empty form
    form.reset();
  });

  // close on button click
  closeBtn.addEventListener('click', function () {
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
  });

  // close on outside click
  document.addEventListener('click', function (event) {
    if (!popup.classList.contains('is-visible')) return;
    if (popup.contains(event.target)) return;
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
  });

  // close on escape key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup.classList.remove('is-visible');
      popup.setAttribute('aria-hidden', 'true');
    }
  });
});
