import { business } from './business-config.js';

const text = (v = '') => String(v).toLowerCase().trim();
const has = (m, re) => re.test(m);

// -------------------------
// PACKAGE RECOMMENDATION
// -------------------------
export function recommendPackage(message = '') {
  const m = text(message);

  if (/(premium|advanced|automation|full|complete|ecommerce|complex|large|999)/.test(m)) {
    return business.packages[2];
  }

  if (/(standard|business|company|seo|marketing|multiple|growth|499)/.test(m)) {
    return business.packages[1];
  }

  return business.packages[0];
}

// -------------------------
// SERVICE DETECTION
// -------------------------
export function matchService(message = '') {
  const m = text(message);

  const map = [
    ['Website Development',
      ['website', 'web site', 'landing page', 'web development', 'site']],

    ['App Development',
      ['app', 'mobile app', 'android', 'ios']],

    ['AI Solutions',
      ['ai', 'agent', 'chatbot', 'automation']],

    ['SEO',
      ['seo', 'google ranking', 'rank', 'ranking']],

    ['Social Media Marketing',
      ['facebook', 'instagram', 'tiktok', 'social media', 'marketing']],

    ['Google Business Profile Management',
      ['google business', 'business profile', 'gbp', 'google map', 'google maps']],

    ['Graphic Design',
      ['design', 'logo', 'poster', 'graphic', 'banner']],

    ['Technical Support',
      ['support', 'technical', 'fix', 'bug', 'problem']]
  ];

  for (const [service, keys] of map) {
    if (keys.some(k => m.includes(k))) return service;
  }

  return 'General Business Inquiry';
}

// -------------------------
// PACKAGE DETAILS
// -------------------------
function packageDetails(pkg) {
  return `${pkg.name} (${pkg.price}) ${pkg.bestFor} ke liye hai. Lekin sirf price dekh kar package choose karna sahi nahi hoga. Pehle business ka goal, required features aur project scope samajhna zaroori hai. Uske baad suitable package confirm kiya ja sakta hai.`;
}

// -------------------------
// WEBSITE CONSULTANT
// -------------------------
function websiteStructure(m) {
  let type = 'business';

  if (/(restaurant|cafe|food|hotel)/.test(m)) {
    type = 'restaurant';
  } else if (/(shop|store|ecommerce|product|dukan|dukkan)/.test(m)) {
    type = 'shop';
  } else if (/(portfolio|personal|freelancer)/.test(m)) {
    type = 'portfolio';
  }

  let extras;

  if (type === 'restaurant') {
    extras = 'Menu, photos/gallery, location/map, opening hours aur WhatsApp/contact';
  } else if (type === 'shop') {
    extras = 'Products/categories, product information, business trust section, location aur WhatsApp/order flow';
  } else if (type === 'portfolio') {
    extras = 'About, work/projects, skills/services, testimonials aur contact';
  } else {
    extras = 'Services, About, trust/testimonials, FAQ aur Contact/WhatsApp';
  }

  return `Bilkul. ${type} website ke liye main pehle customer ka goal clear karunga.

Ek strong starting structure yeh ho sakta hai:

Home page par clear business introduction aur main offer.
${extras}.
Mobile-friendly design.
Clear Call-to-Action, jaise Call, WhatsApp, Get Quote ya Order.
Business ki credibility ke liye reviews, photos ya trust information.

Lekin final website structure decide karne se pehle mujhe 3 cheezein bata dein:

1. Aapka business kis cheez ka hai?
2. Aapke customers local hain ya online bhi?
3. Website se aapka main goal kya hai — calls, WhatsApp inquiries, orders, bookings ya sirf business information?

In details ke baad main aapko unnecessary features ke baghair suitable website plan suggest karunga.`;
}

// -------------------------
// NEW BUSINESS / SHOP CONSULTANT
// -------------------------
function newBusinessAdvice(m) {
  const shopDetected = /(shop|store|dukan|dukkan|shop van|shop ban|product)/.test(m);

  if (shopDetected) {
    return `Bilkul. Agar aap nayi shop start kar rahe hain to meri salah yeh hogi ke pehle sirf website banwane ke bajaye poora basic digital setup business ki zarurat ke hisaab se plan karein.

Nayi shop ke liye aam tor par yeh cheezein useful hoti hain:

1. Google Business Profile — taake local customers aapko Google Search aur Maps par dhoond saken.

2. WhatsApp Business — customer seedha products, price, location aur availability ke baare mein contact kar sake.

3. Simple professional website — jahan shop ka introduction, products/services, location, timing aur contact/WhatsApp ho.

4. Facebook/Instagram — agar aapke customers social media use karte hain to products, offers aur shop updates dikhane ke liye.

5. Professional branding — basic logo, business colors aur consistent design customer ka trust improve karte hain.

Main aapko abhi unnecessary expensive system recommend nahi karunga. Pehle yeh samajhna zaroori hai ke aapki shop kis cheez ki hogi aur customers kahan se aayenge.

Mujhe 3 cheezein bata dein:
• Shop mein aap kya sell karenge?
• Shop physical/local hogi ya online orders bhi lenge?
• Aap kis city/area ke customers ko target karna chahte hain?

Phir main aapke liye step-by-step suitable digital setup suggest karunga.`;
  }

  return `Bilkul. Naya business start karte waqt pehle website ya package choose karne ke bajaye business ka basic digital plan banana behtar hota hai.

Main pehle yeh samajhna chahunga:

1. Aap kis type ka business start kar rahe hain?
2. Aap kya product ya service sell karenge?
3. Aapke customers local honge ya online?
4. Aapka main goal kya hai — customers lana, calls/WhatsApp inquiries lena, online sales karna ya brand banana?

In answers ke basis par main bata sakta hoon ke aapko website, Google Business Profile, social media, WhatsApp Business, SEO ya kisi aur solution mein se pehle kya chahiye.

Main unnecessary services recommend karne ke bajaye aapke business ke liye practical starting setup suggest karunga.`;
}

