<template>
  <div :class="$style.root">
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

    <!--no-data-->
    <div
      v-else-if="users.length"
      :class="$style.usersList">
      <NuxtLink
        v-for="user in users"
        :key="user.id"
        :class="$style.user"
        :to="{ name: 'users-userId', params: { userId: user.id } }">
        {{ user.name }}
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
export interface IUserDto {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

// users
interface IUserList {
  id: number;
  name: string;
}

const { data, error, status } = await useLazyFetch<IUserDto[]>('https://jsonplaceholder.typicode.com/users');

const loading = computed(() => status.value === 'pending');

const users = computed<IUserList[]>(() => {
  return data.value ? data.value.map(mapUserDtoToUserList) : [];
});

function mapUserDtoToUserList(user: IUserDto): IUserList {
  return {
    id: user.id,
    name: user.name,
  };
}
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
}

.usersList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.user {
  display: flex;
  width: 100%;
}
</style>
