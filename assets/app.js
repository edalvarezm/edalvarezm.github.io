/* ==========================================================================
   Lógica principal: idioma (ES/EN), render de contenido, navegación,
   clústeres de publicaciones por línea de investigación.
   ========================================================================== */
(function(){
  var S=window.SITE;
  window.LANG = localStorage.getItem('eam-lang') || 'es';

  function T(k){ return (S.ui[k]||{})[window.LANG] || (S.ui[k]||{}).es || ''; }
  function L(obj){ return obj ? (obj[window.LANG]||obj.es||'') : ''; }
  function esc(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  /* ---------- i18n for static [data-i18n] nodes ---------- */
  function applyStatic(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = T(el.getAttribute('data-i18n'));
    });
    document.documentElement.lang = window.LANG;
    document.querySelectorAll('.lang-toggle button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang')===window.LANG);
    });
  }

  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}

  /* ---------- research lines (clickable clusters) ---------- */
  function renderLines(){
    var g=document.getElementById('lines-grid'); if(!g)return; g.innerHTML='';
    S.researchLines.forEach(function(x){
      var count=(window.PUBLICATIONS||[]).filter(function(p){return (p[4]||[]).indexOf(x.topic)>=0;}).length;
      var card=el('div','line-card',
        '<div class="ic"><i class="ti ti-'+x.icon+'" aria-hidden="true"></i></div>'+
        '<h3>'+L(x.t)+'</h3><p>'+L(x.d)+'</p>'+
        '<span class="line-see">'+T('lines_see')+' ('+count+') <i class="ti ti-arrow-right" aria-hidden="true"></i></span>');
      card.setAttribute('role','button'); card.setAttribute('tabindex','0');
      card.addEventListener('click',function(){ openCluster(x); });
      card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){e.preventDefault();openCluster(x);} });
      g.appendChild(card);
    });
  }

  /* ---------- cluster modal (publications of a research line) ---------- */
  var cModal,cTitle,cCount,cBody;
  function ensureCluster(){
    if(cModal)return;
    cModal=document.getElementById('cluster-modal');
    cTitle=document.getElementById('cluster-title');
    cCount=document.getElementById('cluster-count');
    cBody=document.getElementById('cluster-body');
    document.getElementById('cluster-close').addEventListener('click',closeCluster);
    cModal.addEventListener('click',function(e){ if(e.target===cModal) closeCluster(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeCluster(); });
  }
  function openCluster(line){
    ensureCluster();
    cTitle.innerHTML='<i class="ti ti-'+line.icon+'" aria-hidden="true"></i> '+L(line.t);
    var pubs=(window.PUBLICATIONS||[]).filter(function(p){return (p[4]||[]).indexOf(line.topic)>=0;})
                                      .sort(function(a,b){return b[0]-a[0];});
    cCount.textContent=pubs.length+' '+T('cluster_count');
    cBody.innerHTML=pubs.map(function(p){
      return '<div class="cpub">'+
             '<span class="cpub-y">'+p[0]+'</span>'+
             '<div class="cpub-b"><a class="cpub-t" href="'+window.pubLink(p[1])+'" target="_blank" rel="noopener">'+esc(p[1])+' <i class="ti ti-external-link" aria-hidden="true"></i></a>'+
             '<div class="cpub-m">'+(p[2]?esc(p[2])+' · ':'')+'<span class="venue">'+esc(p[3])+'</span></div></div>'+
             '</div>';
    }).join('');
    cBody.scrollTop=0;
    cModal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeCluster(){ if(cModal){ cModal.classList.remove('open'); document.body.style.overflow=''; } }

  /* ---------- trajectory ---------- */
  function tl(list){
    return list.map(function(x){
      return '<li><div class="yr">'+ (x.yr||'') +'</div><div class="tl-role">'+L(x.ti)+'</div>'+
             (x.desc?'<div class="desc">'+L(x.desc)+'</div>':'')+
             (x.note?'<div class="callout" style="margin-top:12px"><p>'+L(x.note)+'</p></div>':'')+'</li>';
    }).join('');
  }
  function renderTrajectory(){
    var wrap=document.getElementById('traj-wrap'); if(!wrap)return;
    wrap.innerHTML=
      '<div>'+
        '<h3 class="sub">'+T('traj_academic')+'</h3><ul class="tl">'+tl(S.academic)+'</ul>'+
        '<h3 class="sub" style="margin-top:34px">'+T('traj_inst')+'</h3><ul class="tl">'+tl(S.institutes)+'</ul>'+
      '</div>'+
      '<div>'+
        '<h3 class="sub">'+T('traj_mgmt')+'</h3><ul class="tl">'+tl(S.management)+'</ul>'+
        '<h3 class="sub" style="margin-top:34px">'+T('traj_edu')+'</h3><ul class="tl">'+tl(S.education)+'</ul>'+
      '</div>';
  }

  /* ---------- research (projects) ---------- */
  function renderResearch(){
    var ir=document.getElementById('proj-ir'); if(ir){ ir.innerHTML='';
      S.projectsIR.forEach(function(p){
        ir.appendChild(el('div','proj-item',
          '<div class="tagrow"><span class="code">'+p.code+'</span><span class="yrs">'+p.yrs+'</span></div>'+
          '<h3>'+L(p.t)+'</h3>'));
      });
    }
    var coi=document.getElementById('proj-coi'); if(coi){ coi.innerHTML='';
      (S.projectsCoI||[]).forEach(function(p){
        coi.appendChild(el('div','proj-item',
          '<div class="tagrow"><span class="code">'+p.code+'</span><span class="yrs">'+p.yrs+'</span></div>'+
          '<h3>'+L(p.t)+'</h3>'+
          (p.lead?'<p class="lead-by">'+(S.ui.research_leadby?L(S.ui.research_leadby):'IR')+': '+p.lead+'</p>':'')));
      });
    }
    var intl=document.getElementById('proj-intl'); if(intl){ intl.innerHTML='';
      S.intlProjects.forEach(function(p){
        intl.appendChild(el('div','intl-card',
          '<div class="prog">'+p.prog+' · '+p.yrs+'</div><h3>'+L(p.t)+'</h3>'));
      });
    }
    var stats=document.getElementById('teach-stats'); if(stats){ stats.innerHTML='';
      S.teaching.forEach(function(s){
        stats.appendChild(el('div','stat','<div class="num">'+s.n+'</div><div class="lbl">'+L(s.t)+'</div>'));
      });
    }
  }

  /* ---------- publications ---------- */
  var pubFilter='all';
  function renderPubs(){
    var host=document.getElementById('pub-list'); if(!host)return;
    var shown=(window.PUBLICATIONS||[]).filter(function(p){return pubFilter==='all'||(p[4]||[]).indexOf(pubFilter)>=0;});
    host.innerHTML='';
    var lastYear=null, idx=0;
    shown.forEach(function(p){
      if(p[0]!==lastYear){ lastYear=p[0]; host.appendChild(el('div','pub-year','<span class="y">'+p[0]+'</span><span class="bar"></span>')); }
      idx++;
      host.appendChild(el('div','pub',
        '<div class="idx">'+idx+'</div>'+
        '<div class="body"><div class="t"><a class="pub-t-link" href="'+window.pubLink(p[1])+'" target="_blank" rel="noopener">'+esc(p[1])+'</a></div>'+
        '<div class="m">'+(p[2]?esc(p[2])+' · ':'')+'<span class="venue">'+esc(p[3])+'</span></div></div>'));
    });
    var c=document.getElementById('pub-count');
    if(c) c.textContent=shown.length+' '+T('pubs_count');
  }
  function renderPubChips(){
    var bar=document.getElementById('pub-chips'); if(!bar)return; bar.innerHTML='';
    var mk=function(key,label){
      var b=el('button','chip'+(pubFilter===key?' active':''),label);
      b.addEventListener('click',function(){ pubFilter=key; renderPubChips(); renderPubs(); });
      return b;
    };
    bar.appendChild(mk('all',T('pubs_all')));
    Object.keys(window.PUB_TOPICS).forEach(function(k){ bar.appendChild(mk(k, L(window.PUB_TOPICS[k]))); });
    var c=el('span','pub-count'); c.id='pub-count'; bar.appendChild(c);
  }

  /* ---------- contact ---------- */
  function renderContact(){
    var c=S.contact;
    var html=
      '<ul class="contact-list">'+
      '<li><span class="ic"><i class="ti ti-mail"></i></span><span class="k">'+T('contact_email_p')+'</span><a href="mailto:'+c.emailPersonal+'">'+c.emailPersonal+'</a></li>'+
      '<li><span class="ic"><i class="ti ti-building-bank"></i></span><span class="k">'+T('contact_email_i')+'</span><a href="mailto:'+c.emailInst+'">'+c.emailInst+'</a></li>'+
      '<li><span class="ic"><i class="ti ti-school"></i></span><span class="k">'+T('contact_inst')+'</span><span>'+L(c.institution)+'</span></li>'+
      '<li><span class="ic"><i class="ti ti-map-pin"></i></span><span class="k">'+T('contact_loc')+'</span><span>'+L(c.location)+'</span></li>'+
      '</ul>'+
      '<div class="links-row" style="margin-top:20px">'+
      c.links.map(function(k){return '<a class="link-btn" href="'+k.url+'" target="_blank" rel="noopener">'+(k.svg||'')+'<span>'+k.label+'</span></a>';}).join('')+
      '</div>';
    var box=document.getElementById('contact-info'); if(box) box.innerHTML=html;
    var top=document.getElementById('contact-top'); if(top) top.innerHTML=html;
    var foot=document.getElementById('footer-links');
    if(foot){ foot.innerHTML=c.links.map(function(k){
      return '<a href="'+k.url+'" target="_blank" rel="noopener" title="'+k.label+'" aria-label="'+k.label+'">'+(k.svg||'')+'</a>';
    }).join(''); }
  }

  /* ---------- render all ---------- */
  function renderAll(){
    applyStatic();
    renderLines();
    renderTrajectory();
    renderResearch();
    renderPubChips();
    renderPubs();
    renderContact();
    if(window.ProjectsModule) window.ProjectsModule.render();
    if(window.ScholarModule) window.ScholarModule.render();
    if(window.ConstellationModule) window.ConstellationModule.render();
    if(window.NewsModule) window.NewsModule.render();
    if(window.AuthModule) window.AuthModule.render();
  }

  function setLang(lang){ window.LANG=lang; localStorage.setItem('eam-lang',lang); renderAll(); }

  function initNav(){
    var toggle=document.getElementById('nav-toggle');
    var links=document.getElementById('nav-links');
    if(toggle) toggle.addEventListener('click',function(){ links.classList.toggle('open'); });
    document.querySelectorAll('#nav-links a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(){ links.classList.remove('open'); });
    });
    document.querySelectorAll('.lang-toggle button').forEach(function(b){
      b.addEventListener('click',function(){ setLang(b.getAttribute('data-lang')); });
    });
  }

  function visitCounter(){
    var wrap=document.getElementById('visitas-wrap'), el=document.getElementById('visitas'); if(!el)return;
    var cached=null; try{cached=sessionStorage.getItem('eam-visitas');}catch(e){}
    if(cached){ el.textContent=Number(cached).toLocaleString('es-CL'); wrap.style.display=''; return; }
    fetch('https://api.counterapi.dev/v1/ealvarezcl-site/visitas/up',{cache:'no-store'})
      .then(function(r){return r.json();})
      .then(function(j){ if(j&&typeof j.count==='number'){ try{sessionStorage.setItem('eam-visitas',String(j.count));}catch(e){} el.textContent=j.count.toLocaleString('es-CL'); wrap.style.display=''; } })
      .catch(function(){});
  }

  document.addEventListener('DOMContentLoaded',function(){
    initNav();
    renderAll();
    visitCounter();
    if(window.buildHero) window.buildHero(document.getElementById('hero-cake'));
  });
})();
