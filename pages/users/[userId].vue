<template>
  <div :class="$style.user">
    <div :class="$style.content">
      <!--left-->
      <div :class="$style.contentPart">
        <!--user-->
        <UserDetailInfo
          :error="userError"
          :loading="userLoading"
          :user="user" />

        <!--albums-->
        <UserDetailAlbums
          :albums="albums"
          :error="albumsError"
          :loading="albumsLoading"
          :to="(x) => ({ name: 'users-userId-albums-albumId', params: { userId, albumId: x } })" />
      </div>

      <!--right-->
      <div
        :class="$style.contentPart">
        <!--photos-->
        <NuxtPage :key="albumId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserDetailAlbums from '~/componenets/users/UserDetailAlbums.vue';
import UserDetailInfo from '~/componenets/users/UserDetailInfo.vue';

interface IUserDto {
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

interface IUserDetailInfo {
  email: string;
  id: number;
  name: string;
  phone: string;
}

const route = useRoute();

// user
const userId = computed(() => Number.parseInt(route.params.userId as string));

const {
  data: userData,
  error: userError,
  status: userStatus,
} = await useLazyFetch<IUserDto | null>(`https://jsonplaceholder.typicode.com/users/${userId.value}`);

const userLoading = computed(() => userStatus.value === 'pending');

const user = computed<IUserDetailInfo | null>(() => {
  return userData.value ? mapUserDtoToUserDetail(userData.value) : null;
});

function mapUserDtoToUserDetail(user: IUserDto): IUserDetailInfo {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    phone: user.phone,
  };
}

// albums
interface IUserAlbumDto {
  id: number;
  title: string;
  userId: number;
}

interface IUserAlbum {
  id: number;
  title: string;
}

const albumId = computed(() => Number.parseInt(route.params.albumId as string));

const {
  data: albumsData,
  error: albumsError,
  status: albumsStatus,
} = await useLazyFetch<IUserAlbumDto[] | null>(`https://jsonplaceholder.typicode.com/users/${userId.value}/albums`);

const albumsLoading = computed(() => albumsStatus.value === 'pending');

const albums = computed<IUserAlbum[]>(() => {
  return albumsData.value ? albumsData.value.map(mapUserAlbumDtoToUserAlbum) : [];
});

function mapUserAlbumDtoToUserAlbum(userAlbumDto: IUserAlbumDto): IUserAlbum {
  return {
    id: userAlbumDto.id,
    title: userAlbumDto.title,
  };
}

const availableAlbumIds = computed<number[]>(() => {
  return albums.value.map(x => x.id);
});
</script>

<style module>
.user {
  display: flex;
  width: 100%;
}

.content {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 50%);
  width: 100%;
}

.contentPart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}
</style>
