# Deployment checklist

1. Push this project to GitHub.
2. Do not commit a real `.env` file.
3. Deploy the repository on a Node-compatible host.
4. Configure `WHATSAPP_NUMBER`, `ADMIN_KEY`, and other environment variables.
5. Test `/api/health`.
6. Test website chat.
7. Submit one test lead.
8. Open `/admin.html` and verify the lead appears.

For a static GitHub Pages website, the chat frontend can be embedded, but its API URL must point to the deployed backend host.
