# Shopping-website

A simple static **Sign-up / Landing** web page for a shopping website. This repository contains the HTML, CSS and JavaScript used to create a responsive signup landing page and a small UI interaction script. A live demo of the site is published via GitHub Pages.

---

## Demo

Live demo: https://dragsama94.github.io/Shopping-website/

---

## Project structure

```
Shopping-website/
├─ index.html         # Main landing / sign-up page
├─ style.css          # Styles for layout and components
└─ script.js          # Client-side behavior (form handling, UI interactions)
```

---

## About

This is a lightweight, front-end-only project suitable for demonstrating basic web UI and client-side form handling. It can be used as a starter template for a larger shopping website or as a portfolio piece.

---

## Features

- Sign-up form with fields for **username**, **email**, and **password**.
- Terms & Conditions checkbox and a link for existing users to log in.
- Responsive layout suitable for small portfolio/demo projects.
- Client-side JavaScript file for form interactions and simple validation (if implemented).

---

## Technologies

- HTML
- CSS
- JavaScript
- Git / GitHub (GitHub Pages for hosting)

---

## Running locally

1. Clone the repository:

```bash
git clone https://github.com/DragSama94/Shopping-website.git
cd Shopping-website
```

2. Open `index.html` directly in your browser, OR serve it with a simple HTTP server (recommended):

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

---

## Suggested improvements / To do

- **Persist signups**: Add a backend (Node.js/Express, Flask, or any backend stack) with a database to store users.
- **Password security**: Use server-side hashing (bcrypt) and validation—never store plaintext passwords.
- **Form validation**: Add stronger client and server validation (email format, password strength, duplicate checks).
- **Accessibility**: Add `aria-` attributes, proper labels, keyboard navigation and focus states.
- **Responsive polish**: Tweak breakpoints and layout for very small or very large screens.
- **Tests & CI**: Add unit/visual tests and a GitHub Action to lint and deploy automatically to GitHub Pages.
- **Design assets**: Add product thumbnails, a real product list, and a shopping cart flow.

---

## Contribution

Contributions are welcome. If you'd like me to help add any of the suggested improvements (backend, auth, or UI polish), open an issue or share the files you want changed.

Suggested PR workflow:

1. Fork the repo
2. Create a feature branch (`feature/your-feature`)
3. Commit and push
4. Open a Pull Request describing the changes

---

## License

Add a license file if you want to make the repo open source (MIT, Apache 2.0, etc.).

---

## Notes about this README

I generated this README from the repository structure and the live demo page. If you want a README that includes line-by-line code explanations, function descriptions, or screenshots generated from the exact source files, paste the contents of `index.html`, `style.css`, and `script.js` here or grant read access, and I will update the README to include code-level documentation and sample screenshots.

## Chatbot: Virtual Shopping Assistant

This project includes a simple chat assistant that uses an LLM to answer user queries.

### Files added
- `netlify/functions/chat.js` - serverless function proxy to OpenAI
- `includes/chat-widget.html` - chat widget HTML snippet
- `assets/css/chat-widget.css` - chat widget styles
- `assets/js/chat-widget.js` - chat frontend logic
- `.env.example` - example environment variables

### Setup (Netlify)
1. In Netlify, create a new site from this repository.
2. In Site Settings → Build & Deploy → Environment, add:
   - `OPENAI_API_KEY` = your OpenAI API key
   - (optional) `OPENAI_MODEL` = `gpt-4o-mini` or preferred model
3. Build & deploy. The serverless function endpoint will be available at `/.netlify/functions/chat`.
4. Ensure `includes/chat-widget.html` is included in your `index.html` (paste snippet before `</body>`).

### Setup (Local with Express)
1. `cd server`
2. `npm install`
3. Create `.env` with `OPENAI_API_KEY=sk-...`
4. Run `node index.js`
5. Update `assets/js/chat-widget.js` fetch URL to `http://localhost:3000/api/chat`.

### Security
- Never commit your OpenAI key to the repository.
- For Netlify/Render/Vercel use environment variables in the dashboard.


