<template>
  <div>
    <UApp>
      <AppCursor />
      <HeaderNav />
      <!--
        `as="main"` hace que UMain renderice un <main> real. Por defecto
        Primitive emite un <div>, y sin landmark principal los lectores de
        pantalla no pueden saltar directamente al contenido.
      -->
      <UMain as="main">
        <slot />
      </UMain>
      <FooterNav />
    </UApp>
  </div>
</template>

<script setup lang="ts">
useColorModeTransition()
</script>
