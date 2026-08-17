<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="brand-signature"
    class="relative isolate overflow-hidden border-y border-gray-300 bg-white py-16 selection:bg-primary-500/30 md:py-20 dark:border-white/15 dark:bg-gray-900"
    aria-labelledby="brand-signature-heading"
  >
    <NuxtImg
      src="/background.svg"
      alt=""
      class="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-center opacity-20 saturate-125 dark:opacity-35"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-white/70 dark:bg-gray-950/55"
      aria-hidden="true"
    />

    <UContainer>
      <div
        v-motion-slide-visible-once-bottom
        class="mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <div class="mb-7 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
          <span
            class="h-px w-8 bg-gray-300 dark:bg-white/20"
            aria-hidden="true"
          />
          <span>{{ t('brandSignature.label') }}</span>
          <span
            class="h-px w-8 bg-gray-300 dark:bg-white/20"
            aria-hidden="true"
          />
        </div>

        <div class="mb-7 flex size-28 items-center justify-center rounded-[2rem] border border-gray-300 bg-white/80 p-4 shadow-xl shadow-gray-950/10 backdrop-blur-md md:size-32 md:rounded-[2.25rem] dark:border-white/15 dark:bg-gray-950/75 dark:shadow-black/30">
          <NuxtImg
            src="/logo-minimalista.svg"
            alt=""
            width="112"
            height="112"
            class="size-full object-contain"
            aria-hidden="true"
          />
        </div>

        <h2
          id="brand-signature-heading"
          class="text-balance text-[clamp(3.5rem,9vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.07em] text-gray-950 dark:text-white"
        >
          Vanemis
          <span class="block bg-linear-to-r from-primary-600 via-purple-600 to-orange-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-purple-400 dark:to-orange-400">
            Arts
          </span>
        </h2>

        <p class="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300">
          {{ t('brandSignature.statement') }}
        </p>
      </div>
    </UContainer>
  </section>
</template>
