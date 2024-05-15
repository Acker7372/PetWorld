<template>
  <AnimalCard />
  <Pagination class="d-flex justify-content-center" />
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
      isLoading.value = false;
    }
  } catch (error) {
    console.error('FavoriteAnimals.vue onMounted error:', error);
  }
});
</script>
