<template>
  <div :class="$style.default">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/componenets/AppFooter.vue';
import AppHeader from '~/componenets/AppHeader.vue';
</script>

<style module>
.default {
  display: grid;
  font-weight: normal;
  grid-template-rows: 60px 1fr 60px;
  height: auto;
  margin: 0 auto;
  max-width: calc(1200px + 4rem);
  min-height: 100vh;
  padding: 2rem;
  width: 100%;
}
</style>
