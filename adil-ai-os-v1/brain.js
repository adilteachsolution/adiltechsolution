import { business } from '../config/business.js';

const text = (v='') => String(v).toLowerCase();

export function recommendPackage(message='') {
  const m = text(message);
  if (/(premium|advanced|automation|full|complete|ecommerce|complex|large)/.test(m)) return business.packages[2];
  if (/(standard|business|company|seo|marketing|multiple|growth)/.test(m)) return business.packages[1];
  return business.packages[0];
}

export function matchService(message='') {
  const m = text(message);
  const map = [
    ['Website Development', ['website','web site','landing page','web development']],
    ['App Development', ['app','mobile app','android','ios']],
    ['AI Solutions', ['ai','agent','chatbot','automation']],
    ['SEO', ['seo','google ranking','rank']],
    ['Social Media Marketing', ['facebook','instagram','tiktok','social media','marketing']],
    ['Google Business Profile Management', ['google business','business profile','gbp']],
    ['Graphic Design', ['design','logo','poster','graphic']],
    ['Technical Support', ['support','technical','fix','bug']]
  ];
  for (const [service, keys] of map) if (keys.some(k => m.includes(k))) return service;
  return 'General Business Inquiry';
}

export function buildReply(message='') {
  const service = matchService(message);
  const pkg = recommendPackage(message);
  const m = text(message);

  if (/(price|pricing|package|cost|kitna|قیمت|پیکج)/.test(m)) {
    return `Hamare 3 packages hain: Basic 199, Standard 499, aur Premium 999. Aapki requirement ke mutabiq ${pkg.name} package suitable lagta hai.`;
  }
  if (/(hello|hi|salam|assalam|السلام)/.test(m)) {
    return `Assalam-o-Alaikum. Main Adil AI OS hoon. Aap website, app, AI solution, SEO ya social media service ke bare mein pooch sakte hain.`;
  }
  return `Aapki inquiry ${service} se related lag rahi hai. Shuruat ke liye ${pkg.name} package (${pkg.price}) suitable ho sakta hai. Agar aap project ka scope aur timeline batayen to main behtar recommendation de sakta hoon.`;
}
