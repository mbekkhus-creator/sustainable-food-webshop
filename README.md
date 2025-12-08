# FRAM – Sustainable Food Webshop

This project is part of the **Frontend Essentials** final assignment.

FRAM is a fictional sustainable food delivery service that connects customers with local farms in Norway.  
The website implements a provided Figma design and demonstrates:

- A responsive webshop
- An AI-powered chatbot using the OpenAI API
- A map showing partner farms
- Accessibility-minded frontend development with HTML, CSS and JavaScript

The solution is entirely client-side (no backend or database).

---

##  Pages

The project consists of three main pages:

### `index.html` – Home
- Hero section with FRAM logo and tagline:  
  _“HOME DELIVERY FROM YOUR LOCAL FARMS”_

- Two feature cards:
  - **Shop our seasonal selection** → links to `products.html`
  - **Ask us about anything** → links to `chatbot.html`
  - **“This is how it works”** section, explaining the service in 4 steps:
  1. Order groceries
  2. Stock up
  3. Scan & reorder
  4. Swap & reuse

- “Popular produce” section with product cards and **Add to basket** buttons

- Newsletter signup in the footer with a confirmation popup

### `products.html` – Products
- Introduction text about FRAM’s seasonal produce

- Product grid including:
  - Oats  
  - Red Onions  
  - Garlic  
  - Potatoes  
  - Carrots  
- Each product card displays:
  - Name
  - Weight
  - Price
  - “Add to basket” button

- “See our partnering farms” section with an embedded **Google Maps** iframe showing a partner farm in Norway

### `chatbot.html` – Chatbot
- Full-page AI chatbot interface branded as **FRAM**

- Conversation log with:
  - Initial greeting from FRAM
  - Bot and user message bubbles
- Textarea input for the user
- Send button (click or Enter key)
- Powered by the **OpenAI API** via `chatbot.js` and `config.js`

### All pages share:
- Common header with logo
- Mobile hamburger menu with overlay navigation
- Cart icon with a dynamic cart counter

--- 

##  Features

### Webshop & Cart
- Product cards on both the home page and the products page
- “Add to basket” buttons update a shared cart counter in the header (`#cart-count`)
- The **checkout link** opens a “coming soon” popup instead of a real checkout flow (no backend)

### AI Chatbot
- Chatbot persona: **FRAM**, an assistant for a sustainable Norwegian food delivery service
- Can answer questions about:
  - What FRAM is
  - How FRAM works (order, stock, scan & reorder, swap & reuse)
  - Product prices, weights and availability, based on the same catalog as in `products.html`
  - Sustainability and local farming in a general, friendly way
- Works through an API call to `https://api.openai.com/v1/responses` using the `gpt-4o-mini` model
- Shows a “typing…” indicator while waiting for the AI’s response
- Handles:
  - Missing API key
  - Network / server errors
  - Unexpected response shape from the API

### Partner Farms Map (Third-Party API)
- Embedded **Google Maps** iframe on `products.html`
- Shows a partner farm location in Norway
- Demonstrates integration of a third-party map service

### Newsletter Popup
- Newsletter form in the footer (`index.html` and `products.html`)
- On submission, a confirmation dialog appears:
  - _“You’re in! Expect fresh updates from our partner farms in your inbox soon.”_

---

##  Accessibility

The project follows several WCAG 2.1 Level AA–inspired practices:

- **Semantic HTML structure**
  - `header`, `main`, `section`, `article`, `nav`, `footer`
- **Skip link**
  - `a.skip-link` that jumps directly to `#main` on all pages
- **ARIA and dialogs**
  - Mobile menu, newsletter popup, and “coming soon” popup use:
    - `role="dialog"`
    - `aria-modal="true"`
    - `aria-hidden` toggled with JavaScript
- **Form labels**
  - Newsletter form fields use visually hidden `<label>` elements for screen readers
- **Buttons and controls**
  - All buttons and links are natively focusable and keyboard operable
  - “Add to basket” buttons have descriptive `aria-label`s (e.g. “Add Oats to basket”)
- **Live regions**
  - Cart counter uses `aria-live="polite"` to announce updates to assistive technology
- **Keyboard behavior**
  - ESC key closes dialogs (mobile menu + newsletter popup + coming soon popup)

### Planned but not yet implemented:
- Focus trapping inside dialogs so keyboard focus cannot escape an open modal

---

## Tech Stack

- **HTML5**
- **CSS3**
  - Flexbox & Grid
  - Responsive layout
- **JavaScript (ES6+)**
  - DOM manipulation
  - Event handling
  - Async/await for API calls
- **APIs**
  - OpenAI API (chatbot)
  - Google Maps embed (partner farms map)
- **Version control**
  - Git & GitHub

