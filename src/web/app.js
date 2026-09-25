const $=s=>document.querySelector(s); let active='';
const api=async(path,body)=>fetch(path,{method:body?'POST':'GET',headers:{'content-type':'application/json'},body:body?JSON.stringify(body):undefined});
async function load(){const cs=await (await api('/api/cameras')).json(); const sel=$('#camera'); sel.innerHTML='<option value="">Nenhuma câmera</option>'+cs.map(c=>`<option value="${c.id}">${c.name}</option>`).join(''); active=cs[0]?.id||''; sel.value=active; $('#status').textContent=active?'● ONLINE':'● OFFLINE'}
$('#camera').onchange=e=>active=e.target.value;
const speed=()=>Number($('#speed').value);
document.querySelectorAll('[data-move]').forEach(b=>{const d=b.dataset.move; const send=()=>active&&api(`/api/cameras/${active}/move`,{direction:d,panSpeed:speed(),tiltSpeed:speed()}); if(d==='stop') b.onclick=send; else {b.onpointerdown=send;b.onpointerup=b.onpointerleave=()=>active&&api(`/api/cameras/${active}/move`,{direction:'stop',panSpeed:speed(),tiltSpeed:speed()})}});
document.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>active&&api(`/api/cameras/${active}/zoom`,{direction:b.dataset.zoom,speed:3}));
document.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>active&&api(`/api/cameras/${active}/presets/${b.dataset.preset}`,{}));
$('#home').onclick=()=>active&&api(`/api/cameras/${active}/home`,{});
$('#scan').onclick=()=>alert('Descoberta NDI/ONVIF entra na próxima etapa.');
const themes=['auto','dark','light']; let theme=localStorage.theme||'auto'; function apply(){document.documentElement.dataset.theme=theme==='auto'?'':theme;localStorage.theme=theme} apply(); $('#theme').onclick=()=>{theme=themes[(themes.indexOf(theme)+1)%themes.length];apply()};
$('#about').onclick=()=>$('#aboutDialog').showModal();$('#closeAbout').onclick=()=>$('#aboutDialog').close();load();
