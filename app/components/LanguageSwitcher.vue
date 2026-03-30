<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { lockOpen, unlock } = useHeaderState()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

type LocaleInfo = {
  code: string
  name?: string
  icon?: string
}

const currentLocale = computed(() => {
  return (locales.value as LocaleInfo[]).find(l => l.code === locale.value)
})

const open = () => {
  isOpen.value = true
  lockOpen()
}

const close = () => {
  isOpen.value = false
  unlock()
}

const toggle = () => (isOpen.value ? close() : open())

const onOutsideClick = (e: MouseEvent) => {
  if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) close()
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onOutsideClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onOutsideClick)
  document.removeEventListener('keydown', onKeydown)
  if (isOpen.value) unlock()
})
</script>

<template>
  <div
    ref="triggerRef"
    class="relative"
  >
    <button
      type="button"
      :aria-label="currentLocale?.name"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      class="flex items-center justify-center p-2 rounded-full
             transition-colors duration-200 border border-transparent
             hover:bg-neutral-100 dark:hover:bg-neutral-800
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
      :class="{ 'bg-neutral-100 dark:bg-neutral-800': isOpen }"
      @click.stop="toggle"
    >
      <Icon
        :name="currentLocale?.icon ?? `circle-flags:${currentLocale?.code}`"
        class="w-5 h-5 rounded-full"
      />
    </button>

    <Transition name="dd">
      <div
        v-if="isOpen"
        role="listbox"
        aria-label="Seleccionar idioma"
        class="absolute right-0 mt-2 z-99999
               bg-white dark:bg-neutral-900
               rounded-xl shadow-2xl
               border border-neutral-100 dark:border-neutral-700
               py-1 w-max min-w-40"
      >
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          role="option"
          :aria-selected="l.code === locale"
          class="flex items-center gap-3 px-4 py-2.5 text-sm
                 transition-colors whitespace-nowrap
                 hover:bg-neutral-50 dark:hover:bg-neutral-800"
          :class="l.code === locale
            ? 'text-primary-600 dark:text-primary-400 font-semibold bg-neutral-50/50 dark:bg-neutral-800/30'
            : 'text-neutral-700 dark:text-neutral-300'"
          @click="close"
        >
          <Icon
            :name="(l.icon ?? `circle-flags:${l.code}`) as string"
            class="w-5 h-5 shrink-0 rounded-full"
          />
          <span>{{ l.name }}</span>
          <Icon
            v-if="l.code === locale"
            name="heroicons:check-20-solid"
            class="ml-auto pl-3 w-4 h-4 text-primary-500"
          />
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dd-enter-active { transition: opacity 160ms ease, transform 160ms ease; }
.dd-leave-active { transition: opacity 120ms ease, transform 120ms ease; }
.dd-enter-from,
.dd-leave-to { opacity: 0; transform: scale(0.95) translateY(-4px); }
.dd-enter-to,
.dd-leave-from { opacity: 1; transform: scale(1) translateY(0); }
</style>
