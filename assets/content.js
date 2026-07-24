/* ==========================================================================
   Contenido del sitio (bilingüe). Editar aquí para actualizar textos.
   Datos privados del CV (RUT, dirección, fecha de nacimiento, estado civil,
   teléfono) se omiten deliberadamente.
   ========================================================================== */
window.SITE = {

  ui: {
    nav_trajectory: { es:"Experiencia", en:"Experience" },
    nav_research:   { es:"Investigación", en:"Research" },
    nav_collab:     { es:"Colaboración", en:"Collaboration" },
    news_nav:       { es:"Noticias", en:"News" },
    nav_pubs:       { es:"Publicaciones", en:"Publications" },
    nav_projects:   { es:"Proyectos", en:"Projects" },
    nav_contact:    { es:"Contacto", en:"Contact" },
    nav_private:    { es:"Acceso Privado", en:"Private access" },

    hero_role: { es:"Académico · Facultad de Ingeniería · Universidad de Talca",
                 en:"Academic · Faculty of Engineering · University of Talca" },
    hero_tagline: { es:"Modelos de analítica avanzada aplicados a problemas complejos de ingeniería.",
                    en:"Advanced analytics models applied to complex engineering problems." },
    hero_cta1: { es:"Ver investigación", en:"View research" },
    hero_cta2: { es:"Descargar CV", en:"Download CV" },
    hero_cap:  { es:"Priorización espacial sistemática: capas de datos y capa-solución de áreas prioritarias.",
                 en:"Systematic spatial prioritization: data layers and the priority-area solution layer." },

    stat_pubs:  { es:"publicaciones científicas", en:"scientific publications" },
    stat_ir:    { es:"proyectos FONDECYT y FONDEF como Director / Investigador Responsable",
                  en:"FONDECYT and FONDEF projects as Director / Principal Investigator" },
    stat_coi:   { es:"proyectos FONDECYT y FONDEF como Director Alterno / Co-Investigador",
                  en:"FONDECYT and FONDEF projects as Alternate Director / Co-Investigator" },
    stat_hc:    { es:"tesistas y memoristas guiados", en:"graduate & undergraduate advisees" },
    stat_acc:   { es:"años de experiencia en gestión institucional", en:"years of institutional management experience" },

    lines_title: { es:"Líneas de investigación", en:"Research lines" },
    lines_lead:  { es:"Modelos y algoritmos de analítica avanzada para decisiones complejas del sector público y ambiental. Haz clic en un área para ver sus publicaciones.",
                   en:"Advanced analytics models and algorithms for complex decisions in the public and environmental sectors. Click an area to see its publications." },
    lines_see:   { es:"Ver publicaciones", en:"View publications" },

    traj_title: { es:"Experiencia", en:"Experience" },
    traj_lead:  { es:"Más de una década de docencia, investigación y gestión académica en la Universidad de Talca.",
                  en:"Over a decade of teaching, research, and academic leadership at the University of Talca." },
    traj_academic: { es:"Posiciones académicas", en:"Academic positions" },
    traj_mgmt:     { es:"Gestión académica", en:"Academic leadership" },
    traj_inst:     { es:"Institutos de investigación", en:"Research institutes" },
    traj_edu:      { es:"Formación", en:"Education" },

    research_title: { es:"Investigación", en:"Research" },
    research_lead:  { es:"Proyectos con financiamiento externo competitivo, redes internacionales y formación de capital humano avanzado.",
                      en:"Competitively funded projects, international networks, and advanced human-capital training." },
    research_ir:    { es:"Proyectos como Director / Investigador Responsable", en:"Projects as Director / Principal Investigator" },
    research_coi:   { es:"Proyectos como Director Alterno / Co-Investigador", en:"Projects as Alternate Director / Co-Investigator" },
    research_leadby:{ es:"Investigador Responsable", en:"Principal Investigator" },
    grad_title:     { es:"Doctores graduados", en:"Doctoral graduates" },
    grad_hint:      { es:"Ver graduados", en:"View graduates" },
    research_intl:  { es:"Redes internacionales", en:"International networks" },
    teach_title:    { es:"Formación de capital humano avanzado", en:"Advanced human capital training" },

    collab_title: { es:"Colaboración", en:"Collaboration" },
    collab_lead:  { es:"Mapa de publicaciones y coautorías: cada nodo es un artículo, agrupado por línea de investigación; en el anillo exterior están las coautorías recurrentes y su país.",
                    en:"A map of publications and co-authorships: each node is a paper, grouped by research line; the outer ring shows recurring co-authorships and their country." },

    news_title: { es:"Noticias de interés", en:"News of interest" },
    news_lead:  { es:"Noticias relevantes de avances y resultados en las áreas de interés. Las noticias se actualizan semanalmente.",
                  en:"Relevant news on advances and results in the areas of interest. Updated weekly." },
    news_archive: { es:"Ver noticias anteriores", en:"View past news" },

    pubs_title: { es:"Publicaciones", en:"Publications" },
    pubs_lead:  { es:"Artículos en revistas de investigación de operaciones, conservación, energía y ciencia de datos. Cada título enlaza a la publicación.",
                  en:"Papers in operations research, conservation, energy, and data science journals. Each title links to the publication." },
    pubs_all:   { es:"Todas", en:"All" },
    pubs_count: { es:"resultados", en:"results" },

    projects_title: { es:"Proyectos", en:"Projects" },
    projects_lead:  { es:"Aplicaciones y visualizaciones interactivas. El listado es público; cada proyecto requiere credenciales propias.",
                      en:"Interactive applications and visualizations. The list is public; each project requires its own credentials." },
    open_project:   { es:"Acceso a Proyecto", en:"Project access" },
    need_creds:     { es:"credenciales", en:"credentials" },

    login_eyebrow:  { es:"Acceso restringido", en:"Restricted access" },
    login_user:     { es:"Usuario", en:"Username" },
    login_pass:     { es:"Contraseña", en:"Password" },
    login_btn:      { es:"Ingresar", en:"Sign in" },
    login_err:      { es:"Usuario o contraseña incorrectos.", en:"Incorrect username or password." },
    login_hint:     { es:"Cada proyecto tiene sus propios usuarios autorizados.", en:"Each project has its own authorized users." },
    viewer_close:   { es:"Cerrar", en:"Close" },

    cluster_count:  { es:"publicaciones en esta área", en:"publications in this area" },

    contact_title:  { es:"Contacto", en:"Contact" },
    contact_email_p:{ es:"Correo personal", en:"Personal email" },
    contact_email_i:{ es:"Correo institucional", en:"Institutional email" },
    contact_inst:   { es:"Institución", en:"Institution" },
    contact_loc:    { es:"Ubicación", en:"Location" },
    footer:         { es:"Modelos de analítica avanzada para decisiones públicas y ambientales.",
                      en:"Advanced analytics models for public and environmental decisions." }
  },

  researchLines: [
    { icon:"plant-2", topic:"conservacion", t:{es:"Planificación de la conservación",en:"Conservation planning"},
      d:{es:"Priorización espacial y acciones múltiples para recuperar biodiversidad, con enfoque marino-terrestre 30×30.",
         en:"Spatial prioritization and multi-action planning to recover biodiversity, including the marine–terrestrial 30×30 agenda."} },
    { icon:"map-2", topic:"distritos", t:{es:"Diseño de distritos",en:"Districting design"},
      d:{es:"Modelos multicriterio para el diseño de distritos electorales, de servicio y de reparto.",
         en:"Multi-criteria models for electoral, service, and delivery districting."} },
    { icon:"topology-star-3", topic:"redes", t:{es:"Network Design and Robust Optimization",en:"Network Design and Robust Optimization"},
      d:{es:"Diseño de redes, árboles de Steiner, subgrafos conexos y optimización robusta bajo incertidumbre.",
         en:"Network design, Steiner trees, connected subgraphs, and robust optimization under uncertainty."} },
    { icon:"stethoscope", topic:"salud", t:{es:"Gestión sanitaria",en:"Healthcare management"},
      d:{es:"Priorización de listas de espera quirúrgicas y sistemas de apoyo a la decisión clínica.",
         en:"Surgical waiting-list prioritization and clinical decision-support systems."} },
    { icon:"bolt", topic:"energia", t:{es:"Planificación energética",en:"Energy planning"},
      d:{es:"Sistemas de potencia con renovables, hidrógeno y compromiso de unidades bajo incertidumbre.",
         en:"Power systems with renewables, hydrogen, and unit commitment under uncertainty."} },
    { icon:"route", topic:"lineas", t:{es:"Logística y operaciones",en:"Logistics & operations"},
      d:{es:"Balanceo de líneas de montaje, almacenamiento, última milla y logística de operaciones.",
         en:"Assembly-line balancing, storage, last-mile, and operations logistics."} },
    { icon:"school", topic:"educacion", t:{es:"Educación superior y calidad",en:"Higher education & quality"},
      d:{es:"Financiamiento, aseguramiento de la calidad, gobernanza y analítica de datos universitarios.",
         en:"Funding, quality assurance, governance, and university data analytics."} }
  ],

  education: [
    { yr:"", ti:{es:"PhD en Operations Research",en:"PhD in Operations Research"},
      desc:{es:"Università di Bologna, Italia · Tesis: “Networks, Applications, Uncertainty and a Crusade for Optimality” · Tutores: Paolo Toth, Ivana Ljubić",
            en:"University of Bologna, Italy · Thesis: “Networks, Applications, Uncertainty and a Crusade for Optimality” · Advisors: Paolo Toth, Ivana Ljubić"} },
    { yr:"", ti:{es:"Magíster en Gestión de Operaciones",en:"MSc in Operations Management"}, desc:{es:"Universidad de Talca, Chile",en:"University of Talca, Chile"} },
    { yr:"", ti:{es:"Ingeniería Civil Industrial",en:"Industrial Engineering"}, desc:{es:"Universidad de Talca, Chile",en:"University of Talca, Chile"} }
  ],

  academic: [
    { yr:"2022 –",   ti:{es:"Profesor Titular",en:"Full Professor"},   desc:{es:"Depto. de Ingeniería Industrial, U. de Talca",en:"Dept. of Industrial Engineering, U. of Talca"} },
    { yr:"2017–2022",ti:{es:"Profesor Asociado",en:"Associate Professor"},desc:{es:"Depto. de Ingeniería Industrial, U. de Talca",en:"Dept. of Industrial Engineering, U. of Talca"} },
    { yr:"2014–2017",ti:{es:"Profesor Asistente",en:"Assistant Professor"},desc:{es:"Depto. de Ingeniería Industrial, U. de Talca",en:"Dept. of Industrial Engineering, U. of Talca"} },
    { yr:"2013–2014",ti:{es:"Conferenciante",en:"Lecturer"},          desc:{es:"Depto. de Ingeniería Industrial, U. de Talca",en:"Dept. of Industrial Engineering, U. of Talca"} }
  ],

  management: [
    { yr:"2022–2026",ti:{es:"Director General de Aseguramiento de la Calidad y Planificación",en:"Director of Quality Assurance & Planning"},desc:{es:"U. de Talca",en:"U. of Talca"},note:{es:"Durante el ejercicio del cargo se desarrolló el 5° proceso de acreditación institucional, concluido en junio de 2026 con la decisión de la CNA de acreditar la institución por 7 años.",en:"During the tenure, the 5th institutional accreditation process was carried out, concluded in June 2026 with the CNA's decision to accredit the institution for 7 years."} },
    { yr:"2018–2022",ti:{es:"Director de Investigación",en:"Director of Research"},desc:{es:"U. de Talca",en:"U. of Talca"} },
    { yr:"2017–2018",ti:{es:"Director del Depto. de Ingeniería Industrial",en:"Head, Dept. of Industrial Engineering"},desc:{es:"U. de Talca",en:"U. of Talca"} },
    { yr:"2015–2016",ti:{es:"Director del Depto. de Ingeniería Industrial",en:"Head, Dept. of Industrial Engineering"},desc:{es:"U. de Talca",en:"U. of Talca"} }
  ],

  managementNote: { es:"Durante el ejercicio del cargo se desarrolló el 5° proceso de acreditación institucional, concluido en junio de 2026 con la decisión de la CNA de acreditar la institución por 7 años.",
                    en:"During the tenure, the 5th institutional accreditation process was carried out, concluded in June 2026 with the CNA's decision to accredit the institution for 7 years." },

  institutes: [
    { yr:"2022 –", ti:{es:"Investigador Asociado — IEB",en:"Associate Researcher — IEB"}, desc:{es:"Instituto de Ecología & Biodiversidad, Iniciativa Milenio",en:"Institute of Ecology & Biodiversity, Millennium Initiative"} },
    { yr:"2017 –", ti:{es:"Investigador Asociado — ISCI",en:"Associate Researcher — ISCI"}, desc:{es:"Instituto Sistemas Complejos de Ingeniería, Iniciativa Milenio",en:"Complex Engineering Systems Institute, Millennium Initiative"} },
    { yr:"2014–2017",ti:{es:"Investigador Invitado / Joven — ISCI",en:"Visiting / Junior Researcher — ISCI"}, desc:{es:"Instituto Sistemas Complejos de Ingeniería",en:"Complex Engineering Systems Institute"} }
  ],

  projectsIR: [
    { code:"FONDECYT Regular 1260465", yrs:"2026–2030", t:{es:"Resilient marine-terrestrial conservation: a MIP framework for supporting the Kunming-Montreal 30x30 conservation targets",en:"Resilient marine-terrestrial conservation: a MIP framework for supporting the Kunming-Montreal 30x30 conservation targets"} },
    { code:"FONDECYT Regular 1220830", yrs:"2022–2026", t:{es:"Enhanced MIP Tools for Conservation Planning: Models and Algorithms for Complex Spatio-Temporal Conservation Problems",en:"Enhanced MIP Tools for Conservation Planning: Models and Algorithms for Complex Spatio-Temporal Conservation Problems"} },
    { code:"FONDEF IDeA ID18I10216",   yrs:"2018–2020", t:{es:"Desarrollo de tecnologías de Big Data para aumentar la retención y el éxito de estudiantes universitarios",en:"Desarrollo de tecnologías de Big Data para aumentar la retención y el éxito de estudiantes universitarios"} },
    { code:"FONDECYT Regular 1180670", yrs:"2018–2022", t:{es:"Optimization Tools for Districting Decisions Under Uncertainty",en:"Optimization Tools for Districting Decisions Under Uncertainty"} },
    { code:"FONDEF IDeA ID15I10082",   yrs:"2015–2016", t:{es:"Desarrollo de modelos para la optimización de las zonas de reparto de correspondencia y paquetería",en:"Desarrollo de modelos para la optimización de las zonas de reparto de correspondencia y paquetería"} },
    { code:"FONDECYT Iniciación 11140060",yrs:"2014–2018",t:{es:"Models and Algorithms for Robust and Stochastic Network Systems",en:"Models and Algorithms for Robust and Stochastic Network Systems"} }
  ],

  projectsCoI: [
    { code:"FONDECYT Regular 1251454", yrs:"2025–2027", lead:"Andrés Weintraub · U. de Chile",
      t:{es:"Wildfire Analytics: Prevention, Detection and Post-Restoration",en:"Wildfire Analytics: Prevention, Detection and Post-Restoration"} },
    { code:"FONDECYT Regular 1220893", yrs:"2022–2024", lead:"Andrés Weintraub · U. de Chile",
      t:{es:"Artificial intelligence approaches to solve difficult forest planning problems",en:"Artificial intelligence approaches to solve difficult forest planning problems"} },
    { code:"FONDECYT Regular 1191624", yrs:"2019–2021", lead:"Jordi Pereira · U. Adolfo Ibáñez",
      t:{es:"Assembly line balancing for industry 4.0",en:"Assembly line balancing for industry 4.0"} },
    { code:"FONDEF Minería IT16IM10019", yrs:"2016–2017", lead:"Rafael Epstein · U. de Chile",
      role:{es:"Director",en:"Director"},
      t:{es:"Desarrollo de modelos de optimización para la planificación minera de mediano y corto plazo",en:"Optimization models for medium- and short-term mine planning"} },
    { code:"FONDECYT Regular 1150306", yrs:"2015–2018", lead:"Jordi Pereira · U. Adolfo Ibáñez",
      t:{es:"Heterogeneous process selection assembly line balancing problems",en:"Heterogeneous process selection assembly line balancing problems"} },
    { code:"FONDEF IDeA ID14I10026", yrs:"2014–2015", lead:"Ma. Luisa del Campo · U. de Talca",
      role:{es:"Directora",en:"Director"},
      t:{es:"Sistema automatizado de monitoreo y gestión de edificaciones que evalúa económicamente medidas y tecnologías para la eficiencia energética",en:"Automated building monitoring and management system for the economic assessment of energy-efficiency measures and technologies"} }
  ],

  intlProjects: [
    { prog:"Marie Curie H2020 RISE", yrs:"2020–2026", t:{es:"DecisionES — Decision Support for the Supply of Ecosystem Services under Global Change",en:"DecisionES — Decision Support for the Supply of Ecosystem Services under Global Change"} },
    { prog:"Marie Curie H2020 RISE", yrs:"2017–2020", t:{es:"SuFoRun — Models and decision Support tools for integrated Forest policy development",en:"SuFoRun — Models and decision Support tools for integrated Forest policy development"} },
    { prog:"Marie Curie FP7 IRSES", yrs:"2014–2015", t:{es:"ForEAdapt — Forest growth models and optimisation for adaptive forestry",en:"ForEAdapt — Forest growth models and optimisation for adaptive forestry"} }
  ],

  teaching: [
    { n:"4",   pop:"graduates", t:{es:"estudiantes de doctorado graduados",en:"graduated doctoral students"} },
    { n:"4",   t:{es:"estudiantes de doctorado en curso",en:"doctoral students in progress"} },
    { n:"10+", t:{es:"estudiantes de magíster graduados",en:"graduated master's students"} },
    { n:"25+", t:{es:"memoristas de pregrado",en:"undergraduate theses"} },
    { n:"40+", t:{es:"cursos de pre y postgrado",en:"under- and postgraduate courses"} }
  ],

  doctorGraduates: [
    { name:"David Olave-Rojas",
      program:{es:"DCs. en Sistemas de Ingeniería, Universidad de Talca, 2019", en:"DSc in Engineering Systems, University of Talca, 2019"},
      affil:{es:"Universidad de La Frontera", en:"University of La Frontera"},
      scholar:"https://scholar.google.com/citations?user=8Qv1oGAAAAAJ&hl=es" },
    { name:"Fabián Silva-Aravena",
      program:{es:"DCs. en Sistemas de Ingeniería, Universidad de Talca, 2020", en:"DSc in Engineering Systems, University of Talca, 2020"},
      affil:{es:"Universidad Católica del Maule", en:"Catholic University of Maule"},
      scholar:"https://scholar.google.com/citations?user=zPTah8IAAAAJ&hl=es" },
    { name:"Pedro Vargas-Ferrer",
      program:{es:"DCs. en Sistemas de Ingeniería, Universidad de Talca, 2022", en:"DSc in Engineering Systems, University of Talca, 2022"},
      affil:{es:"Pontificia Universidad Católica de Chile", en:"Pontifical Catholic University of Chile"},
      scholar:"https://scholar.google.com/citations?user=6dCc_lwAAAAJ&hl=es" },
    { name:"José Salgado-Rojas",
      program:{es:"PhD. en Investigación de Operaciones, Universidad Politécnica de Catalunya, 2023", en:"PhD in Operations Research, Polytechnic University of Catalonia, 2023"},
      affil:{es:"Centro Tecnológico Forestal de Catalunya, España", en:"Forest Science and Technology Centre of Catalonia, Spain"},
      scholar:"https://scholar.google.com/citations?user=Z3F-9DgAAAAJ&hl=en" }
  ],

  contact: {
    emailPersonal: "eduardo.alvmir@gmail.com",
    emailInst: "ealvarez@utalca.cl",
    institution: {es:"Departamento de Ingeniería Industrial, Facultad de Ingeniería, Universidad de Talca, Chile",en:"Department of Industrial Engineering, Faculty of Engineering, University of Talca, Chile"},
    location: {es:"Campus Curicó, Curicó, Región del Maule, Chile",en:"Curicó Campus, Curicó, Maule Region, Chile"},
    links: [
      { label:"Google Scholar", url:"https://scholar.google.cl/citations?user=9XlvJEIAAAAJ&hl=es",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" fill="#4285F4" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/><path d="M5 13.18v3.2C5 17.93 8.13 19 12 19s7-1.07 7-2.62v-3.2l-7 3.82-7-3.82z"/></svg>' },
      { label:"ORCID", url:"https://orcid.org/0000-0002-7788-0451",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#A6CE39"/><circle cx="7.4" cy="7.15" r="1.05" fill="#fff"/><rect x="6.6" y="9.4" width="1.6" height="8.2" fill="#fff"/><path fill="#fff" d="M10 9.4h3.5c3.3 0 4.8 2.4 4.8 4.1 0 1.9-1.5 4.1-4.8 4.1H10V9.4zm1.6 1.45v5.3h1.7c2.4 0 3.2-1.8 3.2-2.65 0-1.4-.9-2.65-3.2-2.65h-1.7z"/></svg>' },
      { label:"ResearchGate", url:"https://www.researchgate.net/profile/Eduardo-Alvarez-Miranda",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#00CCBB"/><text x="12" y="16.3" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="10.5" fill="#fff">RG</text></svg>' },
      { label:"Scopus", url:"https://www.scopus.com/authid/detail.uri?authorId=39260996600",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#E9711C"/><text x="12" y="16.6" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#fff">S</text></svg>' },
      { label:"DBLP", url:"https://dblp.org/pid/12/4945.html",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 12 2.6 6.9 9.4 1.6z" fill="#1C5AA8"/><path d="M12 12 21.6 8.9 17.6 18.4z" fill="#2E7D6B"/><path d="M12 12 9.6 22.6 2.9 16.4z" fill="#F2C800"/></svg>' },
      { label:"LinkedIn", url:"https://www.linkedin.com/in/eduardo-alvarez-miranda/",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0A66C2"/><path fill="#fff" d="M6.94 8.5H4.5V18h2.44V8.5zM5.72 7.4a1.42 1.42 0 1 0 0-2.85 1.42 1.42 0 0 0 0 2.85zM18 18h-2.44v-4.4c0-1.05-.02-2.4-1.47-2.4-1.47 0-1.7 1.15-1.7 2.33V18H9.95V8.5h2.34v1.3h.03c.33-.62 1.13-1.27 2.32-1.27 2.48 0 2.94 1.63 2.94 3.76V18z"/></svg>' },
      { label:"ISCI", url:"https://isci.cl/",
        svg:'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#2E3192"/><text x="12" y="15.6" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="7.6" letter-spacing="0.3" fill="#fff">ISCI</text></svg>' }
    ]
  }
};
