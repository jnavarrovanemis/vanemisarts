<script setup lang="ts">
const { t } = useI18n()
const { scrollTo } = useSmoothScroll()

const artworkHovered = ref(false)
const artworkFocused = ref(false)
const artworkPinned = ref(false)
const artworkActive = computed(() => artworkHovered.value || artworkFocused.value || artworkPinned.value)
const artworkStyle = ref<Record<string, string>>({
  '--art-rotate-x': '0deg',
  '--art-rotate-y': '0deg'
})

function handleArtworkPointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return

  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  artworkStyle.value = {
    '--art-rotate-x': `${(-y * 7).toFixed(2)}deg`,
    '--art-rotate-y': `${(x * 7).toFixed(2)}deg`
  }
}

function resetArtworkTilt() {
  artworkStyle.value = {
    '--art-rotate-x': '0deg',
    '--art-rotate-y': '0deg'
  }
}

function handleArtworkLeave() {
  artworkHovered.value = false
  resetArtworkTilt()
}
</script>

<template>
  <section
    id="hero"
    class="editorial-grid hero-grid-drift relative isolate flex min-h-screen w-full overflow-hidden bg-gray-50 pt-20 text-gray-950 dark:bg-gray-950 dark:text-white"
    aria-labelledby="hero-heading"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gray-300/70 dark:bg-white/10"
      aria-hidden="true"
    />

    <!--
      Fondo en movimiento. Tres capas de profundidad creciente:
      1. el wordmark de marca a gran escala (hereda la presencia que antes
         tenia la seccion BrandSignature, ahora fusionada aqui);
      2. las palabras clave del estudio en sentido contrario;
      3. la propia reticula editorial, que se desplaza muy despacio.
      Todo es decorativo: aria-hidden y sin capturar puntero.
    -->
    <div
      class="hero-motion-viewport pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div class="hero-wordmark-rail absolute top-[16%] whitespace-nowrap text-[clamp(6rem,16vw,15rem)] font-black uppercase leading-none tracking-[-0.07em] text-gray-950/4 dark:text-white/4">
        Vanemis Arts · Vanemis Arts ·
      </div>
      <div class="hero-motion-rail hero-motion-rail--reverse absolute top-[58%] hidden whitespace-nowrap text-[7rem] font-black uppercase leading-none tracking-[-0.08em] text-gray-950/3 lg:block dark:text-white/3">
        {{ t('hero.motionWords') }} · {{ t('hero.motionWords') }} ·
      </div>
    </div>

    <UContainer class="relative z-10 flex w-full flex-1 flex-col">
      <!--
        Lockup de identidad. Recoge el logotipo y el wordmark que vivian en
        BrandSignature, reducidos a la escala de firma que pide el ADR para
        la zona de identidad, en lugar de repetir el nombre a pantalla completa.
      -->
      <div
        class="flex flex-col items-center gap-4 border-b border-gray-300 py-5 text-center lg:flex-row lg:justify-between lg:text-left dark:border-white/15"
      >
        <div class="flex items-center gap-3">
          <img
            src="/logo-minimalista.svg"
            alt=""
            width="40"
            height="40"
            decoding="async"
            class="size-9 object-contain md:size-10"
            aria-hidden="true"
          >
          <div class="text-left leading-tight">
            <span class="block text-base font-extrabold tracking-[-0.03em] md:text-lg">
              Vanemis <span class="text-primary-600 dark:text-primary-400">Arts</span>
            </span>
            <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {{ t('hero.greeting') }}
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-end">
          <span class="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:border-white/15 dark:bg-gray-950/75 dark:text-gray-200">
            <span
              class="relative flex size-2"
              aria-hidden="true"
            >
              <span class="absolute inline-flex size-full rounded-full bg-green-400 opacity-40" />
              <span class="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            {{ t('hero.availability') }}
          </span>

          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            {{ t('hero.location') }}
          </span>
        </div>
      </div>

      <div class="grid flex-1 grid-cols-1 items-center gap-10 py-8 lg:grid-cols-12 lg:gap-8 lg:py-6">
        <div class="text-center lg:col-span-8 lg:text-left">
          <h1
            id="hero-heading"
            class="mx-auto max-w-4xl text-balance text-[clamp(2.6rem,5.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] sm:leading-[0.92] sm:tracking-[-0.055em] lg:mx-0"
          >
            {{ t('hero.title') }}
            <span class="block text-primary-600 dark:text-primary-400">
              {{ t('hero.subtitle') }}
            </span>
          </h1>

          <div
            class="mx-auto mt-8 grid max-w-3xl justify-items-center gap-6 lg:mx-0 lg:justify-items-stretch lg:border-l lg:border-gray-300 lg:pl-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end dark:lg:border-white/15"
          >
            <p class="mx-auto max-w-xl text-pretty text-base leading-relaxed text-gray-600 md:text-lg lg:mx-0 dark:text-gray-300">
              {{ t('hero.description') }}
            </p>

            <UButton
              :label="t('hero.cta')"
              size="xl"
              trailing-icon="i-heroicons-arrow-up-right"
              :ui="{ trailingIcon: 'transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' }"
              class="group justify-center rounded-full px-6 font-semibold shadow-none transition-transform duration-300 hover:-translate-y-0.5"
              @click="scrollTo('contact')"
            />
          </div>
        </div>

        <div
          class="hero-art-float relative mx-auto w-full max-w-md lg:col-span-4 lg:mr-0"
        >
          <button
            type="button"
            class="hero-artwork-shell editorial-art group relative mx-auto block aspect-[4/5] w-[min(100%,20rem)] overflow-hidden border border-gray-300 bg-white/90 text-left transition-[border-radius,background-color,border-color] duration-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 lg:w-[min(100%,18rem)] xl:w-[min(100%,20rem)] dark:border-white/15 dark:bg-gray-900/70"
            :class="artworkActive ? 'rounded-[2.5rem] border-primary-500/50' : 'rounded-[45%_45%_2rem_2rem]'"
            :style="artworkStyle"
            :aria-label="t('hero.artInteraction')"
            :aria-pressed="artworkPinned"
            @mouseenter="artworkHovered = true"
            @mouseleave="handleArtworkLeave"
            @focus="artworkFocused = true"
            @blur="artworkFocused = false"
            @click="artworkPinned = !artworkPinned"
            @pointermove="handleArtworkPointerMove"
          >
            <img
              src="/background.svg"
              alt=""
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              class="absolute inset-0 size-full object-cover object-center transition-all duration-700"
              :class="artworkActive ? 'scale-110 opacity-35' : 'scale-100 opacity-0'"
              aria-hidden="true"
            >
            <div
              class="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-gray-950/35"
              :class="artworkActive ? 'opacity-100' : ''"
              aria-hidden="true"
            />

            <!--
              La pieza es una cupula (`rounded-[45%_45%_2rem_2rem]`) con
              `overflow-hidden`, asi que la esquina superior izquierda recorta
              cualquier contenido colocado ahi. En movil el texto se centra y
              baja hasta donde la forma ya es ancha; desde `sm` la pieza es
              suficientemente grande para el ancla original en la esquina.
              «VA / 01» se oculta en movil porque la curva derecha lo tapaba
              por completo.
            -->
            <span class="absolute left-1/2 top-12 max-w-[62%] -translate-x-1/2 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-gray-500 sm:left-5 sm:top-5 sm:max-w-[55%] sm:translate-x-0 sm:text-left sm:tracking-[0.22em] dark:text-gray-400">
              {{ artworkActive ? t('hero.artActiveLabel') : t('hero.artHint') }}
            </span>
            <span class="absolute right-5 top-5 hidden font-mono text-[10px] text-gray-400 sm:block dark:text-gray-500">
              VA / 01
            </span>

            <div class="absolute inset-x-7 top-1/2 h-px bg-gray-300 dark:bg-white/15" />
            <div class="absolute inset-y-16 left-1/2 w-px bg-gray-300 dark:bg-white/15" />

            <div
              class="absolute left-[12%] top-[25%] size-28 rounded-full border border-primary-500/50 bg-primary-500/10 transition-all duration-700 sm:size-36"
              :class="artworkActive ? '-translate-x-4 -translate-y-3 scale-125 bg-primary-500/20' : ''"
            />
            <div
              class="absolute bottom-[17%] right-[8%] size-32 rounded-full border border-ambar-500/40 bg-ambar-500/10 transition-all duration-700 sm:size-40"
              :class="artworkActive ? 'translate-x-4 translate-y-3 scale-110 bg-ambar-500/20' : ''"
            />
            <div
              class="absolute right-[20%] top-[18%] size-3 rounded-full bg-primary-500 transition-transform duration-700"
              :class="artworkActive ? 'translate-x-8 translate-y-8 scale-150' : ''"
            />
            <div
              class="absolute bottom-[22%] left-[18%] size-2.5 bg-ambar-500 transition-transform duration-700"
              :class="artworkActive ? '-translate-x-5 -translate-y-6 rotate-45 scale-150' : ''"
            />

            <div class="absolute inset-0 flex items-center justify-center">
              <span
                class="translate-x-[0.08em] text-[clamp(8rem,18vw,13rem)] font-black leading-none tracking-[-0.17em] text-gray-950 transition-all duration-500 dark:text-white"
                :class="artworkActive ? 'scale-75 rotate-6 opacity-0 blur-sm' : 'scale-100 rotate-0 opacity-100 blur-0'"
              >
                VA
              </span>

              <div
                class="absolute flex size-32 items-center justify-center rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-2xl transition-all duration-700 sm:size-40 dark:border-white/15 dark:bg-gray-950/85"
                :class="artworkActive ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-12 opacity-0'"
              >
                <img
                  src="/logo-minimalista.svg"
                  alt=""
                  width="128"
                  height="128"
                  loading="lazy"
                  decoding="async"
                  class="size-full object-contain"
                  aria-hidden="true"
                >
              </div>
            </div>

            <div class="absolute inset-x-5 bottom-5 flex items-end justify-between border-t border-gray-300 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500 dark:border-white/15 dark:text-gray-400">
              <span>{{ t('hero.artContent') }}</span>
              <span>{{ t('hero.artTechnology') }}</span>
            </div>
          </button>
        </div>
      </div>

      <div
        class="grid border-y border-gray-300 bg-gray-50/70 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/15 dark:bg-gray-950/70"
      >
        <div class="p-4 sm:p-5 lg:border-r lg:border-gray-300 dark:lg:border-white/15">
          <span class="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">01 / {{ t('hero.proofLabel') }}</span>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {{ t('hero.proof') }}
          </p>
        </div>
        <div class="border-t border-gray-300 p-4 sm:border-l sm:border-t-0 sm:p-5 lg:border-l-0 lg:border-r dark:border-white/15 dark:lg:border-white/15">
          <span class="mb-1 block text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">{{ t('hero.metricValue') }}</span>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ t('hero.metricLabel') }}
          </p>
        </div>
        <div class="border-t border-gray-300 p-4 sm:p-5 lg:border-t-0 lg:border-r dark:border-white/15 dark:lg:border-white/15">
          <span class="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">02 / {{ t('hero.capabilityLabel') }}</span>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {{ t('hero.capabilityContent') }}
          </p>
        </div>
        <div class="border-t border-gray-300 p-4 sm:border-l sm:p-5 lg:border-l-0 lg:border-t-0 dark:border-white/15">
          <span class="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">03 / {{ t('hero.capabilityLabel') }}</span>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {{ t('hero.capabilityTech') }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
