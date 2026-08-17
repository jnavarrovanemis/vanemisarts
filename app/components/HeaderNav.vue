<template>
  <header
    :class="[
      'fixed inset-x-0 z-50 pointer-events-none will-change-transform',
      scrolledDown ? 'header-hide' : 'header-show'
    ]"
  >
    <div
      class="hidden md:flex justify-center"
      :class="isCompact ? 'mt-3' : 'mt-0'"
      @mouseenter="onDesktopEnter"
      @mouseleave="onDesktopLeave"
    >
      <div
        :class="[
          'pointer-events-auto relative flex items-center gap-2',
          'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl',
          'border border-black/6 dark:border-white/8',
          isCompact ? 'px-3 shadow-lg shadow-black/10' : 'px-6 shadow-sm w-screen'
        ]"
        :style="containerStyle"
      >
        <div
          :class="[
            'pointer-events-none absolute inset-0 overflow-hidden rounded-full',
            'transition-opacity duration-300',
            isCompact ? 'opacity-100' : 'opacity-0'
          ]"
        >
          <div class="shimmer-bar" />
        </div>

        <NuxtLink
          to="/"
          aria-label="Inicio"
          class="relative z-10 shrink-0 flex items-center gap-2.5"
        >
          <NuxtImg
            src="/logo-minimalista.svg"
            alt="Logo de Vanemis Arts"
            :class="[
              'object-contain block transition-all duration-500',
              isCompact ? 'w-6 h-6' : 'w-7 h-7'
            ]"
            width="28"
            height="28"
          />
          <span
            :class="[
              'overflow-hidden whitespace-nowrap font-semibold text-sm',
              'text-neutral-800 dark:text-neutral-100 transition-all duration-400',
              isCompact ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'
            ]"
          >
            <slot name="brand-name" />
          </span>
        </NuxtLink>

        <div class="shrink-0 w-px h-4 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        <nav
          class="flex items-center gap-0.5"
          style="overflow: clip;"
          aria-label="Navegación principal"
        >
          <a
            v-for="link in navLinks"
            :key="link.hash"
            :href="link.hash"
            :class="[
              'shrink-0 px-3 rounded-full text-sm font-medium whitespace-nowrap',
              'transition-colors duration-200 cursor-pointer',
              'text-neutral-600 dark:text-neutral-400',
              'hover:text-neutral-900 dark:hover:text-neutral-100',
              'hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80',
              isCompact ? 'py-1' : 'py-1.5',
              activeSection === link.id
                ? 'text-neutral-900! dark:text-neutral-100! bg-neutral-100! dark:bg-neutral-800!'
                : ''
            ]"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex-1 min-w-0" />

        <div class="shrink-0 w-px h-4 rounded-full bg-neutral-200 dark:bg-neutral-700" />

        <div class="shrink-0 flex items-center gap-1 relative z-50 isolate">
          <LanguageSwitcher />
          <UColorModeButton />
        </div>
      </div>
    </div>

    <div class="md:hidden flex justify-between items-center px-4 pt-3 pointer-events-auto">
      <NuxtLink
        to="/"
        aria-label="Inicio"
        class="flex items-center gap-2 px-3 py-2 rounded-full
               bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl
               border border-black/6 dark:border-white/8
               shadow-md shadow-black/10"
      >
        <NuxtImg
          src="/logo-minimalista.svg"
          alt="Logo de Vanemis Arts"
          class="w-6 h-6 object-contain"
          width="24"
          height="24"
        />
        <span class="text-sm font-semibold text-neutral-800 dark:text-neutral-100 leading-none">
          <slot name="brand-name" />
        </span>
      </NuxtLink>

      <button
        type="button"
        :aria-label="mobileOpen ? 'Cerrar menú' : 'Abrir menú'"
        aria-controls="mobile-drawer"
        :aria-expanded="mobileOpen"
        class="flex items-center justify-center w-10 h-10 rounded-full
               bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl
               border border-black/6 dark:border-white/8
               shadow-md shadow-black/10 transition-colors duration-200
               hover:bg-white dark:hover:bg-neutral-900"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="relative w-4 h-3 flex flex-col justify-between">
          <span :class="['block h-0.5 rounded-full bg-neutral-700 dark:bg-neutral-300 transition-all duration-300 origin-center', mobileOpen ? 'rotate-45 translate-y-[5.5px]' : '']" />
          <span :class="['block h-0.5 rounded-full bg-neutral-700 dark:bg-neutral-300 transition-all duration-200', mobileOpen ? 'opacity-0 scale-x-0' : '']" />
          <span :class="['block h-0.5 rounded-full bg-neutral-700 dark:bg-neutral-300 transition-all duration-300 origin-center', mobileOpen ? '-rotate-45 -translate-y-[5.5px]' : '']" />
        </span>
      </button>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-3 scale-[0.97]"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-3 scale-[0.97]"
      >
        <div
          v-if="mobileOpen"
          id="mobile-drawer"
          class="fixed inset-x-3 top-18 z-9998 md:hidden
                 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl
                 rounded-2xl border border-black/6 dark:border-white/8
                 shadow-2xl shadow-black/20"
        >
          <nav
            class="px-2 pt-2 pb-1"
            aria-label="Navegación móvil"
          >
            <a
              v-for="link in navLinks"
              :key="link.hash"
              :href="link.hash"
              class="flex items-center px-4 py-3 rounded-xl text-sm font-medium
                     text-neutral-700 dark:text-neutral-300
                     hover:bg-neutral-100 dark:hover:bg-neutral-800
                     transition-colors duration-150 cursor-pointer"
              :class="activeSection === link.id
                ? 'text-neutral-900! dark:text-white! bg-neutral-100! dark:bg-neutral-800! font-semibold'
                : ''"
              @click.prevent="scrollTo(link.id, true)"
            >
              {{ link.label }}
            </a>
          </nav>
          <div class="mx-4 h-px bg-neutral-100 dark:bg-neutral-800" />
          <div class="flex items-center justify-between px-5 py-3">
            <span class="text-xs text-neutral-400 dark:text-neutral-500 font-medium tracking-wide uppercase">
              Preferencias
            </span>
            <div class="flex items-center gap-2 relative z-50 isolate">
              <LanguageSwitcher />
              <UColorModeButton />
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileOpen"
          class="fixed inset-0 z-9997 md:hidden bg-black/10 backdrop-blur-[2px]"
          aria-hidden="true"
          @click="mobileOpen = false"
        />
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'

