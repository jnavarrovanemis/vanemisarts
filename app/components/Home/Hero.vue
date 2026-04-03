<script setup lang="ts">
const { t } = useI18n()
const { scrollTo } = useSmoothScroll()
</script>

<template>
  <section
    id="hero"
    class="relative w-full h-screen min-h-150 flex items-center justify-center
           overflow-hidden bg-gray-50 dark:bg-gray-950
           transition-colors duration-500 selection:bg-primary-500/30"
    aria-label="Hero"
  >
    <div
      class="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <NuxtImg
        src="/background.svg"
        alt="Fondo decorativo de Vanemis Arts"
        fetchpriority="high"
        class="w-full h-full object-cover object-top opacity-70 dark:opacity-85 transition-opacity duration-500"
      />
      <div
        class="absolute inset-0
               bg-linear-to-b
               from-gray-50/40 via-gray-50/80 to-gray-50
               dark:from-gray-950/40 dark:via-gray-950/80 dark:to-gray-950
               transition-colors duration-500"
      />
    </div>

    <div
      class="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none
             bg-primary-400/20 dark:bg-primary-500/20
             blur-3xl opacity-40 animate-pulse
             mix-blend-multiply dark:mix-blend-screen"
      aria-hidden="true"
    />
    <div
      class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none
             bg-purple-400/20 dark:bg-purple-500/20
             blur-3xl opacity-40
             mix-blend-multiply dark:mix-blend-screen"
      aria-hidden="true"
    />

    <svg
      class="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay"
      aria-hidden="true"
    >
      <filter id="noise">
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
        filter="url(#noise)"
      />
    </svg>

    <UContainer class="relative z-10 flex flex-col items-center justify-center h-full">
      <div class="max-w-4xl mx-auto text-center">
        <div
          v-motion-slide-visible-once-bottom
          class="mb-6"
        >
          <UBadge
            variant="subtle"
            size="lg"
            class="rounded-full px-4 py-1.5 backdrop-blur-md transition-colors duration-300
                   bg-white/60 border border-primary-200 text-primary-700 shadow-sm
                   dark:bg-primary-500/10 dark:border-primary-500/20 dark:text-primary-200
                   dark:shadow-[0_0_15px_rgba(var(--color-primary-500),0.3)]"
          >
            {{ t('hero.greeting') }}
          </UBadge>
        </div>

        <h1
          v-motion-slide-visible-once-bottom
          :delay="200"
          class="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight
                 text-gray-900 dark:text-white transition-colors duration-300"
        >
          Vanemis
          <span
            class="bg-linear-to-r from-primary-600 via-purple-600 to-pink-600
                   dark:from-primary-400 dark:via-purple-400 dark:to-pink-500
                   bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-lg"
          >
            Arts
          </span>
        </h1>

        <div
          v-motion-slide-visible-once-bottom
          :delay="400"
        >
          <p
            class="text-xl md:text-2xl font-light mb-2 max-w-2xl mx-auto
                   flex flex-wrap justify-center items-center gap-2
                   text-gray-700 dark:text-gray-200 transition-colors duration-300"
          >
            <span>{{ t('hero.title') }}</span>
            <span
              class="hidden sm:inline text-primary-500"
              aria-hidden="true"
            >•</span>
            <span>{{ t('hero.subtitle') }}</span>
          </p>

          <p
            class="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed
                   text-gray-600 dark:text-gray-400 transition-colors duration-300"
          >
            {{ t('hero.description') }}
          </p>
        </div>

        <div
          v-motion-slide-visible-once-bottom
          :delay="600"
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <UButton
            :label="t('hero.cta')"
            variant="ghost"
            size="xl"
            trailing-icon="i-heroicons-arrow-right"
            :ui="{ trailingIcon: 'transition-transform group-hover:translate-x-1' }"
            class="group px-8 py-3 font-medium rounded-full backdrop-blur-sm
                   bg-white/50 hover:bg-white border border-gray-200 text-gray-700
                   dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white
                   shadow-sm hover:shadow transition-all duration-300
                   hover:-translate-y-1 active:scale-95"
            @click="scrollTo('contact')"
          />
        </div>
      </div>
    </UContainer>

    <div
      v-motion-fade
      :delay="1000"
      :duration="1000"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
             text-gray-400 dark:text-white/30 transition-colors duration-300"
      aria-hidden="true"
    >
      <div class="flex flex-col items-center gap-2 animate-bounce">
        <span class="text-xs uppercase tracking-widest font-light opacity-70">
          {{ t('hero.scroll') }}
        </span>
        <UIcon
          name="i-heroicons-arrow-down"
          class="w-6 h-6"
        />
      </div>
    </div>
  </section>
</template>
