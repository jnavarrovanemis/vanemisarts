<script setup lang="ts">
/**
 * Cursor personalizado: un pincel cuya punta sigue al raton al instante y un
 * anillo que lo persigue con retardo. El anillo crece sobre elementos
 * interactivos.
 *
 * Decisiones:
 * - Se monta solo si el dispositivo tiene puntero fino (`pointer: fine`), de
 *   modo que no aparece en tactiles ni consume trabajo en movil.
 * - Respeta `prefers-reduced-motion`: si esta activo, no se monta.
 * - Solo oculta el cursor nativo cuando este componente esta activo (puntero
 *   fino y sin reduccion de movimiento). Tactil, teclado y reduced motion
 *   conservan el comportamiento nativo.
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
    // La punta superior de las cerdas es el punto de accion exacto del puntero.
    // El SVG esta anclado en (50 %, 1.5 %), donde comienza el pincel.
    dot.value.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -1.5%) rotate(-28deg)`
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
  document.documentElement.classList.add('has-art-cursor')
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
  document.documentElement.classList.remove('has-art-cursor')
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
      <svg
        ref="dot"
        class="app-cursor-brush"
        viewBox="0 0 26 46"
        aria-hidden="true"
      >
        <!-- Cerda caligrafica: una punta definida y cuerpo ligeramente curvo. -->
        <path d="M13 1C17.4 3.5 20.1 7.2 21 12.8l-5.2 7.4h-5.6L5 12.8C5.9 7.2 8.6 3.5 13 1Z" />
        <!-- Dos virolas separadas evocan el pincel de la referencia. -->
        <path d="M10.1 21.8h5.8l1.5 3.4H8.6Z" />
        <path d="M8.1 27h9.8l1.8 3.8H6.3Z" />
        <!-- Mango largo, afinado y con remate redondeado. -->
        <path d="M8.5 32.2h9l3.2 10.8c.5 1.8-.5 3-2 3H7.3c-1.5 0-2.5-1.2-2-3Z" />
        <path
          class="app-cursor-brush__shine"
          d="M12.2 4.4c2.4 2 3.9 4.4 4.4 7.6l-1.5 2.1h-1.7Z"
        />
      </svg>
    </div>
  </ClientOnly>
</template>
