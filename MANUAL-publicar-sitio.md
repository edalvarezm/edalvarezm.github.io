# Manual: cómo publicar tu sitio en www.ealvarez.cl

Guía completa y actualizada con el proceso real que seguimos. Pensada para
hacerse una sola vez. No necesitas saber programar.

El sitio se publica gratis en **GitHub Pages** y el dominio `www.ealvarez.cl`
se conecta a través de **Cloudflare** (DNS gratuito), porque NIC Chile solo
delega servidores de nombre y no permite crear registros DNS por sí mismo.

---

## Tus datos de referencia

| Dato | Valor |
|------|-------|
| Dominio | `www.ealvarez.cl` |
| Usuario de GitHub | `edalvarezm` |
| Repositorio | `edalvarezm.github.io` |
| Proveedor de DNS | Cloudflare (plan Free) |
| Nameservers de Cloudflare | `elliot.ns.cloudflare.com` · `elly.ns.cloudflare.com` |
| IP de GitHub Pages | `185.199.108.153` · `185.199.109.153` · `185.199.110.153` · `185.199.111.153` |

> Los nameservers son los que Cloudflare asignó a tu cuenta. Si alguna vez
> recreas la zona, Cloudflare podría darte otros distintos: usa siempre los que
> aparezcan en tu panel de Cloudflare.

---

# PARTE A · Publicar el sitio en GitHub

## Paso 1 · Crear una cuenta en GitHub

1. Entra a <https://github.com/signup>.
2. Escribe tu correo, una contraseña y el nombre de usuario **`edalvarezm`**.
3. Confirma tu correo con el enlace que GitHub te envía.

## Paso 2 · Crear el repositorio

1. Entra a <https://github.com/new>.
2. En **Repository name** escribe exactamente **`edalvarezm.github.io`**.
   Este nombre especial es lo que activa la publicación automática.
3. Marca **Public**. No marques "Add a README file".
4. Pulsa **Create repository**.

## Paso 3 · Subir los archivos del sitio

1. En el repositorio, haz clic en **uploading an existing file**
   (o *Add file → Upload files*).
2. Abre en tu computador la carpeta del sitio (`C:\Users\eduar\Dropbox\sitio-web`).
3. Selecciona **todo lo que está dentro** — `index.html`, `CNAME`, `README.md`,
   `MANUAL-publicar-sitio.md`, y las carpetas `assets`, `projects`, `tools` — y
   arrástralo al recuadro de GitHub.

   > Sube el **contenido** de la carpeta, no la carpeta. En la raíz del
   > repositorio debe quedar `index.html` visible directamente.
   > No es necesario subir `vista-previa-sitio.html` ni los archivos PDF.
4. Abajo, pulsa el botón verde **Commit changes**.

## Paso 4 · Activar GitHub Pages

1. En el repositorio, entra a **Settings → Pages**.
2. En **Source** elige **Deploy from a branch**.
3. En **Branch** elige **main** y carpeta **/ (root)**. Pulsa **Save**.
4. En 1–2 minutos tu sitio estará disponible en `https://edalvarezm.github.io`.
   (El dominio propio lo conectamos en la Parte B.)

---

# PARTE B · Conectar el dominio www.ealvarez.cl

**Por qué Cloudflare:** el panel de NIC Chile solo permite *delegar servidores
de nombre*, no crear registros A/CNAME. GitHub Pages no entrega nameservers,
solo registros. Cloudflare (gratis) actúa de intermediario: NIC apunta a
Cloudflare, y en Cloudflare creamos los registros que apuntan a GitHub.

## Paso 5 · Crear cuenta en Cloudflare y agregar el dominio

1. Entra a <https://dash.cloudflare.com/sign-up>, crea la cuenta con tu correo y
   una contraseña, y verifica el correo.
2. Pulsa **Add a site** (o *Add a domain*) → escribe **`ealvarez.cl`** → *Continue*.
3. Elige el plan **Free** → *Continue*.
4. Cloudflare escaneará los DNS existentes. Como NIC Chile no aloja la zona,
   encontrará **0 registros**. Es lo esperado.

## Paso 6 · Crear los registros DNS en Cloudflare

En la pantalla de DNS, pulsa **Add record** y crea estos 5 registros:

| Type | Name | Content / Target | Proxy status | TTL |
|------|------|------------------|--------------|-----|
| A | `@` | `185.199.108.153` | DNS only (nube gris) | Auto |
| A | `@` | `185.199.109.153` | DNS only | Auto |
| A | `@` | `185.199.110.153` | DNS only | Auto |
| A | `@` | `185.199.111.153` | DNS only | Auto |
| CNAME | `www` | `edalvarezm.github.io` | DNS only | Auto |

**Muy importante — la nube debe quedar GRIS ("DNS only"), no naranja
("Proxied").** Si están en naranja, haz clic en el ícono de nube de cada fila
hasta que quede gris. Con la nube naranja, GitHub no puede emitir el certificado
HTTPS y el sitio puede entrar en bucles de redirección.

El aviso de correo (agregar registro **MX** / SPF / DKIM) puedes **ignorarlo**:
es solo para recibir correo `@ealvarez.cl`, no es necesario para el sitio web.

