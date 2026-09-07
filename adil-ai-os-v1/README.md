# Adil AI OS — Version 1

Adil AI OS v1 is the first working foundation for Adil Tech Solution. It includes a website AI assistant, service/package recommendations, lead capture, WhatsApp handover, and a simple admin dashboard.

## Included in Version 1
- AI Brain based on business services, packages and FAQs
- Website chat widget
- Basic / Standard / Premium recommendations: 199 / 499 / 999
- Lead capture and local JSON storage
- WhatsApp handover link generation
- Admin dashboard for leads and statistics
- API health endpoint and basic security middleware
- Config files and deployment notes

## Quick start
1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill values.
4. Run `npm start`.
5. Open `http://localhost:3000`.
6. Admin dashboard: `http://localhost:3000/admin.html`.

## Important deployment note
GitHub Pages can host static HTML/CSS/JS only. The Node.js API must run on a server platform. You can still keep the complete code on GitHub and connect that repository to a Node-compatible host such as Vercel, Render, Railway, or another service.

## Version 1 scope
This ZIP intentionally focuses on the first live foundation. Social posting, AI image/video creation, Facebook, Instagram, TikTok and Google Business Profile automation belong to later modules.
