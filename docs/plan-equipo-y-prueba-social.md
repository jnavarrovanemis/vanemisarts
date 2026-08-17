# Vanemis Arts — Diagnóstico y plan de contenido (v3)

**Proyecto:** `vanemis-landingpage` (Nuxt 4 · vanemis.art)
**Fecha:** 16 de agosto de 2026
**Alcance aprobado:** Sección Equipo · Caso de éxito con métricas · Stats reales en About

> **Novedad en v3:** el contrato de José con Global Talent Connections cambia el plan. Berme-Go y Recoautos salen de la web, y su perfil público queda en pausa. Ver sección 2.

## Decisiones tomadas

- **Nombres y caras.** Dos tarjetas con foto, nombre, rol y trayectoria. Los casos se atribuyen a quien los hizo.
- **Trayectoria continua.** Sin bloques «Antes de Vanemis» / «En Vanemis».
- **Componente sobre un array de personas**, para poder sumar colaboradores después.
- **⚠️ El perfil público de José queda en pausa** hasta resolver la Cláusula Décima. Se avanza con todo lo demás.

---

## 2. ⚠️ Restricciones contractuales — leer primero

*No es asesoría legal. Es la lectura del texto del contrato firmado el 13 de mayo de 2026 con Global Talent Connections, vigente desde el 18 de mayo de 2026.*

### 2.1. Berme-Go y Recoautos no pueden aparecer en la web

Ambos llegaron vía GTC. Tres cláusulas convergen:

| Cláusula | Qué dice | Efecto |
|---|---|---|
| Políticas de Asociados, punto 6 | El material e información de clientes es de uso exclusivo para el servicio; prohibido compartirlo sin autorización del cliente | Un portafolio es un uso distinto del servicio |
| Confidencialidad, Cuarta | La información es confidencial aunque no esté marcada como tal, e incluye lo «razonablemente identificable como confidencial» | Anonimizar no basta si el cliente sigue siendo deducible |
| Confidencialidad, Séptima y Décima | La información es propiedad de GTC o sus clientes, y la obligación sobrevive a la terminación del contrato | No caduca al terminar la relación |

**La carga de la prueba es de José.** La Cláusula Quinta lista las excepciones (conocimiento previo, desarrollo independiente, autorización escrita), pero cierra diciendo que en caso de duda es el mandatario quien debe demostrar que está dentro de ellas.

**Pendiente de confirmar:** si los proyectos de WordPress y WooCommerce también llegaron por GTC. Si son independientes y anteriores a mayo de 2026, sí pueden mencionarse como capacidad —sin nombrar clientes— por la excepción de conocimiento previo.

### 2.2. Cláusula Décima — Exclusividad Operativa

Es el punto que condiciona todo lo demás. José se compromete a no mantener simultáneamente ningún otro vínculo de prestación de servicios con terceros, y toda actividad paralela debe ser **notificada por escrito y aprobada expresamente** por GTC. Sanciones previstas si se detecta sin autorización: deducción del 100% del siguiente pago mensual, suspensión inmediata sin derecho a reclamo y registro interno de la causa.

Vanemis Arts es una actividad paralela. Publicar una web indexada con nombre, cara y cargo de cofundador convierte una situación discreta en una comprobable.

**Decisión tomada:** resolver la autorización antes de publicar el perfil de José. El resto del plan avanza.

### 2.3. Lo que sí puede publicarse de José, cuando llegue el momento

Su competencia profesional es suya y no es información confidencial de nadie. La línea divisoria está entre **capacidad** y **encargo**:

- ✅ «Desarrollo dashboards de gestión a medida con Nuxt y Supabase, con seguridad a nivel de fila»
- ❌ «Construí el módulo de facturación y albaranes de una plataforma de gestión de flotas»

Lo primero describe lo que sabe hacer. Lo segundo describe un trabajo concreto para un cliente concreto, y es exactamente lo que cubre el punto 6 de las Políticas.

