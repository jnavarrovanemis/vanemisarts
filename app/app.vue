<script setup>
const { t } = useI18n()

/*
 * Etiquetas hreflang y og:locale alternativas.
 *
 * Sin esto, Google no tiene forma de saber que /en y /pt son traducciones de
 * la misma pagina: las trata como contenido suelto y no sabe cual servir a
 * cada usuario. Es el mecanismo que Google pide para sitios multiidioma, y
 * sustituye a redirigir por Accept-Language (que ademas le afectaba a el, que
 * rastrea en en-US).
 *
 * `useLocaleHead` aporta htmlAttrs (lang y dir), los <link rel="alternate"
 * hreflang> de cada idioma mas el x-default, y los meta og:locale.
 */
const localeHead = useLocaleHead({ dir: true, lang: true, seo: true })

useHead(() => ({
  ...localeHead.value,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ...(localeHead.value.meta ?? [])
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo-minimalista.svg' },
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    ...(localeHead.value.link ?? [])
  ],
  script: [
    // Tracker de Metricool
    {
      innerHTML: 'function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"c30f9a6e7cfcf0ce6f11c68c45821672"})});',
      type: 'text/javascript',
      tagPosition: 'bodyClose'
    }
  ]
}))

// 3. Usamos funciones flecha () => para que los meta tags sean reactivos
useSeoMeta({
  title: () => t('meta.default.title'),
  description: () => t('meta.default.description'),
  ogTitle: () => t('meta.default.title'),
  ogDescription: () => t('meta.default.description'),
  ogType: 'website',
  ogImage: 'https://vanemis.art/og-image.jpg',
  twitterImage: 'https://vanemis.art/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Datos estructurados: permiten a Google mostrar el nombre, el logo y los
// perfiles sociales de la agencia como una entidad, en lugar de un enlace suelto.
// `defineOrganization` lo aporta nuxt-schema-org, incluido en @nuxtjs/seo.
useSchemaOrg([
  defineOrganization({
    name: 'Vanemis Arts',
    url: 'https://vanemis.art',
    logo: 'https://vanemis.art/logo-minimalista.svg',
    description: () => t('meta.default.description'),
    areaServed: {
      '@type': 'AdministrativeArea',
      'name': 'Aragua, Venezuela'
    },
    knowsAbout: [
      'Agencia de marketing digital',
      'Creación de contenido',
      'Gestión de redes sociales',
      'Diseño y desarrollo de páginas web',
      'Branding'
    ],
    sameAs: [
      'https://www.instagram.com/vanemis_arts',
      'https://www.facebook.com/share/1HhP8audD7/',
      'https://t.me/Vanemisarts'
    ]
  })
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
