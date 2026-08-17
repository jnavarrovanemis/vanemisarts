<template>
  <div>
    <UApp>
      <AppCursor />
      <HeaderNav />
      <UMain>
        <slot />
      </UMain>
      <FooterNav />
    </UApp>
  </div>
</template>

<script setup lang="ts">
useColorModeTransition()
</script>
