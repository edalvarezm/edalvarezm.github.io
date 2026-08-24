/* ==========================================================================
   Alcance internacional de las citas — mapa coropletico.
   Muestra paises e instituciones de los trabajos DE OTROS AUTORES que citan
   las publicaciones (autocitas excluidas por filtro author.id:!...).
   Fuente: API de OpenAlex con agregaciones group_by, consultada en vivo y
   cacheada 24 h en localStorage. Cartografia: world-atlas (Natural Earth)
   + d3 + topojson-client, cargados por CDN en index.html.
   ========================================================================== */
(function(){
  var AUTORES=['A5000845814','A5120984223'];          /* perfiles OpenAlex propios */
  var MAILTO='mailto=eduardo.alvmir@gmail.com';
  var API='https://api.openalex.org';
  var CACHE_KEY='eam-citmap-v2', CACHE_H=24;
  var CDN_TOPO='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  var CDN_CODES='https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.14.0/codes.json';

  /* micro-territorios ausentes o invisibles en el mapa 1:110m -> punto [lon,lat] */
  var MICRO={SG:[103.82,1.35],HK:[114.17,22.32],MO:[113.55,22.19],LU:[6.13,49.61],
             CY:[33.43,35.13],QA:[51.18,25.35],KW:[47.48,29.31],LB:[35.5,33.89],
             PS:[35.23,31.95],MT:[14.4,35.9],BH:[50.55,26.05]};

  var TXT={
    title:{es:"Alcance internacional de las citas",en:"International reach of citations"},
    lead:{es:"Países e instituciones de los trabajos de otros autores que citan esta investigación. Se excluyen las autocitas. Datos: OpenAlex, actualizados automáticamente.",
          en:"Countries and institutions of works by other authors citing this research. Self-citations are excluded. Data: OpenAlex, updated automatically."},
    chips:{es:["trabajos citantes","países","instituciones","autocitas excluidas"],
           en:["citing works","countries","institutions","self-citations excluded"]},
    topP:{es:"Principales países",en:"Top countries"},
    topI:{es:"Principales instituciones",en:"Top institutions"},
    works:{es:"trabajos",en:"works"},
    tipWorks:{es:"trabajos citantes",en:"citing works"},
    err:{es:"No fue posible cargar el mapa de citas.",en:"The citation map could not be loaded."}
  };
  function L(o){var l=window.LANG||'es';return o[l]||o.es;}
  function css(v,fb){var s=getComputedStyle(document.documentElement).getPropertyValue(v).trim();return s||fb;}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

  var built=false, data=null, topo=null, codes=null, failed=false;

  /* ---------- datos ---------- */
  function cacheGet(){
    try{
      var raw=localStorage.getItem(CACHE_KEY); if(!raw)return null;
      var o=JSON.parse(raw);
      if(Date.now()-o.t > CACHE_H*3600*1000) return null;
      return o.d;
    }catch(e){return null;}
  }
  function cacheSet(d){ try{localStorage.setItem(CACHE_KEY,JSON.stringify({t:Date.now(),d:d}));}catch(e){} }

  function fj(u){ return fetch(u,{cache:'no-store'}).then(function(r){ if(!r.ok)throw new Error(r.status); return r.json(); }); }

  function cargarDatos(){
    var c=cacheGet(); if(c) return Promise.resolve(c);
    /* 1) obras propias con citas (ambos perfiles en una consulta) */
    return fj(API+'/works?filter=author.id:'+AUTORES.join('|')+'&per-page=200&select=id,cited_by_count&'+MAILTO)
    .then(function(j){
      var ids={}; (j.results||[]).forEach(function(w){ if(w.cited_by_count>0) ids[w.id.split('/').pop()]=w.cited_by_count; });
      var lista=Object.keys(ids).sort(function(a,b){return ids[b]-ids[a];}).slice(0,90);
      var cites='cites:'+lista.join('|');
      var noSelf=AUTORES.map(function(a){return 'author.id:!'+a;}).join(',');
      var base=API+'/works?filter='+cites+','+noSelf;
      return Promise.all([
        fj(base+'&per-page=1&select=id&'+MAILTO),                                  /* externos */
        fj(API+'/works?filter='+cites+'&per-page=1&select=id&'+MAILTO),            /* total    */
        fj(base+'&group_by=authorships.countries&'+MAILTO),                        /* paises   */
        fj(base+'&group_by=authorships.institutions.id&'+MAILTO)                   /* instituc.*/
      ]);
    })
    .then(function(rs){
      var ext=rs[0].meta.count, tot=rs[1].meta.count;
      var paises=(rs[2].group_by||[]).map(function(g){return [g.key.split('/').pop(),g.count];});
      var gInst=rs[3].group_by||[];
      /* la API trunca los grupos en 200; si llegamos al tope, declarar "200+" */
      var nInstTot=gInst.length>=200?'200+':String(gInst.length);
      var idsInst=gInst.map(function(g){return g.key.split('/').pop();});
      var lotes=[];
      for(var i=0;i<idsInst.length;i+=100) lotes.push(idsInst.slice(i,i+100));
      return Promise.all(lotes.map(function(lote){
        return fj(API+'/institutions?filter=ids.openalex:'+lote.join('|')+'&per-page=100&select=id,display_name,country_code&'+MAILTO);
      })).then(function(dets){
        var pais={}; dets.forEach(function(d){(d.results||[]).forEach(function(x){pais[x.id.split('/').pop()]=[x.display_name,(x.country_code||'').toUpperCase()];});});
        var inst=gInst.map(function(g){
          var p=pais[g.key.split('/').pop()]||[g.key_display_name,''];
          return [p[0],p[1],g.count];
        });
        return {ext:ext, auto:tot-ext, paises:paises, inst:inst, nPaises:paises.length, nInst:nInstTot, f:new Date().toISOString().slice(0,10)};
      });
    })
    .then(function(d){ cacheSet(d); return d; });
  }

  /* ---------- render ---------- */
  function build(host){
    host.innerHTML=
      '<div class="citmap-head"><h3 id="citmap-title"></h3><p id="citmap-lead" class="citmap-lead"></p></div>'+
      '<div class="citmap-chips" id="citmap-chips"></div>'+
      '<div class="citmap-flex">'+
        '<div class="citmap-map"><svg id="citmap-svg" viewBox="0 0 960 470" role="img" aria-label="Mapa de citas"></svg><div id="citmap-tip" class="citmap-tip" style="display:none"></div></div>'+
        '<div class="citmap-panel">'+
          '<div><h4 id="citmap-tp"></h4><ol id="citmap-lp" class="citmap-list"></ol></div>'+
          '<div><h4 id="citmap-ti"></h4><ol id="citmap-li" class="citmap-list citmap-list-i"></ol></div>'+
        '</div>'+
      '</div>';
  }

  function pintarMapa(){
    if(!(window.d3&&d3.geoNaturalEarth1&&window.topojson&&topo&&codes&&data))return;
    var svg=document.getElementById('citmap-svg'); if(!svg)return;
    var W=960,H=470;
    var proj=d3.geoNaturalEarth1().fitExtent([[6,6],[W-6,H-6]],{type:'Sphere'});
    var path=d3.geoPath(proj);

    var num2cc={}; codes.forEach(function(r){ num2cc[parseInt(r[2],10)]=r[0]; });
    var val={}; data.paises.forEach(function(p){ val[p[0]]=p[1]; });
    var max=data.paises.length?data.paises[0][1]:1;

    var lin=css('--linea-2','#D9D7CF');
    function color(v){
      var t=Math.sqrt(v/max);
      function mix(a,b){return Math.round(a+(b-a)*t);}
      /* de #E8EBF8 a cobalto */
      var c1=[232,235,248], c2=[48,71,199];
      return 'rgb('+mix(c1[0],c2[0])+','+mix(c1[1],c2[1])+','+mix(c1[2],c2[2])+')';
    }

    var feats=topojson.feature(topo,topo.objects.countries).features;
    var out='<g>';
    feats.forEach(function(f){
      var cc=num2cc[parseInt(f.id,10)];
      var v=cc?val[cc]:null;
      var d=path(f); if(!d)return;
      out+='<path d="'+d+'" fill="'+(v?color(v):'#F3F1EA')+'" stroke="'+lin+'" stroke-width="0.5"'+(cc?' data-cc="'+cc+'"':'')+(v?' class="citmap-on"':'')+'></path>';
    });
    /* micro-territorios con datos */
    Object.keys(MICRO).forEach(function(cc){
      if(!val[cc])return;
      var xy=proj(MICRO[cc]); if(!xy)return;
      out+='<circle cx="'+xy[0].toFixed(1)+'" cy="'+xy[1].toFixed(1)+'" r="3.2" fill="'+color(val[cc])+'" stroke="#fff" stroke-width="0.8" class="citmap-on" data-cc="'+cc+'"></circle>';
    });
    out+='</g>';
    svg.innerHTML=out;

    /* tooltip */
    var tip=document.getElementById('citmap-tip');
    var instPorPais={};
    data.inst.forEach(function(x){ if(!x[1])return; (instPorPais[x[1]]=instPorPais[x[1]]||[]).push(x); });
    function nombre(cc){
      try{return new Intl.DisplayNames([window.LANG||'es'],{type:'region'}).of(cc)||cc;}catch(e){return cc;}
    }
    svg.addEventListener('mousemove',function(e){
      var t=e.target, cc=t&&t.getAttribute&&t.getAttribute('data-cc');
      if(!cc||!val[cc]){tip.style.display='none';return;}
      var top=(instPorPais[cc]||[]).slice(0,5).map(function(x){return '<li>'+esc(x[0])+' · '+x[2]+'</li>';}).join('');
      tip.innerHTML='<b>'+esc(nombre(cc))+'</b><span>'+val[cc]+' '+L(TXT.tipWorks)+'</span>'+(top?'<ul>'+top+'</ul>':'');
      tip.style.display='block';
      var r=svg.parentNode.getBoundingClientRect();
      var x=e.clientX-r.left, y=e.clientY-r.top;
      tip.style.left=Math.min(x+14, r.width-tip.offsetWidth-6)+'px';
      tip.style.top=Math.max(y-tip.offsetHeight-10, 4)+'px';
    });
    svg.addEventListener('mouseleave',function(){tip.style.display='none';});
  }

  function pintarPanel(){
    if(!data)return;
    document.getElementById('citmap-title').textContent=L(TXT.title);
    document.getElementById('citmap-lead').textContent=L(TXT.lead);
    var chips=[[data.ext,0],[data.nPaises,1],[data.nInst,2],[data.auto,3]];
    document.getElementById('citmap-chips').innerHTML=chips.map(function(c){
      var v=(typeof c[0]==='number')?c[0].toLocaleString('es-CL'):String(c[0]);
      return '<div class="citmap-chip"><b>'+v+'</b><span>'+L(TXT.chips)[c[1]]+'</span></div>';
    }).join('');
    function nombre(cc){try{return new Intl.DisplayNames([window.LANG||'es'],{type:'region'}).of(cc)||cc;}catch(e){return cc;}}
    var max=data.paises.length?data.paises[0][1]:1;
    document.getElementById('citmap-tp').textContent=L(TXT.topP);
    document.getElementById('citmap-lp').innerHTML=data.paises.slice(0,10).map(function(p){
      return '<li><span class="n">'+esc(nombre(p[0]))+'</span><span class="bar"><i style="width:'+Math.round(p[1]/max*100)+'%"></i></span><span class="v">'+p[1]+'</span></li>';
    }).join('');
    document.getElementById('citmap-ti').textContent=L(TXT.topI);
    /* se omiten del ranking las universidades del entorno cercano */
    var OMITIR=/University of Talca|Catholic University of the Maule/i;
    document.getElementById('citmap-li').innerHTML=data.inst.filter(function(x){return !OMITIR.test(x[0]);}).slice(0,10).map(function(x){
      return '<li><span class="n">'+esc(x[0])+(x[1]?' <em>('+x[1]+')</em>':'')+'</span><span class="v">'+x[2]+'</span></li>';
    }).join('');
  }

  function arrancar(host){
    build(host);
    Promise.all([cargarDatos(), fetch(CDN_TOPO).then(function(r){return r.json();}), fetch(CDN_CODES).then(function(r){return r.json();})])
    .then(function(rs){
      data=rs[0]; topo=rs[1]; codes=rs[2];
      pintarPanel(); pintarMapa();
    })
    .catch(function(){
      failed=true;
      host.innerHTML='<p class="citmap-lead">'+L(TXT.err)+'</p>';
    });
  }

  window.CitasMapaModule={
    render:function(){
      var host=document.getElementById('citmap-wrap'); if(!host)return;
      if(!built){ built=true; arrancar(host); return; }
      if(failed||!data)return;
      pintarPanel(); pintarMapa();   /* re-render en cambio de idioma */
    }
  };
})();
