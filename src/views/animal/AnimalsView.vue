<template>
  <div class="container min-vh-100">
    <SelectFilter class="my-lg-5 my-3" />
    <div class="row justify-content-center">
      <AnimalCard />
    </div>
    <Pagination class="d-flex justify-content-center" />
  </div>
</template>
<style scoped lang="scss"></style>

<script setup>
import { useRoute } from 'vue-router';
import AnimalCard from '@/components/AnimalCard.vue';
import Pagination from '@/components/Pagination.vue';
import SelectFilter from '@/components/SelectFilter.vue';
import { onMounted, ref, watch } from 'vue';
import { useAnimalsStore } from '@/stores/animals';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';

const router = useRoute();
const AnimalsStore = useAnimalsStore();
const { favoriteAnimalId, animalsData, currentAnimals, data, isLoading } =
  storeToRefs(AnimalsStore);

// watch(
//   () => router.current,
//   async (newRouter) => {
//     console.log('Current route:', newRouter.name); // 新的路由名稱
//     if (newRouter.name === 'Animals') {
//       isLoading.value = true;
//       data.value = animalsData.value;
//       isLoading.value = false;
//       console.log('Data after updating:', data.value); // 更新後的資料
//     } else if (newRouter.name === 'FavoriteAnimals') {
//       isLoading.value = true;
//       data.value = animalsData.value.filter((animal) => {
//         return favoriteAnimalId.value.some((fav) => fav.animalID === animal.animal_id);
//       });
//       isLoading.value = false;
//       console.log('Data after updating:', data.value); // 更新後的資料
//     }
//   },
// );

onMounted(async () => {
  try {
    if (currentAnimals.value.length === 0) {
      isLoading.value = true;
      await AnimalsStore.getFavoriteAnimalId();
      await AnimalsStore.getAnimalsData();
      data.value = animalsData.value;
      isLoading.value = false;
    }
  } catch (error) {
    console.error('AnimalCard.vue onMounted error:', error);
  }
});
</script>
