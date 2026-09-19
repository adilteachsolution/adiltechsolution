const $=s=>document.querySelector(s);
const key=()=>$('#adminKey').value.trim();
async function load(){
  $('#note').textContent='';
  if(!key()){ $('#note').textContent='Admin key enter karein.'; return; }
  try{
    const [sr,lr]=await Promise.all([
      fetch('/api/admin/stats',{headers:{'x-admin-key':key()}}),
      fetch('/api/leads',{headers:{'x-admin-key':key()}})
    ]);
    if(!sr.ok||!lr.ok) throw new Error('Admin key ya server configuration check karein.');
    const stats=await sr.json(), leads=await lr.json();
    $('#stats').innerHTML=`<div class="card">Total leads<strong>${stats.totalLeads}</strong></div><div class="card">New leads<strong>${stats.newLeads}</strong></div><div class="card">Services<strong>${Object.keys(stats.byService).length}</strong></div>`;
    $('#leadRows').innerHTML=leads.map(l=>`<tr><td>${new Date(l.createdAt).toLocaleString()}</td><td>${esc(l.name)}</td><td>${esc(l.phone||l.email)}</td><td>${esc(l.service)}</td><td>${esc(l.package)}</td><td>${esc(l.message)}</td></tr>`).join('')||'<tr><td colspan="6">No leads yet.</td></tr>';
  }catch(e){ $('#note').textContent=e.message; }
}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('#load').addEventListener('click',load); $('#refresh').addEventListener('click',load);
