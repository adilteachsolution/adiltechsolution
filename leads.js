import { Router } from 'express';
import { addLead, listLeads } from '../services/leadStore.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();
router.post('/', async (req, res, next) => {
  try {
    const { name, phone, email, service, package: packageName, message } = req.body || {};
    if (!name || (!phone && !email)) return res.status(400).json({ error: 'Name and phone or email are required' });
    res.status(201).json(await addLead({ name, phone, email, service, package: packageName, message }));
  } catch (e) { next(e); }
});
router.get('/', adminAuth, async (_req, res, next) => {
  try { res.json(await listLeads()); } catch (e) { next(e); }
});
export default router;
