export default defineAppConfig({
  ui: {
    colors: {
      // Color principal de la app. Debe coincidir con el nombre de la escala
      // definida en main.css (--color-marino-500 -> 'marino').
      //
      // 'marino' es el trazo frio del logotipo. El trazo calido ('ambar') se
      // aplica de forma explicita en los componentes, no como color primario:
      // reservarlo para acentos evita que compita con el azul en botones,
      // focos y estados, donde conviene una sola voz.
      //
      // La escala 'fucsia' anterior sigue definida en main.css por si hubiera
      // que revertir.
      primary: 'marino',
      // Escala de grises: 'slate', 'gray', 'zinc', 'neutral' o 'stone'.
      neutral: 'slate'
    }
  }
})
