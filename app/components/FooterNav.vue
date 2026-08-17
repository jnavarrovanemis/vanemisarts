<script setup lang="ts">
const { t } = useI18n()

const socialLinks = [
  {
    icon: 'i-simple-icons-instagram',
    url: 'https://www.instagram.com/vanemis_arts14/',
    label: 'Instagram'
  },
  {
    icon: 'i-simple-icons-facebook',
    url: 'https://www.facebook.com/share/1HhP8audD7/',
    label: 'Facebook'
  },
  {
    icon: 'i-simple-icons-whatsapp',
    url: 'https://wa.me/584248882878',
    label: 'WhatsApp'
  },
  {
    icon: 'i-simple-icons-telegram',
    url: 'https://t.me/Vanemisarts',
    label: 'Telegram'
  }
]
</script>

<template>
  <div class="h-px w-full bg-linear-to-r from-transparent via-ambar-500/40 to-transparent dark:via-ambar-500/30" />

  <UFooter class="bg-gray-50 py-8 dark:bg-gray-950">
    <template #left>
      <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }}
        <span class="bg-linear-to-r from-ambar-500 to-marino-600 bg-clip-text font-bold text-transparent">
          Vanemis Arts
        </span>
        • {{ t('footer.rights') }}
      </p>
    </template>

    <template #right>
      <div class="flex items-center gap-2">
        <UButton
          v-for="social in socialLinks"
          :key="social.label"
          :to="social.url"
          target="_blank"
          rel="noopener noreferrer"
          :icon="social.icon"
          :aria-label="social.label"
          variant="ghost"
          class="text-gray-400 transition-colors duration-200
                 hover:bg-ambar-50 hover:text-ambar-700
                 dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-ambar-400"
        />
      </div>
    </template>
  </UFooter>
</template>
