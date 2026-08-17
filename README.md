# Vanemis Arts — Landing page

Sitio corporativo de [Vanemis Arts](https://vanemis.art), agencia de marketing creativo y desarrollo web.

Construido con Nuxt 4 y Nuxt UI. Incluye internacionalización en tres idiomas, captura de prospectos con persistencia en Supabase y notificación transaccional por correo.

## Stack

| Capa | Tecnología |
| :--- | :--- |
| Framework | Nuxt 4 · Vue 3 · TypeScript |
| UI | Nuxt UI 4 · Tailwind CSS 4 · `@vueuse/motion` |
| Idiomas | `@nuxtjs/i18n` — español (por defecto), inglés y portugués |
| SEO | `@nuxtjs/seo` · `@nuxt/image` (WebP) · prerender de `/` |
| Datos | Supabase (PostgreSQL) |
| Correo | Resend |
| Validación | Zod, compartida entre cliente y servidor |

## Estructura

```
app/
  components/Home/    Secciones de la home (Hero, AboutMe, Team, Skills, Contact)
  components/         Navegación, footer y selector de idioma
  composables/        Scroll suave, estado del header, transición de tema
  assets/css/         Tema y paletas
i18n/locales/         es.json · en.json · pt.json
server/
  api/contact.post.ts Endpoint del formulario
  utils/              Validación, servicio de leads y plantilla de correo
docs/                 Esquema de base de datos y plan de contenido
```

## Requisitos

- Node.js 20 o superior
- pnpm 10

## Puesta en marcha

```bash
pnpm install
```

Crea un archivo `.env` en la raíz con las siguientes variables:

```bash
# Correo de destino de los formularios de contacto
NUXT_CONTACT_EMAIL=
# API key de Resend
NUXT_RESEND_API_KEY=
# Secreto para la generación de imágenes Open Graph
NUXT_OG_IMAGE_SECRET=

# Supabase
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_SECRET_KEY=
```

Levanta el servidor de desarrollo en `http://localhost:3000`:

```bash
pnpm dev
```

## Comandos

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compilación para producción |
| `pnpm preview` | Previsualización de la compilación |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Comprobación de tipos con `vue-tsc` |

## Internacionalización

Los tres archivos de `i18n/locales/` deben mantenerse sincronizados: una clave presente en `es.json` y ausente en `pt.json` provoca que ese texto aparezca vacío en portugués.

Al añadir una sección nueva, crear su bloque en los tres archivos antes de referenciarlo desde el componente.

## Base de datos

El esquema completo —tablas, ENUMs, funciones RPC y políticas de seguridad a nivel de fila— está documentado en [`docs/database-schema.md`](docs/database-schema.md).

## Convenciones

- Ramas: el trabajo se integra en `dev` mediante Pull Request y de ahí a `main`
- Husky y lint-staged ejecutan ESLint sobre los archivos `.ts` y `.vue` antes de cada commit
- Sin comas finales y con estilo de llaves `1tbs`, según la configuración de `eslint.config.mjs`

## Licencia

MIT. Ver [LICENSE](LICENSE).
