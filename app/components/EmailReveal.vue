<script setup lang="ts">
const { t } = useI18n()
const revealed = ref(false)
const email = 'hola@vanemisarts.com'
</script>

<template>
  <div
    class="relative min-h-24 overflow-hidden rounded-full border transition-all duration-500"
    :class="revealed
      ? 'border-primary-500 bg-primary-500 text-white shadow-xl shadow-primary-500/20'
      : 'border-gray-300 bg-white/70 text-gray-900 dark:border-white/15 dark:bg-gray-900/70 dark:text-white'"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <button
        v-if="!revealed"
        key="reveal"
        type="button"
        class="group grid min-h-24 w-full grid-cols-[5rem_1fr] items-center gap-4 pr-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-500"
        :aria-label="t('contact.emailReveal.label')"
        @click="revealed = true"
      >
        <span class="flex size-20 items-center justify-center rounded-full border border-gray-300 bg-white text-primary-600 transition-all duration-500 group-hover:translate-x-2 group-hover:rotate-[-8deg] group-hover:border-primary-500 dark:border-white/15 dark:bg-gray-950 dark:text-primary-400">
          <UIcon
            name="i-heroicons-arrow-right"
            class="size-6 transition-transform duration-500 group-hover:translate-x-1"
          />
        </span>
        <span>
          <span class="block text-sm font-bold uppercase tracking-[0.14em]">
            {{ t('contact.emailReveal.label') }}
          </span>
          <span class="mt-1 block text-xs text-gray-500 dark:text-gray-400">
            {{ t('contact.emailReveal.hint') }}
          </span>
        </span>
      </button>

      <div
        v-else
        key="revealed"
        class="flex min-h-24 items-center justify-between gap-3 pl-6"
      >
        <a
          :href="`mailto:${email}`"
          class="min-w-0 break-all text-[clamp(1rem,3vw,1.75rem)] font-semibold underline decoration-white/50 underline-offset-4 transition-opacity hover:opacity-80 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {{ email }}
        </a>
        <button
          type="button"
          class="group flex size-20 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-primary-600 transition-transform duration-500 hover:-translate-x-2 hover:rotate-[-8deg] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          :aria-label="t('contact.emailReveal.hide')"
          @click="revealed = false"
        >
          <UIcon
            name="i-heroicons-arrow-left"
            class="size-6 transition-transform duration-500 group-hover:-translate-x-1"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>
