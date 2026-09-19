export function adminAuth(req, res, next) {
  const configured = process.env.ADMIN_KEY || 'change-me';
  const key = req.get('x-admin-key') || req.query.key;
  if (key !== configured) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