Cuando termines, pulsa **Continue to activation**.

## Paso 7 · Poner los nameservers de Cloudflare en NIC Chile

Cloudflare te mostrará **dos nameservers** (en tu caso
`elliot.ns.cloudflare.com` y `elly.ns.cloudflare.com`).

1. Entra a NIC Chile → tu dominio → **Modificar Dominio → 4. Configuración Técnica**.
2. Marca **Servidores DNS**.
3. En **Nombre de Servidor** escribe el primer nameserver y pulsa
   *Agregar Servidor de Nombre*; repite con el segundo.
   - No escribas IPs (no son necesarias) y **no** termines con punto ".".
4. Deja **sin marcar** la casilla "Configurar a NIC Chile como servidor secundario".
5. **DNSSEC**: debe estar apagado. Si abres el enlace *DNSSec* y la tabla de
   llaves está vacía, ya está apagado — cierra la ventana con la ✕ sin agregar
   nada.
6. Pulsa el botón verde **Actualizar datos de dominio** para guardar.

## Paso 8 · Esperar la propagación

- El cambio de nameservers tarda en propagar **~4 horas en .cl** (hasta 24 h).
- En Cloudflare el dominio aparecerá como **"Pending"** hasta que detecte el
  cambio; luego pasará a **"Active"** y te llegará un correo. Puedes pulsar
  *Check nameservers now* de vez en cuando.
- Para verlo tú mismo: en <https://whatsmydns.net> busca `ealvarez.cl` tipo
  **NS**; deberían ir apareciendo `elliot`/`elly.ns.cloudflare.com`.

## Paso 9 · Activar HTTPS en GitHub

1. Cuando Cloudflare esté en "Active" y el sitio cargue en `www.ealvarez.cl`,
   entra a GitHub → **Settings → Pages**.
2. En **Custom domain** debería aparecer `www.ealvarez.cl` (lo puso el archivo
   `CNAME`). Si no, escríbelo y pulsa *Save*.
3. Cuando se habilite, marca **Enforce HTTPS** (puede tardar unos minutos en
   estar disponible).

¡Listo! Tu sitio quedará en **https://www.ealvarez.cl**.

---

# PARTE C · Después de publicar

## Cambiar las credenciales de los proyectos

Los proyectos vienen con usuarios y contraseñas **de ejemplo** que debes cambiar.

1. Abre **`tools/encrypt.html`** en tu navegador (doble clic; funciona sin internet).
2. Completa los datos del proyecto, sube tu archivo HTML y define los usuarios y
   contraseñas reales.
3. Pulsa **Generar**: se descarga un `.enc.json` y aparece una línea de código.
4. Sube el `.enc.json` a la carpeta `projects/` del repositorio.
5. Edita `assets/projects-index.js` en GitHub (lápiz para editar) y pega la línea
   generada dentro de la lista. Guarda con *Commit changes*.

> Las credenciales de ejemplo actuales están en `README.md`, sección 3.

## Publicar tu CV en PDF (opcional)

1. Prepara una versión pública de tu CV (sin datos privados) llamada `cv.pdf`.
2. Súbela a la raíz del repositorio.
3. Edita `index.html` y cambia el enlace del botón "Descargar CV" a `href="cv.pdf"`.

## Actualizar el sitio más adelante

1. Ve al archivo en tu repositorio de GitHub.
2. Pulsa el lápiz para editarlo, o sube una versión nueva.
3. Guarda con **Commit changes**. En 1–2 minutos el sitio se actualiza solo.

Archivos que probablemente quieras editar:

- `assets/content.js` — textos, contacto y portales (Scholar, ORCID, ResearchGate, Scopus).
- `assets/publications.js` — publicaciones.
- `assets/projects-index.js` — catálogo de proyectos.

---

# Solución de problemas

**Las nubes de Cloudflare están naranjas.**
Deben estar **grises ("DNS only")**. Haz clic en el ícono de nube de cada uno de
los 5 registros hasta que quede gris. Es el error más común y evita que GitHub
active HTTPS.

**Cloudflare dice que el dominio está "pending".**
Es normal: aún no detecta el cambio de nameservers en NIC Chile. Se resuelve
solo con la propagación (~4 h, hasta 24 h). No hay nada que arreglar.

**Aparece un aviso para agregar un registro MX / correo.**
Ignóralo. Solo es necesario si quieres recibir correo `@ealvarez.cl`.

**El dominio no carga todavía.**
Espera la propagación. Mientras tanto usa `https://edalvarezm.github.io`.
Verifica en whatsmydns.net que los NS ya apunten a Cloudflare.

**"Enforce HTTPS" está en gris en GitHub.**
Espera a que el dominio esté verificado y las nubes de Cloudflare estén en gris;
luego reaparece la opción.

**Un proyecto no abre con la contraseña.**
Usa el usuario y la contraseña exactos definidos al cifrarlo (la contraseña
distingue mayúsculas). Si los olvidaste, vuelve a cifrar el proyecto con
`tools/encrypt.html`.

---

¿Dudas en algún paso? Puedo guiarte en el momento o hacer los ajustes por ti.
