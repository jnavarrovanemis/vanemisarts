export default defineAppConfig({
  ui: {
    colors: {
      // 1. Aquí eliges cuál de tus 3 colores será el PRINCIPAL de la app.
      // Debe coincidir con el nombre en tu CSS (ej: --color-fucsia-500 -> 'fucsia')
      primary: 'fucsia',
      // 2. Aquí defines la escala de grises.
      // Puedes usar 'slate', 'gray', 'zinc', 'neutral', 'stone'.
      neutral: 'slate'
    }
  }
})
