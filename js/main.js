const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.querySelector('.menu-close');

  function openMenu() {
    menu.classList.add('open');
    document.body.classList.add('menu-open');
    menu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-hidden', 'true');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });



// Find cart count element
const cartCountEl = document.getElementById('cart-count');
let cartCount = 0;

// Find all "Add to basket"-buttons
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // increase count
    cartCount++;
    cartCountEl.textContent = cartCount;

    // tiny "bump" animation
    cartCountEl.classList.add('cart-bump');
    setTimeout(() => {
      cartCountEl.classList.remove('cart-bump');
    }, 200);
  });
});

// Newsletter popup /*
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.footer-form');
  const popup = document.getElementById('newsletterPopup');
  const closeBtn = popup.querySelector('.newsletter-popup-close');

  if (!form || !popup || !closeBtn) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    // show popup
    popup.classList.add('is-visible');

    // empty form
    form.reset();
  });

  // close on button click
  closeBtn.addEventListener('click', function () {
    popup.classList.remove('is-visible');
  });

    // close on outside click
  document.addEventListener('click', function (event) {
    if (!popup.classList.contains('is-visible')) return;
    if (popup.contains(event.target)) return;
    popup.classList.remove('is-visible');
  });

  // close esacpe key
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup.classList.remove('is-visible');
    }
  });
});