// -------------------------
// MAIN REPLY ENGINE
// -------------------------
export function buildReply(message = '') {
  const m = text(message);
  const service = matchService(message);
  const pkg = recommendPackage(message);

  // Greeting
  if (has(m, /^(hello|hi|hey|salam|assalam|السلام|ہیلو)/)) {
    return `Assalam-o-Alaikum. Main Adil AI OS, ${business.name} ka digital business consultant hoon. Aap apna business, problem ya goal seedha bata dein. Main suitable digital solution samjhane ki koshish karunga.`;
  }

  // Who are you
  if (has(m, /(who are you|aap kaun|ap kon|tum kaun|who r u|آپ کون)/)) {
    return `Main Adil AI OS hoon — ${business.name} ka digital business consultant. Mera kaam sirf packages batana nahi, balki aapki business requirement samajh kar suitable services, structure aur next steps explain karna hai.`;
  }

  // New business / shop consultation
  if (
    has(m, /(new business|start business|starting business|business start|new shop|shop start|shop khol|shop bana|shop ban|dukan|dukkan|karobar start|karobaar start|business shuru|karobar shuru|mashwara|mashvera|مشورہ|کاروبار)/)
  ) {
    return newBusinessAdvice(m);
  }

  // What can you do
  if (has(m, /(what can you do|kya kar sakte|kya karte|services|service list|help me|madad)/)) {
    return `${business.name} Website Development, App Development, AI Solutions, SEO, Social Media Marketing, Google Business Profile Management, Graphic Design aur Technical Support provide karta hai.

Aap sirf service ka naam choose karne ki zarurat nahi. Apna business aur goal bata dein — main pehle requirement samajh kar suitable approach suggest karunga.`;
  }

  // Website structure
  if (
    has(m, /(structure|layout|sections|page.*kya|pages.*kya|website.*kaisi|website.*kese|website.*kaise|mockup|preview|picture|image|dikhao|design.*kesa)/)
  ) {
    return websiteStructure(m);
  }

  // Package details
  if (
    has(m, /(basic|standard|premium).*(kya|include|mil|feature|page|benefit|faida)|(?:kya|include|mil|feature|page|benefit|faida).*(basic|standard|premium)/)
  ) {
    return packageDetails(pkg);
  }

  // Pricing
  if (has(m, /(price|pricing|package|cost|kitna|قیمت|پیکج)/)) {
    return `Hamare current starting packages Basic 199, Standard 499 aur Premium 999 hain.

Lekin main sirf price dekh kar package recommend nahi karunga. Aap project type, business goal aur required features bata dein. Phir main explain karunga ke kaunsa option suitable ho sakta hai aur kyun.`;
  }

  // Google Business Profile
  if (has(m, /(google business|business profile|gbp|google map)/)) {
    return `Google Business Profile khas taur par local businesses ke liye useful hai. Isse business Google Search aur Maps par location, timing, phone, photos aur services ke saath appear kar sakta hai.

Agar aap local customers serve karte hain to yeh aapke digital setup ka important hissa ho sakta hai.

Aap apna business type aur target area bata dein, phir main suitable setup explain karunga.`;
  }

  // SEO
  if (has(m, /(seo|ranking|google rank)/)) {
    return `SEO ka purpose website ko search engines aur users dono ke liye clear aur useful banana hai.

Ismein website structure, relevant content, technical basics aur local/business signals important hote hain.

Google ranking guarantee karna sahi nahi hoga. Pehle aapka business, target customer aur location samajh kar practical SEO priorities decide karni chahiye.`;
  }

  // Social Media
  if (has(m, /(social media|instagram|facebook|tiktok|marketing)/)) {
    return `Social media marketing sirf posts upload karne ka naam nahi hai.

Pehle target customer aur business goal decide hota hai. Uske baad content topics, offers, posting plan aur customer ko WhatsApp, website ya inquiry tak lane ka path banaya jata hai.

Aap business type aur target customer bata dein to main starter social media strategy suggest kar sakta hoon.`;
  }

  // Benefits
  if (
    has(m, /(benefit|faida|fayda|kyun|why)/) &&
    service !== 'General Business Inquiry'
  ) {
    return `${service} ka faida aapke business goal par depend karta hai.

Main pehle yeh dekhunga ke aapko leads, online presence, customer support, sales ya automation mein se kis cheez ki zarurat hai. Uske baad unnecessary features ke baghair suitable solution recommend karunga.

Aap apna business type aur main goal bata dein.`;
  }

  // Recognized service
  if (service !== 'General Business Inquiry') {
    return `Ji, aapki requirement ${service} se related lag rahi hai.

Lekin package ya solution final karne se pehle mujhe 3 cheezein samajhni hongi:

1. Aapka business kis type ka hai?
2. Aapka main goal kya hai?
3. Aapko kaunse features ya result chahiye?

In details ke baad main suitable structure, solution aur package explain kar sakta hoon.`;
  }

  // General consultant fallback
  return `Ji, main aapko is par guide kar sakta hoon. Lekin sahi mashwara dene ke liye mujhe aapki requirement thori aur samajhni hogi.

Aap mujhe yeh 3 cheezein bata dein:

1. Aapka business ya kaam kis cheez ka hai?
2. Aap abhi kis problem ko solve karna chahte hain?
3. Aapka main goal kya hai — zyada customers, online presence, sales, WhatsApp inquiries, Google visibility ya automation?

Uske baad main aapki situation ke mutabiq practical next step suggest karunga, sirf services ki list nahi dunga.`;
}
