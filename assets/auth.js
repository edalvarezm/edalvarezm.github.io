/* ==========================================================================
   Avatar de cuenta Google en el header.
   Muestra el ícono del propietario cuando ha iniciado sesión con Google en el
   mantenedor (perfil guardado en localStorage 'eam-gauth'). Los visitantes no
   ven nada. Incluye un menú con nombre/correo, acceso a edición y cerrar sesión.
   ========================================================================== */
(function(){
  var ALLOWED=['eduardo.alvmir@gmail.com'];
  function LG(){return (window.LANG==='en')?'en':'es';}
  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function getUser(){ try{ return JSON.parse(localStorage.getItem('eam-gauth')||'null'); }catch(e){ return null; } }
  function signOut(){ try{localStorage.removeItem('eam-gauth');}catch(e){} try{sessionStorage.removeItem('mant-ok');}catch(e){} render(); }

  function render(){
    var slot=document.getElementById('gauth-nav'); if(!slot) return;
    var priv=document.getElementById('priv-nav');
    var u=getUser();
    if(!u || !u.email || ALLOWED.indexOf(String(u.email).toLowerCase())<0){
      slot.style.display='none'; slot.innerHTML='';
      if(priv) priv.style.display='';          /* sin sesión: mostrar "Acceso Privado" */
      return;
    }
    if(priv) priv.style.display='none';         /* con sesión: ocultar "Acceso Privado" (se accede por el avatar) */
    var L=LG();
    var name=u.name||u.email;
    var initial=(name||'?').trim().charAt(0).toUpperCase();
    var img = u.picture ? '<img src="'+esc(u.picture)+'" alt="" referrerpolicy="no-referrer" onerror="this.style.display=\'none\';var f=this.parentNode.querySelector(\'.gauth-fallback\');if(f)f.style.display=\'flex\'">' : '';
    slot.style.display='';
    slot.innerHTML=
      '<button class="gauth-btn" id="gauth-btn" title="'+esc(u.email)+'" aria-label="'+(L==='en'?'Account':'Cuenta')+'">'+
        img+
        '<span class="gauth-fallback" style="display:'+(u.picture?'none':'flex')+'">'+esc(initial)+'</span>'+
      '</button>'+
      '<div class="gauth-pop" id="gauth-pop" role="menu">'+
        '<div class="gauth-id"><div class="gauth-nm">'+esc(u.name||'')+'</div><div class="gauth-em">'+esc(u.email)+'</div></div>'+
        '<a class="gauth-act" href="tools/mantenedor.html">'+(L==='en'?'Go to editing':'Ir a edición')+'</a>'+
        '<button type="button" class="gauth-act gauth-out" id="gauth-out">'+(L==='en'?'Sign out':'Cerrar sesión')+'</button>'+
      '</div>';
    var btn=slot.querySelector('#gauth-btn'), pop=slot.querySelector('#gauth-pop');
    btn.addEventListener('click',function(e){ e.stopPropagation(); pop.classList.toggle('open'); });
    pop.addEventListener('click',function(e){ e.stopPropagation(); });
    slot.querySelector('#gauth-out').addEventListener('click',function(){ signOut(); });
    if(!window.__gauthDocClose){
      window.__gauthDocClose=true;
      document.addEventListener('click',function(){ var p=document.getElementById('gauth-pop'); if(p) p.classList.remove('open'); });
    }
  }

  window.AuthModule={render:render};
  document.addEventListener('DOMContentLoaded',render);
})();
