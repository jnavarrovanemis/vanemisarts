# ADR 0002: Adoptar la paleta del logotipo como sistema de color

- **Estado:** Aceptado e implementado
- **Fecha:** 2026-08-16
- **Responsables:** Equipo Vanemis Arts
- **Sustituye a:** la sección «paleta primaria fucsia con apoyo púrpura» del `ADR 0001`
- **Alcance:** `app.config.ts`, `main.css`, todos los componentes de sección

## Contexto

La aplicación declaraba `primary: 'fucsia'` (`#FF00AA`) y construía sus degradados sobre morado y rosa. Al extraer las paradas reales del gradiente de `public/logo-minimalista.svg` se comprobó que **ese color no procede del logotipo**.

El logotipo es una «V» formada por dos trazos de temperatura opuesta:

| Trazo | Paradas reales del SVG |
| :--- | :--- |
| **Frío** (izquierdo) | `#5BBBFF` → `#569CFF` → `#357FBB` → `#184E91` → `#10457A` → `#003167` → `#002C5E` |
| **Cálido** (derecho) | `#FAB33F` → `#FFAF42` → `#FA812C` → `#ED5C49` → `#E7404C` → `#A0146D` → `#84006C` |

El fucsia recogía únicamente el extremo magenta del trazo cálido e ignoraba por completo el azul y el ámbar, que ocupan la mayor parte de la marca. Consecuencias observadas:

- el favicon y la identidad de la página no se parecían entre sí;
- `og-image.png` ya usaba un fondo azul marino, de modo que la imagen social tampoco coincidía con la web;
- el par fucsia-morado es la combinación por defecto de buena parte de las landings de software, justo el efecto genérico que el ADR 0001 buscaba evitar.

## Decisión

Sustituir el sistema de color por dos escalas derivadas del logotipo, definidas en `main.css` dentro de `@theme static`:

- **`marino`** — trazo frío. Es el color primario de la aplicación (`primary: 'marino'`), de modo que botones, focos y estados heredan el azul de la marca.
- **`ambar`** — trazo cálido. **No** es un color primario: se aplica de forma explícita como acento. Reservarlo evita que compita con el azul en controles, donde conviene una sola voz.

Los tonos que corresponden a paradas reales del SVG van marcados con el comentario `/* logo */`. Se añadieron dos tonos calculados por accesibilidad: `marino-600` (`#2A6FA8`) y `ambar-700` (`#C4432C`), que son los primeros de cada escala que alcanzan contraste AA como texto sobre fondo claro.

La escala `fucsia` permanece definida en `main.css` para poder revertir sin recuperar valores.

## La dualidad como sistema, no como decoración

Los dos trazos del logotipo se corresponden con las dos disciplinas reales del estudio. El color pasa a comunicar esa división:

| Frío (`marino`) | Cálido (`ambar`) |
| :--- | :--- |
| Estrategia 360° | Video |
| Desarrollo web | Community management |
| Disciplina «Desarrollo e infraestructura» | Identidad de marca |
| Grupo de herramientas «Desarrollo» | Edición de podcast |
| | Disciplina «Contenido y comunidad» |
| | Grupo de herramientas «Marketing y contenido» |

Los degradados de titular recorren la marca completa, de frío a cálido —`from-marino-700 via-marino-500 to-ambar-500`—, replicando el recorrido del propio logotipo.

Se conservan los colores de marca de terceros en el mapa de herramientas de `Skills.vue`: el morado de Premiere Pro o el azul de Photoshop identifican productos ajenos y no forman parte del sistema de Vanemis Arts.

## Consecuencias

### Positivas

- La identidad de la página coincide por primera vez con el logotipo y con la imagen social.
- El color adquiere significado: la temperatura indica disciplina.
- Se abandona una combinación cromática genérica por una que no comparte ninguna otra marca.

### Negativas y riesgos

- El ámbar tiene un contraste bajo como texto: solo `ambar-700` en adelante es válido sobre fondo claro. Cualquier uso nuevo como texto debe verificarse.
- La escala `ambar` cambia de tono a lo largo del recorrido —ámbar, coral, magenta— en lugar de ser una progresión de luminosidad. Es fiel al logotipo, pero no se comporta como una escala de Tailwind convencional: conviene elegir los tonos mirándolos, no por analogía con otras escalas.
- La convivencia de dos acentos exige disciplina; si el ámbar se filtra a botones y focos, se pierde la lectura de la dualidad.

## Criterios de aceptación

- `primary` resuelve a `marino` y ningún componente referencia `fucsia`, `purple` o `pink` salvo el mapa de herramientas de terceros.
- Texto, foco y controles cumplen WCAG AA en ambos temas.
- La asignación frío/cálido es coherente entre Estudio, Equipo y Capacidades.
- La escala `fucsia` sigue definida y la reversión consiste en un único cambio en `app.config.ts` más la restitución de los degradados.
