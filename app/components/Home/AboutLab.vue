<script setup lang="ts">
const { t } = useI18n()

const selectedDial = ref<string | null>(null)

const dials = [
  {
    id: 'strategy',
    pillar: 'strategy',
    related: ['strategy'],
    letter: 'A',
    icon: 'i-lucide-aperture',
    start: '-2deg',
    speed: '8s',
    marker: 'bg-marino-500',
    selected: 'border-marino-500/60 bg-marino-500/12 dark:bg-marino-500/16'
  },
  {
    id: 'content',
    pillar: 'video',
    related: ['video', 'management', 'podcast'],
    letter: 'B',
    icon: 'i-lucide-paintbrush',
    start: '2deg',
    speed: '9s',
    marker: 'bg-ambar-500',
    selected: 'border-ambar-500/60 bg-ambar-500/12 dark:bg-ambar-500/16'
  },
  {
    id: 'development',
    pillar: 'web',
    related: ['web'],
    letter: 'C',
    icon: 'i-lucide-scan-line',
    start: '-1deg',
    speed: '7s',
    marker: 'bg-marino-400',
    selected: 'border-marino-400/60 bg-marino-400/12 dark:bg-marino-400/16'
  },
  {
    id: 'branding',
    pillar: 'branding',
    related: ['branding'],
    letter: 'D',
    icon: 'i-lucide-swatch-book',
    start: '1.5deg',
    speed: '10s',
    marker: 'bg-ambar-400',
    selected: 'border-ambar-400/60 bg-ambar-400/12 dark:bg-ambar-400/16'
  }
]

const tools = [
  { id: 'figma', icon: 'i-simple-icons-figma' },
  { id: 'nuxt', icon: 'i-simple-icons-nuxt' },
  { id: 'supabase', icon: 'i-simple-icons-supabase' }
]

const projects = [
  { id: 'brands', icon: 'i-lucide-sparkles' },
  { id: 'products', icon: 'i-lucide-box' }
]

function selectCapability(id: string) {
  selectedDial.value = id
}
</script>

