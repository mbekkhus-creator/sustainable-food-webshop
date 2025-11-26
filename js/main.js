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

