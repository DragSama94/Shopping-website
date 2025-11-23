// server/index.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // if Node <18, npm i node-fetch@2
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.post('/api/chat', async (req, res) => {
  const userMessage = (req.body.message || "").trim();
  if (!userMessage) return res.status(400).json({ error: 'No message' });
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {role:'system', content: 'You are a shopping assistant for the Shopping-website.'},
          {role:'user', content: userMessage}
        ],
        max_tokens: 600,
        temperature: 0.2
      })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