Además, hay dos piezas que son **propiedad de Vanemis Arts** y no tienen ninguna restricción: esta misma landing y el esquema PostgreSQL interno de la agencia. Ambas son técnicamente sólidas y suficientes para sostener su tarjeta.

### 2.4. Dubraska es un caso aparte

Este contrato es de José y no la afecta. Su trabajo en Inmperson fue vía Efiempresa, así que habría que revisar lo que ella tenga firmado con Efiempresa antes de publicar el caso con nombre. Es un documento distinto que no tenemos.

---

## 3. Diagnóstico técnico de la landing

### Lo que ya está bien resuelto

Nuxt 4 con `compatibilityVersion: 4`, i18n en tres idiomas con `prefix_except_default`, SEO module, `@nuxt/image` con WebP, prerender de `/`, motion en scroll, dark mode con transición propia. El formulario de contacto es el punto más maduro: Zod compartido cliente/servidor, dos pasos, persistencia en Supabase vía `service_role` y notificación por Resend.

### Huecos de contenido

**Hueco 1 — No hay nadie.** Ninguna sección presenta al equipo.

**Hueco 2 — Los números están muy por debajo de la realidad.** `AboutMe.vue` muestra `2+` años, `5+` marcas, `1000+` piezas, `1M+` alcance. Solo los datos de Dubraska ya son 6.370 piezas y 14,33M de impresiones.

**Hueco 3 — Cero prueba social.** `Projects.vue` existe con sus claves i18n completas en los tres idiomas, pero **nunca se importa en `index.vue`**.

**Hueco 4 — El caso Inmperson no aparece.**

**Hueco 5 — La mitad técnica de la agencia es invisible.** De las 18 herramientas de Skills, solo dos son de desarrollo (Nuxt y WordPress). No aparecen Docker, Supabase, PostgreSQL, Node, NestJS ni n8n.

### Deuda técnica menor

| Hallazgo | Dónde | Impacto |
|---|---|---|
| El nav «Servicios» apunta a `#hero`, no a los pilares | `HeaderNav.vue:215` | El usuario hace clic en Servicios y no ve servicios |
| `Projects.vue` huérfano con i18n en 3 idiomas ya escrito | `app/components/Home/` | Trabajo hecho sin usar |
| `main.css` pinta el body `bg-azul-50/950`, pero las secciones lo tapan con `bg-gray-50/950` | `main.css` vs. componentes | La paleta azul nunca se ve; código muerto |
| `primary: 'fucsia'` pero los degradados están hardcodeados a `purple-600`/`pink-600` | `app.config.ts` vs. Hero/About | Cambiar el color de marca no cambiaría nada |
| `README.md` sigue siendo el del starter de Nuxt | raíz | El repo es público |
| Sin datos estructurados `Organization`/`Person` | `app.vue` | Se pierde el rich snippet en Google |

---

## 4. Perfil de Dubraska — listo para publicar

> **Dubraska Ruiz** — Community Management y producción audiovisual
>
> Publicista y Mercadóloga (T.S.U. en Publicidad y Mercadeo, IUT «Antonio Ricaurte», 2015). Seis años gestionando estrategias de marketing, con especialización en video vertical y crecimiento de comunidades.
>
> **Stack:** Metricool · YouTube Studio · Premiere Pro · DaVinci Resolve · CapCut · Photoshop · Lightroom · Canva Pro · Adobe Podcast
>
> **Trayectoria:** Community Manager y Editora de Video en Efiempresa (desde enero 2025) · Community Manager en IM Agencies, 3 cuentas simultáneas (2024) · Social Media Manager en Sisprot Global Fiber (2024) · Analista de Gestión Comunicacional en Agrobueyca, 4 años (2020–2024)
>
> **Además:** fotografía y retoque, personal branding, organización de eventos. Inglés B2.

---

## 5. Perfil de José — versión reducida, en pausa

Reescrito sin encargos de clientes. Todo lo que queda es capacidad propia o trabajo de Vanemis Arts.

