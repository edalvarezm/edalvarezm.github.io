/* ==========================================================================
   Bloque "Citado por": métricas de Google Scholar (tabla + gráfico por año).
   Lee assets/scholar.json (snapshot actualizado periódicamente). Bilingüe.
   ========================================================================== */
(function(){
  var DATA=null, loading=false;
  var LAB={
    es:{title:'Citado por', all:'Total', since:'Desde', cit:'Citas', h:'Índice h', i10:'Índice i10',
        viewall:'Ver todo', peryear:'Citas por año', updated:'Actualizado', source:'Fuente: Google Scholar', cits:'citas'},
    en:{title:'Cited by', all:'All', since:'Since', cit:'Citations', h:'h-index', i10:'i10-index',
        viewall:'View all', peryear:'Citations per year', updated:'Updated', source:'Source: Google Scholar', cits:'citations'}
  };
  function LG(){ return (window.LANG==='en')?'en':'es'; }
  function LB(k){ return (LAB[LG()]||LAB.es)[k]; }
  function nf(n){ try{ return Number(n).toLocaleString(LG()==='en'?'en-US':'es-CL'); }catch(e){ return String(n); } }
  function fmtDate(s){
    if(!s) return '';
    var p=String(s).split('-'); var d=new Date(+p[0],(+p[1]||1)-1,+p[2]||1);
    try{ return d.toLocaleDateString(LG()==='en'?'en-US':'es-CL',
      LG()==='en'?{month:'short',day:'numeric',year:'numeric'}:{day:'numeric',month:'short',year:'numeric'}); }
    catch(e){ return s; }
  }
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function render(){
    var host=document.getElementById('scholar-card'); if(!host) return;
    if(!DATA){
      if(loading) return; loading=true;
      fetch('assets/scholar.json?nc='+Date.now(),{cache:'no-store'})
        .then(function(r){ return r.json(); })
        .then(function(j){ DATA=j; loading=false; draw(host); })
        .catch(function(){ loading=false; host.style.display='none'; });
      return;
    }
    draw(host);
  }

  function draw(host){
    var d=DATA, sy=d.since_year||2021;
    var m=[
      { k:'cit',  a:d.citations.all,  s:d.citations.since },
      { k:'h',    a:d.h_index.all,    s:d.h_index.since },
      { k:'i10',  a:d.i10_index.all,  s:d.i10_index.since }
    ];
    var tbl=
      '<table class="sch-tbl"><thead><tr><th></th>'+
        '<th>'+LB('all')+'</th><th>'+LB('since')+' '+sy+'</th></tr></thead><tbody>'+
        m.map(function(r){
          return '<tr><td class="sch-lbl">'+LB(r.k)+'</td>'+
                 '<td class="sch-big">'+nf(r.a)+'</td>'+
                 '<td>'+nf(r.s)+'</td></tr>';
        }).join('')+
      '</tbody></table>';

    var years=Object.keys(d.per_year).sort();
    var max=Math.max.apply(null, years.map(function(y){ return d.per_year[y]; }))||1;
    var bars=years.map(function(y){
      var v=d.per_year[y], pct=Math.max(2, Math.round(v/max*100));
      return '<div class="sch-col" title="'+y+': '+nf(v)+' '+LB('cits')+'">'+
             '<div class="sch-bar" style="height:'+pct+'%"><span class="sch-val">'+nf(v)+'</span></div>'+
             '</div>';
    }).join('');
    var xaxis=years.map(function(y){ return '<span>'+y+'</span>'; }).join('');
    var chart=
      '<div class="sch-chart">'+
        '<div class="sch-chart-t">'+LB('peryear')+'</div>'+
        '<div class="sch-scroll"><div class="sch-plot">'+bars+'</div>'+
        '<div class="sch-xaxis">'+xaxis+'</div></div>'+
      '</div>';

    host.innerHTML=
      '<div class="sch-head">'+
        '<h3>'+LB('title')+'</h3>'+
        '<a class="sch-view" href="'+esc(d.profile)+'" target="_blank" rel="noopener">'+LB('viewall')+
        ' <i class="ti ti-external-link" aria-hidden="true"></i></a>'+
      '</div>'+
      '<div class="sch-grid">'+tbl+chart+'</div>'+
      '<div class="sch-foot">'+LB('updated')+': '+fmtDate(d.updated)+' · '+LB('source')+'</div>';
    host.style.display='';
  }

  window.ScholarModule={ render:render };
})();
