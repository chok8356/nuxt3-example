<template>
  <div :class="$style.root">
    <h2>Info</h2>
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
      v-else-if="user"
      :class="$style.info">
      <span>ID:</span>
      <span data-test="id">{{ user.id }}</span>

      <span>Name:</span>
      <span data-test="name">{{ user.name }}</span>

      <span>E-mail:</span>
      <span data-test="email">{{ user.email }}</span>

      <span>Phone:</span>
      <span data-test="phone">{{ user.phone }}</span>
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
defineProps<{
  error: Error | null;
  loading: boolean;
  user: {
    email: string;
    id: number;
    name: string;
    phone: string;
  } | null;
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

.info {
  color: white;
  display: inline-grid;
  gap: 0.25rem 1rem;
  grid-template-columns: repeat(2, auto);
  width: auto;
}
</style>
