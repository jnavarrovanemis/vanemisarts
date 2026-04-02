<script setup lang="ts">
const { t } = useI18n()

// Lista estructurada: usamos "id" para conectar con los JSON de traducción
const skills = [
  // Gestión y Estrategia
  { id: 'metricool', icon: 'i-heroicons-chart-bar-square', color: 'blue' },
  { id: 'googleSuite', icon: 'i-simple-icons-google', color: 'green' },
  { id: 'youtubeStudio', icon: 'i-simple-icons-youtubestudio', color: 'red' },

  // Diseño
  { id: 'canvaPro', icon: 'i-simple-icons-canva', color: 'teal' },
  { id: 'affinitySuite', icon: 'i-simple-icons-affinity', color: 'indigo' },
  { id: 'gamma', icon: 'i-heroicons-presentation-chart-bar', color: 'yellow' },

  // Edición de Video/Audio
  { id: 'capcut', icon: 'i-heroicons-video-camera', color: 'gray' },
  { id: 'opusClip', icon: 'i-heroicons-scissors', color: 'purple' },
  { id: 'adobePodcast', icon: 'i-heroicons-microphone', color: 'orange' },

  // Inteligencia Artificial
  { id: 'chatgpt', icon: 'i-simple-icons-openai', color: 'emerald' },
  { id: 'gemini', icon: 'i-simple-icons-googlegemini', color: 'blue' },

  // Desarrollo Web / Tech
  { id: 'nuxtjs', icon: 'i-simple-icons-nuxtdotjs', color: 'green' },
  { id: 'wordpress', icon: 'i-simple-icons-wordpress', color: 'blue' }
]

// Mapeo estructurado: separamos el estilo del icono del estilo de la tarjeta
const colorStyles: Record<string, { icon: string, card: string }> = {
  blue: {
    icon: 'text-blue-500 bg-blue-500/10 border-blue-200 dark:border-blue-900',
    card: 'hover:shadow-blue-500/20 hover:border-blue-500/50'
  },
  green: {
    icon: 'text-green-500 bg-green-500/10 border-green-200 dark:border-green-900',
    card: 'hover:shadow-green-500/20 hover:border-green-500/50'
  },
  red: {
    icon: 'text-red-500 bg-red-500/10 border-red-200 dark:border-red-900',
    card: 'hover:shadow-red-500/20 hover:border-red-500/50'
  },
  teal: {
    icon: 'text-teal-500 bg-teal-500/10 border-teal-200 dark:border-teal-900',
    card: 'hover:shadow-teal-500/20 hover:border-teal-500/50'
  },
  indigo: {
    icon: 'text-indigo-500 bg-indigo-500/10 border-indigo-200 dark:border-indigo-900',
    card: 'hover:shadow-indigo-500/20 hover:border-indigo-500/50'
  },
  yellow: {
    icon: 'text-amber-500 bg-amber-500/10 border-amber-200 dark:border-amber-900',
    card: 'hover:shadow-amber-500/20 hover:border-amber-500/50'
  },
  gray: {
    icon: 'text-gray-700 dark:text-gray-300 bg-gray-500/10 border-gray-200 dark:border-gray-700',
    card: 'hover:shadow-gray-500/20 hover:border-gray-500/50'
  },
  purple: {
    icon: 'text-purple-500 bg-purple-500/10 border-purple-200 dark:border-purple-900',
    card: 'hover:shadow-purple-500/20 hover:border-purple-500/50'
  },
  orange: {
    icon: 'text-orange-500 bg-orange-500/10 border-orange-200 dark:border-orange-900',
    card: 'hover:shadow-orange-500/20 hover:border-orange-500/50'
  },
  emerald: {
    icon: 'text-emerald-500 bg-emerald-500/10 border-emerald-200 dark:border-emerald-900',
    card: 'hover:shadow-emerald-500/20 hover:border-emerald-500/50'
  }
}
</script>

<template>
  <section
    id="skills"
    class="py-24 relative bg-gray-50 dark:bg-gray-950 overflow-hidden selection:bg-pink-500/30"
  >
    <div
      class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none"
    />

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div
          v-motion-slide-visible-once-bottom
          class="text-center mb-16"
        >
          <h2
            class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          >
            {{ t("skills.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ t("skills.subtitle") }}
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          <div
            v-for="(skill, index) in skills"
            :key="skill.id"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
            class="h-full"
          >
            <UPopover
              mode="hover"
              class="h-full block"
            >
              <div
                class="group relative h-full w-full focus:outline-none flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                :class="[colorStyles[skill.color as keyof typeof colorStyles]?.card || '']"
              >
                <div
                  class="mb-4 p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  :class="[colorStyles[skill.color as keyof typeof colorStyles]?.icon || '']"
                >
                  <UIcon
                    :name="skill.icon"
                    class="w-8 h-8 md:w-10 md:h-10"
                    dynamic
                  />
                </div>

                <span
                  class="font-semibold text-center text-sm md:text-base text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                >
                  {{ t(`skills.items.${skill.id}.name`) }}
                </span>
              </div>

              <template #content>
                <div class="flex flex-col gap-3 p-4 max-w-[260px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
                  <div class="flex items-center gap-3">
                    <div
                      class="p-1.5 rounded-lg border flex items-center justify-center"
                      :class="[colorStyles[skill.color as keyof typeof colorStyles]?.icon || '']"
                    >
                      <UIcon
                        :name="skill.icon"
                        class="w-4 h-4"
                        dynamic
                      />
                    </div>
                    <span class="font-bold text-sm text-gray-900 dark:text-white">
                      {{ t(`skills.items.${skill.id}.name`) }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {{ t(`skills.items.${skill.id}.description`) }}
                  </p>
                </div>
              </template>
            </UPopover>
          </div>
        </div>

        <div
          v-motion-slide-visible-once-bottom
          :delay="800"
          class="mt-16 text-center"
        >
          <span
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
          >
            <UIcon
              name="i-heroicons-cpu-chip"
              class="w-4 h-4"
              dynamic
            />
            {{ t("skills.footer") }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
