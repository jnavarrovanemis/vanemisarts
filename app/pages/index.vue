<template>
  <div class="min-h-screen">
    <!--
      El hero y las dos secciones siguientes se hidratan de inmediato: son lo
      que se ve al entrar.

      Skills y Contact usan hidratacion diferida (Vue 3.5 / Nuxt 4). Se siguen
      renderizando en el servidor — el HTML llega completo y Google lo indexa
      igual — pero su JavaScript no se descarga ni se ejecuta hasta que la
      seccion se acerca a la pantalla. Es lo que saca de la carga inicial las
      25 instancias de UPopover de Skills y el formulario de Contact con su
      esquema de validacion.
    -->
    <HomeHero id="hero" />
    <BrandTicker tone="cool" />
    <HomeAboutMe id="about" />
    <HomeTeam id="team" />
    <BrandTicker
      tone="warm"
      reverse
    />
    <LazyHomeSkills
      id="skills"
      hydrate-on-visible
    />
    <LazyHomeContact
      id="contact"
      hydrate-on-visible
    />
  </div>
</template>
