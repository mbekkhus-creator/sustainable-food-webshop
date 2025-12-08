// === CHATBOT ELEMENTS ===
const messagesEl = document.getElementById("chatbot-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send-btn");

if (!messagesEl || !inputEl || !sendBtn) {

} else {
  let isTyping = false;
  let shouldAutoScroll = true;

  messagesEl.addEventListener("scroll", () => {
    const distanceFromBottom =
      messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight;

    // Disable auto-scroll if user scrolls up
    shouldAutoScroll = distanceFromBottom < 10;
  });

  // Auto-resize textarea
  function autosizeTextarea() {
    inputEl.style.height = "auto";
    inputEl.style.height = inputEl.scrollHeight + "px";
  }
  inputEl.addEventListener("input", autosizeTextarea);

  // User message (blue bubble)
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

  // FRAM "typing..." bubble
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

  // Bot message
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

  // === AI CALL TO OPENAI ===
  async function getAIResponse(userQuestion) {
    // Product info from products.html and How FRAM works
const framKnowledge = `
You are FRAM, an AI assistant for a sustainable Norwegian food delivery service.

ABOUT FRAM:
- FRAM connects customers with local farms in Norway.
- Customers order seasonal groceries online and get them delivered to their homes.
- The service focuses on sustainability, reuse of containers, and supporting local agriculture.

HOW FRAM WORKS (STEPS):
1. ORDER GROCERIES:
   - Browse our seasonal selection, choose your items, and place your order online.
2. STOCK UP:
   - When your order arrives, unpack the produce and keep the reusable containers.
3. SCAN & REORDER:
   - When you need a refill, scan the QR code on the containers to quickly reorder the same items.
4. SWAP & REUSE:
   - At your next delivery, leave the empty containers outside. FRAM collects, cleans, and reuses them.

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
- If the user asks about price, weight or availability of these products, answer using the PRODUCT CATALOG.
- If the user asks: "What is FRAM?", "How does FRAM work?", or about the concept/service,
  explain ABOUT FRAM and HOW FRAM WORKS in a short, friendly way.
- If the user asks about sustainability, mention local farms, seasonal produce, and the reuse of containers.
- If the user asks for products that are not in the catalog, say they are not available.
- If the question is unrelated to food, farming, deliveries or sustainability, say that you are focused on FRAM only.
- Always answer briefly and clearly, and in the same language as the user if possible.
`;

const fullPrompt = `
${framKnowledge}

User question:
${userQuestion}
`;


    //  Check API key
    if (!window.OPENAI_API_KEY) {
      return "FRAM AI is missing an API key and cannot respond right now.";
    }

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

      let data;

      // try parsing JSON separately
      try {
        data = await response.json();
      } catch {
        return "FRAM AI received an invalid response from the server.";
      }

      // check HTTP status
      if (!response.ok) {
        console.error("API error:", response.status, data);
        return `FRAM AI encountered a server error (code: ${response.status}).`;
      }

      const aiText =
        data.output_text ??
        data.output?.[0]?.content?.[0]?.text ??
        "I'm not sure how to answer that.";

      return aiText;
    } catch (error) {
      console.error(error);
      return "Oops! Something went wrong while contacting FRAM's AI 🤖";
    }
  }

  // Send button click
  sendBtn.addEventListener("click", async () => {
    if (isTyping) {
      // cancel typing state
      hideTypingIndicator();
      return;
    }

    const text = inputEl.value.trim();
    if (!text) return;

    // 1) show user message
    addUserMessage(text);
    inputEl.value = "";
    autosizeTextarea();

    // 2) show "FRAM is typing..."
    showTypingIndicator();

    // 3) get AI response
    const aiResponse = await getAIResponse(text);

    // 4) remove typing indicator and show response
    hideTypingIndicator();
    addBotMessage(aiResponse);
  });

  // Send on Enter (Shift+Enter = newline)
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
}
