# Sitio personal — Eduardo Álvarez-Miranda

Sitio estático (HTML/CSS/JS puro, sin servidor ni base de datos) con:

- Portada con gráfico 3D de priorización espacial de conservación.
- Secciones: Trayectoria, Investigación, Publicaciones (72), Proyectos, Contacto.
- Bilingüe español / inglés (selector ES · EN, recuerda tu elección).
- **Proyectos con acceso restringido por usuario y contraseña**, cifrados en el navegador.

---

## 1. Estructura de archivos

```
site/
├── index.html                  ← página principal
├── CNAME                       ← tu dominio (www.ealvarez.cl)
├── assets/
│   ├── styles.css              ← estilos y paleta
│   ├── content.js              ← TODO tu contenido editable (CV, contacto)
│   ├── publications.js         ← lista de publicaciones
│   ├── projects-index.js       ← catálogo público de proyectos (sin secretos)
│   ├── hero.js                 ← gráfico 3D de la portada
│   ├── app.js                  ← idioma y render
│   └── projects.js             ← lógica de login y descifrado
├── projects/
│   ├── conservacion.enc.json   ← proyecto cifrado (demo)
│   ├── salud.enc.json          ← proyecto cifrado (demo)
│   └── indicadores.enc.json    ← proyecto cifrado (demo)
├── tools/
│   └── encrypt.html            ← herramienta para cifrar nuevos proyectos
├── README.md                   ← este archivo
└── MANUAL-publicar-sitio.md    ← guía paso a paso de publicación
```

---

## 2. Publicar en GitHub Pages (gratis)

1. Crea una cuenta en <https://github.com> (si no tienes).
2. Crea un repositorio nuevo llamado **`tu-usuario.github.io`** (reemplaza `tu-usuario` por tu nombre de usuario). Márcalo como **Public**.
3. Sube **todo el contenido de la carpeta `site/`** (no la carpeta, sino lo que hay dentro: `index.html`, `CNAME`, `assets/`, `projects/`, `tools/`) al repositorio. Puedes arrastrarlos en *Add file → Upload files*.
4. Ve a *Settings → Pages*. En *Branch* elige `main` y carpeta `/root`, y guarda.
5. En 1–2 minutos tu sitio estará en `https://tu-usuario.github.io`.

### Dominio propio — `www.ealvarez.cl`

El archivo `CNAME` (ya incluido) le indica a GitHub tu dominio. En el panel de
NIC Chile configura el DNS:

- Registro **CNAME**: subdominio `www` → `tu-usuario.github.io`
- (Apex, opcional) cuatro registros **A** para `ealvarez.cl` →
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

En GitHub → *Settings → Pages*: en *Custom domain* aparecerá `www.ealvarez.cl`;
marca **Enforce HTTPS** cuando el candado esté disponible (unos minutos).
Los pasos detallados están en `MANUAL-publicar-sitio`.

---

## 3. Cómo funcionan los proyectos restringidos

- La pestaña **Proyectos** es pública: muestra las tarjetas (título y categoría).
- Al abrir un proyecto se pide **usuario y contraseña**.
- El HTML de cada proyecto está **cifrado (AES-256-GCM)**. La contraseña deriva
  la clave (PBKDF2) que descifra el contenido **dentro del navegador**. El
  servidor nunca ve el contenido en claro ni la contraseña.
- Cada proyecto tiene su propia lista de usuarios autorizados.

### Credenciales de los proyectos demo

> **Cámbialas o reemplaza los proyectos antes de publicar.**

| Proyecto | Usuario | Contraseña |
|---|---|---|
| Priorización de conservación | `colaborador` | `iebmilenio30x30` |
| Priorización de conservación | `vhermoso` | `buffer-connect-2021` |
| Listas de espera | `hospital` | `listaespera2026` |
| Panel de indicadores | `direccion` | `utalca7anios` |

---

## 4. Agregar o reemplazar un proyecto

1. Abre **`tools/encrypt.html`** en tu navegador (doble clic, funciona sin internet).
2. Completa ID, títulos, categoría e ícono.
3. Sube o pega el archivo `.html` de tu proyecto.
4. Agrega los usuarios y contraseñas que tendrán acceso.
5. Pulsa **Generar**: se descarga `TU-ID.enc.json` y se muestra una línea de código.
6. Copia `TU-ID.enc.json` a la carpeta `projects/`.
7. Pega la línea generada dentro de `window.PROJECTS` en `assets/projects-index.js`.
8. Sube los cambios a GitHub.

**Cambiar usuarios/contraseñas de un proyecto existente:** repite el proceso con
el mismo HTML y la lista de usuarios actualizada; reemplaza el `.enc.json`.

---

## 5. Editar el contenido del sitio

- Textos del CV, contacto y enlaces a portales académicos (Google Scholar,
  ORCID, ResearchGate, Scopus — ya configurados con tus perfiles reales):
  **`assets/content.js`**.
- Publicaciones: **`assets/publications.js`**.
- Colores: variables al inicio de **`assets/styles.css`**.

### CV descargable
El botón "Descargar CV" apunta a la sección de contacto. Para ofrecer el PDF,
sube tu CV como `cv.pdf` a la carpeta `site/` y cambia el enlace del botón en
`index.html` a `href="cv.pdf"`.

---

## 6. Tipografía

El sitio usa **Plus Jakarta Sans** (Google Fonts, gratuita), elegida como
equivalente cercano a **Duplet**, que es de pago. Si más adelante licencias
Duplet (Latinotype / Adobe Fonts), reemplaza el `<link>` de la fuente en
`index.html` y la variable `--font` en `styles.css`.

---

## 7. Privacidad

Se **omitieron deliberadamente** del sitio los datos privados que aparecen en el
CV: RUT, dirección particular, fecha de nacimiento, estado civil y teléfono.

---

## 8. Probar localmente

Ábrelo con un servidor local (el login de proyectos requiere `http`, no `file://`):

```bash
cd site
python3 -m http.server 8000
# abre http://localhost:8000
```
