/* ==========================================================================
   Noticias de interés — una noticia por área de investigación.
   Lee assets/news.json (actualizado a diario). Idioma original + etiqueta.
   ========================================================================== */
(function(){
  var COL={conservacion:'#1EA463',distritos:'#E0552C',redes:'#3047c7',salud:'#0E97AE',energia:'#D98A00',lineas:'#E0688A',educacion:'#7A57E6'};
  var LAB={es:{updated:'Actualizado'},en:{updated:'Updated'}};
  var DATA=null,loading=false;
  function LG(){return (window.LANG==='en')?'en':'es';}
  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function fmtDate(s){var p=String(s||'').split('-');var d=new Date(+p[0],(+p[1]||1)-1,+p[2]||1);try{return d.toLocaleDateString(LG()==='en'?'en-US':'es-CL',{day:'numeric',month:'short',year:'numeric'});}catch(e){return s;}}

  function render(){
    var host=document.getElementById('news-grid'); if(!host) return;
    if(!DATA){
      if(loading) return; loading=true;
      fetch('assets/news.json?nc='+Date.now(),{cache:'no-store'})
        .then(function(r){return r.json();})
        .then(function(j){DATA=j;loading=false;draw(host);})
        .catch(function(){loading=false;host.style.display='none';});
      return;
    }
    draw(host);
  }

  function draw(host){
    var L=LG();
    var lines=(window.SITE&&window.SITE.researchLines)||[];
    var byTopic={}; (DATA.items||[]).forEach(function(it){byTopic[it.topic]=it;});
    var cards=lines.map(function(rl){
      var it=byTopic[rl.topic]; if(!it) return '';
      var c=COL[rl.topic]||'#3047c7';
      var area=(rl.t&&(rl.t[L]||rl.t.es))||rl.topic;
      return '<div style="border:1px solid #ECEAE3;border-radius:13px;background:#fff;padding:14px 15px">'+
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'+
          '<span style="width:9px;height:9px;border-radius:50%;background:'+c+';flex:0 0 auto"></span>'+
          '<span style="font-size:12px;font-weight:700;color:#16181D;line-height:1.2">'+esc(area)+'</span>'+
          (it.lang?'<span style="margin-left:auto;font-size:9px;font-weight:700;color:#fff;background:'+c+';border-radius:20px;padding:2px 7px">'+esc(it.lang)+'</span>':'')+
        '</div>'+
        '<a href="'+esc(it.url)+'" target="_blank" rel="noopener" style="font-size:13.5px;font-weight:600;color:#3047c7;line-height:1.35;text-decoration:none;display:block">'+esc(it.title)+' ↗</a>'+
        '<div style="font-size:11px;color:#9aa0a8;margin:5px 0 6px">'+esc(it.source)+' · '+esc(it.date)+'</div>'+
        '<div style="font-size:12px;color:#6E7076;line-height:1.45">'+esc(it.summary||'')+'</div>'+
      '</div>';
    }).join('');
    host.innerHTML='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(275px,1fr));gap:14px">'+cards+'</div>'+
      '<div style="font-size:11.5px;color:#9aa0a8;margin-top:16px">'+LAB[L].updated+': '+esc(fmtDate(DATA.updated))+'</div>';
    host.style.display='';
  }

  window.NewsModule={render:render};
})();
