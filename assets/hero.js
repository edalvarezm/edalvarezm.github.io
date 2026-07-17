/* ==========================================================================
   Hero 3D — "layer-cake" de planificación sistemática de la conservación.
   Capas espaciales apiladas (costo, biodiversidad, amenazas) + capa-solución
   con celdas de prioridad extruidas en cobalto. SVG generado por código.
   ========================================================================== */
(function(){
  function build(svg){
    if(!svg) return;
    var NS='http://www.w3.org/2000/svg';
    var cx=185,n=5,ux=23,uy=11.5,vx=-23,vy=11.5,t=9;
    function mk(tag,a){var e=document.createElementNS(NS,tag);for(var k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e;}
    function pt(o,i,j){return [o[0]+i*ux+j*vx,o[1]+i*uy+j*vy];}
    function poly(arr,fill,stroke,sw,op){var p='';for(var m=0;m<arr.length;m++)p+=arr[m][0].toFixed(1)+','+arr[m][1].toFixed(1)+' ';return mk('polygon',{points:p.trim(),fill:fill||'none',stroke:stroke||'none','stroke-width':sw||0,'stroke-linejoin':'round','fill-opacity':(op==null?1:op)});}
    function line(a,b,s,w,o){mk('line',{x1:a[0].toFixed(1),y1:a[1].toFixed(1),x2:b[0].toFixed(1),y2:b[1].toFixed(1),stroke:s,'stroke-width':w,'stroke-opacity':(o==null?1:o)});}

    function layer(ty,top,grid,sL,sR,cells,raised,rTop,rfL,rfR,delay){
      var g=mk('g',{opacity:0});
      var _svg=svg; svg=g; // draw into group
      var o=[cx,ty],T=pt(o,0,0),R=pt(o,n,0),B=pt(o,n,n),L=pt(o,0,n);
      poly([L,B,[B[0],B[1]+t],[L[0],L[1]+t]],sL);
      poly([B,R,[R[0],R[1]+t],[B[0],B[1]+t]],sR);
      poly([T,R,B,L],top);
      if(cells)cells.forEach(function(c){var a=pt(o,c[0],c[1]),b=pt(o,c[0]+1,c[1]),d=pt(o,c[0]+1,c[1]+1),e=pt(o,c[0],c[1]+1);poly([a,b,d,e],c[2]);});
      for(var i=0;i<=n;i++){line(pt(o,i,0),pt(o,i,n),grid,0.7,0.85);line(pt(o,0,i),pt(o,n,i),grid,0.7,0.85);}
      poly([T,R,B,L],'none',grid,1);
      if(raised)raised.forEach(function(c){
        var i=c[0],j=c[1],rh=c[2]||14;
        var A=pt(o,i,j),Bb=pt(o,i+1,j),C=pt(o,i+1,j+1),D=pt(o,i,j+1);
        var A2=[A[0],A[1]-rh],B2=[Bb[0],Bb[1]-rh],C2=[C[0],C[1]-rh],D2=[D[0],D[1]-rh];
        poly([D,C,C2,D2],rfL);
        poly([Bb,C,C2,B2],rfR);
        poly([A2,B2,C2,D2],rTop);
        poly([A2,B2,C2,D2],'none','#16224F',0.5);
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
    // bottom -> top
    layer(214,'#EFEDE5','#D6D3C8','#E1DED3','#D6D3C7',[[1,3,'#CBC8BC'],[2,3,'#D3D0C4'],[3,1,'#D3D0C4'],[1,4,'#DAD7CC']],null,null,null,null,0);
    layer(170,'#EDEFE9','#CBD1C0','#DCE0D3','#CDD2C3',[[0,2,'#B9C4AB'],[1,1,'#A9B59B'],[2,1,'#93A086'],[1,2,'#7D8A71'],[2,2,'#93A086'],[0,3,'#C3CDB4']],null,null,null,null,120);
    layer(126,'#EBEEF7','#C4CCEA','#DBE0F2','#CBD2EC',[[3,2,'#C4CDF0'],[4,2,'#AAB5E8'],[3,3,'#B7C1EC'],[4,3,'#C9D1F2']],null,null,null,null,240);
    layer(82,'#E9ECF8','#BEC7EC','#D7DCF3','#C6CDEE',[[1,3,'#C4CDF0'],[2,4,'#C9D1F2'],[4,1,'#CFD6F4']],[[2,2,16],[3,1,14],[3,2,20],[2,3,20],[3,3,24]],'#3047c7','#172982','#1F35A3',360);
  }
  window.buildHero = build;
})();
