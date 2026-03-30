// app/router.options.ts
//
// Configura el comportamiento de scroll del router para toda la app.
// Cuando una ruta tiene hash (#contact, #servicios, etc.), hace scroll
// suave al elemento con ese id, con offset para el header fijo.

import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, _from, savedPosition) {
    // Restaurar posición al navegar con back/forward del navegador
    if (savedPosition) {
      return savedPosition
    }

    // Scroll suave a hash — con offset para el header fijo (56px)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }

    // Cualquier otra navegación sube al top
    return { top: 0, behavior: 'smooth' }
  }
} satisfies RouterConfig
