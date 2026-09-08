import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'leads.json');
async function ensureFile() {
  try { await fs.access(dataFile); }
  catch { await fs.writeFile(dataFile, '[]'); }
}
export async function listLeads() {
  await ensureFile();
  return JSON.parse(await fs.readFile(dataFile, 'utf8') || '[]');
}
export async function addLead(input) {
  const leads = await listLeads();
  const lead = {
    id: `lead_${Date.now()}`,
    createdAt: new Date().toISOString(), status: 'new',
    name: input.name || '', phone: input.phone || '', email: input.email || '',
    service: input.service || '', package: input.package || '', message: input.message || ''
  };
  leads.unshift(lead);
  await fs.writeFile(dataFile, JSON.stringify(leads, null, 2));
  return lead;
}
