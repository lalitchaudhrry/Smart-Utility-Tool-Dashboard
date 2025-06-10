# Smart-Utility-Tool-Dashboard
Smart-Utility-Tool-Dashboard is MERN stack based web app that summarizes , translates and generate emails and more...
->Features

Chat Tool – Ask anything from Gemini 2.0 (Flash Free).
Summarize Tool – Summarizes long content into concise form.
Translate Tool – Translates text into different languages.
Email Generator – Automatically generates professional emails.

 Frontend (React + Vite + Tailwind CSS)
- React with Vite bundler for fast development
- Tailwind CSS for custom UI styling
- React Router DOM for page navigation
- Responsive design with utility-first styling
- Custom color palette defined in Tailwind config

Directory: Client
components :
EmailGeneratorTool.jsx - which generates email only by the user prompt because it takes input and sends back to gemini flash 2.0 api which responses back to the frontend with appropriate response.
GeminiTool.jsx- which is basically for real time queries you ask to gemini or chatgpt.
SummarizeTool.jsx-It Summarizes the long text into concise and clear paragraphs .
TranslateTool.jsx - Uses gemini api to translate any language into hindi and other languages.
ToolSelector.jsx- It is like the navbar where we can select the activity to proceed with.

### Backend (Node.js + Express.js)
 Node.js with Express.js for REST API handling
 Gemini 2.0 Flash Free API integration
 `.env` file for secure API key management

Directory: Server
index.js - Backend Node js app & Express server and Gemini API routes
.env -Gemini API Key

Important Points to tell :
Express.js: This is the backbone of our backend server, built on Node.js. Express.js provides a robust and flexible framework for creating our REST APIs. It's responsible for handling incoming requests from our frontend (like when we ask to summarize text or generate an email), routing them to the correct logic, and sending back the appropriate responses, often powered by the Gemini API.

Axios: While primarily a frontend component in our MERN stack, Axios is our HTTP client for making API requests. In our React frontend (Client directory), we use Axios extensively to send data (For ex: the text to summarize, the prompt for email generation) to our Express.js backend and to receive the AI-generated responses back from the server. It simplifies the process of interacting with our own APIs.

CORS (Cross-Origin Resource Sharing): Since our React frontend (Client running on one port) and our Node.js/Express.js backend (Server running on another port) are considered different "origins," browsers would normally block them from communicating due to security policies. CORS is a middleware used in our Express.js backend to explicitly allow our frontend to make requests to our API. It's crucial for enabling secure and proper communication between our dashboard and the backend services.

Body-parser: This Express.js middleware is essential for processing the data sent from our frontend to the backend. When we input text for summarization, translation, or email generation, that data is sent in the "body" of the HTTP request. body-parser takes this raw incoming request body (e.g., JSON data from our React components like EmailGeneratorTool.jsx) and parses it, making it easily accessible and usable within our Express.js route handlers via req.body.

.env (Environment Variables): For security and flexibility, we use .env files to store sensitive configuration details and API keys outside of our main codebase. Specifically, our Gemini API Key is stored in the .env file in the Server directory. This prevents hardcoding sensitive information directly into index.js, making it secure and easy to manage across different environments (e.g., development vs. deployment).


