import { Router } from 'express';
import { adminAuth } from './admin-auth.js';
import { listLeads } from './lead-store.js';
const router = Router();
router.get('/stats', adminAuth, async (_req, res, next) => {
  try {
    const leads = await listLeads();
    const byService = {};
    for (const lead of leads) byService[lead.service || 'Unknown'] = (byService[lead.service || 'Unknown'] || 0) + 1;
    res.json({ totalLeads: leads.length, newLeads: leads.filter(x => x.status === 'new').length, byService });
  } catch (e) { next(e); }
});
export default router;
