/* ==========================================================================
   Índice PÚBLICO de proyectos (sin secretos: sólo títulos, categoría, ícono).
   Para agregar un proyecto: cifra el HTML con tools/encrypt.html, guarda el
   archivo .enc.json en /projects, y añade una línea aquí.
   ========================================================================== */
window.PROJECTS = [
  {
    id:"redes-rp4",
    icon:"affiliate",
    public:true,
    url:"projects/redes-rp4.html",
    title:{es:"Redes de colaboración y temas del RP4 Conservación y Bienestar Humano (IEB)",en:"Collaboration and research-topic networks of IEB's RP4 Conservation and Human Well-being"},
    cat:{es:"Medioambiente · Instituto de Ecología y Biodiversidad",en:"Environment · Institute of Ecology and Biodiversity"}
  },
  {
    id:"revalidacion-titulos",
    icon:"certificate",
    file:"projects/revalidacion-titulos.enc.json",
    title:{es:"Simulador de reconocimiento y revalidación de títulos obtenidos en el extranjero [prototipo]",en:"Simulator for the recognition and revalidation of foreign degrees [prototype]"},
    cat:{es:"Educación superior · D.S. N° 174 de 2024 · CUECH",en:"Higher education · Supreme Decree 174 (2024) · CUECH"}
  },
  {
    id:"eleccion-diputados",
    icon:"presentation",
    file:"projects/eleccion-diputados.enc.json",
    title:{es:"Elección de diputados 2025 y 2029: reglas, efectos y escenarios",en:"Election of deputies 2025 and 2029: rules, effects and scenarios"},
    cat:{es:"Sistema electoral, Comisión de Constitución",en:"Electoral system, Constitution Committee"}
  },
  {
    id:"teseo",
    icon:"map",
    file:"projects/teseo.enc.json",
    /* el portal descifrado descarga estas piezas cifradas: las cinco que abre y el manual de uso (TESEO/portal/build_portal.js) */
    partes:["projects/teseo/plataforma.enc.json","projects/teseo/diapositivas-completas.enc.json","projects/teseo/diapositivas-resumidas.enc.json","projects/teseo/memoria-de-calculo.enc.json","projects/teseo/infografia.enc.json","projects/teseo/manual.enc.json"],
    title:{es:"TESEO: herramienta de rediseño de distritos electorales",en:"TESEO: a tool for redrawing electoral districts"},
    cat:{es:"Sistema electoral, Cámara de Diputadas y Diputados",en:"Electoral system, Chamber of Deputies"}
  },
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
    id:"votos-perdidos",
    icon:"chart-bar",
    file:"projects/votos-perdidos.enc.json",
    title:{es:"Caracterización de votos perdidos",en:"Characterization of lost votes"},
    cat:{es:"Análisis electoral",en:"Electoral analysis"}
  },
  {
    id:"evaluaciones",
    icon:"clipboard-check",
    file:"projects/evaluaciones.enc.json",
    title:{es:"Herramienta de Evaluación",en:"Evaluation Tool"},
    cat:{es:"Docencia · gestión de evaluaciones",en:"Teaching · assessment management"}
  },
  {
    id:"acreditacion-voluntaria",
    icon:"rocket",
    file:"projects/acreditacion-voluntaria.enc.json",
    title:{es:"Propuesta de Operacionalización de Procesos de Acreditación Voluntaria de Carreras y Programas de Pregrado",en:"Operationalization of Voluntary Accreditation Processes for Undergraduate Degrees and Programs"},
    cat:{es:"Aseguramiento de la calidad · artículo 30 de la ley N° 20.129",en:"Quality assurance · Article 30 of Law 20,129"}
  },
  {
    id:"hospitalizacion-domiciliaria",
    icon:"ambulance",
    public:true,
    url:"projects/hospitalizacion-domiciliaria.html",
    title:{es:"Hospitalización Domiciliaria",en:"Home Hospitalization"},
    cat:{es:"Gestión sanitaria · planificación de rutas de visita [prototipo]",en:"Healthcare · visit route planning [prototype]"}
  }
];
