// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // `@nuxtjs/supabase` se retiro a proposito: solo se usaba en servidor
  // (server/utils/leadService.ts) pero registraba un plugin de cliente que
  // metia supabase-js entero en el bundle del navegador. Ahora el cliente se
  // crea a mano en el server util. Si algun dia la landing necesita auth o
  // lecturas desde el navegador, hay que volver a instalarlo.
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/image'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://vanemis.art',
    name: 'Vanemis Arts',
    defaultLocale: 'es'
  },

  runtimeConfig: {
    contactEmail: '',
    resendApiKey: '',
    public: {}
  },

  // Los tres idiomas son estaticos: no hay nada dinamico por peticion, asi que
  // se prerenderizan y se sirven desde CDN. Antes solo '/' lo estaba y /en y
  // /pt ejecutaban la funcion serverless en cada visita (~770 ms de TTFB).
  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/pt': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2025-01-15',

  // Sirve los estaticos ya comprimidos. En Vercel lo hace la CDN, pero esto
  // hace que `pnpm preview` mida lo mismo que produccion y cubre cualquier
  // otro destino de despliegue.
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        esModuleInterop: true
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'es', language: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'pt', language: 'pt-BR', file: 'pt.json', name: 'Português' }
    ],
    // Necesario para que los hreflang salgan con URL absoluta.
    baseUrl: 'https://vanemis.art',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    /*
     * Detección automática desactivada a propósito.
     *
     * Con `/` prerenderizada en español, cualquier visitante cuyo navegador
     * estuviera en otro idioma hidrataba el HTML español en su propio idioma
     * (85 desajustes de hidratación medidos, que obligan a Vue a rehacer buena
     * parte del árbol) y acto seguido era redirigido a /en o /pt: dos cargas
     * completas de página para ver una.
     *
     * Además Googlebot rastrea en en-US, así que la página canónica del sitio
     * le respondía con un redirect fuera de sí misma. Google desaconseja
     * redirigir por Accept-Language; el mecanismo correcto son las etiquetas
     * hreflang, que @nuxtjs/i18n ya emite, y que hacen que /en y /pt se
     * indexen por separado y se sirvan a quien corresponda desde el buscador.
     *
     * Quien quiera cambiar de idioma tiene el selector en la cabecera.
     */
    detectBrowserLanguage: false
  },

  // Nuxt Icon en modo local: todas las colecciones que usa el proyecto estan
  // instaladas como dependencia, asi que ningun icono se pide a la API publica
  // de Iconify en tiempo de ejecucion.
  icon: {
    serverBundle: 'local'
  },

  image: {
    format: ['webp'],
    quality: 80
  }
})
