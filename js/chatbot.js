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

const messagesEl = document.getElementById("chatbot-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send-btn");

let isTyping = false;
let typingTimeout = null;

function autosizeTextarea() {
  inputEl.style.height = "auto";          // reset først
  inputEl.style.height = inputEl.scrollHeight + "px"; // sett ny høyde
}

inputEl.addEventListener("input", autosizeTextarea);

// Lager brukermelding (blå boble som hopper opp)
function addUserMessage(text) {
  const row = document.createElement("div");
  row.className = "chatbot-row user-row";

  const bubble = document.createElement("div");
  bubble.className = "chatbot-message user";
  bubble.textContent = text;

  row.appendChild(bubble);
  messagesEl.appendChild(row);

  // Scroll til bunn
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Viser FRAM "skriver..."-boble
function showTypingIndicator() {
  isTyping = true;
  sendBtn.classList.add("is-cancel");

  const row = document.createElement("div");
  row.className = "chatbot-row bot-row typing-row";

  const label = document.createElement("span");
  label.className = "chatbot-sender-label";
  label.textContent = "FRAM";

  const bubble = document.createElement("div");
  bubble.className = "chatbot-message bot typing-bubble";
  bubble.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;

  row.appendChild(label);
  row.appendChild(bubble);
  messagesEl.appendChild(row);

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTypingIndicator() {
  isTyping = false;
  sendBtn.classList.remove("is-cancel");

  const typingRow = messagesEl.querySelector(".typing-row");
  if (typingRow) typingRow.remove();
}

// Legg til enkel botsvar (her bytter du ut med AI senere)
function addBotMessage(text) {
  const row = document.createElement("div");
  row.className = "chatbot-row bot-row";

  const label = document.createElement("span");
  label.className = "chatbot-sender-label";
  label.textContent = "FRAM";

  const bubble = document.createElement("div");
  bubble.className = "chatbot-message bot";
  bubble.textContent = text;

  row.appendChild(label);
  row.appendChild(bubble);
  messagesEl.appendChild(row);

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Klikk på rød knapp
sendBtn.addEventListener("click", () => {
  // Hvis boten "skriver" → X = avbryt
  if (isTyping) {
    hideTypingIndicator();
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
    return;
  }

  const text = inputEl.value.trim();
  if (!text) return;

  // 1. Flytt input-innholdet opp som blå boble
  addUserMessage(text);
  inputEl.value = "";

  // 2. Vis typing-boble
  showTypingIndicator();

  // 3. Simuler AI-svar – HER putter du inn ordentlig API-kall senere
  typingTimeout = setTimeout(() => {
    hideTypingIndicator();
    addBotMessage("Her kommer svaret fra AI-verktøyet ditt 🤖");
  }, 1500);
});

// Send på Enter (Shift+Enter = linjeskift)
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});
