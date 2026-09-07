import { Router } from 'express';
import { whatsappLink } from '../services/whatsapp.js';

const router = Router();
router.post('/handover', (req, res) => res.json(whatsappLink(req.body || {})));
export default router;
