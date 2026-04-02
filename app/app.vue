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
  }
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
