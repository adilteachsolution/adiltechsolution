# Adil AI OS V1.1 Final

Render-ready flat build for mobile GitHub upload.

## Required Render environment variables
- `BUSINESS_NAME` = Adil Tech Solution
- `BUSINESS_EMAIL` = your business email
- `WHATSAPP_NUMBER` = WhatsApp number in international digits-only format
- `ADMIN_KEY` = private admin password
- `OPENAI_API_KEY` = private OpenAI API key (never put this in GitHub/frontend)

## Optional
- `OPENAI_MODEL` = `gpt-5.6-luna` (default)

## What changed in V1.1 Final
- Real OpenAI Responses API integration on the Node/Render backend.
- Separate browser session ID for each client, so concurrent clients do not share chat context.
- Multi-turn context: the agent can remember details such as hotel, grocery/baqala, restaurant, salon, etc. during the active session.
- Strong consultant instructions: understand first, answer specifically, do not invent package inclusions, and do not push packages unnecessarily.
- Existing lead capture, admin and WhatsApp handover preserved.
- Safe fallback replies remain available if the AI API is missing or temporarily unavailable.

## Render commands
Build: `npm install`
Start: `npm start`

Note: in-memory conversation context resets if the Render service restarts/redeploys. Persistent conversation storage can be added in a later version with a database.


## V1.1 Final Multilingual
- Real OpenAI Responses API consultant brain
- Separate browser session context for simultaneous clients
- Automatic reply language: English, Arabic, Urdu, Hindi, Roman Urdu/Hindi, and other languages supported by the model
- Client can switch language mid-conversation
- Existing lead capture and WhatsApp handover preserved
- Keep OPENAI_API_KEY only in Render Environment; never commit it to GitHub
- Default model: gpt-5.6-luna (override with OPENAI_MODEL)
