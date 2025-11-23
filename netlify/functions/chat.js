// netlify/functions/chat.js
// Node 18+ compatible. Uses native fetch (Node 18+). If Node <18 on your platform, install node-fetch.
const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}");
    const userMessage = (body.message || "").toString().trim();
    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" })
      };
    }

    // Build system prompt to constrain assistant to shopping context
    const systemPrompt = `You are a helpful assistant for an e-commerce website "Shopping-website". 
    Provide product help, answer FAQs about products, guide users to use the site, recommend relevant product categories,
    and politely ask for clarifying details if needed. Do not invent personal data or reveal internal secrets. Keep responses concise and actionable.`;

    // Compose messages for Chat API
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ];

    // Send to OpenAI
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // you can change to another model in production
        messages,
        max_tokens: 600,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", response.status, errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "AI provider error", details: errText })
      };
    }

    const data = await response.json();
    const assistantReply = data.choices?.[0]?.message?.content || "Sorry, I could not generate a response.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: assistantReply })
    };

  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message })
    };
  }
};
