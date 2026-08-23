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
    badge: 'bg-ambar-500/10 text-ambar-700 dark:text-ambar-400',
    highlights: ['h1', 'h2', 'h3']
  },
  {
    key: 'tech',
    icon: 'i-heroicons-command-line',
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
          v-for="(discipline, index) in disciplines"
          :key="discipline.key"
          :class="['reveal reveal-2 team-editorial-card group relative flex h-full flex-col', `team-editorial-card--${discipline.key}`]"
        >
          <span
            class="team-editorial-card__marker"
            aria-hidden="true"
          />

          <div
            class="team-editorial-card__surface relative flex h-full flex-col rounded-[1.35rem] p-7 transition-all duration-500 sm:p-8 md:p-9"
          >
            <div class="flex items-start justify-between gap-5 mb-7">
              <div class="min-w-0 pt-1">
                <span
                  :class="[
                    'inline-flex px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide',
                    discipline.badge
                  ]"
                >
                  {{ t(`team.disciplines.${discipline.key}.years`) }}
                </span>
                <h3 class="mt-4 text-xl md:text-2xl font-extrabold tracking-tight text-gray-950 dark:text-white">
                  {{ t(`team.disciplines.${discipline.key}.title`) }}
                </h3>
                <p class="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {{ t(`team.disciplines.${discipline.key}.credential`) }}
                </p>
              </div>

              <div
                class="team-editorial-card__print shrink-0"
                aria-hidden="true"
              >
                <span class="team-editorial-card__artwork flex size-full items-center justify-center">
                  <UIcon
                    :name="discipline.icon"
                    class="relative z-10 size-9 text-white/90 drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                    dynamic
                  />
                  <span class="absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.18em] text-white/75">0{{ index + 1 }}</span>
                </span>
                <span class="mt-2 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                  <span>{{ index === 0 ? 'A' : 'B' }}</span>
                  <span>VA</span>
                </span>
              </div>
            </div>

            <p class="text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-7">
              {{ t(`team.disciplines.${discipline.key}.description`) }}
            </p>

            <ul class="mt-auto space-y-3 pt-5 border-t border-gray-200/80 dark:border-white/15">
              <li
                v-for="highlight in discipline.highlights"
                :key="highlight"
                class="flex items-start gap-3 text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
              >
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-5 h-5 mt-0.5 shrink-0 text-primary-500"
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
          class="mx-auto max-w-full whitespace-normal rounded-2xl border-gray-200 bg-white/70 px-5 py-2 text-center leading-snug sm:rounded-full dark:border-gray-700 dark:bg-gray-800/60"
          :ui="{ label: 'whitespace-normal' }"
          :label="'🤝 ' + t('team.footer')"
        />
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
.team-editorial-card {
  isolation: isolate;
  overflow: hidden;
  border-radius: 1.8rem;
  border: 1px solid rgb(148 163 184 / 0.22);
  background: rgb(15 23 42 / 0.96);
  box-shadow: 0 18px 38px rgb(15 23 42 / 0.14);
  transition: transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 500ms ease;
}

.team-editorial-card::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: linear-gradient(145deg, rgb(255 255 255 / 0.07), transparent 38%);
  content: '';
}

.team-editorial-card__marker {
  position: absolute;
  z-index: 2;
  top: 13px;
  right: 13px;
  width: 9px;
  height: 9px;
  border: 1px solid rgb(148 163 184 / 0.55);
  border-radius: 9999px;
  background: rgb(15 23 42);
}

.team-editorial-card--content .team-editorial-card__marker {
  border-color: rgb(250 179 63 / 0.65);
}

.team-editorial-card:hover {
  transform: translateY(-6px);
  border-color: rgb(148 163 184 / 0.48);
  box-shadow: 0 25px 48px rgb(15 23 42 / 0.26);
}

.team-editorial-card--content:hover {
  border-color: rgb(250 179 63 / 0.46);
}

.team-editorial-card__surface {
  min-height: 25rem;
  background:
    radial-gradient(circle at 12% 0%, rgb(91 187 255 / 0.11), transparent 36%),
    linear-gradient(145deg, rgb(255 255 255 / 0.03), transparent 52%);
}

.team-editorial-card--content .team-editorial-card__surface {
  background:
    radial-gradient(circle at 12% 0%, rgb(250 179 63 / 0.14), transparent 36%),
    linear-gradient(145deg, rgb(255 255 255 / 0.03), transparent 52%);
}

.team-editorial-card__print {
  width: 92px;
  padding: 6px 6px 0;
  border: 1px solid rgb(255 255 255 / 0.14);
  background: #05080e;
  box-shadow: 0 10px 22px rgb(0 0 0 / 0.25);
  transform: rotate(1.5deg);
  transition: transform 500ms ease, box-shadow 500ms ease;
}

.team-editorial-card:hover .team-editorial-card__print {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: 0 15px 28px rgb(0 0 0 / 0.34);
}

.team-editorial-card__artwork {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 0.44);
  background:
    linear-gradient(90deg, transparent 48%, rgb(255 255 255 / 0.13) 49% 51%, transparent 52%),
    linear-gradient(transparent 48%, rgb(255 255 255 / 0.13) 49% 51%, transparent 52%),
    linear-gradient(145deg, #1e3a8a, #2563eb 52%, #22d3ee);
}

.team-editorial-card--content .team-editorial-card__artwork {
  background:
    radial-gradient(circle at 29% 30%, #fbbf24 0 15%, transparent 16%),
    radial-gradient(circle at 70% 64%, #fb7185 0 22%, transparent 23%),
    linear-gradient(135deg, #1e3a8a, #a855f7);
}

@media (prefers-reduced-motion: reduce) {
  .team-editorial-card,
  .team-editorial-card:hover,
  .team-editorial-card__print,
  .team-editorial-card:hover .team-editorial-card__print {
    transform: none;
  }
}
</style>