const { t } = useI18n()

const navLinks = computed(() => [
  { id: 'hero', hash: '#hero', label: t('navigation.home') },
  { id: 'about', hash: '#about', label: t('navigation.about') },
  { id: 'team', hash: '#team', label: t('navigation.team') },
  { id: 'skills', hash: '#skills', label: t('navigation.skills') },
  { id: 'contact', hash: '#contact', label: t('navigation.contact') }
])

const { lockedOpen } = useHeaderState()

// ── Scroll suave al hacer click en nav ──────────────────────────
const { scrollTo: smoothScrollTo } = useSmoothScroll()

const scrollTo = (id: string, closeDrawer = false) => {
  smoothScrollTo(id)

  if (closeDrawer) mobileOpen.value = false
}

// ── Sección activa por IntersectionObserver ─────────────────────
const activeSection = ref<string | null>(null)

onMounted(() => {
  const sectionIds = navLinks.value.map(l => l.id)

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    {
      rootMargin: '-80px 0px -60% 0px', // activa cuando la sección entra al tercio superior
      threshold: 0
    }
  )

  sectionIds.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  onBeforeUnmount(() => observer.disconnect())
})

// ── Scroll ──────────────────────────────────────────────────────
const isCompact = ref(false)
const scrolledDown = ref(false)

onMounted(() => {
  let lastScrollY = window.scrollY
  let rafId: number

  const handleScroll = () => {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const current = window.scrollY
      const goingDown = current > lastScrollY
      isCompact.value = current > 80
      scrolledDown.value = goingDown && current > 400
      lastScrollY = current
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    cancelAnimationFrame(rafId)
  })
})

// ── Desktop hover ────────────────────────────────────────────────
const desktopHovered = ref(false)
let leaveTimer: ReturnType<typeof setTimeout> | null = null

const onDesktopEnter = () => {
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
  desktopHovered.value = true
}
const onDesktopLeave = () => {
  if (lockedOpen.value) return
  leaveTimer = setTimeout(() => {
    desktopHovered.value = false
  }, 80)
}
watch(lockedOpen, (locked) => {
  if (!locked) {
    leaveTimer = setTimeout(() => {
      desktopHovered.value = false
    }, 120)
  }
})

// ── Mobile drawer ────────────────────────────────────────────────
const mobileOpen = ref(false)

const isScrollLocked = useScrollLock(import.meta.client ? document.body : null)
watch(mobileOpen, (open) => {
  isScrollLocked.value = open
})

onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  const onResize = (e: MediaQueryListEvent) => {
    if (e.matches) mobileOpen.value = false
  }
  mq.addEventListener('change', onResize)
  onBeforeUnmount(() => mq.removeEventListener('change', onResize))
})

onBeforeUnmount(() => {
  isScrollLocked.value = false
  if (leaveTimer) clearTimeout(leaveTimer)
})

// ── Tamaño y border-radius del contenedor ───────────────────────
const containerStyle = computed(() => {
  const transition = [
    'width 500ms cubic-bezier(0.4,0,0.2,1)',
    'height 500ms cubic-bezier(0.4,0,0.2,1)',
    'border-radius 650ms cubic-bezier(0.25,0.1,0.25,1)'
  ].join(', ')

  if (isCompact.value) {
    return { transition, width: 'clamp(300px, 55vw, 680px)', height: '44px', borderRadius: '26px' }
  }
  return { transition, height: '56px', borderRadius: '6px' }
})
</script>

<style scoped>
@keyframes drop-in {
  from { opacity: 0; transform: translateY(-20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
header { animation: drop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

.header-hide { animation: header-out 0.35s cubic-bezier(0.4, 0, 1, 1) forwards; }
.header-show { animation: header-in 0.45s cubic-bezier(0, 0, 0.2, 1) forwards; }

@keyframes header-out {
  from { transform: translateY(0); opacity: 1; filter: blur(0px); }
  to { transform: translateY(-110%); opacity: 0; filter: blur(6px); }
}
@keyframes header-in {
  from { transform: translateY(-30%); opacity: 0; filter: blur(4px); }
  to { transform: translateY(0); opacity: 1; filter: blur(0px); }
}

.shimmer-bar {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(255, 255, 255, 0.18) 50%, transparent 70%);
  background-size: 200% 100%;
  animation: shimmer 2.4s ease-in-out infinite;
}
@keyframes shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

@media (prefers-reduced-motion: reduce) {
  header,
  .header-hide,
  .header-show {
    animation: none;
  }

  .header-hide {
    opacity: 0;
    transform: translateY(-110%);
  }

  .header-show {
    opacity: 1;
    transform: translateY(0);
  }

  .shimmer-bar {
    animation: none;
  }
}
</style>
