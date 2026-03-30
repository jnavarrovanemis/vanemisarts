<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/logo-minimalista.svg' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

const title = 'Vanemis Arts'
const description = 'Vanemis Arts Agencia Creativa'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/logo-minimalista.svg',
  twitterImage: '/logo-minimalista.svg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
