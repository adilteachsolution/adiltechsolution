# Architecture

Frontend -> `/api/chat` -> AI Brain rules -> recommendation
Frontend -> `/api/leads` -> JSON lead store
Frontend -> `/api/whatsapp/handover` -> WhatsApp URL
Admin -> protected `/api/leads` and `/api/admin/stats`

Version 1 uses a simple local JSON lead store so the code is easy to understand and test. A production database can replace it later without changing the frontend flow.
