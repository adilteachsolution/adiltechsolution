import { Router } from 'express';
import { buildReply, matchService, recommendPackage } from './brain-service.js';
import { askRealAI, clearAISession } from './ai-service.js';

const router = Router();

router.post('/', async (req, res) => {
  const message = String(req.body?.message || '').trim();
  const sessionId = String(req.body?.sessionId || '').trim();
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const service = matchService(message);
  const pkg = recommendPackage(message);

  try {
    const ai = await askRealAI({ message, sessionId });
    if (ai) {
      return res.json({
        reply: ai.reply,
        service,
        package: pkg,
        sessionId: ai.sessionId,
        aiMode: 'openai',
        model: ai.model
      });
    }

    return res.json({
      reply: buildReply(message),
      service,
      package: pkg,
      sessionId,
      aiMode: 'fallback'
    });
  } catch (error) {
    console.error('AI request failed:', error?.message || error);
    return res.json({
      reply: buildReply(message),
      service,
      package: pkg,
      sessionId,
      aiMode: 'fallback',
      warning: 'Real AI is temporarily unavailable; fallback consultant reply used.'
    });
  }
});

router.post('/reset', (req, res) => {
  clearAISession(req.body?.sessionId);
  res.json({ ok: true });
});

export default router;
