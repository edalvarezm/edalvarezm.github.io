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
  var CACHE_KEY='eam-citmap-v5', CACHE_H=24;
  var CDN_TOPO='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
  var CDN_CODES='https://cdn.jsdelivr.net/npm/i18n-iso-countries@7.14.0/codes.json';

  /* micro-territorios ausentes o invisibles en el mapa 1:110m -> punto [lon,lat] */
  var MICRO={SG:[103.82,1.35],HK:[114.17,22.32],MO:[113.55,22.19],LU:[6.13,49.61],
             CY:[33.43,35.13],QA:[51.18,25.35],KW:[47.48,29.31],LB:[35.5,33.89],
             PS:[35.23,31.95],MT:[14.4,35.9],BH:[50.55,26.05]};

  var TXT={
    title:{es:"Alcance internacional de las citas",en:"International reach of citations"},
    lead:{es:"Países e instituciones de los trabajos de otros autores que citan esta investigación. Se excluyen las autocitas. Datos: OpenAlex, actualizados automáticamente — no coinciden con los totales de Google Scholar, pues son bases y conteos distintos (aquí se cuentan trabajos citantes únicos, no citas).",
          en:"Countries and institutions of works by other authors citing this research. Self-citations are excluded. Data: OpenAlex, updated automatically — figures won't match Google Scholar totals, since they're different databases and counts (this counts unique citing works, not citations)."},
    chips:{es:["trabajos que citan mis artículos","países","instituciones"],
           en:["works that cite my papers","countries","institutions"]},
    topP:{es:"Principales países",en:"Top countries"},
    topI:{es:"Principales instituciones",en:"Top institutions"},
    topA:{es:"Investigadores que más citan",en:"Top citing researchers"},
    noteA:{es:"(excluye coautores)",en:"(co-authors excluded)"},
    works:{es:"trabajos",en:"works"},
    tipWorks:{es:"trabajos que citan mis artículos",en:"works that cite my papers"},
    err:{es:"No fue posible cargar el mapa de citas.",en:"The citation map could not be loaded."}
  };
  function L(o){var l=window.LANG||'es';return o[l]||o.es;}
  function css(v,fb){var s=getComputedStyle(document.documentElement).getPropertyValue(v).trim();return s||fb;}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
  function flagImg(cc){
    if(!cc) return '';
    var c=String(cc).toLowerCase();
    return '<img class="citmap-flag" src="https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/'+c+'.svg" width="18" height="12" alt="" loading="lazy" onerror="this.hidden=1">';
  }
  var AI_CDN='https://cdn.jsdelivr.net/npm/academicons@1.9.5/svg/';
  function iconLinks(name, orcid){
    var q=encodeURIComponent(name);
    var links=[
      ['google-scholar','https://scholar.google.com/citations?view_op=search_authors&mauthors='+q,'Google Scholar'],
      orcid?['orcid',orcid,'ORCID']:null,
      ['researchgate','https://www.researchgate.net/search/researcher?q='+q,'ResearchGate']
    ].filter(function(l){return l;});
    return '<span class="citmap-ic-group">'+links.map(function(l){
      return '<a class="citmap-ic" href="'+esc(l[1])+'" target="_blank" rel="noopener" title="'+esc(l[2])+'"><img src="'+AI_CDN+l[0]+'.svg" alt="'+esc(l[2])+'" width="12" height="12" loading="lazy" onerror="this.parentNode.hidden=1"></a>';
    }).join('')+'</span>';
  }

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
    /* 1) obras propias con citas y coautorías (ambos perfiles en una consulta) */
    return fj(API+'/works?filter=author.id:'+AUTORES.join('|')+'&per-page=200&select=id,cited_by_count,authorships&'+MAILTO)
    .then(function(j){
      var ids={}, coauth={};
      (j.results||[]).forEach(function(w){
        if(w.cited_by_count>0) ids[w.id.split('/').pop()]=w.cited_by_count;
        /* conjunto de coautores propios, a excluir del ranking de investigadores */
        (w.authorships||[]).forEach(function(a){
          var aid=a.author&&a.author.id&&a.author.id.split('/').pop();
          if(aid && AUTORES.indexOf(aid)<0) coauth[aid]=1;
        });
      });
      var lista=Object.keys(ids).sort(function(a,b){return ids[b]-ids[a];}).slice(0,90);
      var cites='cites:'+lista.join('|');
      var noSelf=AUTORES.map(function(a){return 'author.id:!'+a;}).join(',');
      var base=API+'/works?filter='+cites+','+noSelf;
      return Promise.all([
        fj(base+'&per-page=1&select=id&'+MAILTO),                                  /* externos */
        fj(API+'/works?filter='+cites+'&per-page=1&select=id&'+MAILTO),            /* total    */
        fj(base+'&group_by=authorships.countries&'+MAILTO),                        /* paises   */
        fj(base+'&group_by=authorships.institutions.id&'+MAILTO),                  /* instituc.*/
        fj(base+'&group_by=authorships.author.id&'+MAILTO)                         /* autores  */
      ]).then(function(rs){ return {rs:rs, coauth:coauth}; });
    })
    .then(function(o){
      var rs=o.rs, coauth=o.coauth;
      var ext=rs[0].meta.count, tot=rs[1].meta.count;
      var paises=(rs[2].group_by||[]).map(function(g){return [g.key.split('/').pop(),g.count];});
      var gInst=rs[3].group_by||[];
      /* se descartan coautores propios y casos puntuales del ranking de investigadores */
      var EXCLUIR_AUT=/^Jenny Morales$/i;
      var gAut=(rs[4].group_by||[]).filter(function(g){return !coauth.hasOwnProperty(g.key.split('/').pop()) && !EXCLUIR_AUT.test(g.key_display_name||'');}).slice(0,10);
      /* la API trunca los grupos en 200; si llegamos al tope, declarar "200+" */
      var nInstTot=gInst.length>=200?'200+':String(gInst.length);
      var idsInst=gInst.map(function(g){return g.key.split('/').pop();});
      var idsAut=gAut.map(function(g){return g.key.split('/').pop();});
      var lotes=[];
      for(var i=0;i<idsInst.length;i+=100) lotes.push(idsInst.slice(i,i+100));
      return Promise.all([
        Promise.all(lotes.map(function(lote){
          return fj(API+'/institutions?filter=ids.openalex:'+lote.join('|')+'&per-page=100&select=id,display_name,country_code&'+MAILTO);
        })),
        idsAut.length ? fj(API+'/authors?filter=ids.openalex:'+idsAut.join('|')+'&per-page=25&select=id,display_name,last_known_institutions,ids&'+MAILTO) : Promise.resolve({results:[]})
      ]).then(function(res){
        var dets=res[0], rAut=res[1];
        var pais={}; dets.forEach(function(d){(d.results||[]).forEach(function(x){pais[x.id.split('/').pop()]=[x.display_name,(x.country_code||'').toUpperCase()];});});
        var inst=gInst.map(function(g){
          var p=pais[g.key.split('/').pop()]||[g.key_display_name,''];
          return [p[0],p[1],g.count];
        });
        var infoAut={};
        (rAut.results||[]).forEach(function(a){
          var lki=(a.last_known_institutions||[])[0];
          infoAut[a.id.split('/').pop()]=[a.display_name, lki?(lki.country_code||'').toUpperCase():'', lki?lki.display_name:'', (a.ids&&a.ids.orcid)||''];
        });
        var autores=gAut.map(function(g){
          var aid=g.key.split('/').pop();
          var info=infoAut[aid]||[g.key_display_name,'','',''];
          return [info[0], info[1], info[2], g.count, info[3]];
        });
        return {ext:ext, auto:tot-ext, paises:paises, inst:inst, autores:autores, nPaises:paises.length, nInst:nInstTot, f:new Date().toISOString().slice(0,10)};
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
          '<div><h4 id="citmap-ta"></h4><ol id="citmap-la" class="citmap-list citmap-list-i"></ol></div>'+
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
    var chips=[[data.ext,0],[data.nPaises,1],[data.nInst,2]];
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
      return '<li><span class="n">'+flagImg(x[1])+'<span>'+esc(x[0])+'</span></span><span class="v">'+x[2]+'</span></li>';
    }).join('');
    document.getElementById('citmap-ta').innerHTML=L(TXT.topA)+' <span class="citmap-note">'+L(TXT.noteA)+'</span>';
    document.getElementById('citmap-la').innerHTML=(data.autores||[]).map(function(x){
      var tip=x[2]?' title="'+esc(x[2])+'"':'';
      return '<li><span class="n">'+flagImg(x[1])+'<span'+tip+'>'+esc(x[0])+'</span></span>'+iconLinks(x[0],x[4])+'<span class="v">'+x[3]+'</span></li>';
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
