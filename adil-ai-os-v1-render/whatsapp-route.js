import { Router } from 'express';
import { whatsappLink } from './whatsapp-service.js';
const router = Router();
router.post('/handover', (req, res) => res.json(whatsappLink(req.body || {})));
export default router;
