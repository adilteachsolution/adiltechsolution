import { business } from './business-config.js';
const text = (v='') => String(v).toLowerCase().trim();
const has = (m, re) => re.test(m);

export function recommendPackage(message='') {
  const m = text(message);
  if (/(premium|advanced|automation|full|complete|ecommerce|complex|large|999)/.test(m)) return business.packages[2];
  if (/(standard|business|company|seo|marketing|multiple|growth|499)/.test(m)) return business.packages[1];
  return business.packages[0];
}
export function matchService(message='') {
  const m = text(message);
  const map = [
    ['Website Development', ['website','web site','landing page','web development','site']],
    ['App Development', ['app','mobile app','android','ios']],
    ['AI Solutions', ['ai','agent','chatbot','automation']],
    ['SEO', ['seo','google ranking','rank','ranking']],
    ['Social Media Marketing', ['facebook','instagram','tiktok','social media','marketing']],
    ['Google Business Profile Management', ['google business','business profile','gbp','google map','google maps']],
    ['Graphic Design', ['design','logo','poster','graphic','banner']],
    ['Technical Support', ['support','technical','fix','bug','problem']]
  ];
  for (const [service, keys] of map) if (keys.some(k => m.includes(k))) return service;
  return 'General Business Inquiry';
}
function packageDetails(pkg) {
  return `${pkg.name} (${pkg.price}) ${pkg.bestFor} ke liye hai. Exact pages aur features project requirement dekh kar confirm kiye jate hain; main bina requirement ke koi feature promise nahi karunga.`;
}
function websiteStructure(m) {
  let type = 'business';
  if (/(restaurant|cafe|food)/.test(m)) type = 'restaurant';
  else if (/(shop|store|ecommerce|product)/.test(m)) type = 'shop';
  else if (/(portfolio|personal)/.test(m)) type = 'portfolio';
  const extras = type === 'restaurant' ? 'Menu, gallery, location/map aur contact/WhatsApp' : type === 'shop' ? 'Products/categories, product details, trust section aur contact/order flow' : type === 'portfolio' ? 'About, work/projects, skills/services aur contact' : 'Services, About, trust/testimonials, FAQ aur Contact/WhatsApp';
  return `Bilkul. ${type} website ke liye ek strong starting structure ho sakta hai: Home hero + clear offer, ${extras}. Mobile-friendly design aur clear call-to-action zaroor hona chahiye. Agar aap business type, target customer aur required features batayen, main isi structure ko aapke project ke liye step-by-step customize kar dunga. V1.1 text structure/plan deta hai; actual visual mockup/image generation abhi connected nahi hai.`;
}
export function buildReply(message='') {
  const m = text(message);
  const service = matchService(message);
  const pkg = recommendPackage(message);

  if (has(m, /^(hello|hi|hey|salam|assalam|السلام|ہیلو)/)) return `Assalam-o-Alaikum. Main Adil AI OS, ${business.name} ka digital business consultant hoon. Main aapki requirement samajhne, website/app/AI, SEO, social media, Google Business Profile aur dusri digital services explain karne, project structure plan karne aur suitable solution choose karne mein help karta hoon.`;
  if (has(m, /(who are you|aap kaun|ap kon|tum kaun|who r u|آپ کون)/)) return `Main Adil AI OS hoon — ${business.name} ka digital business consultant. Mera kaam sirf package bolna nahi; main aapki business requirement samajh kar service, structure, benefits aur suitable next step explain karta hoon.`;
  if (has(m, /(what can you do|kya kar sakte|kya karte|services|service list|help me|madad)/)) return `${business.name} Website Development, App Development, AI Solutions, SEO, Social Media Marketing, Google Business Profile Management, Graphic Design aur Technical Support provide karta hai. Aap apna business aur goal bata dein—misal: zyada leads, website, Google visibility ya automation—main suitable approach samjha dunga.`;
  if (has(m, /(structure|layout|sections|page.*kya|pages.*kya|website.*kaisi|website.*kese|website.*kaise|mockup|preview|picture|image|dikhao|design.*kesa)/)) return websiteStructure(m);
  if (has(m, /(basic|standard|premium).*(kya|include|mil|feature|page|benefit|faida)|(?:kya|include|mil|feature|page|benefit|faida).*(basic|standard|premium)/)) return packageDetails(pkg);
  if (has(m, /(price|pricing|package|cost|kitna|قیمت|پیکج)/)) return `Hamare current starting packages Basic 199, Standard 499 aur Premium 999 hain. Package sirf price dekh kar choose nahi karna chahiye. Aap project type, required features aur goal bata dein; main explain karunga kaunsa option suitable hai aur kyun.`;
  if (has(m, /(google business|business profile|gbp|google map)/)) return `Google Business Profile local customers ke liye useful hai: business ko Google Search/Maps par sahi information, photos, services aur customer actions ke saath present karne mein madad karta hai. Setup/management mein profile information, service details aur ongoing optimization shamil ho sakti hai. Aapka business local customers serve karta hai to main uska recommended setup plan bata sakta hoon.`;
  if (has(m, /(seo|ranking|google rank)/)) return `SEO ka goal website ko search engines ke liye clear aur useful banana hai. Ismein site structure, relevant content, technical basics aur local/business signals important hote hain. Ranking guarantee karna sahi nahi hoga, lekin main aapke business ke liye practical SEO structure aur priorities suggest kar sakta hoon.`;
  if (has(m, /(social media|instagram|facebook|tiktok|marketing)/)) return `Social media marketing mein pehle target customer aur goal decide hota hai, phir content topics, posting plan, offers aur lead path banaya jata hai. Sirf posts banana kaafi nahi; content ko business goal se connect karna chahiye. Aap business type bata dein to main ek starter content/marketing plan suggest karunga.`;
  if (has(m, /(benefit|faida|fayda|kyun|why)/) && service !== 'General Business Inquiry') return `${service} ka faida aapke goal par depend karta hai. Main pehle yeh dekhunga ke aapko leads, online presence, customer support, sales ya automation mein se kis cheez ki zarurat hai; phir unnecessary features ke baghair suitable solution recommend karunga.`;
  if (service !== 'General Business Inquiry') return `Ji, yeh ${service} se related requirement lag rahi hai. Package choose karne se pehle main 3 cheezein samajhna chahta hoon: aapka business kis type ka hai, main goal kya hai, aur kaunse features zaroori hain? In details ke baad main structure, recommended solution aur suitable package explain kar sakta hoon.`;
  return `Main ${business.name} ke business aur digital services consultant ke taur par help karta hoon. Aap apna business-related sawaal seedha pooch sakte hain—website structure, app, AI/automation, SEO, Google Business Profile, social media, design, pricing ya project planning. Agar sawaal is scope se bahar ho to main business topic par wapas guide karunga.`;
}
