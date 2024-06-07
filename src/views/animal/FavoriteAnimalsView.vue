<template>
  <div
    v-if="favoriteAnimalId.length === 0"
    class="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center"
  >
    <h3>目前沒有收藏的流浪動物</h3>
    <br />
    <h6>在公立領養頁面點擊愛心收藏!</h6>
  </div>
  <div
    v-if="favoriteAnimalId.length > 0"
    class="min-vh-100 mt-4 d-flex flex-column justify-content-between"
  >
    <AnimalCard />
    <Pagination class="d-flex justify-content-center" />
  </div>
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import AnimalCard from '@/components/AnimalCard.vue';

const router = useRoute();
const AnimalsStore = useAnimalsStore();
const AuthStore = useAuthStore();
const { animalsData, favoriteAnimalId, data, currentAnimals, currentPage, isLoading } =
  storeToRefs(AnimalsStore);
const pageSize = AnimalsStore.pageSize;

const favoriteAnimalsData = computed(() => {
  return animalsData.value.filter((animal) => {
    return favoriteAnimalId.value.some((fav) => fav.animalID === animal.animal_id);
  });
});

watch(favoriteAnimalsData, (newVal) => {
  data.value = newVal;
});

if (data.value !== favoriteAnimalsData.value) {
  isLoading.value = true;
  data.value = favoriteAnimalsData.value;
  isLoading.value = false;
}

onMounted(async () => {
  try {
    if (animalsData.value.length === 0 && AuthStore.isLoggedIn) {
      isLoading.value = true;
      await AnimalsStore.getFavoriteAnimalId();
      await AnimalsStore.getAnimalsData();
      data.value = favoriteAnimalsData.value;
      isLoading.value = false;
    } else if (animalsData.value.length > 0 && AuthStore.isLoggedIn) {
      isLoading.value = true;
      await AnimalsStore.getFavoriteAnimalId();
      data.value = favoriteAnimalsData.value;
      isLoading.value = false;
    }
  } catch (error) {
    console.error('FavoriteAnimals.vue onMounted error:', error);
  }
});
</script>
