/* ==========================================================================
   Índice PÚBLICO de proyectos (sin secretos: sólo títulos, categoría, ícono).
   Para agregar un proyecto: cifra el HTML con tools/encrypt.html, guarda el
   archivo .enc.json en /projects, y añade una línea aquí.
   ========================================================================== */
window.PROJECTS = [
  {
    id:"plataforma-arancelaria",
    icon:"calculator",
    file:"projects/plataforma-arancelaria.enc.json",
    title:{es:"Plataforma de Cálculo y Validación de las Bases Técnicas Generalizadas y Parametrizadas para la Regulación Arancelaria (Ley 21.091) [versión beta]",en:"Calculation & Validation Platform for the Generalized and Parametrized Technical Bases for Tariff Regulation (Law 21,091) [beta]"},
    cat:{es:"Regulación arancelaria · Ley 21.091",en:"Tariff regulation · Law 21,091"}
  },
  {
    id:"conservacion",
    icon:"map-pin",
    file:"projects/conservacion.enc.json",
    title:{es:"Priorización espacial de conservación",en:"Spatial conservation prioritization"},
    cat:{es:"Medioambiente · colaboradores IEB",en:"Environment · IEB collaborators"}
  },
  {
    id:"salud",
    icon:"stethoscope",
    file:"projects/salud.enc.json",
    title:{es:"Priorización de listas de espera",en:"Waiting-list prioritization"},
    cat:{es:"Gestión sanitaria · equipo hospital",en:"Healthcare · hospital team"}
  },
  {
    id:"indicadores",
    icon:"gauge",
    file:"projects/indicadores.enc.json",
    title:{es:"Panel de indicadores institucionales",en:"Institutional indicators dashboard"},
    cat:{es:"Gestión universitaria · dirección",en:"University management · leadership"}
  }
];