> **José Alejandro Navarro** — Cofundador · Desarrollo y arquitectura técnica
>
> Ingeniero de Sistemas y desarrollador full-stack con más de 5 años construyendo plataformas web a medida. Diseña la arquitectura completa de un producto: base de datos, interfaz, servidor y despliegue.
>
> **Frontend:** Vue.js · Nuxt.js (incl. Nuxt 4) · Next.js · Tailwind CSS · TypeScript
> **Backend y datos:** Node.js · NestJS · C# · PostgreSQL · Supabase (Auth, RLS)
> **Infraestructura:** Docker · Ubuntu Server · Cloudflare
> **Automatización:** n8n · integración de LLMs
> **CMS:** WordPress a medida — temas y plugins propios, CPTs, ACF, WooCommerce
> **Diseño:** Affinity Designer y Publisher

**Trabajo propio de Vanemis Arts, publicable sin restricción:**

- **Sistema interno de la agencia** — esquema PostgreSQL multi-tenant: 10 tablas, 7 ENUMs tipados, Row Level Security por rol (admin / colaborador / cliente), tres funciones RPC `SECURITY DEFINER` y auditoría inmutable del flujo de aprobación de contenido.
- **Esta misma web** — landing multi-idioma con SEO técnico, captura de leads de punta a punta, validación Zod compartida cliente/servidor, verificación de registros MX del dominio y bloqueo de correos desechables.

Es menos vistoso que nombrar plataformas, pero sigue siendo bueno: RLS a nivel de base de datos y auditoría inmutable son decisiones de arquitectura que casi ninguna agencia pequeña toma, y aquí están verificables en el repo.

**Nota sobre el título.** «Cofundador y Director Tecnológico (CTO)» puede leerse como inflado en una agencia de dos personas. «Cofundador · Desarrollo y arquitectura técnica» dice lo mismo sin abrir esa duda. Con la Cláusula Décima pendiente, el perfil bajo además juega a favor.

---

## 6. Caso de éxito: Inmperson Real Estate

**Contexto:** 19 meses de gestión integral — estrategia, edición, programación y análisis — para una inmobiliaria en España.

### KPIs de portada

| Métrica | Valor |
|---|---|
| Crecimiento de suscriptores en YouTube | **+953%** |
| Impresiones totales de marca | **14,33M** |
| Piezas producidas y publicadas | **+6.000** |
| Tráfico a la web del cliente | **+136%** |

### Desglose por plataforma

| Plataforma | Comunidad | Crecimiento | Piezas | Visualizaciones |
|---|---|---|---|---|
| Instagram | 1.635 | +135,59% | 2.211 | 5,74M (+765,59%) |
| Facebook | 835 | +34,46% | 2.189 | 6,73M (+358,97%) |
| TikTok | 4.268 | +29,88% | 554 | 963,56K (+5.779,30%) |
| YouTube | 474 | +953,33% | 1.416 | 878,40K (+2.770,97%) |

**Cierre sugerido:** «El contenido no se quedó en las redes: la web corporativa pasó de 3.553 a 8.388 visitas en el mismo periodo.»

---

## 7. Stats reales para la sección About

| Clave | Actual | Propuesto | Fundamento |
|---|---|---|---|
| `years` | `2+` | **`6+`** | La trayectoria más larga del equipo (Dubraska, 6 años; José, 5+). Es experiencia propia de cada uno, sin restricción contractual |
| `brands` | `5+` | **`7+`** | Las 7 marcas verificables del CV de Dubraska. Bajado desde el `10+` de la v2: Berme-Go y Recoautos ya no cuentan |
| `content` | `1000+` | **`6.000+`** | 6.370 piezas verificables contra el informe de Metricool |
| `reach` | `1M+` | **`14M+`** | Impresiones totales del caso Inmperson |

