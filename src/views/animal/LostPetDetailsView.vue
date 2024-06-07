<template>
  <Loading v-if="isLoading" />
  <div class="container mt-4" v-if="lostPetDetails">
    <div class="row">
      <div class="imgBox col-12 col-lg-6">
        <img
          v-if="!lostPetDetails.petImage"
          src="../../assets/img/default.jpg"
          class="w-100 h-100"
        />
        <img
          v-else
          :src="lostPetDetails.petImage"
          @error="(event) => (event.target.src = '../../assets/img/default.jpg')"
          alt=""
          class="w-100 h-100"
        />
      </div>

      <div class="animalInfo ms-1 ms-lg-0 mt-4 mt-lg-2 row col-lg-6">
        <!-- <div class="saveAnimalIdBox" @click="AnimalsStore.saveAnimalId(animalDetails.animal_id)">
          <div style="cursor: pointer">
            <span>加入收藏</span>
            <img
              v-if="favoriteAnimalId.some((fav) => fav.animalID === animalDetails.animal_id)"
              src="@/assets/Icons/savedIcon.png"
              alt=""
            />
            <img v-else src="@/assets/Icons/notSaveIcon.png" alt="" />
          </div>
        </div> -->
        <p class="col-5 text-end">名稱：</p>
        <p class="col-7">{{ lostPetDetails.petName }}</p>

        <p class="col-5 text-end">類別：</p>
        <p class="col-7">{{ lostPetDetails.petType }}</p>

        <p class="col-5 text-end">品種：</p>
        <p class="col-7">{{ lostPetDetails.petBreed }}</p>

        <p class="col-5 text-end">毛色：</p>
        <p class="col-7">{{ lostPetDetails.petColor }}</p>

        <p class="col-5 text-end">遺失日期：</p>
        <p class="col-7">{{ new Date(lostPetDetails.lostDate).toLocaleDateString() }}</p>

        <p class="col-5 text-end">遺失地區：</p>
        <p class="col-7">{{ lostPetDetails.lostArea }}</p>

        <p class="col-5 text-end">詳細地址：</p>
        <p class="col-7">{{ lostPetDetails.lostAddress }}</p>

        <p class="col-5 text-end">聯繫電話：</p>
        <p class="col-7">{{ lostPetDetails.contactNumber }}</p>

        <p class="col-5 text-end">備註：</p>
        <p class="col-7">{{ lostPetDetails.notes || '目前沒有備註' }}</p>
      </div>
    </div>
  </div>
  <!-- <div v-else>
      <p>找不到動物的詳細資料。</p>
    </div> -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnimalsStore } from '@/stores/animals';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';

const route = useRoute();
const AnimalsStore = useAnimalsStore();
const { lostPetData, isLoading } = storeToRefs(AnimalsStore);

onMounted(async () => {
  try {
    if (!lostPetData.value.length) {
      isLoading.value = true;
      await AnimalsStore.getLostPetData();
      // await AnimalsStore.getAnimalsData();
      isLoading.value = false;
    }
  } catch (error) {
    console.log('發生錯誤', error);
  }
});

const lostPetDetails = computed(() => {
  const lostPetId = Number(route.params.lostPetId);
  return lostPetData.value.find((pet) => pet.id === lostPetId);
});
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  overflow: auto;
  .row {
    height: auto;
    .imgBox {
      img {
        border-radius: 10px;
        box-shadow: 0 0 10px 0 #00000044;
      }
    }
    .animalInfo {
      p {
        background: #99d2c144;
        border-radius: 10px;
        border: 2px solid #212e2a44;
        padding: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 10px 0 #237b8544;
      }
      .col-5 {
        font-weight: 600;
      }
      .col-7 {
        background: #d2f2b751;
        padding: 0 10px;
      }
      .saveAnimalIdBox {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        div {
          display: inline-block;
          background-color: #97beac;
          padding: 5px 20px;
          border-radius: 20px;
          span {
            color: #3e3939;
          }
          img {
            width: 21px;
            height: 21px;
            margin-left: 5px;
            margin-bottom: 3px;
          }
        }
      }
    }
  }
}
</style>
