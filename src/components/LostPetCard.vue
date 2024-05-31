<template>
  <!-- 取得資料中顯示載入動畫 -->
  <Loading v-if="isLoading" />
  <!-- 載入動畫結束，則顯示動物卡片 -->
  <div class="container">
    <div class="card p-0 mx-1 mb-5" v-for="pet in currentAnimals" :key="pet.id" v-if="!isLoading">
      <img
        v-if="!pet.petImage"
        src="../assets/img/default.jpg"
        class="card-img-top"
        alt="Animal Image"
        loading="lazy"
      />
      <img
        v-else
        :src="`http://localhost:3000/${pet.petImage}`"
        @error="(event) => (event.target.src = '../../assets/img/default.jpg')"
        class="card-img-top"
        alt="Animal Image"
        loading="lazy"
      />
      <div class="card-body">
        <h5 class="card-title flex mb-3">{{ pet.petName }}</h5>
        <div v-if="userInfo.id === pet.userId" class="flex infoSettings">
          <span>修改</span>
          <span @click="comfirmDelete(pet.id)">刪除</span>
        </div>
        <div class="d-flex align-items-center my-0">
          <p class="my-0">
            <span>{{ pet.petColor }}{{ pet.petBreed }}</span>
          </p>
        </div>
        <div class="card-text d-flex align-items-center my-2">
          <font-awesome-icon :icon="['fas', 'location-dot']" class="" />
          <p class="card-text">
            <span>遺失地區：{{ pet.lostArea }}</span>
          </p>
        </div>
        <div class="card-text d-flex align-items-center">
          <font-awesome-icon :icon="['fas', 'calendar-days']" />
          <p class="card-text">遺失日期：{{ new Date(pet.lostDate).toLocaleDateString() }}</p>
        </div>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-success mt-4">
            <router-link
              class="nav-link"
              :to="{ name: 'lostPetDetails', params: { lostPetId: pet.id } }"
              >詳細資訊</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAnimalsStore } from '@/stores/animals';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';
import Loading from '@/components/Loading.vue';
import Pagination from '@/components/Pagination.vue';
const AnimalsStore = useAnimalsStore();
const AuthStore = useAuthStore();
const { lostPetData, currentAnimals, isLoading, data } = storeToRefs(AnimalsStore);
const { userInfo } = storeToRefs(AuthStore);

const comfirmDelete = async (PetId) => {
  if (confirm('確定要刪除這張遺失寵物卡片嗎？')) {
    await AnimalsStore.deleteLostPet(PetId);
    await AnimalsStore.getLostPetData();
    data.value = lostPetData.value;
  }
};

onMounted(async () => {
  if (!userInfo.value.id) {
    await AuthStore.getUserInfo();
  }
});
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  justify-items: center;
}
.card {
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  width: 300px;
  height: auto;
  img {
    height: 235px;
    object-fit: cover;
  }
  .infoSettings {
    display: flex;
    position: absolute;
    top: 12px;
    right: 5px;
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
      color: #fff;
      padding: 3px;
      font-size: small;
      text-align: center;
      display: flex;
      align-items: center;
      border-radius: 10px;
      &:first-child {
        background-color: #49a971;
      }
      &:last-child {
        background-color: rgb(201, 27, 27);
      }
    }
  }
  .card-body {
    height: auto;
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
      bottom: 30px;
      top: 13px;
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