**Sobre `brands`:** si Vanemis Arts tiene clientes propios además de los de Dubraska, el número sube. Confírmame cuántos. Un conteo agregado sin nombres es mucho menos expuesto que una descripción, pero conviene que salgan de clientes de la agencia y no de encargos de GTC.

**Cambio de etiqueta recomendado:** sustituir «Alcance generado» por **«Impresiones generadas»**. No son lo mismo, y 14,33M es la cifra de impresiones.

**Alternativa para `years`:** «11+ años de experiencia acumulada» es igual de honesto, siempre que la etiqueta diga «acumulada» y no se lea como que la agencia lleva 11 años operando.

---

## 8. Skills — ampliación

Añadir un grupo de desarrollo a las 18 herramientas actuales: **Docker · Supabase · PostgreSQL · Node.js · NestJS · TypeScript · n8n · Affinity Suite**.

Agrupar en dos bloques con encabezado — «Marketing y contenido» y «Desarrollo e infraestructura». Una rejilla de 26 iconos sin jerarquía se lee como lista de compras; dos bloques comunican dos capacidades distintas y ambas serias.

Estas son herramientas, no clientes: nombrarlas no toca ninguna cláusula. Es la vía más limpia para hacer visible la capacidad técnica mientras el perfil de José está en pausa.

`Next.js` y `C#` fuera de la rejilla a propósito: son reales, pero no es lo que la agencia vende.

---

## 9. Auditoría de métricas: los «Números Imán» no son publicables

Los números de impacto que estaban propuestos para el perfil de José son plantillas, no datos: todos con la forma `[X]% de reducción`, `ahorro de [X] horas`, `más de [X] transacciones`.

Importa porque el caso de Dubraska está respaldado por un informe de Metricool que se puede enseñar. Poner al lado porcentajes sin respaldo no solo es indefendible por sí mismo: contamina lo que sí es cierto, porque el visitante no distingue de quién es cada cifra.

Y ahora hay una segunda razón: los proyectos de los que saldrían esos números son de GTC. Publicar «arquitectura capaz de gestionar X vehículos en tiempo real» sería revelar información operativa de un cliente ajeno.

**Lo único medible hoy sin tocar nada de GTC:** los Core Web Vitals de esta propia landing. Pasa PageSpeed Insights a vanemis.art — es un dato real, tuyo, verificable por cualquiera y sin dueño externo.

---

## 10. Verificación de los datos de Dubraska

**⚠️ Discrepancia en YouTube** (pendiente de confirmación):

| | PDF del canal | Informe resumen |
|---|---|---|
| Videos | 495 | 1.416 |
| Visualizaciones | 855.658 | 878,40K |
| Suscriptores | 402 | 474 |

El PDF cubre de noviembre de 2025 a junio de 2026 (unos 8 meses); el informe cubre los 19 meses completos. Confirmar el periodo oficial antes de publicar el «+953%».

**⚠️ Permiso para nombrar a Inmperson**, y revisión de lo que Dubraska tenga firmado con Efiempresa.

**✅ Verificado sin objeciones:** todo el perfil de Dubraska contra el CV, y las cifras de Instagram, Facebook, TikTok y web.

---

## 11. Implementación en dos fases

### Fase 1 — Ahora, sin bloqueos

1. **Arreglar el nav «Servicios»** que apunta a `#hero` (`HeaderNav.vue:215`)
2. **Ampliar `Skills.vue`** con el bloque de desarrollo e infraestructura, agrupado en dos secciones
3. **Actualizar `stats` en `AboutMe.vue`** — cuatro valores y la etiqueta de impresiones
4. **Limpiar la deuda de tema** — decidir entre la paleta azul de `main.css` o el gris de las secciones, y conectar los degradados a `primary`
5. **Reescribir el `README.md`** del starter
6. **Datos estructurados `Organization`** en `app.vue`
7. **Claves i18n en `es.json`, `en.json` y `pt.json`** para todo lo anterior

### Fase 2 — Cuando se despejen los permisos

