// ===============================
// 1. MOBILMENY
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

// Lukk meny med ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});


// ===============================
// 2. HANDLEKURV / PRODUKTKNAPPER
// ===============================

// Holder styr på antall per produkt, f.eks. { oats: 2, garlic: 1 }
const cartState = {};

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

// Legger på logikk på alle .add-btn-knapper
function initProductButtons() {
  const buttons = document.querySelectorAll('.add-btn');
  buttons.forEach(btn => {
    const productId = btn.dataset.product;
    if (!productId) return;

    btn.addEventListener('click', () => {
      // Hvis knappen allerede er aktiv (viser +/−), ikke trigge på nytt
      if (btn.classList.contains('active')) return;

      let qty = 1;
      cartState[productId] = qty;
      updateCartBadge();

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
    });
  });
}


// ===============================
// 3. NEWSLETTER-POPUP
// ===============================
function initNewsletterPopup() {
  const form = document.querySelector('.footer-form');
  const popup = document.getElementById('newsletterPopup');
  if (!form || !popup) return;

  const popupCloseBtn = popup.querySelector('.newsletter-popup-close');
  if (!popupCloseBtn) return;

  // Når man sender inn skjema
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    popup.classList.add('is-visible');
    form.reset();
  });

  // Lukk med knapp
  popupCloseBtn.addEventListener('click', function () {
    popup.classList.remove('is-visible');
  });

  // Lukk ved klikk utenfor
  document.addEventListener('click', function (event) {
    if (!popup.classList.contains('is-visible')) return;
    if (popup.contains(event.target)) return;
    popup.classList.remove('is-visible');
  });

  // Lukk med ESC
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup.classList.remove('is-visible');
    }
  });
}
/* COMING SOON POPUP */
const checkoutLink = document.getElementById("checkoutLink");
const comingSoon = document.getElementById("comingSoonPopup");
const comingSoonClose = document.querySelector(".comingsoon-close");

if (checkoutLink && comingSoon) {
  checkoutLink.addEventListener("click", function (e) {
    e.preventDefault(); // stopper navigering

    // Lukk menyen
    if (typeof closeMenu === "function") {
      closeMenu();
    }

    // Vis popup
    comingSoon.classList.add("is-visible");
    comingSoon.setAttribute("aria-hidden", "false");
  });
}

if (comingSoon && comingSoonClose) {
  comingSoonClose.addEventListener("click", function () {
    comingSoon.classList.remove("is-visible");
    comingSoon.setAttribute("aria-hidden", "true");
  });
}

// Klikk utenfor popup for å lukke
document.addEventListener("click", function (event) {
  if (!comingSoon || !comingSoon.classList.contains("is-visible")) return;

  // 🔴 VIKTIG: ikke lukk hvis vi klikket på checkout-knappen
  if (comingSoon.contains(event.target) || event.target === checkoutLink) return;

  // Andre klikk lukker popupen
  comingSoon.classList.remove("is-visible");
  comingSoon.setAttribute("aria-hidden", "true");
});

// Lukk COMING SOON med ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && comingSoon.classList.contains("is-visible")) {
    comingSoon.classList.remove("is-visible");
    comingSoon.setAttribute("aria-hidden", "true");
  }
});

// ===============================
// 4. INIT VED LOAD
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  // Start med å gjemme badget
  if (cartCountEl) {
    cartCountEl.style.display = 'none';
  }

  initProductButtons();
  initNewsletterPopup();
});
