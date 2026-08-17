# ADR 0001: Adoptar un lienzo editorial técnico para el hero

- **Estado:** Aceptado e implementado
- **Fecha:** 2026-08-16
- **Implementado:** 2026-08-16
- **Responsables:** Equipo Vanemis Arts
- **Referencia visual:** Jan Blunár — Interaction Designer & Design Lead, blunar.cz
- **Alcance inicial:** `HomeHero.vue`, estilos globales y encabezados de sección

## Enmienda: preservar la firma visual de Vanemis Arts *(superada — ver «Enmienda: fusión de las dos cabeceras»)*

Tras implementar el hero editorial se decidió conservar el lockup original como un segundo momento de marca. La transición entre el hero y la sección Estudio muestra `logo-minimalista.svg`, el wordmark “Vanemis Arts” y una versión atenuada de `background.svg`. Esto mantiene reconocible el sistema visual previo sin devolver al hero a su composición anterior ni competir con su propuesta de valor.

## Enmienda: fusión de las dos cabeceras en un único hero

- **Fecha:** 2026-08-16
- **Sustituye a:** «Enmienda: preservar la firma visual de Vanemis Arts»

La enmienda anterior conservaba el lockup original como un segundo momento de marca, en la sección `HomeBrandSignature`. En la revisión visual se comprobó que el resultado eran **dos cabeceras consecutivas**: el hero editorial y, justo debajo, una segunda pantalla presidida por el wordmark a tamaño completo. El visitante recibía dos veces la misma presentación antes de llegar a contenido nuevo, y el hero perdía la tensión que justificaba su composición asimétrica.

### Decisión

Fusionar ambos momentos en un único hero. La presencia de marca no se elimina: se redistribuye en dos registros de escala opuesta.

1. **Lockup de identidad** — el logotipo y el wordmark pasan a la franja superior del hero, a escala de firma, junto a la disciplina del estudio. Es la zona 1 de identidad que ya preveía la decisión original y que hasta ahora estaba vacía.
2. **Wordmark ambiental** — la escala gigante que tenía `BrandSignature` se traslada al fondo en movimiento: «Vanemis Arts» recorre el hero en un riel de deriva lenta, a opacidad muy baja. La marca conserva su presencia monumental sin ocupar una pantalla propia.

### Movimiento del fondo

El fondo del hero pasa a tener tres capas con velocidades distintas, para dar profundidad sin recurrir a halos desenfocados —explícitamente descartados en la decisión original—:

| Capa | Elemento | Duración |
| :--- | :--- | :--- |
| Frontal | Palabras clave del estudio, sentido inverso | 34 s |
| Media | Wordmark «Vanemis Arts» | 52 s |
| Fondo | Retícula editorial, deriva diagonal | 45 s |

Las tres respetan `prefers-reduced-motion: reduce`, que las detiene por completo.

### Consecuencias

- Se elimina `app/components/Home/BrandSignature.vue` y su bloque `brandSignature` en los tres archivos de i18n.
- El primer viewport gana el espacio de una pantalla completa: el visitante llega antes a la sección Estudio.
- La identidad de marca aparece ahora dos veces en el hero a escalas deliberadamente distintas —firma y ambiente—, lo que refuerza el reconocimiento sin repetir el mismo bloque.
- El fondo en movimiento responde a la referencia visual sin importar recursos ajenos: el material animado es el propio wordmark de Vanemis Arts.

### Pendiente relacionado

La decisión original fija «paleta primaria fucsia con apoyo púrpura». Al extraer las paradas de gradiente de `logo-minimalista.svg` se comprobó que el logotipo es **azul** (`#5BBBFF` → `#003167`) y **ámbar-coral-magenta** (`#FAB33F` → `#84006C`), y que el fucsia `#FF00AA` solo recoge el extremo magenta. La revisión de la paleta se documentará en un ADR propio.

## Enmienda: interacción y movimiento expresivo

El lenguaje editorial incorpora tres patrones dinámicos inspirados en la referencia, adaptados a recursos propios:

- movimiento ambiental lento de palabras clave detrás del hero;
- una pieza focal que responde a la posición del puntero y cambia del monograma `VA` al logotipo real mediante hover, foco o toque;
- una cápsula de contacto que revela el correo solo cuando el visitante lo solicita.

Las interacciones no esconden información necesaria para completar el formulario, son operables por teclado, funcionan sin hover en pantallas táctiles y respetan `prefers-reduced-motion`.

## Contexto

La landing actual presenta el hero mediante una composición centrada con degradados, halos desenfocados, ruido, badge, titular y CTA. La solución es funcional, pero emplea patrones visuales frecuentes en landing pages tecnológicas y no comunica con suficiente claridad la combinación particular de Vanemis Arts: estrategia, contenido, diseño y desarrollo.

La página de referencia destaca por:

