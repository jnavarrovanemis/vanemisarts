<script setup lang="ts">
defineProps<{
  index: string
  label: string
}>()
</script>

<template>
  <div class="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
    <span
      class="text-primary-600 dark:text-primary-400"
      aria-hidden="true"
    >
      {{ index }}
    </span>
    <span
      class="h-px w-7 bg-gray-300 dark:bg-white/20"
      aria-hidden="true"
    />
    <span class="text-gray-500 dark:text-gray-400">
      {{ label }}
    </span>
  </div>
</template>
