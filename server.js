import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js';
import leadsRouter from './routes/leads.js';
import whatsappRouter from './routes/whatsapp.js';
import adminRouter from './routes/admin.js';
import { business } from './config/business.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontend = path.resolve(__dirname, '../frontend');

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

app.get('/api/health', (_req, res) => res.json({ ok: true, app: 'Adil AI OS', version: '1.0.0' }));
app.get('/api/business', (_req, res) => res.json(business));
app.use('/api/chat', chatRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/whatsapp', whatsappRouter);
app.use('/api/admin', adminRouter);

app.use(express.static(frontend));
app.get('*', (_req, res) => res.sendFile(path.join(frontend, 'index.html')));
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: 'Server error' }); });

const port = Number(process.env.PORT || 3000);
if (process.env.VERCEL !== '1') app.listen(port, () => console.log(`Adil AI OS running on http://localhost:${port}`));

export default app;
