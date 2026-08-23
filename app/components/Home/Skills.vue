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

/** Un unico panel abierto a la vez. */
const openSkill = ref<string | null>(null)
const popoverMode = ref<'click' | 'hover'>('click')

/**
 * En pantallas tactiles no existe el estado `hover`, asi que la descripcion se
 * abre con click. En escritorio dejamos que HoverCard gestione cada transicion
 * entre tarjetas: forzar desde fuera el estado de 25 popovers hacia que el
 * cierre del anterior alcanzara al siguiente y cerrara ambos.
 *
 * La deteccion vive dentro del manejador de evento, no en un `useMediaQuery` a
 * nivel de setup. Si el componente que se renderiza dependiera del dispositivo,
 * el HTML prerenderizado (generado sin navegador) y el del cliente no
 * coincidirian, y volveriamos a tener desajustes de hidratacion.
 */
function pointerCanHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/**
 * Solo controla los popovers en tactil. En hover cada HoverCard posee su
 * propio ciclo de apertura/cierre y el retardo evita parpadeos al cruzar una
 * tarjeta hacia otra.
 */
function syncOpen(id: string, isOpen: boolean) {
  if (isOpen) {
    openSkill.value = id
  } else if (openSkill.value === id) {
    openSkill.value = null
  }
}

onMounted(() => {
  if (pointerCanHover()) popoverMode.value = 'hover'
})
</script>

<template>
  <section
    id="skills"
    class="py-24 relative bg-gray-50 dark:bg-gray-950 overflow-hidden"
  >
    <div
      class="grain-overlay"
      aria-hidden="true"
    />
    <div
      class="section-glow section-glow--cool left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    />

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div
          class="reveal text-center mb-16"
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

          <!-- Solo en tactil: sin hover, el panel hay que abrirlo con un toque. -->
          <p class="tap-hint mx-auto mt-5 max-w-xs items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium leading-snug text-gray-600 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
            <UIcon
              name="i-heroicons-hand-raised"
              class="size-4 shrink-0 text-marino-500"
              aria-hidden="true"
            />
            {{ t('skills.tapHint') }}
          </p>
        </div>

        <div
          v-for="(group, groupIndex) in skillGroups"
          :key="group.key"
          :class="groupIndex > 0 ? 'mt-16' : ''"
        >
          <div
            class="reveal flex items-center gap-3 mb-8"
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
              v-for="skill in group.items"
              :key="skill.id"
              class="reveal reveal-2 h-full"
            >
              <UPopover
                :mode="popoverMode"
                :open="popoverMode === 'click' ? openSkill === skill.id : undefined"
                :open-delay="80"
                :close-delay="140"
                :ui="{ content: 'bg-transparent ring-0 shadow-none p-0 w-auto' }"
                class="h-full block"
                @update:open="(isOpen: boolean) => popoverMode === 'click' && syncOpen(skill.id, isOpen)"
              >
                <button
                  type="button"
                  class="group relative h-full w-full flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 bg-white/85 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-800/50 hover:-translate-y-1 hover:shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
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
                  <span class="font-semibold text-center text-sm md:text-base text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {{ t(`skills.items.${skill.id}.name`) }}
                  </span>
                </button>

                <template #content>
                  <div
                    class="flex flex-col gap-3 p-4 max-w-[260px] bg-white dark:bg-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
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
          class="reveal reveal-4 mt-16 text-center"
        >
          <span class="inline-flex max-w-full items-center gap-2 rounded-2xl border border-gray-200 bg-gray-100 px-4 py-2 text-center text-xs font-medium leading-snug text-gray-600 sm:rounded-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
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
