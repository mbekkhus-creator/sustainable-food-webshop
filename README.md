Sustainable Food Webshop
This project is part of the Frontend Essentials final projects assigment and includes a responsive

Current features 
- responsive HTML and CSS
- local images stored in /images 
- fonts used: Frank Ruhl Libre and Arimo
- color palette based on the Figma design 

How to run the project 
1. Clone the repository from GitHub
2. Open the project folder in VS Code
3. Run the page using Live Server
   - Right-click on index.html -> "open with live server"

   Setting up the OpenAI API Key (Required for the Chatbot)

This project includes an AI-powered chatbot using the OpenAI API.
For security reasons, the actual API key is not included in the repository (as required by the assignment).
To run the chatbot locally, you must create your own configuration file.

1. Create config.js

Inside the /js folder, create a new file named:
js/config.js
add the following code: 
window.OPEN_API_KEY = "YOUR_API_KEY_HERE"
replace "YOUR_API_KEY_HERE" with your personal OpenAI API key.

2. .gitignore Protection

config.js is already listed in .gitignore, which means:
It will not be uploaded to GitHub
Your API key stays privat
Anyone who clones the repo must create their own key

3. Start the project

Once the key is added:
Open the project in VS Code
Right-click index.html
Select "Open with Live Server"
The chatbot will now work locally.

Important

In real production environments, API keys must never be exposed in frontend code.
A backend server would normally handle all API communication.
However, this project is intentionally client-side only as specified in the assignment.



   Future work 
   - implement chatbot (AI integration)
   - integrate external API (map?)
   - form validation 
   - accessibility improvements
