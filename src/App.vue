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
// import { useRoute } from 'vue-router';
// import { useAnimalsStore } from '@/stores/animals';
// import { useAuthStore } from '@/stores/auth';
// import { storeToRefs } from 'pinia';
// import { onMounted, ref, computed } from 'vue';

// const AnimalsStore = useAnimalsStore();
// const AuthStore = useAuthStore();
// const { animalsData, favoriteAnimalId, data, currentAnimals, currentPage, isLoading } =
//   storeToRefs(AnimalsStore);
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
