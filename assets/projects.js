/* ==========================================================================
   Acceso restringido a proyectos.
   - Listado público (window.PROJECTS, en projects-index.js).
   - Al abrir un proyecto: usuario + contraseña -> descifrado AES-GCM en el
     navegador (esquema de sobre: la clave del proyecto se envuelve por usuario
     con PBKDF2). Sin servidor. El contenido nunca viaja en claro.
   ========================================================================== */
(function(){
  var enc=new TextEncoder(), dec=new TextDecoder();
  function b64ToBuf(b64){var bin=atob(b64),len=bin.length,u=new Uint8Array(len);for(var i=0;i<len;i++)u[i]=bin.charCodeAt(i);return u.buffer;}
  async function deriveKey(pass,saltBuf,iter){
    var base=await crypto.subtle.importKey('raw',enc.encode(pass),'PBKDF2',false,['deriveKey']);
    return crypto.subtle.deriveKey(
      {name:'PBKDF2',salt:saltBuf,iterations:iter,hash:'SHA-256'},
      base,{name:'AES-GCM',length:256},false,['decrypt']);
  }
  async function aesDecrypt(key,ivB64,ctB64){
    var pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:new Uint8Array(b64ToBuf(ivB64))},key,b64ToBuf(ctB64));
    return pt;
  }

  // returns decrypted HTML string, or throws
  async function unlock(data,username,password){
    var u=(username||'').trim().toLowerCase();
    var entry=(data.users||[]).find(function(x){return (x.u||'').toLowerCase()===u;});
    if(!entry) throw new Error('auth');
    if(data.v===2 || typeof data.content==='string'){
      if(String(entry.p)!==String(password)) throw new Error('auth');
      return dec.decode(b64ToBuf(data.content));
    }
    var iter=data.iter||150000;
    var wkKey=await deriveKey(password,b64ToBuf(entry.salt),iter);
    var projRaw;
    try{ projRaw=await aesDecrypt(wkKey,entry.iv,entry.wk); }
    catch(e){ throw new Error('auth'); }
    var projKey=await crypto.subtle.importKey('raw',projRaw,{name:'AES-GCM'},false,['decrypt']);
    var htmlBuf=await aesDecrypt(projKey,data.content.iv,data.content.ct);
    return dec.decode(htmlBuf);
  }

  // ---- Notificación de acceso por correo (Web3Forms) ----
  // Clave de acceso de Web3Forms, ligada a eduardo.alvmir@gmail.com.
  // El aviso incluye proyecto + usuario + fecha/hora; NUNCA la contraseña.
  var NOTIFY_KEY='7f602270-14aa-4275-a8d9-baaf08861d77';
  function notifyLogin(p,username){
    if(!NOTIFY_KEY || NOTIFY_KEY.indexOf('YOUR_')===0) return;
    var title=(p&&p.title&&(p.title.es||p.title))||(p&&p.id)||'proyecto';
    var when;
    try{ when=new Date().toLocaleString('es-CL',{timeZone:'America/Santiago'}); }catch(e){ when=new Date().toString(); }
    var payload={
      access_key:NOTIFY_KEY,
      subject:'Acceso a proyecto: '+title,
      from_name:'Sitio ealvarez.cl',
      proyecto:title,
      id_proyecto:(p&&p.id)||'',
      usuario:username||'',
      fecha_hora:when,
      navegador:(navigator&&navigator.userAgent)||''
    };
    try{
      fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload)}).catch(function(){});
    }catch(e){}
  }

  // ---- UI wiring ----
  var state={ current:null };

  function t(key){ var L=window.LANG||'es'; return (window.SITE.ui[key]||{})[L]||''; }

  function renderCards(){
    var grid=document.getElementById('projects-grid');
    if(!grid) return;
    var L=window.LANG||'es';
    grid.innerHTML='';
    (window.PROJECTS||[]).filter(function(p){return !p.hidden;}).forEach(function(p){
      var card=document.createElement('div');
      card.className='gate-card';
      card.innerHTML=
        '<div class="top"><div class="ic"><i class="ti ti-'+p.icon+'" aria-hidden="true"></i></div>'+
        '<span class="lockpill"><i class="ti ti-lock" aria-hidden="true"></i>'+t('need_creds')+'</span></div>'+
        '<h3>'+(p.title[L]||p.title.es)+'</h3>'+
        '<p class="cat">'+(p.cat?(p.cat[L]||p.cat.es):'')+'</p>'+
        '<button class="btn btn-primary open-proj"><i class="ti ti-lock-open" aria-hidden="true"></i>'+t('open_project')+'</button>';
      card.querySelector('.open-proj').addEventListener('click',function(){ openModal(p); });
      grid.appendChild(card);
    });
  }

  var modal, mUser, mPass, mErr, mTitle, mBtn;
  function ensureModal(){
    if(modal) return;
    modal=document.getElementById('login-modal');
    mUser=document.getElementById('m-user');
    mPass=document.getElementById('m-pass');
    mErr=document.getElementById('m-err');
    mTitle=document.getElementById('m-title');
    mBtn=document.getElementById('m-btn');
    document.getElementById('m-close').addEventListener('click',closeModal);
    modal.addEventListener('click',function(e){ if(e.target===modal) closeModal(); });
    document.getElementById('login-form').addEventListener('submit',onSubmit);
  }
  function openModal(p){
    ensureModal();
    state.current=p;
    var L=window.LANG||'es';
    mTitle.textContent=(p.title[L]||p.title.es);
    mErr.classList.remove('show');
    mUser.value=''; mPass.value='';
    modal.classList.add('open');
    setTimeout(function(){ mUser.focus(); },50);
  }
  function closeModal(){ if(modal) modal.classList.remove('open'); }

  async function onSubmit(e){
    e.preventDefault();
    if(!state.current) return;
    mErr.classList.remove('show');
    var orig=mBtn.innerHTML;
    mBtn.innerHTML='<span class="spin"></span>';
    mBtn.disabled=true;
    try{
      var res=await fetch(state.current.file,{cache:'no-store'});
      if(!res.ok) throw new Error('fetch');
      var data=await res.json();
      var html=await unlock(data,mUser.value,mPass.value);
      notifyLogin(state.current,(mUser.value||'').trim());
      openViewer(state.current,html);
      closeModal();
    }catch(err){
      mErr.textContent=t('login_err');
      mErr.classList.add('show');
      mPass.value=''; mPass.focus();
    }finally{
      mBtn.innerHTML=orig; mBtn.disabled=false;
    }
  }

  var viewer,vFrame,vTitle,vURL=null;
  function ensureViewer(){
    if(viewer) return;
    viewer=document.getElementById('viewer');
    vFrame=document.getElementById('viewer-frame');
    vTitle=document.getElementById('viewer-title');
    document.getElementById('viewer-close').addEventListener('click',closeViewer);
  }
  function openViewer(p,html){
    ensureViewer();
    var L=window.LANG||'es';
    vTitle.textContent=(p.title[L]||p.title.es);
    if(vURL) URL.revokeObjectURL(vURL);
    var blob=new Blob([html],{type:'text/html'});
    vURL=URL.createObjectURL(blob);
    vFrame.src=vURL;
    viewer.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeViewer(){
    if(!viewer) return;
    viewer.classList.remove('open');
    vFrame.src='about:blank';
    if(vURL){ URL.revokeObjectURL(vURL); vURL=null; }
    document.body.style.overflow='';
  }

  window.ProjectsModule={ render:renderCards };
})();
