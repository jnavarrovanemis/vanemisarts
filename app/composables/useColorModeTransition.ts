// composables/useColorModeTransition.ts
//
// Stack: @nuxt/ui + @vueuse/core
//
// @nuxt/ui usa `useColorMode` de VueUse internamente y aplica
// la clase `.dark` en <html> de forma síncrona cuando el usuario
// cambia el modo. Interceptamos el setter de `colorMode.preference`
// para envolver el cambio en document.startViewTransition().

import { onUnmounted } from 'vue'

export function useColorModeTransition() {
  if (import.meta.server) return

  const colorMode = useColorMode()

  const descriptor = Object.getOwnPropertyDescriptor(colorMode, 'preference')
  if (!descriptor?.set) return

  const originalSet = descriptor.set.bind(colorMode)
  let active = false

  Object.defineProperty(colorMode, 'preference', {
    ...descriptor,
    set(value: string) {
      if (active || !document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        originalSet(value)
        return
      }

      active = true
      document.startViewTransition(() => {
        originalSet(value)
      }).finished.finally(() => {
        active = false
      })
    }
  })

  onUnmounted(() => {
    Object.defineProperty(colorMode, 'preference', descriptor)
  })
}
