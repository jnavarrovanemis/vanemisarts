// composables/useSmoothScroll.ts

export const useSmoothScroll = (defaultOffset = 80) => {
  const scrollTo = (id: string, customOffset?: number) => {
    // Si no pasas un offset personalizado, usa el de por defecto (80)
    const offset = customOffset ?? defaultOffset

    const el = document.getElementById(id)
    if (!el) {
      console.warn(`Elemento con id "${id}" no encontrado.`)
      return
    }

    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return {
    scrollTo
  }
}
