<template>
  <div class="body">
    <NavBar v-if="!$route.meta.hide" class="sticky-top" />
    <router-view />
    <Footer v-if="!$route.meta.hide" class="footer" />
  </div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';
import { useAnimalsStore } from '@/stores/animals';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed, watch } from 'vue';

const AnimalsStore = useAnimalsStore();
const AuthStore = useAuthStore();
const { animalsData, favoriteAnimalId, data, currentAnimals, currentPage, isLoading } =
  storeToRefs(AnimalsStore);

onMounted(() => {
  const route = useRoute();

  watch(
    () => route,
    async (newRoute) => {
      console.log('Current route:', newRoute.name); // 新的路由名稱
      if (newRoute.name === 'Animals') {
        isLoading.value = true;
        data.value = animalsData.value;
        isLoading.value = false;
        console.log('Data after updating:', data.value); // 更新後的資料
      } else if (newRoute.name === 'FavoriteAnimals') {
        isLoading.value = true;
        data.value = animalsData.value.filter((animal) => {
          return favoriteAnimalId.value.some((fav) => fav.animalID === animal.animal_id);
        });
        isLoading.value = false;
        console.log('Data after updating:', data.value); // 更新後的資料
      }
    },
  );
});
</script>
<style>
.body {
  min-height: 100vh;
  box-sizing: border-box;
  background: #f8f0e5;
}
/* @media (min-width: 768px) {
  .body {
    margin-top: 73px;
  }
}
@media (min-width: 992px) {
  .body {
    margin-top: 154.703px;
  }
} */
</style>
