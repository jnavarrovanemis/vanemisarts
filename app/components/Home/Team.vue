<script setup lang="ts">
const { t } = useI18n()

/**
 * Perfiles individuales del equipo.
 *
 * Mientras `published` sea `false`, la tarjeta no se renderiza y la sección
 * muestra únicamente la experiencia agregada por disciplina. Para publicar a
 * alguien basta con completar sus datos y cambiar la bandera: no hay que tocar
 * la plantilla.
 *
 * Al incorporar a un miembro nuevo hay que crear su bloque en los tres archivos
 * de i18n (`es`, `en`, `pt`) bajo `team.members.<id>`, con las claves
 * `role` y `bio`.
 */
interface TeamMember {
  id: string
  name: string
  avatar: string | null
  stack: string[]
  links: { icon: string, url: string, label: string }[]
  published: boolean
}

const members: TeamMember[] = [
  {
    id: 'content',
    name: 'Dubraska Ruiz',
    avatar: null,
    stack: ['Metricool', 'Premiere Pro', 'DaVinci Resolve', 'CapCut', 'Photoshop'],
    links: [],
    published: false
  },
  {
    id: 'tech',
    name: 'José Alejandro Navarro',
    avatar: null,
    stack: ['Nuxt', 'Vue', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
    links: [],
    published: false
  }
]

const visibleMembers = computed(() => members.filter(member => member.published))

/**
 * Experiencia acumulada por el equipo ANTES de fundar Vanemis Arts.
 *
 * Importante: estos bloques describen capacidades y trayectoria propia, nunca
 * encargos concretos de clientes. Cualquier cifra que se añada aquí debe poder
 * respaldarse con una fuente propia.
 */
const disciplines = [
  {
    key: 'content',
    icon: 'i-heroicons-megaphone',
    gradient: 'from-ambar-400 to-ambar-800',
    glow: 'group-hover:shadow-ambar-500/20',
    badge: 'bg-ambar-500/10 text-ambar-700 dark:text-ambar-400',
    highlights: ['h1', 'h2', 'h3']
  },
  {
    key: 'tech',
    icon: 'i-heroicons-command-line',
    gradient: 'from-marino-600 to-marino-800',
    glow: 'group-hover:shadow-marino-500/20',
    badge: 'bg-marino-500/10 text-marino-700 dark:text-marino-400',
    highlights: ['h1', 'h2', 'h3']
  }
]
</script>

<template>
  <section
    class="py-16 md:py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    aria-labelledby="team-heading"
  >
    <div
      class="section-glow section-glow--warm -top-24 right-0"
      aria-hidden="true"
    />
    <div
      class="section-glow section-glow--cool -bottom-24 left-0"
      aria-hidden="true"
    />

    <UContainer class="relative z-10">
      <div
        class="reveal max-w-3xl mx-auto text-center mb-12"
      >
        <SectionLabel
          index="02"
          :label="t('sectionLabels.team')"
        />

        <h2
          id="team-heading"
          class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white"
        >
          {{ t('team.title') }}
          <span
            class="block md:inline-block bg-clip-text text-transparent bg-linear-to-r from-ambar-600 via-marino-500 to-marino-700 dark:from-ambar-400 dark:via-marino-300 dark:to-marino-400"
          >
            {{ t('team.titleAccent') }}
          </span>
        </h2>

        <p class="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {{ t('team.description') }}
        </p>
      </div>

      <div
        class="reveal reveal-2 flex items-center justify-center gap-3 mb-10"
      >
        <span
          class="h-px w-8 bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        />
        <span class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {{ t('team.previousLabel') }}
        </span>
        <span
          class="h-px w-8 bg-gray-200 dark:bg-gray-800"
          aria-hidden="true"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <article
          v-for="discipline in disciplines"
          :key="discipline.key"
          class="reveal reveal-2 group relative flex flex-col h-full"
        >
          <div
            :class="[
              'absolute -inset-1 bg-linear-to-br rounded-4xl opacity-0',
              'group-hover:opacity-40 blur-xl transition-all duration-700',
              discipline.gradient
            ]"
            aria-hidden="true"
          />

          <div
            :class="[
              'absolute inset-0 rounded-4xl p-px bg-linear-to-br opacity-20',
              'group-hover:opacity-60 transition-opacity duration-500',
              discipline.gradient
            ]"
            aria-hidden="true"
          >
            <div class="w-full h-full rounded-[calc(2rem-1px)] bg-white dark:bg-gray-900" />
          </div>

          <div
            class="relative flex flex-col h-full p-6 md:p-8 rounded-4xl bg-white/90 dark:bg-gray-900/85 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            :class="discipline.glow"
          >
            <div class="flex items-start justify-between gap-4 mb-5">
              <div
                :class="[
                  'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
                  'transition-all duration-500 group-hover:scale-110 group-hover:rotate-6',
                  discipline.badge
                ]"
              >
                <UIcon
                  :name="discipline.icon"
                  class="w-6 h-6"
                  dynamic
                />
              </div>

              <span
                :class="[
                  'px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap',
                  discipline.badge
                ]"
              >
                {{ t(`team.disciplines.${discipline.key}.years`) }}
              </span>
            </div>

            <h3 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
              {{ t(`team.disciplines.${discipline.key}.title`) }}
            </h3>

            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
              {{ t(`team.disciplines.${discipline.key}.credential`) }}
            </p>

            <p class="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-5">
              {{ t(`team.disciplines.${discipline.key}.description`) }}
            </p>

            <ul class="mt-auto space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
              <li
                v-for="highlight in discipline.highlights"
                :key="highlight"
                class="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400"
              >
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-4 h-4 mt-0.5 shrink-0 text-primary-500"
                />
                <span>{{ t(`team.disciplines.${discipline.key}.highlights.${highlight}`) }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <div
        v-if="visibleMembers.length"
        class="mt-16"
      >
        <div
          class="reveal flex items-center justify-center gap-3 mb-10"
        >
          <span
            class="h-px w-8 bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
          <span class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {{ t('team.membersLabel') }}
          </span>
          <span
            class="h-px w-8 bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <article
            v-for="member in visibleMembers"
            :key="member.id"
            class="reveal reveal-2 group relative flex flex-col items-center text-center p-6 rounded-4xl bg-white/90 dark:bg-gray-900/85 border border-gray-200/60 dark:border-gray-800/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div class="relative mb-4">
              <div
                class="absolute -inset-1 rounded-full bg-linear-to-br from-ambar-500 via-marino-400 to-marino-600 opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500"
                aria-hidden="true"
              />
              <NuxtImg
                v-if="member.avatar"
                :src="member.avatar"
                :alt="member.name"
                width="112"
                height="112"
                loading="lazy"
                class="relative w-28 h-28 rounded-full object-cover"
              />
              <div
                v-else
                class="relative w-28 h-28 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              >
                <UIcon
                  name="i-heroicons-user"
                  class="w-10 h-10"
                />
              </div>
            </div>

            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
              {{ member.name }}
            </h3>

            <p class="text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
              {{ t(`team.members.${member.id}.role`) }}
            </p>

            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {{ t(`team.members.${member.id}.bio`) }}
            </p>

            <ul class="flex flex-wrap justify-center gap-1.5 mt-auto">
              <li
                v-for="tool in member.stack"
                :key="tool"
                class="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {{ tool }}
              </li>
            </ul>

            <div
              v-if="member.links.length"
              class="flex items-center gap-1 mt-4"
            >
              <UButton
                v-for="link in member.links"
                :key="link.label"
                :to="link.url"
                :icon="link.icon"
                :aria-label="`${member.name} — ${link.label}`"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                color="neutral"
                size="sm"
              />
            </div>
          </article>
        </div>
      </div>

      <div
        class="reveal reveal-4 text-center mt-14"
      >
        <UBadge
          variant="outline"
          color="neutral"
          size="md"
          class="rounded-full px-5 py-1.5 bg-white/70 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
          :label="'🤝 ' + t('team.footer')"
        />
      </div>
    </UContainer>
  </section>
</template>
