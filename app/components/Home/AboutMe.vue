<script setup lang="ts">
const { t } = useI18n()

const pillars = [
  {
    key: 'strategy',
    icon: 'i-heroicons-rocket-launch',
    gradient: 'from-primary-600 to-purple-600',
    glow: 'group-hover:shadow-primary-500/20',
    badge: 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
  },
  {
    key: 'video',
    icon: 'i-heroicons-video-camera',
    gradient: 'from-purple-600 to-pink-600',
    glow: 'group-hover:shadow-purple-500/20',
    badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  {
    key: 'management',
    icon: 'i-heroicons-user-group',
    gradient: 'from-pink-600 to-primary-600',
    glow: 'group-hover:shadow-pink-500/20',
    badge: 'bg-pink-500/10 text-pink-600 dark:text-pink-400'
  },
  // NUEVAS TARJETAS
  {
    key: 'web',
    icon: 'i-heroicons-computer-desktop',
    gradient: 'from-blue-600 to-cyan-600',
    glow: 'group-hover:shadow-blue-500/20',
    badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  {
    key: 'branding',
    icon: 'i-heroicons-swatch',
    gradient: 'from-orange-600 to-red-600',
    glow: 'group-hover:shadow-orange-500/20',
    badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  },
  {
    key: 'podcast',
    icon: 'i-heroicons-microphone',
    gradient: 'from-emerald-600 to-teal-600',
    glow: 'group-hover:shadow-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  }
]

// Métricas que dan credibilidad visual
const stats = [
  { key: 'years', value: '2+' },
  { key: 'brands', value: '5+' },
  { key: 'content', value: '1000+' },
  { key: 'reach', value: '1M+' }
]
</script>

<template>
  <section
    class="py-16 md:py-20 bg-gray-50 dark:bg-gray-950 relative overflow-hidden selection:bg-primary-500/30"
    aria-labelledby="about-heading"
  >
    <div
      class="absolute -top-20 -left-20 w-80 h-80 bg-primary-500/15 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse"
      aria-hidden="true"
    />
    <div
      class="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl opacity-40 pointer-events-none"
      aria-hidden="true"
    />

    <svg
      class="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-soft-light"
      aria-hidden="true"
    >
      <filter id="about-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="saturate"
          values="0"
        />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#about-noise)"
      />
    </svg>

    <UContainer class="relative z-10">
      <div
        v-motion-slide-visible-once-bottom
        class="max-w-3xl mx-auto text-center mb-12"
      >
        <span
          class="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 backdrop-blur-md"
        >
          {{ t('about.badge') }}
        </span>

        <h2
          id="about-heading"
          class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white"
        >
          {{ t('about.title') }}
          <span
            class="block md:inline-block bg-clip-text text-transparent bg-linear-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-400 dark:via-purple-400 dark:to-pink-500"
          >
            {{ t('about.titleAccent') }}
          </span>
        </h2>

        <p class="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {{ t('about.description') }}
        </p>
      </div>

      <div
        v-motion-slide-visible-once-bottom
        :delay="100"
        class="grid grid-cols-4 gap-3 mb-16 max-w-4xl mx-auto"
      >
        <div
          v-for="stat in stats"
          :key="stat.key"
          class="col-span-2 md:col-span-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 text-center"
        >
          <span
            class="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-primary-600 via-purple-600 to-pink-600 dark:from-primary-400 dark:via-purple-400 dark:to-pink-500"
          >
            {{ stat.value }}
          </span>
          <span class="text-[11px] md:text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5 uppercase tracking-wider">
            {{ t(`about.stats.${stat.key}`) }}
          </span>
        </div>
      </div>

      <UCarousel
        v-slot="{ item: pillar, index }"
        :items="pillars"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3 snap-start px-3 py-4',
          dots: 'absolute flex items-center justify-center gap-3 -bottom-8 inset-x-0',
          dot: 'w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700 transition-all duration-300 data-[active=true]:bg-primary-500 data-[active=true]:w-6'
        }"
        dots
        class="max-w-6xl mx-auto pb-12"
      >
        <div
          v-motion-slide-visible-once-bottom
          :delay="(index % 3) * 150"
          class="group relative flex flex-col h-full w-full"
        >
          <div
            :class="[
              'absolute -inset-1 bg-linear-to-br rounded-4xl opacity-0',
              'group-hover:opacity-40 blur-xl transition-all duration-700',
              pillar.gradient
            ]"
            aria-hidden="true"
          />

          <div
            :class="[
              'absolute inset-0 rounded-4xl p-px bg-linear-to-br opacity-20',
              'group-hover:opacity-60 transition-opacity duration-500',
              pillar.gradient
            ]"
            aria-hidden="true"
          >
            <div class="w-full h-full rounded-[calc(2rem-1px)] bg-white dark:bg-gray-900" />
          </div>

          <div
            class="relative flex flex-col h-full p-6 md:p-7 rounded-4xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            :class="pillar.glow"
          >
            <span
              class="absolute top-5 right-5 text-6xl font-black select-none pointer-events-none text-gray-100 dark:text-gray-800 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <div
              :class="[
                'relative mb-5 w-12 h-12 rounded-2xl flex items-center justify-center',
                'transition-all duration-500 group-hover:scale-110 group-hover:rotate-6',
                'shadow-sm group-hover:shadow-md',
                pillar.badge
              ]"
            >
              <div
                :class="[
                  'absolute inset-0 rounded-2xl blur-md opacity-0',
                  'group-hover:opacity-60 transition-opacity duration-500',
                  pillar.badge
                ]"
                aria-hidden="true"
              />
              <UIcon
                :name="pillar.icon"
                class="relative w-6 h-6"
                dynamic
              />
            </div>

            <div
              :class="[
                'absolute top-0 left-6 right-6 h-0.5 rounded-full bg-linear-to-r',
                'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                pillar.gradient
              ]"
              aria-hidden="true"
            />

            <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 relative">
              {{ t(`about.pillars.${pillar.key}.title`) }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm flex-1 relative">
              {{ t(`about.pillars.${pillar.key}.desc`) }}
            </p>

            <div class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 relative">
              <span
                :class="[
                  'inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide',
                  'transition-all duration-300 group-hover:scale-105',
                  pillar.badge
                ]"
              >
                {{ t(`about.pillars.${pillar.key}.tag`) }}
              </span>
            </div>
          </div>
        </div>
      </UCarousel>

      <div
        v-motion-slide-visible-once-bottom
        :delay="400"
        class="text-center mt-12"
      >
        <UBadge
          variant="outline"
          color="neutral"
          size="md"
          class="rounded-full px-5 py-1.5 backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700"
          :label="'✨ ' + t('about.footer')"
        />
      </div>
    </UContainer>
  </section>
</template>
