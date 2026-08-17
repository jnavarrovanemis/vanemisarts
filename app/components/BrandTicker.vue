<script setup lang="ts">
/**
 * Separador en movimiento entre secciones.
 *
 * Las palabras se duplican en el marcado porque la animacion desplaza la pista
 * un 50 % de su ancho: al llegar al final, la segunda mitad ocupa exactamente
 * la posicion inicial de la primera y el bucle resulta invisible.
 *
 * El contenido es decorativo (`aria-hidden`): repite terminos que ya aparecen
 * como texto real en las secciones vecinas, asi que no aporta informacion nueva
 * a un lector de pantalla y evita ensuciar la lectura con la duplicacion.
 */
const props = withDefaults(defineProps<{
  /** Clave i18n con las palabras separadas por «·». */
  wordsKey?: string
  /** Invierte el sentido de la marcha. Util para alternar entre separadores. */
  reverse?: boolean
  /** Tono del acento del separador. */
  tone?: 'cool' | 'warm'
}>(), {
  wordsKey: 'ticker.words',
  reverse: false,
  tone: 'cool'
})

const { t } = useI18n()

const words = computed(() =>
  t(props.wordsKey)
    .split('·')
    .map(word => word.trim())
    .filter(Boolean)
)

const dotClass = computed(() =>
  props.tone === 'warm' ? 'bg-ambar-500' : 'bg-marino-500'
)
</script>

<template>
  <div
    class="brand-ticker-viewport relative overflow-hidden border-y border-gray-300 bg-white py-5 dark:border-white/15 dark:bg-gray-900"
    aria-hidden="true"
  >
    <div
      class="brand-ticker-track flex whitespace-nowrap text-gray-950 dark:text-white"
      :class="reverse ? 'brand-ticker-track--reverse' : ''"
    >
      <span
        v-for="(word, index) in [...words, ...words]"
        :key="`${word}-${index}`"
        class="inline-flex items-center gap-6 px-6 text-[clamp(1.35rem,3.2vw,2.6rem)] font-black uppercase leading-none tracking-[-0.03em]"
        :class="index % 2 ? 'brand-ticker-outline text-gray-400 dark:text-gray-500' : ''"
      >
        {{ word }}
        <span
          class="size-2 shrink-0 rounded-full"
          :class="dotClass"
        />
      </span>
    </div>
  </div>
</template>