Fonts are loaded from **Google Fonts**: Frank Ruhl Libre & Arimo.

---

## Getting started 

### How to Run the Project
1. Clone the repository from GitHub
2. Open the project folder in VS Code
3. Run the page using Live Server
  - Right-click on index.html -> "open with live server"
The website will now run locally on your machine. 

### Setting Up the OpenAI API Key (Required for the Chatbot)
This project includes an AI-powered chatbot using the OpenAI API.
--> The API key is not included in the repository for security reasons.

1. Create config.js
Inside the /js folder, create a new file named:
js/config.js
add the following code: 
window.OPENAI_API_KEY = "YOUR_API_KEY_HERE"
replace "YOUR_API_KEY_HERE" with your personal OpenAI API key.

2. API key protection (.gitignore)
config.js is already listed in .gitignore, which means:
 - It will not be uploaded to GitHub
 - Your API key stays private
 - Anyone who clones the repo must provide their own key

3. Run the project
After adding your API key;
 - Open the project in VS Code
 - Right-click index.html
 - Select "Open with Live Server"
The chatbot will run locally using your OpenAI key. 

---

## AI Behaviour & Ethical Considerations

The chatbot uses a prompt that describes:
- What FRAM is
- How FRAM works (order, stock up, scan & reorder, swap & reuse)
- The current product catalog (Oats, Red Onions, Garlic, Potatoes, Carrots)

### The AI is instructed to:
- Answer questions about:
  - FRAM’s service and steps
  - Product prices, weights and availability
  - Sustainability and local farming in general terms
- Say when something is not available or unknown instead of guessing
- Stay focused on FRAM, food, farms, delivery and sustainability topics
- Respond briefly and clearly, and try to match the user’s language

### Ethical considerations:
- The model can generate incorrect or outdated information; users should not treat it as authoritative.
- The frontend does not log or store user messages.
- Users are not asked for sensitive personal information.
- The chatbot is positioned as a helper, not a decision-maker.

---

## Third-Party Integration (Map)

The “SEE OUR PARTNERING FARMS” section on products.html embeds a Google Maps iframe:
- Shows the location of a partner farm in Norway
- Uses the q parameter to point to the farm’s address
- Does not require a separate API key in this embedded form
**Possible future improvement:**
- Use the full JavaScript Maps API with multiple dynamic markers for several partner farms.

---

## Usage Guide

### Browsing & Shopping
1. Go to HOME or PRODUCTS.
2. Scroll through the available products.
3. Press “Add to basket” on any product:
  - The cart counter in the header (Handlekurv) increases.
4. Click “CHECKOUT” in the menu:
  - A “Checkout is coming soon” dialog appears (no real payment flow yet).

### Chatbot
1. Go to the CHAT page.
2. Type a question into the text area, e.g.:
  - “How does FRAM work?”
  - “What is the price of carrots?”
3. Press Enter or click the send button.
4. FRAM shows a typing indicator, then replies in the conversation log.

### Newsletter Signup
1. Scroll to the footer on index.html or products.html.
2. Optionally fill in your First name.
3. Enter your E-mail address.
4. Press the arrow button to submit.
5. A popup confirms that you are signed up.

---

## Development Process & Resources

### Key focus areas during development:
- Matching the provided Figma layout using flexbox and grid
- Building a consistent header, mobile menu and footer across all pages
- Implementing accessible modals and overlays using ARIA attributes
- Integrating OpenAI and Google Maps on the client side without exposing secrets

### Resources used to solve problems and update knowledge:
**MDN Web Docs**
  - HTML semantics
  - CSS Flexbox & Grid
  - aria-* attributes and accessibility
**WebAIM & WCAG 2.1 summaries**
  - Guidelines for headings, forms, keyboard navigation and dialogs
**OpenAI API documentation**
  - Example requests
  - Error handling patterns for fetch + JSON
**Google Maps embed docs / examples**
  - Query parameters for embedded maps

---

## Known Issues / Limitations

- Checkout is not implemented – only a “Coming soon” popup.
- Newsletter signup does not send real emails (no backend).
- Only a small product catalog is implemented for demonstration.
- The partner farms map shows a single static farm location.
- Focus trapping inside dialogs is not yet implemented.
- The chatbot requires:
  - A valid OpenAI API key
  - An active internet connection

---

## Future Improvements

- Implement a proper checkout flow and order summary page.
- Add product categories, filtering and sorting.
- Enhance the Google Maps integration with multiple dynamic farm markers.
- Improve accessibility further with focus trapping and more detailed ARIA attributes.
- Add quick suggestion buttons (FAQ-style prompts) under the chatbot input.
- Localise all UI text fully to Norwegian and/or add language toggle.
