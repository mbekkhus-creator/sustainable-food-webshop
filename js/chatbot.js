// js/chatbot.js

// === CHATBOT-ELEMENTER ===
const messagesEl = document.getElementById("chatbot-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send-btn");

// Hvis vi ikke er på chatbot-siden, gjør ingenting
if (!messagesEl || !inputEl || !sendBtn) {
  // ikke chatbot-side
} else {
  let isTyping = false;
  let shouldAutoScroll = true;

    messagesEl.addEventListener("scroll", () => {
    const distanceFromBottom =
      messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;

    // Slå av auto-scroll hvis brukeren har scrollet opp
    shouldAutoScroll = distanceFromBottom < 10;
  });

  // Auto-resize av tekstfeltet
  function autosizeTextarea() {
    inputEl.style.height = "auto";
    inputEl.style.height = inputEl.scrollHeight + "px";
  }
  inputEl.addEventListener("input", autosizeTextarea);

  // Brukermelding (blå boble)
   function addUserMessage(text) {
    const row = document.createElement("div");
    row.className = "chatbot-row user-row";

    const bubble = document.createElement("div");
    bubble.className = "chatbot-message user";
    bubble.textContent = text;

    row.appendChild(bubble);
    messagesEl.appendChild(row);

    if (shouldAutoScroll) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }


  // FRAM "skriver..."-boble
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

    if (shouldAutoScroll) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }


  function hideTypingIndicator() {
    isTyping = false;
    sendBtn.classList.remove("is-cancel");
    const typingRow = messagesEl.querySelector(".typing-row");
    if (typingRow) typingRow.remove();
  }

  // Bot-melding
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

    if (shouldAutoScroll) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }



// === AI-KALL TIL OPENAI ===
async function getAIResponse(userQuestion) {
  // Produktinfo hentet fra products.html
  const productCatalog = `
You are FRAM, an AI assistant for a sustainable Norwegian food delivery service.
You answer questions about FRAM's products based on this catalog:

PRODUCT CATALOG (PRODUCE):

- Oats
  • Weight: 1 kg
  • Price: 16 kr / kg

- Red Onions
  • Weight: 1 kg
  • Price: 45 kr / kg

- Garlic
  • Weight: 1 pk (200 g)
  • Price: 38 kr / pk

- Potatoes
  • Weight: 1 kg
  • Price: 32 kr / kg

- Carrots
  • Weight: 1 kg
  • Price: 48 kr / kg

RULES:
- If the user asks about price, weight or availability of these products, answer clearly using the catalog above.
- If the user asks about something FRAM does NOT have in the catalog, say that it is not available.
- Answer briefly and clearly.
`;

  // Vi bygger en enkel prompt som inkluderer både katalog og spørsmålet
  const fullPrompt = `
${productCatalog}

User question:
${userQuestion}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: fullPrompt
      })
    });

    const data = await response.json();
    console.log("OpenAI response:", data); // hjelper hvis noe feiler

    const aiText =
      data.output_text ??
      data.output?.[0]?.content?.[0]?.text ??
      "I'm not sure how to answer that.";

    return aiText;
  } catch (error) {
    console.error(error);
    return "Oops! Something went wrong connecting to FRAM's AI 🤖";
  }
}



  // Klikk på send-knappen
  sendBtn.addEventListener("click", async () => {
    if (isTyping) {
      // hvis knappen står i "X"-modus
      hideTypingIndicator();
      return;
    }

    const text = inputEl.value.trim();
    if (!text) return;

    // 1) vis brukermeldingen
    addUserMessage(text);
    inputEl.value = "";
    autosizeTextarea();

    // 2) vis "FRAM skriver..."
    showTypingIndicator();

    // 3) hent AI-svar
    const aiResponse = await getAIResponse(text);

    // 4) fjern typing og vis svar
    hideTypingIndicator();
    addBotMessage(aiResponse);
  });

  // Send på Enter (Shift+Enter = linjeskift)
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
}
