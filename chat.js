import { Router } from 'express';
import { buildReply, matchService, recommendPackage } from '../services/brain.js';

const router = Router();
router.post('/', (req, res) => {
  const message = String(req.body?.message || '').trim();
  if (!message) return res.status(400).json({ error: 'Message is required' });
  const pkg = recommendPackage(message);
  res.json({ reply: buildReply(message), service: matchService(message), package: pkg });
});
export default router;
