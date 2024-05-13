<template>
  <!-- 取得資料中顯示載入動畫 -->
  <Loading v-if="isLoading" />
  <!-- 載入動畫結束，則顯示動物卡片 -->
  <AnimalCard />
  <Pagination class="d-flex justify-content-center" />
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
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

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-items: center;
  min-height: 100vh;
}
.card {
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  width: 300px;
  img {
    height: 235px;
    object-fit: cover;
  }
  .card-body {
    position: relative;
    top: 0;
    bottom: 0;
    .card-text {
      white-space: nowrap;
      span {
        margin-left: 3px;
      }
      p {
        font-size: small;
        margin-left: 10px;
      }
    }
    .imgBox {
      position: absolute;
      left: 260px;
      top: 11px;
      img {
        width: 25px;
        height: 25px;
      }
      &:hover::before {
        position: absolute;
        right: 30px;
        color: #fff;
        font-size: 0.6em;
        background: #49a971;
        padding: 5px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        content: '收藏';
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