- una retícula técnica tenue que da estructura sin competir con el contenido;
- una composición editorial asimétrica, con información distribuida en el lienzo;
- tipografía sans serif sobria y una jerarquía basada en escala, peso y espacio;
- numeración y etiquetas pequeñas que funcionan como sistema visual;
- una franja inferior que resume propuesta, experiencia y especialidades;
- bordes finos, cápsulas y módulos en lugar de sombras o tarjetas elevadas;
- color usado como señal puntual, no como relleno dominante;
- proyectos presentados como casos narrativos de gran formato, no como una rejilla genérica de tarjetas.

Estos recursos hacen que la referencia se sienta precisa, memorable y cercana al diseño de producto. Sin embargo, su retrato central, sus gráficos, sus animaciones y su identidad cromática son específicos de otra marca y no deben reproducirse.

## Decisión

Adoptaremos un lenguaje de **lienzo editorial técnico** y lo aplicaremos primero al hero. El cambio reemplazará la composición centrada y los efectos ambientales actuales por una estructura asimétrica apoyada en una retícula sutil.

El nuevo hero tendrá cinco zonas:

1. **Identidad:** logotipo o nombre de Vanemis Arts en la esquina superior izquierda, acompañado por una descripción breve de la disciplina.
2. **Disponibilidad y navegación:** controles existentes en la zona superior, con un CTA de contacto en forma de cápsula y un indicador de estado.
3. **Mensaje principal:** titular alineado a la izquierda, con un ancho editorial y una escala fluida. El contenido deberá explicar primero el resultado que obtiene el cliente y después las capacidades del equipo.
4. **Pieza focal propia:** composición gráfica basada en formas, tipografía o material de marca de Vanemis; no se usará un retrato ni un recurso extraído de la referencia.
5. **Franja de evidencia:** resumen inferior con propuesta breve, una métrica verificable y dos grupos de capacidades, separados por líneas finas.

La numeración editorial se extenderá a los encabezados de las secciones principales mediante etiquetas como `01 / Estudio`, `02 / Equipo`, `03 / Capacidades` y `04 / Contacto`. La numeración será decorativa y no sustituirá títulos semánticos ni navegación accesible.

## Dirección visual

### Se adopta de la referencia

- retícula de fondo de bajo contraste;
- composición asimétrica y modular;
- jerarquía editorial con microetiquetas y grandes titulares;
- bordes de 1 px y módulos planos;
- CTA de disponibilidad con indicador de estado;
- franja inferior de evidencia;
- numeración como hilo conductor entre secciones;
- movimiento funcional y discreto.

### Se conserva de Vanemis Arts

- nombre, logotipo y tono de comunicación;
- paleta primaria fucsia con apoyo púrpura;
- `Public Sans` como tipografía base en la primera iteración;
- soporte completo de modo claro y oscuro;
- contenido localizado en español, inglés y portugués;
- navegación, transición de tema y flujo de contacto existentes;
- accesibilidad y respeto por `prefers-reduced-motion`.

### Se descarta explícitamente

- copiar el retrato, los gráficos, iconos o imágenes de Blunar;
- replicar su layout píxel por píxel;
- importar Space Grotesk únicamente para parecerse a la referencia;
- añadir animaciones 3D pesadas o dependencias para lograr el cambio;
- convertir toda la página en una reproducción monocromática;
- usar métricas, clientes o casos que no estén verificados o autorizados.

## Especificación inicial

### Retícula

- Implementarla con gradientes CSS, sin imágenes adicionales.
- Usar dos escalas: una trama fina y otra principal.
- Mantenerla entre 4 % y 9 % de opacidad según el tema.
- Asegurar que desaparezca o se simplifique en dispositivos pequeños si reduce la legibilidad.

### Color y superficies

- Fondo claro: gris casi blanco, no blanco puro.
- Fondo oscuro: gris carbón, no negro puro.
- Texto principal con contraste mínimo WCAG AA.
- Fucsia como acento para estado, foco, palabras clave o pequeños marcadores.
- Púrpura como acento secundario; no usar degradado en todo el titular.
- Eliminar del hero los dos halos desenfocados y el filtro SVG de ruido.

### Tipografía

- Titular con `clamp()` y un máximo aproximado de 4 líneas en móvil y 3 en escritorio.
- Cuerpo entre 16 y 20 px, con ancho de lectura de 55–65 caracteres.
- Microetiquetas entre 11 y 13 px, nunca como único vehículo de información importante.
- Evitar mayúsculas prolongadas; reservarlas para etiquetas cortas.

### Movimiento

- Entrada escalonada de texto, pieza focal y franja inferior mediante opacidad y desplazamientos cortos.
- Duración objetivo de 250–500 ms.
- Sin rebote permanente en el indicador de scroll.
- Con `prefers-reduced-motion: reduce`, mostrar el estado final sin desplazamientos ni animaciones continuas.

### Responsive

