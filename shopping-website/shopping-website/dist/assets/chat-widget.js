// Chat widget JS - paste into dist/assets/chat-widget.js
// This widget will try to POST to a server endpoint that should serve the AI replies.
// For GitHub Pages you will need to host the backend (Netlify/Vercel/Express)
// and set endpoint accordingly. Default endpoint used here is relative to Netlify:
// '/.netlify/functions/chat' — change if you host elsewhere.

(function(){
  // Preferred endpoints (tries in-order)
  const endpoints = [
    '/.netlify/functions/chat',
    '/api/chat',
    '/server/api/chat'
  ];

  async function findEndpoint() {
    for (const ep of endpoints) {
      try {
        // Try simple OPTIONS to check existence (some hosts may not respond to OPTIONS)
        const res = await fetch(ep, { method: 'OPTIONS' });
        if (res.ok || res.status === 204 || res.status === 405) return ep;
      } catch (e) {
        // ignore and continue
      }
    }
    // fallback to first known endpoint
    return endpoints[0];
  }

  const widgetHtml = `
<div id="chat-widget" aria-live="polite">
  <button id="chat-toggle" aria-label="Open chat">Chat</button>
  <div id="chat-panel" aria-hidden="true" style="display:none;flex-direction:column;">
    <div id="chat-header">
      <span>Shopping Assistant</span>
      <button id="chat-close" aria-label="Close chat">✕</button>
    </div>
    <div id="chat-messages" role="log"></div>
    <form id="chat-form">
      <input id="chat-input" type="text" placeholder="Ask about products, sizes, shipping..." autocomplete="off" />
      <button type="submit">Send</button>
    </form>
  </div>
</div>`;

  document.addEventListener('DOMContentLoaded', async function(){
    try {
      document.body.insertAdjacentHTML('beforeend', widgetHtml);
    } catch (err) {
      console.error('Cannot insert chat widget HTML:', err);
      return;
    }

    const toggle = document.getElementById('chat-toggle');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    function addMessage(text, from='bot') {
      const wrapper = document.createElement('div');
      wrapper.className = `message ${from}`;
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.textContent = text;
      wrapper.appendChild(bubble);
      messages.appendChild(wrapper);
      messages.scrollTop = messages.scrollHeight;
    }

    function setPanel(open) {
      panel.style.display = open ? 'flex' : 'none';
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    toggle.addEventListener('click', () => setPanel(true));
    closeBtn.addEventListener('click', () => setPanel(false));
    addMessage('Hello! I am your shopping assistant. Ask about products or shipping.', 'bot');

    const endpoint = await findEndpoint();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value && input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      addMessage('Typing...', 'bot');

      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        });

        // remove 'Typing...' placeholder
        const botMsgs = messages.querySelectorAll('.message.bot');
        if (botMsgs.length) botMsgs[botMsgs.length - 1].remove();

        if (!resp.ok) {
          addMessage('Sorry, the assistant is not available right now.', 'bot');
          const errText = await resp.text();
          console.error('Chat API error:', resp.status, errText);
          return;
        }

        const data = await resp.json();
        const reply = data.reply || data.error || 'No response from assistant.';
        addMessage(reply, 'bot');
      } catch (err) {
        // remove 'Typing...' placeholder
        const botMsgs2 = messages.querySelectorAll('.message.bot');
        if (botMsgs2.length) botMsgs2[botMsgs2.length - 1].remove();

        addMessage('Network error. Try again later.', 'bot');
        console.error('Network error:', err);
      }
    });

  });
})();
