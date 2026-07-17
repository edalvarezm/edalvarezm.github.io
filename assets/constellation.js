/* ==========================================================================
   Colaboración — constelación de publicaciones + anillo de coautores.
   Centro: cada artículo (window.PUBLICATIONS) como estrella, agrupado por
   línea de investigación. Anillo: coautores recurrentes (>=2 trabajos) con
   su bandera (solo internacionales). Lienzo + simulación de fuerzas. Bilingüe.
   ========================================================================== */
(function(){
  // País (afiliación) de coautores INTERNACIONALES. Los chilenos no llevan bandera.
  var COUNTRY={"M. Sinnl":"at","M. Luipersbeck":"at","H. Farhan":"at","I. Ljubić":"fr","P. Toth":"it","V. Cacchiani":"it","T. Parriani":"it","A. Lodi":"it","S. Raghavan":"us","P. Mutzel":"de","D.R. Schmidt":"de","M. Jünger":"de","F. Liers":"de","V. Hermoso":"es","M. Vilà":"es","E. Fernández":"es","E. Carrizosa":"es","J. Salgado-Rojas":"es","J. Pereira":"es","J. Garcia-Gonzalo":"pt","S. Barreiro":"pt","N. Maculan":"br","R. Verma":"in","X. Hu":"cn","X.-D. Hu":"cn","X. Chen":"cn","X.-J. Chen":"cn","B. Li":"cn","J. Hu":"cn","R.Z. Ríos-Mercado":"mx","J.A. Díaz":"mx","S.-W. Son":"kr","F. Jalil-Vega":"gb","K. Tanınmış":"tr","M. Lanzas":"es","T. Dorneth":"de"};
  var FLAG={
    fr:'<rect width="6" height="12" fill="#0055A4"/><rect x="6" width="6" height="12" fill="#fff"/><rect x="12" width="6" height="12" fill="#EF4135"/>',
    it:'<rect width="6" height="12" fill="#009246"/><rect x="6" width="6" height="12" fill="#fff"/><rect x="12" width="6" height="12" fill="#CE2B37"/>',
    mx:'<rect width="6" height="12" fill="#006847"/><rect x="6" width="6" height="12" fill="#fff"/><rect x="12" width="6" height="12" fill="#CE1126"/><circle cx="9" cy="6" r="1.2" fill="#9b6b2f"/>',
    at:'<rect width="18" height="12" fill="#fff"/><rect width="18" height="4" fill="#ED2939"/><rect y="8" width="18" height="4" fill="#ED2939"/>',
    de:'<rect width="18" height="4" fill="#000"/><rect y="4" width="18" height="4" fill="#D00"/><rect y="8" width="18" height="4" fill="#FFCE00"/>',
    es:'<rect width="18" height="12" fill="#AA151B"/><rect y="3" width="18" height="6" fill="#F1BF00"/>',
    in:'<rect width="18" height="4" fill="#FF9933"/><rect y="4" width="18" height="4" fill="#fff"/><rect y="8" width="18" height="4" fill="#138808"/><circle cx="9" cy="6" r="1.4" fill="none" stroke="#008" stroke-width="0.4"/>',
    pt:'<rect width="18" height="12" fill="#F00"/><rect width="7.4" height="12" fill="#060"/><circle cx="7.4" cy="6" r="2" fill="#FD0" stroke="#fff" stroke-width="0.4"/>',
    br:'<rect width="18" height="12" fill="#009C3B"/><path d="M9 1.4L16.6 6 9 10.6 1.4 6z" fill="#FFDF00"/><circle cx="9" cy="6" r="2.3" fill="#002776"/>',
    kr:'<rect width="18" height="12" fill="#fff"/><path d="M6.6 6a2.4 2.4 0 0 1 4.8 0z" fill="#CD2E3A"/><path d="M6.6 6a2.4 2.4 0 0 0 4.8 0z" fill="#0047A0"/>',
    cn:'<rect width="18" height="12" fill="#DE2910"/><path d="M3.6 1.6l.62 1.5 1.62.08-1.25 1.02.42 1.56-1.43-.9-1.43.9.42-1.56L1.36 3.18l1.62-.08z" fill="#FFDE00"/><g fill="#FFDE00"><circle cx="7" cy="1.6" r=".5"/><circle cx="8.2" cy="3" r=".5"/><circle cx="8" cy="5" r=".5"/><circle cx="6.6" cy="6.1" r=".5"/></g>',
    us:'<rect width="18" height="12" fill="#fff"/><g fill="#B22234"><rect width="18" height=".92"/><rect y="1.85" width="18" height=".92"/><rect y="3.7" width="18" height=".92"/><rect y="5.54" width="18" height=".92"/><rect y="7.38" width="18" height=".92"/><rect y="9.23" width="18" height=".92"/><rect y="11.08" width="18" height=".92"/></g><rect width="8" height="6.46" fill="#3C3B6E"/><g fill="#fff"><circle cx="1.6" cy="1.4" r=".45"/><circle cx="3.6" cy="1.4" r=".45"/><circle cx="5.6" cy="1.4" r=".45"/><circle cx="2.6" cy="3.1" r=".45"/><circle cx="4.6" cy="3.1" r=".45"/><circle cx="1.6" cy="4.8" r=".45"/><circle cx="3.6" cy="4.8" r=".45"/><circle cx="5.6" cy="4.8" r=".45"/></g>',
    gb:'<rect width="18" height="12" fill="#012169"/><path d="M0 0L18 12M18 0L0 12" stroke="#fff" stroke-width="2.4"/><path d="M0 0L18 12M18 0L0 12" stroke="#C8102E" stroke-width="1"/><path d="M9 0V12M0 6H18" stroke="#fff" stroke-width="3.2"/><path d="M9 0V12M0 6H18" stroke="#C8102E" stroke-width="1.7"/>',
    tr:'<rect width="18" height="12" fill="#E30A17"/><circle cx="7.3" cy="6" r="3.1" fill="#fff"/><circle cx="8.3" cy="6" r="2.5" fill="#E30A17"/><path d="M11.5 4.5l.48 1.15 1.24.1-.94.82.3 1.2-1.08-.66-1.08.66.3-1.2-.94-.82 1.24-.1z" fill="#fff"/>'
  };
  function flagSVG(cc){return FLAG[cc]?'<svg width="18" height="12" viewBox="0 0 18 12" style="display:block;border-radius:2px;overflow:hidden;box-shadow:0 0 0 1px rgba(22,24,29,.18)">'+FLAG[cc]+'</svg>':'';}
  var TOPICS={
    redes:{es:"Network design & robust opt.",en:"Network design & robust opt.",c:"#3047c7"},
    conservacion:{es:"Conservación",en:"Conservation",c:"#1EA463"},
    energia:{es:"Energía",en:"Energy",c:"#D98A00"},
    lineas:{es:"Logística y operaciones",en:"Logistics & operations",c:"#E0688A"},
    distritos:{es:"Diseño de distritos",en:"Districting",c:"#E0552C"},
    salud:{es:"Gestión sanitaria",en:"Healthcare",c:"#0E97AE"},
    educacion:{es:"Educación",en:"Education",c:"#7A57E6"},
    decision:{es:"Decisión multicriterio",en:"Multicriteria decision",c:"#98999F"}
  };
  var order=["redes","conservacion","energia","lineas","distritos","salud","educacion","decision"];
  var STR={
    hint:{es:"anillo: coautores (≥2 trabajos) · bandera = colaborador internacional — cursor / clic para abrir",
          en:"ring: co-authors (≥2 works) · flag = international collaborator — hover / click to open"},
    works:{es:"trabajos contigo",en:"joint works"}
  };
  function LG(){return (window.LANG==='en')?'en':'es';}
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function na(t){return t.replace(/\s*et al\.?\s*$/i,'').trim();}
  function sur(t){var s=t.replace(/^([A-Za-zÀ-ÿ]{1,2}\.[-\s]?)+\s*/,'').trim();return s||t;}

  var built=false,host,cv,ctx,labWrap,tip,leg,hintEl;
  var W=0,H=560,dpr=1,cx=0,cy=0,Rin=0,Rr=0;
  var nodes=[],auth=[],links=[],blinks=[],amap={},sector={},order2=order;
  var hov=null,hovA=null,focus=null,t0=0,dirty=true,running=false;

  function prep(){
    var RAW=window.PUBLICATIONS||[];
    nodes=RAW.map(function(p,i){return {i:i,year:p[0],title:p[1],authors:p[2],venue:p[3],topics:p[4],cl:p[4][0],x:0,y:0,vx:0,vy:0,r:3.4+(p[0]-2010)/16*2.6,ph:Math.random()*6.28};});
    var pcn={};order.forEach(function(k){pcn[k]=0;});nodes.forEach(function(n){pcn[n.cl]=(pcn[n.cl]||0)+1;});
    sector={};var start=-Math.PI/2,tot=nodes.length||1;order.forEach(function(k){var span=(pcn[k]||0.4)/tot*Math.PI*2;sector[k]={a0:start,a1:start+span,mid:start+span/2};start+=span;});
    amap={};nodes.forEach(function(n){n.au=[];String(n.authors||'').split(', ').forEach(function(tk){var k=na(tk);if(!k)return;if(!amap[k])amap[k]={key:k,sur:sur(k),n:0,cl:{},pubs:[]};amap[k].n++;amap[k].pubs.push(n.i);(n.topics||[]).forEach(function(t){amap[k].cl[t]=(amap[k].cl[t]||0)+1;});n.au.push(k);});});
    auth=Object.keys(amap).map(function(k){return amap[k];}).filter(function(a){return a.n>=2||COUNTRY[a.key];});
    auth.forEach(function(a){var best='redes',bc=-1;for(var t in a.cl){if(a.cl[t]>bc){bc=a.cl[t];best=t;}}a.cl0=best;a.r=3+Math.min(a.n,9)*0.8;});
    var byS={};auth.forEach(function(a){(byS[a.cl0]=byS[a.cl0]||[]).push(a);});
    Object.keys(byS).forEach(function(k){var arr=byS[k].sort(function(x,y){return y.n-x.n;});var s=sector[k];var pad=(s.a1-s.a0)*0.08;var a0=s.a0+pad,a1=s.a1-pad;arr.forEach(function(a,ix){a.ang=arr.length===1?(a0+a1)/2:a0+(a1-a0)*(ix/(arr.length-1));});});
    blinks=[];nodes.forEach(function(n){n.au.forEach(function(k){if(amap[k].n>=2)blinks.push({p:n.i,a:amap[k]});});});
    var byc={};nodes.forEach(function(n){(byc[n.cl]=byc[n.cl]||[]).push(n);});
    links=[];Object.keys(byc).forEach(function(k){var a=byc[k].slice().sort(function(x,y){return x.year-y.year;});for(var j=1;j<a.length;j++)links.push({s:a[j-1].i,t:a[j].i,cl:k});});
    nodes.forEach(function(n){for(var k=1;k<(n.topics||[]).length;k++){var t=n.topics[k];var arr=byc[t];if(arr&&arr.length){var best=arr[0],bd=1e9;arr.forEach(function(m){var d=Math.abs(m.year-n.year);if(d<bd){bd=d;best=m;}});links.push({s:n.i,t:best.i,cl:t,bridge:true});}}});
  }
  function geo(){cx=W/2;cy=H/2;var md=Math.min(W,H);Rr=Math.min(md*0.30, H/2-104);Rin=Math.min(md*0.19, Rr*0.62);nodes.forEach(function(n){var s=sector[n.cl];n.ax=cx+Math.cos(s.mid)*Rin;n.ay=cy+Math.sin(s.mid)*Rin*0.98;});auth.forEach(function(a){a.x=cx+Math.cos(a.ang)*Rr;a.y=cy+Math.sin(a.ang)*Rr;});}
  function buildLabels(){labWrap.innerHTML='';auth.forEach(function(a){
    a.deg=a.ang*180/Math.PI;a.flip=Math.cos(a.ang)<0;a.rot=a.flip?a.deg+180:a.deg;
    var w=document.createElement('div');a.el=w;w.style.cssText='position:absolute;width:0;height:0;transform-origin:0 0;transition:opacity .12s';
    var lb=document.createElement('div');a.lb=lb;
    lb.style.cssText='position:absolute;top:0;white-space:nowrap;display:inline-flex;align-items:center;gap:3px;font:600 9.5px Plus Jakarta Sans,sans-serif;color:#3A3C42;text-shadow:0 1px 2px rgba(250,249,246,.9);'+(a.flip?'transform:translate(-100%,-50%);text-align:right;flex-direction:row-reverse':'transform:translateY(-50%);text-align:left;flex-direction:row');
    var fs=flagSVG(COUNTRY[a.key]);
    var flag=fs?'<span style="display:inline-flex;transform:rotate('+(-a.rot)+'deg)">'+fs+'</span>':'';
    lb.innerHTML=flag+'<span>'+esc(a.sur)+'</span>';
    w.appendChild(lb);labWrap.appendChild(w);});
    positionLabels();}
  function positionLabels(){auth.forEach(function(a){if(!a.el)return;a.el.style.left=cx+'px';a.el.style.top=cy+'px';a.el.style.transform='rotate('+a.rot+'deg)';var off=Rr+a.r+4;a.lb.style.left=(a.flip?-off:off)+'px';});}
  function size(){W=host.clientWidth||700;H=W<560?560:(W<820?700:780);dpr=Math.min(window.devicePixelRatio||1,2);cv.width=W*dpr;cv.height=H*dpr;cv.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);geo();if(auth[0]&&auth[0].el)positionLabels();else buildLabels();}
  var nbc={};function nb(a,b){var k=a.i+'_'+b.i;if(k in nbc)return nbc[k];var r=false;for(var i=0;i<links.length;i++){var l=links[i];if((l.s===a.i&&l.t===b.i)||(l.t===a.i&&l.s===b.i)){r=true;break;}}return nbc[k]=r;}
  function setDim(){auth.forEach(function(a){var dim=(focus&&focus!==a.cl0)||(hov&&hov.au.indexOf(a.key)<0)||(hovA&&hovA!==a);if(a.el)a.el.style.opacity=dim?0.14:1;});}
  function tick(){
    nodes.forEach(function(n){n.vx+=(n.ax-n.x)*0.02;n.vy+=(n.ay-n.y)*0.02;});
    for(var i=0;i<nodes.length;i++)for(var j=i+1;j<nodes.length;j++){var a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy||0.01;if(d2<7000){var f=150/d2,d=Math.sqrt(d2),fx=dx/d*f,fy=dy/d*f;a.vx+=fx;a.vy+=fy;b.vx-=fx;b.vy-=fy;}}
    links.forEach(function(l){var a=nodes[l.s],b=nodes[l.t],dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||0.01,L=l.bridge?56:26,f=(d-L)*0.02/d;a.vx+=dx*f;a.vy+=dy*f;b.vx-=dx*f;b.vy-=dy*f;});
    nodes.forEach(function(n){n.vx*=0.84;n.vy*=0.84;n.x+=n.vx;n.y+=n.vy;});
    if(dirty){setDim();dirty=false;}
    draw();requestAnimationFrame(tick);
  }
  function draw(){
    var tt=(performance.now()-t0)/1000;ctx.clearRect(0,0,W,H);
    var g=ctx.createRadialGradient(cx,cy,50,cx,cy,Math.max(W,H)*0.7);g.addColorStop(0,'#FFFFFF');g.addColorStop(1,'#F1EFE8');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    blinks.forEach(function(l){var p=nodes[l.p],a=l.a;if(focus&&focus!==p.cl&&focus!==a.cl0)return;var act=(hov&&hov.i===l.p)||(hovA&&hovA===a);ctx.strokeStyle=TOPICS[p.cl].c;ctx.globalAlpha=act?0.6:0.07;ctx.lineWidth=act?1.3:0.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(a.x,a.y);ctx.stroke();});
    links.forEach(function(l){var a=nodes[l.s],b=nodes[l.t];var act=(!focus||focus===l.cl)&&(!hov||hov.i===l.s||hov.i===l.t)&&!hovA;ctx.strokeStyle=TOPICS[l.cl].c;ctx.globalAlpha=act?(hov?0.55:0.2):0.06;ctx.lineWidth=act&&hov?1.4:0.8;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();});
    ctx.globalAlpha=1;
    nodes.forEach(function(n){var col=TOPICS[n.cl].c,pulse=0.8+0.2*Math.sin(tt*1.3+n.ph);var dim=(focus&&focus!==n.cl)||(hovA&&amap[hovA.key].pubs.indexOf(n.i)<0)||(hov&&hov!==n&&!nb(hov,n));var big=hov===n;ctx.globalAlpha=dim?0.13:1;ctx.shadowColor=col;ctx.shadowBlur=(big?12:5)*pulse;ctx.fillStyle=col;ctx.beginPath();ctx.arc(n.x,n.y,n.r*(big?1.6:1),0,6.2832);ctx.fill();ctx.shadowBlur=0;});
    ctx.globalAlpha=1;
    auth.forEach(function(a){var col=TOPICS[a.cl0].c;var dim=(focus&&focus!==a.cl0)||(hov&&hov.au.indexOf(a.key)<0)||(hovA&&hovA!==a);var big=hovA===a;ctx.globalAlpha=dim?0.14:1;ctx.beginPath();ctx.arc(a.x,a.y,a.r+1.7,0,6.2832);ctx.fillStyle='#FAF9F6';ctx.fill();ctx.shadowColor=col;ctx.shadowBlur=big?10:3;ctx.fillStyle=col;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,6.2832);ctx.fill();ctx.shadowBlur=0;});
    ctx.globalAlpha=1;
  }
  function showTip(html,mx,my){tip.style.display='block';tip.innerHTML=html;var tx=mx+14,ty=my+14;if(tx>W-185)tx=mx-tip.offsetWidth-14;if(ty>H-90)ty=my-tip.offsetHeight-10;tip.style.left=tx+'px';tip.style.top=ty+'px';}
  function onMove(e){var rc=cv.getBoundingClientRect(),mx=e.clientX-rc.left,my=e.clientY-rc.top;var ph=hov,pa=hovA;hov=null;hovA=null;var bd=999;
    auth.forEach(function(a){var d=(a.x-mx)*(a.x-mx)+(a.y-my)*(a.y-my);if(d<(a.r+8)*(a.r+8)&&d<bd){bd=d;hovA=a;}});
    if(!hovA){bd=260;nodes.forEach(function(n){var d=(n.x-mx)*(n.x-mx)+(n.y-my)*(n.y-my);if(d<(n.r+7)*(n.r+7)&&d<bd){bd=d;hov=n;}});}
    if(hov!==ph||hovA!==pa)dirty=true;
    if(hovA){cv.style.cursor='pointer';var fl=flagSVG(COUNTRY[hovA.key]);showTip('<div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#16181D">'+fl+esc(hovA.key)+'</div><div style="font-size:10.5px;color:'+TOPICS[hovA.cl0].c+';margin-top:3px">'+hovA.n+' '+STR.works[LG()]+' · '+TOPICS[hovA.cl0][LG()]+'</div>',mx,my);}
    else if(hov){cv.style.cursor='pointer';showTip('<div style="font-size:12px;font-weight:600;color:#16181D;line-height:1.35">'+esc(hov.title)+'</div><div style="font-size:10.5px;color:#6E7076;margin-top:4px">'+esc(hov.authors)+'</div><div style="font-size:10.5px;color:'+TOPICS[hov.cl].c+';margin-top:3px">'+esc(hov.venue)+' ('+hov.year+')</div>',mx,my);}
    else{cv.style.cursor='default';tip.style.display='none';}}
  function pubLink(t){return (window.pubLink?window.pubLink(t):'https://scholar.google.com/scholar?q='+encodeURIComponent('"'+t+'"'));}
  function onClick(){try{if(hov)window.open(pubLink(hov.title),'_blank');else if(hovA)window.open('https://scholar.google.com/scholar?q='+encodeURIComponent(hovA.key),'_blank');}catch(e){}}

  function buildLegend(){leg.innerHTML='';var L=LG();order.forEach(function(k){var el=document.createElement('div');el.style.cssText='display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#3A3C42;cursor:pointer;user-select:none';el.innerHTML='<span style="width:9px;height:9px;border-radius:50%;background:'+TOPICS[k].c+'"></span>'+TOPICS[k][L];el.addEventListener('click',function(){focus=(focus===k)?null:k;dirty=true;Array.prototype.forEach.call(leg.children,function(c){c.style.opacity=(!focus||c===el)?'1':'0.4';});});leg.appendChild(el);});}

  function build(h){
    host=h;
    host.innerHTML='<div style="position:relative;border-radius:16px;overflow:hidden;background:#FAF9F6;border:1px solid #ECEAE3">'+
      '<div class="cst-hint" style="position:absolute;top:12px;left:16px;z-index:3;pointer-events:none;font-size:11px;color:#6E7076;max-width:70%"></div>'+
      '<canvas class="cst-cv" style="display:block;width:100%"></canvas>'+
      '<div class="cst-lab" style="position:absolute;inset:0;z-index:2;pointer-events:none"></div>'+
      '<div class="cst-tip" style="position:absolute;z-index:5;pointer-events:none;display:none;max-width:250px;background:#fff;border:1px solid #E4E2DA;border-radius:10px;padding:9px 11px;box-shadow:0 10px 28px rgba(22,24,29,.16)"></div>'+
      '<div class="cst-leg" style="display:flex;flex-wrap:wrap;gap:6px 12px;padding:12px 16px 14px;background:#FAF9F6;border-top:1px solid #ECEAE3"></div>'+
      '</div>';
    cv=host.querySelector('.cst-cv');ctx=cv.getContext('2d');labWrap=host.querySelector('.cst-lab');tip=host.querySelector('.cst-tip');leg=host.querySelector('.cst-leg');hintEl=host.querySelector('.cst-hint');
    prep();
    nodes.forEach(function(n){var s=sector[n.cl];n.x=Math.cos(s.mid)*80+350;n.y=Math.sin(s.mid)*80+280;});
    t0=performance.now();
    cv.addEventListener('mousemove',onMove);
    cv.addEventListener('mouseleave',function(){if(hov||hovA)dirty=true;hov=null;hovA=null;tip.style.display='none';});
    cv.addEventListener('click',onClick);
    size();window.addEventListener('resize',size);
    if(!running){running=true;requestAnimationFrame(tick);}
  }
  function applyLang(){if(hintEl)hintEl.textContent=STR.hint[LG()];buildLegend();focus=null;}

  window.ConstellationModule={render:function(){var h=document.getElementById('constellation-wrap');if(!h)return;if(!(window.PUBLICATIONS&&window.PUBLICATIONS.length)){h.style.display='none';return;}if(!built){build(h);built=true;}applyLang();}};
})();
