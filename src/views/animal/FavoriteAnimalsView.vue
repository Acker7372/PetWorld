<template>
  <!-- 取得資料中顯示載入動畫 -->
  <Loading v-if="isLoading" />
  <!-- 載入動畫結束，則顯示動物卡片 -->
  <div class="container">
    <div
      class="card p-0 mx-1 mb-5"
      v-for="animal in currentAnimals"
      :key="animal.animal_id"
      v-if="!isLoading"
    >
      <img
        v-if="!animal.album_file"
        src="@/assets/img/default.jpg"
        class="card-img-top"
        alt="Animal Image"
        loading="lazy"
      />
      <img
        v-else
        :src="animal.album_file"
        @error="(event) => (event.target.src = defaultImage)"
        class="card-img-top"
        alt="Animal Image"
        loading="lazy"
      />
      <div class="card-body">
        <h5 class="card-title mb-3">{{ animal.animal_colour }}{{ animal.animal_Variety }}</h5>
        <div class="card-text d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'venus-mars']" class="fa-xs" />
          <p class="card-text" v-if="animal.animal_sex === 'F'">女生</p>
          <p class="card-text" v-else-if="animal.animal_sex === 'M'">男生</p>
          <p class="card-text" v-else="animal.animal_sex === ''">尚未標明</p>
        </div>

        <div class="card-text d-flex align-items-center my-2">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="" />
          <p class="card-text">
            <span>{{ animal.animal_place }}</span>
          </p>
        </div>
        <div class="card-text d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'calendar-days']" />
          <p class="card-text">{{ animal.animal_opendate }} 可認養</p>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-success mt-4">
            <router-link
              class="nav-link"
              :to="{ name: 'AnimalDetails', params: { animalId: animal.animal_id } }"
              >詳細資訊</router-link
            >
          </button>
        </div>
        <div
          v-if="AuthStore.isLoggedIn"
          class="imgBox"
          @click="AuthStore.executeIfLoggedIn(() => AnimalsStore.saveAnimalId(animal.animal_id))"
        >
          <img
            v-if="AnimalsStore.favoriteAnimalId.some((fav) => fav.animalID === animal.animal_id)"
            src="@/assets/Icons/savedIcon.png"
            alt="Favorite Animal icon"
          />
          <img v-else src="@/assets/Icons/notSaveIcon.png" alt="" />
        </div>
        <div v-else class="imgBox" @click="AuthStore.isLoggedIn">
          <img src="@/assets/Icons/notSaveIcon.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <Pagination class="d-flex justify-content-center" />
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed, watch } from 'vue';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';

const AnimalsStore = useAnimalsStore();
const AuthStore = useAuthStore();
const { animalsData, favoriteAnimalId, data, currentAnimals, currentPage } =
  storeToRefs(AnimalsStore);
const pageSize = AnimalsStore.pageSize;
const isLoading = ref(false);

console.log('pageSize', pageSize);

const favoriteAnimalsData = computed(() => {
  return animalsData.value.filter((animal) => {
    return favoriteAnimalId.value.some((fav) => fav.animalID === animal.animal_id);
  });
});

watch(favoriteAnimalsData, (newVal) => {
  data.value = newVal;
});

console.log('data:1', data.value);

console.log('currentAnimals:', currentAnimals.value);

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
