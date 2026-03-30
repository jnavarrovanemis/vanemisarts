<script setup lang="ts">
const { t } = useI18n()

// Lista de herramientas estructurada por categorías
const skills = [
  // Gestión y Estrategia
  { name: 'Metricool', icon: 'i-heroicons-chart-bar-square', color: 'blue' },
  { name: 'Google Suite', icon: 'i-simple-icons-google', color: 'green' },
  { name: 'YouTube Studio', icon: 'i-simple-icons-youtubestudio', color: 'red' },

  // Diseño
  { name: 'Canva Pro', icon: 'i-simple-icons-canva', color: 'teal' },
  { name: 'Affinity Suite', icon: 'i-simple-icons-affinity', color: 'indigo' },
  { name: 'Gamma', icon: 'i-heroicons-presentation-chart-bar', color: 'yellow' },

  // Edición de Video/Audio
  { name: 'CapCut', icon: 'i-heroicons-video-camera', color: 'gray' },
  { name: 'Opus Clip', icon: 'i-heroicons-scissors', color: 'purple' },
  { name: 'Adobe Podcast', icon: 'i-heroicons-microphone', color: 'orange' },

  // Inteligencia Artificial
  { name: 'ChatGPT', icon: 'i-simple-icons-openai', color: 'emerald' },
  { name: 'Gemini', icon: 'i-simple-icons-googlegemini', color: 'blue' },

  // Desarrollo Web / Tech (Agregado para destacar tu perfil técnico)
  { name: 'Nuxt.js', icon: 'i-simple-icons-nuxtdotjs', color: 'green' },
  { name: 'WordPress', icon: 'i-simple-icons-wordpress', color: 'blue' }
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
            {{ t("skills.title") || "Herramientas Creativas" }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{
              t("skills.subtitle") || "El stack tecnológico que utilizo para gestionar marcas, diseñar contenido y potenciar estrategias digitales."
            }}
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          <div
            v-for="(skill, index) in skills"
            :key="skill.name"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
            class="group"
          >
            <div
              class="relative h-full flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 hover:-translate-y-1 hover:shadow-xl"
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
                {{ skill.name }}
              </span>
            </div>
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
            {{ t("skills.footer") || "Constantemente actualizando mi stack" }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
