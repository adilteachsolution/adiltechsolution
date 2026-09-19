import { business } from './business-config.js';
export function whatsappLink({ name='', service='', packageName='' } = {}) {
  const number = (business.whatsapp || '').replace(/\D/g, '');
  const message = `Assalam-o-Alaikum, main ${name || 'customer'} hoon. Mujhe ${service || 'Adil Tech Solution service'} ke bare mein maloomat chahiye${packageName ? ` (${packageName} package)` : ''}.`;
  if (!number) return { configured: false, url: '', message };
  return { configured: true, url: `https://wa.me/${number}?text=${encodeURIComponent(message)}`, message };
}