8. **`HomeTeam.vue`** sobre un array de personas. Se puede montar ya con la tarjeta de Dubraska y añadir la de José después: el array lo hace trivial.
9. **`HomeCaseStudy.vue`** reaprovechando `Projects.vue`, con Inmperson.
10. **Registrar ambas secciones** en `index.vue` y `HeaderNav.vue`.

### Pendientes para desbloquear la Fase 2

- Autorización escrita de GTC para la actividad paralela (Cláusula Décima)
- Periodo oficial de las métricas de YouTube
- Permiso de Inmperson y revisión del acuerdo de Dubraska con Efiempresa
- Dos fotos, idealmente 800×800 con el mismo tratamiento
- LinkedIn y GitHub de ambos
- Número de clientes propios de Vanemis Arts, para el stat `brands`
- Si los proyectos de WordPress fueron vía GTC o independientes

---

## 12. Una pregunta de posicionamiento, para más adelante

Vanemis Arts hoy no dice a quién le vende. Los seis pilares van de branding a desarrollo web a podcast, y cada perfil apunta a clientes distintos. No hace falta elegir uno solo, pero sí decidir cuál va primero en la página: el visitante lee de arriba abajo y decide en los primeros segundos si esto es para él.

---

## 13. Dirección visual

### 13.1. La paleta del código no es la del logo

Extraje las paradas de gradiente del `logo-minimalista.svg`. El logo es una «V» de dos trazos con paletas opuestas:

| Trazo | Colores | Carácter |
|---|---|---|
| **Frío** (izquierdo) | `#5BBBFF` → `#569CFF` → `#357FBB` → `#184E91` → `#003167` | Estructura, tecnología, profundidad |
| **Cálido** (derecho) | `#FAB33F` → `#FA812C` → `#ED5C49` → `#A0146D` → `#84006C` | Creatividad, energía, contenido |

La web declara `primary: 'fucsia'` (`#FF00AA`) y usa degradados morado-rosa. Eso recoge únicamente el extremo magenta del trazo cálido e **ignora por completo el azul y el ámbar**, que son la parte más reconocible del logo. El resultado: el logo del favicon y la identidad de la página no se parecen.

Dato adicional: el `og-image.png` ya usa un fondo azul marino (`#021832` aproximado). La imagen social y la web tampoco coinciden hoy.

### 13.2. La dualidad del logo mapea sobre el negocio

Los dos trazos no son solo decorativos: se corresponden con las dos disciplinas reales de la agencia. Frío para desarrollo e infraestructura, cálido para contenido y creatividad. Esa lógica puede recorrer toda la página —tarjetas, encabezados de grupo en Skills, tarjetas de disciplina en Team— y da un sistema de color con significado en lugar de decoración.

### 13.3. Recursos creativos aprobados

Cuatro capas sobre la estructura actual, sin rediseño:

1. **Tipografía protagonista** — titulares de hasta 12rem con interletraje negativo y revelado por línea con máscara. Es el cambio que más transforma la percepción.
2. **Ticker en marcha** — dos cintas en direcciones opuestas como separador entre secciones, alternando relleno y contorno. Se pausa al pasar el ratón.
3. **Movimiento al hacer scroll** — revelado por `IntersectionObserver`, contadores animados en los stats, inclinación 3D y foco radial en las tarjetas.
4. **Cursor con carácter** — punto y anillo con `mix-blend-mode: difference`; el anillo crece sobre elementos interactivos. Desactivado por debajo de 900px.

Los cuatro son independientes de la paleta: funcionan igual en ambas variantes.

### 13.4. Pendiente de decisión

- **Paleta:** mantener la actual (fucsia/morado) o migrar a la del logo (azul/ámbar)
- **Modo por defecto:** los recursos rinden bastante mejor en oscuro; hoy la web abre en claro
- **Alcance:** aplicar solo al Hero o a toda la página
- Analizar las capturas de los segmentos organizativos de la referencia, pendientes de recibir
