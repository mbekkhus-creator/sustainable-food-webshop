Sustainable Food Webshop

This project is part of the Frontend Essentials final assignment.
It includes a responsive webshop layout built with HTML, CSS and JavaScript, AI integration using the OpenAI API, and accessibility improvements aligned with WCAG 2.1 Level AA.


Features (Current)
- Fully responsive HTML and CSS layout
- Local images stored in /images
- Typography based on the design (Frank Ruhl Libre & Arimo)
- Color palette and structure based on the provided Figma design
- Interactive mobile menu
- Product cards with dynamic cart counter
- Newsletter popup modal
- Accessibility improvements (ARIA attributes, skip link keyboard-friendly navigation)


How to Run the Project
1. Clone the repository from GitHub
2. Open the project folder in VS Code
3. Run the page using Live Server
   - Right-click on index.html -> "open with live server"
The website will now run locally on your machine. 


Setting Up the OpenAI API Key (Required for the Chatbot)
This project includes an AI-powered chatbot using the OpenAI API.
--> The API key is not included in the repository for security reasons.

1. Create config.js
Inside the /js folder, create a new file named:
js/config.js
add the following code: 
window.OPEN_API_KEY = "YOUR_API_KEY_HERE"
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


Accessibility
The project follows WCAG 2.1 Level AA principles and includes:
 - Semantic HTML structure (header, main, section, article, nav, footer)
 - A skip-to-content link for keyboard navigation
 - The mobile menu and newsletter popup implemented as ARIA dialogs,     
     - role="dialog", aria-modal="true", aria-hidden
     - Hamburger button uses aria-controls and aria-expanded 
 - Newsletter form inputs include hidden but accessible <label> elements
 - Product “Add to basket” buttons have descriptive aria-labels
 - Cart counter uses an ARIA live region (aria-live="polite")
 - All buttons and links are natively focusable and keyboard operable
 - ESC key closes both dialogs (menu + popup)

These changes improve accessibility for keyboard users and screen reader users.


Technologies Used
 - HTML5
 - CSS3 (Flexbox, Grid, responsive design)
 - JavaScript (ES6+)
 - OpenAi API
 - Version Control: Git & GitHub





Future Work

- Additional accessibility improvements (e.g., focus trap in modals)
- add more aria attributes, in chatbot and products. 
