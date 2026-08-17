<script setup lang="ts">
const { t } = useI18n()

interface Skill {
  id: string
  icon: string
  color: string
}

interface SkillGroup {
  key: string
  icon: string
  /** Acento del encabezado: calido para contenido, frio para desarrollo. */
  accent: string
  items: Skill[]
}

/**
 * Las herramientas se agrupan por disciplina para que se lean como dos
 * capacidades distintas de la agencia y no como una única lista larga.
 * Al añadir una herramienta hay que crear su bloque `skills.items.<id>`
 * en los tres archivos de i18n (`es`, `en`, `pt`).
 */
const skillGroups: SkillGroup[] = [
  {
    key: 'content',
    icon: 'i-heroicons-megaphone',
    accent: 'text-ambar-600 dark:text-ambar-400',
    items: [
      { id: 'metricool', icon: 'i-heroicons-chart-bar-square', color: 'blue' },
      { id: 'googleSuite', icon: 'i-simple-icons-google', color: 'green' },
      { id: 'youtubeStudio', icon: 'i-simple-icons-youtubestudio', color: 'red' },
      { id: 'canvaPro', icon: 'i-simple-icons-canva', color: 'teal' },
      { id: 'photoshop', icon: 'i-simple-icons-adobephotoshop', color: 'blue' },
      { id: 'affinitySuite', icon: 'i-simple-icons-affinity', color: 'indigo' },
      { id: 'gamma', icon: 'i-heroicons-presentation-chart-bar', color: 'yellow' },
      { id: 'premiere', icon: 'i-simple-icons-adobepremierepro', color: 'purple' },
      { id: 'davinciResolve', icon: 'i-simple-icons-davinciresolve', color: 'teal' },
      { id: 'capcut', icon: 'i-heroicons-video-camera', color: 'gray' },
      { id: 'filmora', icon: 'i-heroicons-film', color: 'indigo' },
      { id: 'opusClip', icon: 'i-heroicons-scissors', color: 'purple' },
      { id: 'adobePodcast', icon: 'i-heroicons-microphone', color: 'orange' },
      { id: 'chatgpt', icon: 'i-simple-icons-openai', color: 'emerald' },
      { id: 'gemini', icon: 'i-simple-icons-googlegemini', color: 'blue' },
      { id: 'notebookLM', icon: 'i-heroicons-book-open', color: 'emerald' }
    ]
  },
  {
    key: 'dev',
    icon: 'i-heroicons-command-line',
    accent: 'text-marino-600 dark:text-marino-400',
    items: [
      { id: 'nuxtjs', icon: 'i-simple-icons-nuxtdotjs', color: 'green' },
      { id: 'typescript', icon: 'i-simple-icons-typescript', color: 'blue' },
      { id: 'nodejs', icon: 'i-simple-icons-nodedotjs', color: 'green' },
      { id: 'nestjs', icon: 'i-simple-icons-nestjs', color: 'red' },
      { id: 'supabase', icon: 'i-simple-icons-supabase', color: 'emerald' },
      { id: 'postgresql', icon: 'i-simple-icons-postgresql', color: 'indigo' },
      { id: 'docker', icon: 'i-simple-icons-docker', color: 'blue' },
      { id: 'n8n', icon: 'i-heroicons-arrow-path-rounded-square', color: 'orange' },
      { id: 'wordpress', icon: 'i-simple-icons-wordpress', color: 'teal' }
    ]
  }
]

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

// Un único ID activo — garantiza que solo uno esté abierto a la vez
const activeSkill = ref<string | null>(null)

function open(id: string) {
  activeSkill.value = id
}

function close(id: string) {
  // Solo cierra si el que intenta cerrar es el que está activo
  if (activeSkill.value === id) {
    activeSkill.value = null
  }
}

// La animación se escalona solo en las primeras posiciones: con más de 20
// herramientas, un retardo lineal dejaría las últimas tarjetas fuera de tiempo.
function staggerDelay(index: number) {
  return Math.min(index, 7) * 80
}

onUnmounted(() => {
  activeSkill.value = null
})
</script>

<template>
  <section
    id="skills"
    class="py-24 relative bg-gray-50 dark:bg-gray-950 overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-marino-500/5 rounded-full blur-3xl pointer-events-none"
    />

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div
          v-motion-slide-visible-once-bottom
          class="text-center mb-16"
        >
          <SectionLabel
            index="03"
            :label="t('sectionLabels.skills')"
          />
          <h2 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            {{ t("skills.title") }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {{ t("skills.subtitle") }}
          </p>
        </div>

        <div
          v-for="(group, groupIndex) in skillGroups"
          :key="group.key"
          :class="groupIndex > 0 ? 'mt-16' : ''"
        >
          <div
            v-motion-slide-visible-once-bottom
            class="flex items-center gap-3 mb-8"
          >
            <UIcon
              :name="group.icon"
              :class="['w-5 h-5 shrink-0', group.accent]"
              dynamic
            />
            <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {{ t(`skills.groups.${group.key}`) }}
            </h3>
            <span
              class="h-px flex-1 bg-gray-200 dark:bg-gray-800"
              aria-hidden="true"
            />
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            <div
              v-for="(skill, index) in group.items"
              :key="skill.id"
              v-motion-slide-visible-once-bottom
              :delay="staggerDelay(index)"
              class="h-full"
            >
              <UPopover
                :open="activeSkill === skill.id"
                class="h-full block"
                @update:open="(val) => { if (!val) activeSkill = null }"
              >
                <div
                  class="group relative h-full w-full focus:outline-none flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                  :class="[colorStyles[skill.color as keyof typeof colorStyles]?.card || '']"
                  @mouseenter="open(skill.id)"
                  @mouseleave="close(skill.id)"
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
                  <span class="font-semibold text-center text-sm md:text-base text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {{ t(`skills.items.${skill.id}.name`) }}
                  </span>
                </div>

                <template #content>
                  <div
                    class="flex flex-col gap-3 p-4 max-w-[260px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
                    @mouseenter="open(skill.id)"
                    @mouseleave="close(skill.id)"
                  >
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
        </div>

        <div
          v-motion-slide-visible-once-bottom
          :delay="400"
          class="mt-16 text-center"
        >
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
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
