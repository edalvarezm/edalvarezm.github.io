/* ==========================================================================
   Hero 3D — "layer-cake" de planificación espacial sistemática.
   Capas espaciales apiladas (datos de distintas líneas) + capa-solución con
   celdas de prioridad extruidas. Recoloreado con TODA la paleta de líneas
   (cobalto, verde, ámbar, rosa, naranja, teal, morado, gris). SVG por código.
   ========================================================================== */
(function(){
  var PAL={cobalto:'#3047c7',verde:'#1EA463',ambar:'#D98A00',rosa:'#E0688A',
           naranja:'#E0552C',teal:'#0E97AE',morado:'#7A57E6',gris:'#98999F'};
  var PAPER='#FAF9F6';
  function h2r(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function r2h(a){return '#'+a.map(function(x){x=Math.max(0,Math.min(255,Math.round(x)));return ('0'+x.toString(16)).slice(-2);}).join('');}
  function mix(a,b,t){var A=h2r(a),B=h2r(b);return r2h([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t]);}
  function tint(c,t){return mix(c,PAPER,t);}     /* hacia el papel: más claro */
  function shade(c,t){return mix(c,'#000000',t);} /* hacia el negro: más oscuro */

  function build(svg){
    if(!svg) return;
    var NS='http://www.w3.org/2000/svg';
    var cx=185,n=5,ux=23,uy=11.5,vx=-23,vy=11.5,t=9;
    function mk(tag,a){var e=document.createElementNS(NS,tag);for(var k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e;}
    function pt(o,i,j){return [o[0]+i*ux+j*vx,o[1]+i*uy+j*vy];}
    function poly(arr,fill,stroke,sw,op){var p='';for(var m=0;m<arr.length;m++)p+=arr[m][0].toFixed(1)+','+arr[m][1].toFixed(1)+' ';return mk('polygon',{points:p.trim(),fill:fill||'none',stroke:stroke||'none','stroke-width':sw||0,'stroke-linejoin':'round','fill-opacity':(op==null?1:op)});}
    function line(a,b,s,w,o){mk('line',{x1:a[0].toFixed(1),y1:a[1].toFixed(1),x2:b[0].toFixed(1),y2:b[1].toFixed(1),stroke:s,'stroke-width':w,'stroke-opacity':(o==null?1:o)});}

    /* layer(ty, base, cells[[i,j,color]], raised[[i,j,alto,color]], delay) */
    function layer(ty,base,cells,raised,delay){
      var g=mk('g',{opacity:0});
      var _svg=svg; svg=g; // draw into group
      var top=tint(base,0.90), sL=tint(base,0.85), sR=tint(base,0.88), grid=tint(base,0.55);
      var o=[cx,ty],T=pt(o,0,0),R=pt(o,n,0),B=pt(o,n,n),L=pt(o,0,n);
      poly([L,B,[B[0],B[1]+t],[L[0],L[1]+t]],sL);
      poly([B,R,[R[0],R[1]+t],[B[0],B[1]+t]],sR);
      poly([T,R,B,L],top);
      if(cells)cells.forEach(function(c){var a=pt(o,c[0],c[1]),b=pt(o,c[0]+1,c[1]),d=pt(o,c[0]+1,c[1]+1),e=pt(o,c[0],c[1]+1);poly([a,b,d,e],c[2]);});
      for(var i=0;i<=n;i++){line(pt(o,i,0),pt(o,i,n),grid,0.7,0.85);line(pt(o,0,i),pt(o,n,i),grid,0.7,0.85);}
      poly([T,R,B,L],'none',grid,1);
      if(raised)raised.forEach(function(c){
        var i=c[0],j=c[1],rh=c[2]||14,cb=c[3]||PAL.cobalto;
        var A=pt(o,i,j),Bb=pt(o,i+1,j),C=pt(o,i+1,j+1),D=pt(o,i,j+1);
        var A2=[A[0],A[1]-rh],B2=[Bb[0],Bb[1]-rh],C2=[C[0],C[1]-rh],D2=[D[0],D[1]-rh];
        poly([D,C,C2,D2],shade(cb,0.45));   // cara izquierda (más oscura)
        poly([Bb,C,C2,B2],shade(cb,0.26));  // cara derecha
        poly([A2,B2,C2,D2],cb);             // cara superior
        poly([A2,B2,C2,D2],'none',shade(cb,0.62),0.5);
      });
      svg=_svg; svg.appendChild(g);
      // entrance animation
      g.setAttribute('transform','translate(0,14)');
      requestAnimationFrame(function(){
        setTimeout(function(){
          g.style.transition='opacity .6s ease, transform .6s cubic-bezier(.2,.7,.3,1)';
          g.setAttribute('opacity','1');
          g.setAttribute('transform','translate(0,0)');
        }, delay||0);
      });
    }

    // bottom -> top · cada capa con una línea distinta; celdas y cubos completan la paleta
    layer(214, PAL.naranja,
      [[1,3,tint(PAL.naranja,.66)],[2,3,tint(PAL.naranja,.78)],[3,1,tint(PAL.gris,.55)],[1,4,tint(PAL.gris,.68)]],
      null, 0);
    layer(170, PAL.teal,
      [[0,2,tint(PAL.teal,.72)],[1,1,tint(PAL.teal,.58)],[2,1,tint(PAL.teal,.48)],[1,2,tint(PAL.morado,.5)],[2,2,tint(PAL.teal,.62)],[0,3,tint(PAL.morado,.66)]],
      null, 120);
    layer(126, PAL.verde,
      [[3,2,tint(PAL.verde,.64)],[4,2,tint(PAL.verde,.48)],[3,3,tint(PAL.ambar,.55)],[4,3,tint(PAL.verde,.72)]],
      null, 240);
    layer(82, PAL.cobalto,
      [[1,3,tint(PAL.cobalto,.7)],[2,4,tint(PAL.rosa,.6)],[4,1,tint(PAL.cobalto,.76)]],
      [[2,2,16,PAL.cobalto],[3,1,14,PAL.ambar],[3,2,20,PAL.rosa],[2,3,20,PAL.verde],[3,3,24,PAL.morado]],
      360);
  }
  window.buildHero = build;
})();
