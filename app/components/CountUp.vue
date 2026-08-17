<script setup lang="ts">
/**
 * Cifra que cuenta hacia arriba cuando entra en pantalla.
 *
 * El valor final se pinta desde el primer render y solo se sustituye por la
 * animacion una vez montado en cliente. Asi el HTML prerenderizado ya contiene
 * la cifra real: si el JavaScript falla o el usuario tiene el movimiento
 * reducido, se lee «14M+» y no un cero.
 */
const props = withDefaults(defineProps<{
  to: number
  suffix?: string
  duration?: number
}>(), {
  suffix: '',
  duration: 1200
})

const element = ref<HTMLElement | null>(null)
const current = ref(props.to)
const animating = ref(false)

let observer: IntersectionObserver | null = null
let frame = 0

function run() {
  let start = 0
  animating.value = true

  const step = (timestamp: number) => {
    start = start || timestamp
    const progress = Math.min((timestamp - start) / props.duration, 1)
    // easing cubico de salida: arranca rapido y frena al final
    current.value = Math.floor(props.to * (1 - Math.pow(1 - progress, 3)))

    if (progress < 1) {
      frame = requestAnimationFrame(step)
      return
    }

    current.value = props.to
    animating.value = false
  }

  frame = requestAnimationFrame(step)
}

onMounted(() => {
  if (!element.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined') return

  current.value = 0

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      observer?.disconnect()
      run()
    }
  }, { threshold: 0.4 })

  observer.observe(element.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <span ref="element">{{ current }}<template v-if="!animating || current === to">{{ suffix }}</template></span>
</template>
