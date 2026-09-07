# API

- `GET /api/health` health check
- `GET /api/business` business/services/packages
- `POST /api/chat` body: `{ "message": "I need a website" }`
- `POST /api/leads` create lead
- `GET /api/leads` requires `x-admin-key`
- `POST /api/whatsapp/handover` creates WhatsApp handover URL
- `GET /api/admin/stats` requires `x-admin-key`
