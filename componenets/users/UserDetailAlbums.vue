<template>
  <div :class="$style.root">
    <h2>Albums</h2>
    <!--loading-->
    <div
      v-if="loading"
      data-test="loading">
      Loading...
    </div>

    <!--error-->
    <div
      v-else-if="error"
      data-test="error">
      Error: {{ error.message }}
    </div>

    <!--data-->
    <div
      v-else-if="albums.length"
      :class="$style.albums">
      <NuxtLink
        v-for="album in albums"
        :key="album.id"
        :class="$style.album"
        data-test="album"
        :to="to(album.id)">
        {{ album.title }}
      </NuxtLink>
    </div>

    <!--no-data-->
    <div
      v-else
      data-test="no-data">
      No data
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  albums: {
    id: number;
    title: string;
  }[];
  error: Error | null;
  loading: boolean;
  to: (id: number) => RouteLocationRaw;
}>();
</script>

<style module>
.root {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
}

.albums {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.album {
  display: flex;
  width: 100%;
}
</style>
