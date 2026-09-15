# 1492tokens.com — sitio web (Astro)

Web estática, multiidioma (ES activo / EN preparado), sin base de datos ni backend.
Se despliega gratis en Cloudflare Pages, Netlify, Vercel o GitHub Pages.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera /dist listo para subir
npm run preview    # previsualiza /dist
```

Requiere Node 18+ (probado con Node 22).

## Dónde tocar cada cosa

| Quiero...                                   | Archivo                                   |
|---------------------------------------------|-------------------------------------------|
| Poner fecha, sede y Luma del próximo evento | `src/config.ts` → `nextEvent`             |
| Poner email, redes, YouTube, formularios    | `src/config.ts` → `site`                  |
| Cambiar cualquier texto de la web           | `src/i18n/ui.ts` (ES y EN en el mismo archivo) |
| Añadir una charla al archivo                | crear `src/content/talks/<slug>.md` (copiar `_plantilla.md`) |
| Cambiar colores, tipografías, botones       | `src/styles/global.css`                   |
| Cambiar el diseño de una página             | `src/views/<Página>.astro`                |
| Textos legales                              | `src/views/Privacy.astro` y `src/views/Legal.astro` |

Las páginas de `src/pages/` son solo enrutado: cada una importa su vista con el idioma correspondiente.
No hace falta tocarlas salvo para añadir un idioma nuevo.

## Añadir una charla (cada mes)

1. Copia `src/content/talks/_plantilla.md` y renómbrala, p.ej. `2026-10-leon-maria-garcia.md`.
2. Rellena título, ponente, ciudad, fecha, `youtubeId` (lo que va después de `v=` en la URL del vídeo), duración y tags.
3. Escribe el resumen debajo del bloque `---`.
4. `git push` → el hosting reconstruye la web sola. La charla aparece en `/charlas`, en su propia página `/charlas/<slug>` y, si es la más reciente, en la home.

Los archivos que empiezan por `_` se ignoran.

## Integración con Luma

- **Botón "Reservar plaza"**: rellena `nextEvent.lumaEventUrl` y `nextEvent.lumaEventId` en `src/config.ts`. Con ambos, el botón abre el checkout de Luma sin salir de la web. El `lumaEventId` (formato `evt-XXXX`) aparece en Luma → tu evento → *Embed*.
- **Calendario de todas las ediciones**: rellena `site.lumaCalendarUrl` (p.ej. `https://lu.ma/1492tokens`) y `site.lumaCalendarId` (`cal-XXXX`, en Luma → calendario → *Embed*). Con el ID, la página "Próximo evento" muestra el calendario embebido.

## Formularios

- `site.speakerFormUrl` → Google Form / Tally de "Quiero hablar" (campos: nombre y apellidos, email, ciudad, título provisional, resumen 2–3 frases, LinkedIn/redes).
- `site.cityFormUrl` → formulario de "Traer 1492tokens a mi ciudad".
- `site.newsletterAction` → endpoint POST de tu herramienta de newsletter (Buttondown, Brevo, Mailchimp...). Mientras esté vacío, el formulario no envía nada.

Si un enlace está vacío, la página muestra el email de contacto en su lugar.

## Idiomas

- Español en la raíz (`/que-es`, `/charlas`...). Inglés en `/en/` (`/en/what-it-is`, `/en/talks`...).
- Todos los textos están en `src/i18n/ui.ts`. Las rutas por idioma en `src/i18n/utils.ts` → `routes`.
- Para añadir un idioma: añadir el código en `astro.config.mjs` → `locales`, duplicar `src/pages/en/` como `src/pages/<código>/` cambiando `lang="en"`, y completar `ui` y `routes`.

## Despliegue en el VPS de Hostinger (Traefik + Docker)

El VPS ya tiene Traefik gestionando HTTPS. La web es un contenedor Nginx que Traefik
descubre por etiquetas. Todo está en `deploy/`.

**Una sola vez, en el VPS** (Consola web de Hostinger o SSH):

```bash
# 1. Sube la carpeta deploy/ al VPS y entra en ella
bash detect-traefik.sh        # te dice red, entrypoint y certresolver de Traefik
bash setup-vps.sh             # crea /opt/1492tokens y copia los archivos
nano /opt/1492tokens/.env     # pon los valores que te dio detect-traefik.sh
cd /opt/1492tokens && docker compose up -d
```

Crea el usuario `deploy` (los comandos los imprime `setup-vps.sh`) y genera una clave
`ssh-keygen -t ed25519` en tu ordenador: la pública va a `/home/deploy/.ssh/authorized_keys`,
la privada al secret `VPS_SSH_KEY` de GitHub.

**DNS en Hostinger** (Dominios → 1492tokens.com → DNS):

| Tipo | Nombre | Valor          |
|------|--------|----------------|
| A    | @      | IP del VPS     |
| A    | www    | IP del VPS     |

**Cada vez que hagas `git push` a `main`**, GitHub Actions construye la web y la sube
por `rsync` a `/opt/1492tokens/dist`. Nginx sirve los archivos nuevos al instante; no hay
que reiniciar nada. Traefik pide el certificado SSL solo la primera vez.

**Primer despliegue manual** (antes de configurar GitHub): `npm run build` en tu ordenador
y sube el contenido de `dist/` a `/opt/1492tokens/dist/` con scp o el gestor de archivos.

Alternativa sin VPS: Cloudflare Pages (build `npm run build`, output `dist`) funciona igual
y no requiere mantenimiento.

## Estructura

```
src/
  config.ts            ← datos del evento, email, redes, Luma, formularios
  content.config.ts    ← esquema de la colección de charlas
  content/talks/       ← una charla = un archivo .md
  i18n/ui.ts           ← todos los textos (ES / EN)
  i18n/utils.ts        ← helpers y rutas por idioma
  layouts/Base.astro   ← <head>, nav, ticker, footer
  components/          ← Nav, Ticker, Footer, Newsletter, TokenCounter, EventCard, TalkCard, LumaButton, YouTube
  views/               ← el contenido de cada página (Home, What, Event, Talks, Talk, Speak, Cities, About, Privacy, Legal)
  pages/               ← rutas ES (raíz) y EN (/en/)
  styles/global.css    ← diseño
public/favicon.svg
```

## Pendientes antes de publicar

- [ ] Rellenar `src/config.ts` (fecha, sede, Luma, formularios, redes, YouTube).
- [ ] Revisar `founderLinkedIn` en `src/config.ts`.
- [ ] Sustituir los campos `[entre corchetes]` de Privacidad y Aviso legal y pasar ambos por revisión legal.
- [ ] Añadir una imagen Open Graph (`public/og.jpg`, 1200×630) y enlazarla en `src/layouts/Base.astro`.
