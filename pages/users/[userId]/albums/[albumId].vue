<template>
  <div :class="$style.root">
    <h2>Photos</h2>
    <!--loading-->
    <div
      v-if="loading && !loadingMore"
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
      v-else-if="photos.length"
      :class="$style.photosWrapper">
      <div
        class="scrollbar"
        :class="$style.photos">
        <div
          v-for="photo in photos"
          :key="photo.id"
          :class="$style.photo"
          data-test="photo">
          {{ photo.id }}
        </div>
      </div>
      <div :class="$style.buttons">
        <AppButton
          data-test="load-more"
          :disabled="loadingMore"
          :text="loadingMore ? 'Loading...' : 'Load more'"
          @click="loadMore" />
        <NuxtLink :to="{ name: 'users-userId', params: { userId } }">
          <AppButton
            data-test="close"
            text="Close"
            type="secondary" />
        </NuxtLink>
      </div>
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
import { ref } from 'vue';

import AppButton from '~/componenets/AppButton.vue';

interface IAlbumPhotoDto {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

interface IAlbumPhoto {
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

const route = useRoute();

// user
const userId = computed(() => Number.parseInt(route.params.userId as string));
const albumId = computed(() => Number.parseInt(route.params.albumId as string));

const page = ref(1);

const { data, error, refresh, status } = await useLazyAsyncData<IAlbumPhotoDto[]>(
  'photos',
  () => $fetch(`https://jsonplaceholder.typicode.com/albums/${albumId.value}/photos`, {
    query: {
      _limit: 9,
      _page: page.value,
    },
  }),
);

const loading = computed(() => status.value === 'pending');

const photos = ref<IAlbumPhoto[]>(data.value ? data.value.map(mapAlbumPhotoDtoToAlbumPhoto) : []);

function mapAlbumPhotoDtoToAlbumPhoto(AlbumPhotoDto: IAlbumPhotoDto): IAlbumPhoto {
  return {
    id: AlbumPhotoDto.id,
    thumbnailUrl: AlbumPhotoDto.thumbnailUrl,
    title: AlbumPhotoDto.title,
    url: AlbumPhotoDto.url,
  };
}

const loadingMore = ref(false);

async function loadMore() {
  loadingMore.value = true;
  page.value += 1;
  await refresh();
  loadingMore.value = false;
}

watch(data, (newData) => {
  if (newData) {
    photos.value = [...photos.value, ...newData.map(mapAlbumPhotoDtoToAlbumPhoto)];
  }
});
</script>

<style module>
.root {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-end;
}

.photosWrapper {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
}

.photos {
  display: inline-grid;
  gap: 8px;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(3, 150px);
  max-height: calc(150px * 3 + 8px * 2);
  overflow: hidden scroll;
  width: auto;
}

.photo {
  align-items: center;
  border: 1px solid grey;
  border-radius: 1rem;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.buttons {
  align-items: center;
  display: flex;
  gap: 1rem;
}
</style>
