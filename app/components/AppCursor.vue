<script setup lang="ts">
/**
 * Cursor personalizado: un punto que sigue al raton al instante y un anillo que
 * lo persigue con retardo. El anillo crece sobre elementos interactivos.
 *
 * Decisiones:
 * - Se monta solo si el dispositivo tiene puntero fino (`pointer: fine`), de
 *   modo que no aparece en tactiles ni consume trabajo en movil.
 * - Respeta `prefers-reduced-motion`: si esta activo, no se monta.
 * - No oculta el cursor nativo: se superpone. Ocultarlo penaliza a quien navega
 *   con lupa o con ajustes de puntero del sistema.
 * - La deteccion de elementos interactivos usa delegacion sobre `document`, asi
 *   que funciona con contenido que aparece despues (formularios, popovers).
 */
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const enabled = ref(false)

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label'

let frame = 0
let pointerX = 0
let pointerY = 0
let ringX = 0
let ringY = 0

function onPointerMove(event: PointerEvent) {
  pointerX = event.clientX
  pointerY = event.clientY

  if (dot.value) {
    dot.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
  }

  // El bucle solo existe mientras el anillo tiene que alcanzar al puntero.
  if (!frame) frame = requestAnimationFrame(loop)
}

function onPointerOver(event: PointerEvent) {
  const target = event.target as HTMLElement | null
  ring.value?.classList.toggle(
    'app-cursor-ring--grow',
    Boolean(target?.closest?.(INTERACTIVE))
  )
}

function loop() {
  // Interpolacion simple: el anillo recorre un 16 % de la distancia restante
  // en cada fotograma, lo que produce el retardo elastico sin libreria.
  const dx = pointerX - ringX
  const dy = pointerY - ringY

  ringX += dx * 0.16
  ringY += dy * 0.16

  if (ring.value) {
    ring.value.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
  }

  // Antes esto se reprogramaba siempre, asi que el bucle corria a 60 fps
  // durante toda la visita aunque el raton llevara minutos quieto: trabajo
  // constante en el hilo principal compitiendo con el scroll y con cualquier
  // interaccion. Ahora se detiene en cuanto el anillo alcanza al puntero y
  // `onPointerMove` lo vuelve a arrancar al primer movimiento.
  if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
    frame = 0
    return
  }

  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!finePointer || reducedMotion) return

  enabled.value = true
  pointerX = window.innerWidth / 2
  pointerY = window.innerHeight / 2
  ringX = pointerX
  ringY = pointerY

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerover', onPointerOver, { passive: true })
  // El bucle arranca solo con el primer movimiento del puntero.
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerover', onPointerOver)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <ClientOnly>
    <div v-if="enabled">
      <div
        ref="ring"
        class="app-cursor-ring"
        aria-hidden="true"
      />
      <div
        ref="dot"
        class="app-cursor-dot"
        aria-hidden="true"
      />
    </div>
  </ClientOnly>
</template>
