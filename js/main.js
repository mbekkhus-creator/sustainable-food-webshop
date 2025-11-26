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

  // Lukke på ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


// Finn handlekurv-teller
const cartCountEl = document.getElementById('cart-count');
let cartCount = 0;

// Finn alle "Add to basket"-knappene
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Øk antall
    cartCount++;
    cartCountEl.textContent = cartCount;

    // Liten "bump"-animasjon
    cartCountEl.classList.add('cart-bump');
    setTimeout(() => {
      cartCountEl.classList.remove('cart-bump');
    }, 200);
  });
});

