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
const AnimalsStore = useAnimalsStore();
const { favoriteAnimalId, animalsData, currentAnimals, data, isLoading } =
  storeToRefs(AnimalsStore);

if (data.value !== animalsData.value) {
  isLoading.value = true;
  data.value = animalsData.value;
  isLoading.value = false;
}

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
