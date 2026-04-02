<script setup>
const { t, locale } = useI18n()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/logo-minimalista.svg' }
  ],
  htmlAttrs: {
    lang: locale
  },
  script: [
    // Tracker de Metricool
    {
      innerHTML: 'function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"c30f9a6e7cfcf0ce6f11c68c45821672"})});',
      type: 'text/javascript',
      tagPosition: 'bodyClose'
    }
  ]
})

// 3. Usamos funciones flecha () => para que los meta tags sean reactivos
useSeoMeta({
  title: () => t('meta.default.title'),
  description: () => t('meta.default.description'),
  ogTitle: () => t('meta.default.title'),
  ogDescription: () => t('meta.default.description'),
  ogImage: 'https://vanemis.art/logo-minimalista.svg',
  twitterImage: 'https://vanemis.art/logo-minimalista.svg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
