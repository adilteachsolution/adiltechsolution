const $ = s => document.querySelector(s);
const messages = $('#messages');
let lastContext = { service: '', package: { name: 'Basic' } };

function getSessionId() {
  const key = 'adil_ai_os_session_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`).replaceAll('-', '');
    localStorage.setItem(key, id);
  }
  return id;
}

const sessionId = getSessionId();

function add(text, who='bot') {
  const el = document.createElement('div');
  el.className = `msg ${who}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

async function ask(message) {
  add(message, 'user');
  $('#messageInput').value = '';
  try {
    const r = await fetch('/api/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ message, sessionId })
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || 'Chat error');
    lastContext = data;
    add(data.reply);
  } catch {
    add('AI server abhi connect nahi ho saka. Thori der baad dobara try karein ya WhatsApp se contact karein.');
  }
}

$('#chatForm').addEventListener('submit', e => { e.preventDefault(); const v=$('#messageInput').value.trim(); if(v) ask(v); });
document.querySelectorAll('[data-msg]').forEach(b => b.addEventListener('click', () => ask(b.dataset.msg)));

$('#leadButton').addEventListener('click', () => {
  $('#leadService').value = lastContext.service || '';
  $('#leadPackage').value = lastContext.package?.name || 'Basic';
  $('#leadDialog').showModal();
});
$('#closeDialog').addEventListener('click', () => $('#leadDialog').close());

$('#leadForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = Object.fromEntries(new FormData(e.currentTarget));
  if (!form.phone && !form.email) { $('#leadResult').textContent='Phone ya email mein se ek zaroor dein.'; return; }
  try {
    const r = await fetch('/api/leads', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const lead = await r.json();
    if (!r.ok) throw new Error(lead.error);
    $('#leadResult').textContent = 'Lead save ho gayi.';
    const w = await fetch('/api/whatsapp/handover', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name:form.name, service:form.service, packageName:form.package }) });
    const wa = await w.json();
    if (wa.configured) window.open(wa.url, '_blank', 'noopener');
    else $('#leadResult').textContent += ' WhatsApp number Render Environment mein configure karna baqi hai.';
  } catch (err) { $('#leadResult').textContent = err.message || 'Could not save lead.'; }
});

add('Hello • السلام عليكم • Assalam-o-Alaikum — I am Adil AI OS, Adil Tech Solution’s digital business consultant. Ask in English, العربية, اردو, हिन्दी or Roman Urdu/Hindi. I will reply in the language you use.');
