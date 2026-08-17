<script setup lang="ts">
const { t } = useI18n()

// Métricas que dan credibilidad visual
const stats = [
  { key: 'years', to: 6, suffix: '+' },
  { key: 'brands', to: 7, suffix: '+' },
  { key: 'content', to: 6, suffix: 'K+' },
  { key: 'reach', to: 14, suffix: 'M+' }
]
</script>

<template>
  <section
    class="py-16 md:py-20 bg-gray-50 dark:bg-gray-950 relative overflow-hidden"
    aria-labelledby="about-heading"
  >
    <div
      class="section-glow section-glow--cool -left-24 -top-24"
      aria-hidden="true"
    />
    <div
      class="section-glow section-glow--warm -bottom-24 -right-24"
      aria-hidden="true"
    />

    <div
      class="grain-overlay"
      aria-hidden="true"
    />

    <UContainer class="relative z-10">
      <div
        class="reveal max-w-3xl mx-auto text-center mb-12"
      >
        <SectionLabel
          index="01"
          :label="t('sectionLabels.about')"
        />

        <h2
          id="about-heading"
          class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white"
        >
          {{ t('about.title') }}
          <span
            class="block md:inline-block bg-clip-text text-transparent bg-linear-to-r from-marino-700 via-marino-500 to-ambar-500 dark:from-marino-400 dark:via-marino-300 dark:to-ambar-400"
          >
            {{ t('about.titleAccent') }}
          </span>
        </h2>

        <p class="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {{ t('about.description') }}
        </p>
      </div>

      <div
        class="reveal reveal-2 grid grid-cols-4 gap-3 mb-16 max-w-4xl mx-auto"
      >
        <div
          v-for="stat in stats"
          :key="stat.key"
          class="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-white/85 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800/50 text-center"
        >
          <span
            class="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-marino-700 via-marino-500 to-ambar-500 dark:from-marino-400 dark:via-marino-300 dark:to-ambar-400"
          >
            <CountUp
              :to="stat.to"
              :suffix="stat.suffix"
            />
          </span>
          <span class="text-[11px] md:text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5 uppercase tracking-wider">
            {{ t(`about.stats.${stat.key}`) }}
          </span>
        </div>
      </div>

      <HomeAboutLab />

      <div
        class="reveal reveal-4 text-center mt-12"
      >
        <UBadge
          variant="outline"
          color="neutral"
          size="md"
          class="rounded-full px-5 py-1.5 bg-white/70 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
          :label="'✨ ' + t('about.footer')"
        />
      </div>
    </UContainer>
  </section>
</template>