<template>
  <div
    v-motion-slide-visible-once-bottom
    :delay="120"
    class="mx-auto max-w-7xl rounded-[2rem] border border-gray-300 bg-gray-200/70 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-gray-950/80 dark:shadow-black/25"
    :aria-label="t('aboutLab.panelLabel')"
  >
    <div class="overflow-hidden rounded-[1.55rem] border border-gray-300 bg-gray-50/90 dark:border-white/15 dark:bg-gray-900/95">
      <div class="grid grid-cols-2 lg:grid-cols-4">
        <button
          v-for="dial in dials"
          :key="dial.id"
          type="button"
          class="about-lab-dial-button group relative flex min-h-56 items-center justify-center border-b border-gray-300 p-4 transition-colors duration-500 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-marino-500 dark:border-white/15 sm:min-h-72 lg:min-h-80 lg:border-r"
          :class="[
            selectedDial === dial.id ? dial.selected + ' is-selected' : 'hover:bg-white dark:hover:bg-white/3',
            dial.id === 'content' || dial.id === 'branding' ? 'border-l border-gray-300 dark:border-white/15 lg:border-l-0' : '',
            dial.id === 'branding' ? 'lg:border-r-0' : ''
          ]"
          :aria-label="t('aboutLab.interaction', { capability: t(`aboutLab.dials.${dial.id}`) })"
          :aria-pressed="selectedDial === dial.id"
          @mouseenter="selectCapability(dial.id)"
          @focus="selectCapability(dial.id)"
          @click="selectCapability(dial.id)"
        >
          <span class="absolute right-4 top-4 size-3 rounded-full border border-gray-300 bg-gray-100 transition-colors duration-300 group-hover:bg-white dark:border-white/15 dark:bg-gray-800" />

          <span
            class="about-lab-art-print relative block aspect-[4/5] w-full max-w-48 border border-gray-300 bg-white p-2 pb-12 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-[filter,box-shadow,border-color] duration-500 dark:border-white/15 dark:bg-gray-950 sm:max-w-52"
            :class="`about-lab-art-print--${dial.id}`"
            :style="{ '--art-start': dial.start, '--art-speed': dial.speed }"
          >
            <span class="about-lab-artwork relative flex size-full items-center justify-center overflow-hidden border border-gray-200 dark:border-white/10">
              <span
                class="about-lab-artwork-grain absolute inset-0"
                aria-hidden="true"
              />
              <span
                class="about-lab-artwork-frame absolute inset-3 border border-white/50"
                aria-hidden="true"
              />
              <UIcon
                :name="dial.icon"
                class="relative z-10 size-12 text-white/90 drop-shadow-md transition-transform duration-500 group-hover:scale-110 sm:size-14"
              />
              <span class="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.2em] text-white/75">
                0{{ dials.indexOf(dial) + 1 }}
              </span>
            </span>
            <span class="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 text-left">
              <span class="text-sm font-semibold leading-tight text-gray-600 transition-colors group-hover:text-gray-950 dark:text-gray-300 dark:group-hover:text-white">
                {{ t(`aboutLab.dials.${dial.id}`) }}
              </span>
              <span class="font-mono text-xs text-gray-400">{{ dial.letter }}</span>
            </span>
          </span>

          <span
            class="absolute bottom-4 left-4 size-2.5 rounded-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            :class="[dial.marker, selectedDial === dial.id ? 'opacity-100' : '']"
            aria-hidden="true"
          />
        </button>
      </div>

      <div class="grid lg:grid-cols-4">
        <div class="relative min-h-52 overflow-hidden border-b border-gray-300 lg:col-span-2 lg:border-b-0 lg:border-r dark:border-white/15">
          <Transition
            name="about-lab-detail"
            mode="out-in"
          >
            <div
              v-if="selectedDial"
              :key="selectedDial"
              class="flex min-h-52 flex-col justify-center p-6 sm:p-8"
              aria-live="polite"
            >
              <div class="mb-4 flex items-center gap-3">
                <span
                  class="size-2.5 rounded-sm"
                  :class="dials.find(item => item.id === selectedDial)?.marker"
                />
                <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                  {{ t('aboutLab.selectedLabel') }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-950 dark:text-white sm:text-2xl">
                {{ t(`about.pillars.${dials.find(item => item.id === selectedDial)?.pillar}.title`) }}
              </h3>
              <p class="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
                {{ t(`about.pillars.${dials.find(item => item.id === selectedDial)?.pillar}.desc`) }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="related in dials.find(item => item.id === selectedDial)?.related"
                  :key="related"
                  class="rounded-full border border-marino-500/20 bg-marino-500/8 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-marino-700 dark:border-marino-400/25 dark:bg-marino-400/10 dark:text-marino-300"
                >
                  {{ t(`about.pillars.${related}.title`) }}
                </span>
              </div>
            </div>

            <div
              v-else
              key="connection"
              class="absolute inset-0"
            >
              <div class="absolute inset-x-5 top-5 flex items-center justify-between text-xs font-medium text-gray-400 dark:text-gray-500">
                <span>{{ t('aboutLab.connection.start') }}</span>
                <span>{{ t('aboutLab.connection.end') }}</span>
              </div>

              <svg
                class="absolute inset-x-0 bottom-8 h-28 w-full"
                viewBox="0 0 720 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  class="about-lab-wave about-lab-wave--one"
                  d="M0 60 C70 5 110 5 180 60 S290 115 360 60 S470 5 540 60 S650 115 720 60"
                />
                <path
                  class="about-lab-wave about-lab-wave--two"
                  d="M0 60 C70 115 110 115 180 60 S290 5 360 60 S470 115 540 60 S650 5 720 60"
                />
                <path
                  class="about-lab-wave about-lab-wave--three"
                  d="M0 60 C55 20 125 20 180 60 S305 100 360 60 S485 20 540 60 S665 100 720 60"
                />
                <path
                  class="about-lab-wave about-lab-wave--four"
                  d="M0 60 C55 100 125 100 180 60 S305 20 360 60 S485 100 540 60 S665 20 720 60"
                />
              </svg>

              <span class="absolute bottom-[5.2rem] left-[27%] size-2.5 rounded-sm bg-ambar-500 shadow-sm" />
              <span class="absolute bottom-[3.7rem] left-[63%] size-2.5 rounded-sm bg-marino-400 shadow-sm" />
              <span class="absolute bottom-[6.2rem] right-[11%] size-2.5 rounded-sm bg-ambar-300 shadow-sm" />
              <span class="absolute bottom-4 left-5 text-xs text-gray-400 dark:text-gray-500">{{ t('aboutLab.connection.base') }}</span>
              <span class="absolute bottom-4 left-[58%] text-xs text-gray-400 dark:text-gray-500">{{ t('aboutLab.connection.bridge') }}</span>
            </div>
          </Transition>
        </div>

        <div class="min-h-52 border-b border-gray-300 p-5 lg:border-b-0 lg:border-r dark:border-white/15">
          <h3 class="text-xs font-medium text-gray-400 dark:text-gray-500">
            {{ t('aboutLab.tools') }}
          </h3>
          <div class="mt-5 flex flex-wrap gap-3">
            <div
              v-for="tool in tools"
              :key="tool.id"
              class="group flex size-14 items-center justify-center rounded-xl border border-gray-300 bg-gray-100 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-marino-400 hover:bg-white hover:text-marino-600 hover:shadow-lg dark:border-white/15 dark:bg-white/6 dark:text-gray-500 dark:hover:border-marino-400 dark:hover:bg-white/10 dark:hover:text-marino-300"
              :title="t(`aboutLab.toolNames.${tool.id}`)"
            >
              <UIcon
                :name="tool.icon"
                class="size-7 transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <div class="min-h-52 p-5">
          <h3 class="text-xs font-medium text-gray-400 dark:text-gray-500">
            {{ t('aboutLab.projects') }}
          </h3>
          <div class="mt-5 flex flex-wrap gap-3">
            <div
              v-for="project in projects"
              :key="project.id"
              class="group flex size-14 items-center justify-center rounded-xl border border-gray-300 bg-gray-100 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-ambar-400 hover:bg-white hover:text-ambar-600 hover:shadow-lg dark:border-white/15 dark:bg-white/6 dark:text-gray-500 dark:hover:border-ambar-400 dark:hover:bg-white/10 dark:hover:text-ambar-300"
              :title="t(`aboutLab.projectNames.${project.id}`)"
            >
              <UIcon
                :name="project.icon"
                class="size-7 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-lab-art-print {
  filter: grayscale(0.82) saturate(0.7);
  animation: about-lab-art-float var(--art-speed) ease-in-out infinite alternate;
  will-change: transform;
}

.about-lab-dial-button:hover .about-lab-art-print,
.about-lab-dial-button:focus-visible .about-lab-art-print,
.about-lab-dial-button.is-selected .about-lab-art-print {
  animation-play-state: paused;
  filter: grayscale(0) saturate(1.08);
  box-shadow: 0 20px 45px rgb(15 23 42 / 0.16);
}

.about-lab-artwork {
  background: linear-gradient(145deg, #1d4ed8, #38bdf8 48%, #f59e0b);
}

.about-lab-art-print--content .about-lab-artwork {
  background:
    radial-gradient(circle at 28% 30%, #fbbf24 0 15%, transparent 16%),
    radial-gradient(circle at 70% 64%, #fb7185 0 22%, transparent 23%),
    linear-gradient(135deg, #1e3a8a, #a855f7);
}

.about-lab-art-print--development .about-lab-artwork {
  background:
    linear-gradient(90deg, transparent 48%, rgb(255 255 255 / 0.16) 49% 51%, transparent 52%),
    linear-gradient(transparent 48%, rgb(255 255 255 / 0.16) 49% 51%, transparent 52%),
    linear-gradient(145deg, #0f172a, #2563eb 55%, #22d3ee);
  background-size: auto, auto, auto;
}

.about-lab-art-print--branding .about-lab-artwork {
  background: conic-gradient(from 210deg at 45% 55%, #0f172a, #1d4ed8, #fbbf24, #f97316, #0f172a);
}

.about-lab-artwork-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.38'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
  opacity: 0.45;
}

.about-lab-detail-enter-active,
.about-lab-detail-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.about-lab-detail-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.about-lab-detail-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.about-lab-wave {
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 8 5;
  stroke-width: 1.25;
  color: rgb(148 163 184 / 0.5);
  animation: about-lab-wave-flow 12s linear infinite;
}

.about-lab-wave--two {
  animation-direction: reverse;
  animation-duration: 14s;
}

.about-lab-wave--three {
  animation-duration: 16s;
  opacity: 0.7;
}

.about-lab-wave--four {
  animation-direction: reverse;
  animation-duration: 18s;
  opacity: 0.55;
}

@keyframes about-lab-art-float {
  from {
    transform: rotate(var(--art-start)) translateY(2px);
  }

  to {
    transform: rotate(0deg) translateY(-5px);
  }
}

@keyframes about-lab-wave-flow {
  to {
    stroke-dashoffset: -130;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-lab-art-print {
    animation: none;
    transform: rotate(var(--art-start));
  }

  .about-lab-wave {
    animation: none;
  }
}
</style>
