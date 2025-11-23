// assets/js/chat-widget.js
(function(){
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value && input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    addMessage('Typing...', 'bot'); // temp placeholder

    try {
      const resp = await fetch('/.netlify/functions/chat', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!resp.ok) {
        const err = await resp.text();
        // remove the typing placeholder
        const placeholders = messages.querySelectorAll('.message.bot');
        if (placeholders.length) placeholders[placeholders.length-1].remove();
        addMessage('Sorry, something went wrong. Please try again later.', 'bot');
        console.error('Chat API error', err);
        return;
      }

      const json = await resp.json();
      // remove the typing placeholder
      const placeholders = messages.querySelectorAll('.message.bot');
      if (placeholders.length) placeholders[placeholders.length-1].remove();

      addMessage(json.reply || 'No reply from assistant.', 'bot');
    } catch (err) {
      // remove the typing placeholder
      const placeholders = messages.querySelectorAll('.message.bot');
      if (placeholders.length) placeholders[placeholders.length-1].remove();
      addMessage('Network error. Try again later.', 'bot');
      console.error(err);
    }
  });

  // Optional: initial greeting
  addMessage('Hello! I am your shopping assistant. Ask about products, sizes, or shipping.', 'bot');
})();