- En escritorio, composición de 12 columnas con mensaje y pieza focal en tensión asimétrica.
- En tableta, reducir la pieza focal y preservar la jerarquía del mensaje.
- En móvil, ordenar identidad, mensaje, CTA, pieza focal y evidencia en una sola columna.
- La franja inferior se convertirá en una lista de dos columnas o una pila; no tendrá scroll horizontal obligatorio.

## Alcance de implementación

### Primera iteración

- `app/components/Home/Hero.vue`: nueva composición y eliminación de efectos reemplazados.
- `app/assets/css/main.css`: tokens para retícula, borde editorial, superficie y escala tipográfica.
- `i18n/locales/{es,en,pt}.json`: microcopy del CTA, propuesta breve y etiquetas de capacidades.
- Componentes de sección: añadir el patrón de numeración en sus encabezados sin alterar todavía su contenido.

### Fuera de alcance

- rediseño completo de Team, Skills y Contact;
- creación o publicación de casos de éxito;
- cambio de marca, logotipo o paleta primaria;
- compra de tipografías o producción de fotografía;
- modificación del flujo del formulario de contacto.

## Alternativas consideradas

### Mantener el hero actual y añadir solo la retícula

Se descarta porque sería un cambio cosmético superficial. La debilidad principal está en la composición centrada y en la falta de una jerarquía propia, no únicamente en el fondo.

### Replicar la composición con retrato central

Se descarta porque acercaría demasiado la solución a la identidad de la referencia y haría depender el resultado de una sesión fotográfica consistente. Además, una agencia de dos disciplinas se representa mejor con una pieza gráfica propia que con una sola persona como protagonista.

### Rediseñar toda la landing en una sola entrega

Se descarta para reducir riesgo visual y técnico. El hero permite validar el nuevo lenguaje antes de propagarlo a casos, equipo y contacto.

### Adoptar Space Grotesk y una estética monocromática completa

Se descarta porque cambiar tipografía y paleta al mismo tiempo dificultaría determinar qué decisión mejora realmente la percepción. `Public Sans` puede sostener la dirección editorial y conserva continuidad de marca.

## Consecuencias

### Positivas

- una primera impresión más distintiva y menos dependiente de tendencias de “gradiente + glow”;
- mejor lectura de la propuesta de valor y de las dos capacidades del estudio;
- sistema visual reutilizable en equipo, servicios y futuros casos;
- menor carga de efectos decorativos en el hero;
- más espacio para evidencia verificable cerca del primer viewport.

### Negativas y riesgos

- la retícula y las microetiquetas pueden generar ruido si el contraste no se calibra;
- una composición asimétrica exige más pruebas responsive que el layout centrado actual;
- la franja de evidencia pierde credibilidad si se llena con métricas genéricas;
- extender la numeración sin disciplina puede volver la interfaz excesivamente técnica;
- el contraste de bordes y acentos deberá probarse por separado en ambos temas.

## Criterios de aceptación

La decisión se considerará implementada cuando:

- el hero use una composición asimétrica en escritorio y una secuencia clara en móvil;
- los halos desenfocados, el ruido SVG y el rebote permanente hayan sido retirados del hero;
- la retícula sea CSS, no bloquee interacción y no añada solicitudes de red;
- el contenido principal y el CTA sean visibles sin scroll a 360 × 800 y 1280 × 720;
- ninguna línea de texto o módulo provoque desbordamiento horizontal entre 320 y 1440 px;
- texto, CTA, foco y controles cumplan WCAG AA;
- el diseño sea utilizable con `prefers-reduced-motion`;
- los tres idiomas mantengan la jerarquía sin recortes;
- Lighthouse no registre una regresión mayor a 3 puntos en Performance o Accessibility respecto de la versión anterior, usando el mismo entorno de medición;
- la pieza focal y todos los recursos sean propios de Vanemis Arts o tengan licencia documentada;
- una revisión interna confirme que la página evoca precisión editorial sin confundirse con una copia de Blunar.

## Plan de validación

1. Crear el hero detrás de una rama o preview deploy.
2. Comparar capturas en 360 × 800, 768 × 1024 y 1280 × 720, en claro y oscuro.
3. Probar español, inglés y portugués en los tres tamaños.
4. Ejecutar lint, typecheck y build.
5. Ejecutar Lighthouse sobre la versión actual y el preview bajo las mismas condiciones.
6. Realizar una prueba breve con cinco usuarios: después de cinco segundos, preguntar qué ofrece Vanemis Arts y cuál sería el siguiente paso.
7. Aceptar el cambio si al menos cuatro identifican la oferta combinada y el CTA, sin describir el sitio como una copia de la referencia.

## Notas de implementación

Conviene encapsular la franja inferior y la etiqueta numerada como componentes pequeños solo si aparecen en dos o más secciones. En la primera iteración pueden permanecer dentro de `HomeHero.vue` para evitar abstracciones prematuras.

La métrica del primer viewport debe salir de información ya verificada. Si aún no existe una cifra autorizada, se mostrará una afirmación cualitativa concreta antes que un número provisional.

<!-- Fin del ADR -->
