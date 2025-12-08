// ===============================
//  MOBILMENU
// ===============================
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('mobileMenu');
const menuCloseBtn = document.querySelector('.menu-close');

function openMenu() {
  if (!menu) return;
  menu.classList.add('open');
  document.body.classList.add('menu-open');
  menu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  if (!menu) return;
  menu.classList.remove('open');
  document.body.classList.remove('menu-open');
  menu.setAttribute('aria-hidden', 'true');
}

if (hamburger) {
  hamburger.addEventListener('click', openMenu);
}

if (menuCloseBtn) {
  menuCloseBtn.addEventListener('click', closeMenu);
}

// CLOSE ON ESC KEY
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});


// ===============================
//  CART
// ===============================

const CART_STORAGE_KEY = 'framCart';

const cartState = {};

// LOCAL STORAGE: LOAD CART STATE
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

// LOCAL STORAGE: SAVE CART STATE
function saveCartState() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    console.error('Kunne ikke lagre handlekurv til localStorage', err);
  }
}

// CART-BUTTON + BADGE
const cartBtn = document.querySelector('.cart-btn');
const cartCountEl = cartBtn ? cartBtn.querySelector('.cart-count') : null;

// UPDATE CART BADGE
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

  // SAVE TO LOCAL STORAGE
  saveCartState();
}

// RESET BUTTON TO "ADD TO BASKET" STATE
function resetButton(btn) {
  btn.classList.remove('active');
  btn.innerHTML = `
    Add to basket
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 21V3 M5 10l7-7 7 7"/>
    </svg>
  `;
}

// ACTIVATE BUTTON TO SHOW QTY CONTROLS
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
    e.stopPropagation();
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

  // PLUS
  plus.addEventListener('click', (e) => {
    e.stopPropagation();
    qty++;
    cartState[productId] = qty;
    number.textContent = qty;
    updateCartBadge();
  });

  updateCartBadge();
}

// INITIALIZE PRODUCT BUTTONS
function initProductButtons() {
  const buttons = document.querySelectorAll('.add-btn');
  buttons.forEach(btn => {
    const productId = btn.dataset.product;
    if (!productId) return;

    const existingQty = cartState[productId] || 0;

    if (existingQty > 0) {
      activateButton(btn, productId, existingQty);
    }

    // CLICK EVENT
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      activateButton(btn, productId, 1);
    });
  });
}


// ===============================
//  NEWSLETTER-POPUP
// ===============================
function initNewsletterPopup() {
  const form = document.querySelector('.footer-form');
  const popup = document.getElementById('newsletterPopup');
  if (!form || !popup) return;

  const popupCloseBtn = popup.querySelector('.newsletter-popup-close');
  if (!popupCloseBtn) return;

  // OPEN POPUP ON FORM SUBMIT
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    popup.classList.add('is-visible');
    form.reset();
  });

  // CLOSE WITH BUTTON
  popupCloseBtn.addEventListener('click', function () {
    popup.classList.remove('is-visible');
  });

  // CLICK OUTSIDE POPUP TO CLOSE
  document.addEventListener('click', function (event) {
    if (!popup.classList.contains('is-visible')) return;
    if (popup.contains(event.target)) return;
    popup.classList.remove('is-visible');
  });

  // CLOSE WITH ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup.classList.remove('is-visible');
    }
  });
}



// ===============================
//  COMING SOON POPUP
// ===============================
function initComingSoonPopup() {
  const checkoutLink = document.getElementById("checkoutLink");
  const comingSoon = document.getElementById("comingSoonPopup");
  const comingSoonClose = document.querySelector(".comingsoon-close");

  if (!comingSoon) return;

  function openComingSoon() {
    if (typeof closeMenu === 'function') {
      closeMenu();
    }
    comingSoon.classList.add("is-visible");
    comingSoon.setAttribute("aria-hidden", "false");
  }

  function closeComingSoon() {
    comingSoon.classList.remove("is-visible");
    comingSoon.setAttribute("aria-hidden", "true");
  }

  // OPEN FROM CHECKOUT LINK IN MENU
  if (checkoutLink) {
    checkoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      openComingSoon();
    });
  }

  // OPEN FROM CART BUTTON (GREEN)
  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openComingSoon();
    });
  }

  // CLOSE WITH BUTTON
  if (comingSoonClose) {
    comingSoonClose.addEventListener("click", function () {
      closeComingSoon();
    });
  }

  // CLICK OUTSIDE POPUP TO CLOSE
  document.addEventListener("click", function (event) {
    if (!comingSoon.classList.contains("is-visible")) return;

    if (comingSoon.contains(event.target)) return;

    if (checkoutLink && (event.target === checkoutLink)) return;
    if (cartBtn && (event.target === cartBtn || cartBtn.contains(event.target))) return;

    closeComingSoon();
  });

  // CLOSE "COMING SOON" WITH ESC
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && comingSoon.classList.contains("is-visible")) {
      closeComingSoon();
    }
  });
}


// ===============================
//  INIT VED LOAD
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  loadCartState();

  updateCartBadge();

  initProductButtons();

  initNewsletterPopup();
  initComingSoonPopup();
});
