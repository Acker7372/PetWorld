<template>
  <Loading v-if="isLoading" />
  <div v-bind="$attrs" class="container mt-4" v-if="animalDetails">
    <div class="row">
      <div class="imgBox col-12 col-lg-6">
        <img
          v-if="!animalDetails.album_file"
          src="../../assets/img/default.jpg"
          class="w-100 h-100"
        />
        <img
          v-else
          :src="animalDetails.album_file"
          @error="(event) => (event.target.src = '../../assets/img/default.jpg')"
          alt=""
          class="w-100 h-100"
        />
      </div>

      <div class="animalInfo ms-1 ms-lg-0 mt-4 mt-lg-2 row col-lg-6">
        <div
          class="saveAnimalIdBox"
          @click="
            AuthStore.executeIfLoggedIn(() => AnimalsStore.saveAnimalId(animalDetails.animal_id))
          "
        >
          <div style="cursor: pointer">
            <span>加入收藏</span>
            <img
              v-if="favoriteAnimalId.some((fav) => fav.animalID === animalDetails.animal_id)"
              src="@/assets/Icons/savedIcon.png"
              alt=""
            />
            <img v-else src="@/assets/Icons/notSaveIcon.png" alt="" />
          </div>
        </div>
        <p class="col-5 text-end">種類</p>
        <p class="col-7">{{ animalDetails.animal_kind || '尚未提供' }}</p>

        <p class="col-5 text-end">品種</p>
        <p class="col-7">{{ animalDetails.animal_Variety || '尚未提供' }}</p>

        <p class="col-5 text-end">性別</p>
        <p v-if="animalDetails.animal_sex === 'M'" class="col-7">公</p>
        <p v-else-if="animalDetails.animal_sex === 'F'" class="col-7">母</p>
        <p v-else class="col-7">尚未標明性別</p>

        <p class="col-5 text-end">毛色</p>
        <p class="col-7">{{ animalDetails.animal_colour || '尚未提供' }}</p>

        <p class="col-5 text-end">收容編號</p>
        <p class="col-7">{{ animalDetails.animal_subid || '尚未提供' }}</p>

        <p class="col-5 text-end">收容日期</p>
        <p class="col-7">{{ animalDetails.animal_createtime || '尚未提供' }}</p>

        <p class="col-5 text-end">可認養日期</p>
        <p class="col-7">{{ animalDetails.animal_opendate || '尚未提供' }}</p>

        <p class="col-5 text-end">公告收容所</p>
        <p class="col-7">{{ animalDetails.shelter_name || '尚未提供' }}</p>

        <p class="col-5 text-end">收容所電話</p>
        <p class="col-7">{{ animalDetails.shelter_tel || '尚未提供' }}</p>

        <p class="col-5 text-end">收容所地址</p>
        <p class="col-7">{{ animalDetails.shelter_address || '尚未提供' }}</p>

        <p class="col-5 text-end">備註</p>
        <p class="col-7">{{ animalDetails.animal_remark || '目前沒有備註' }}</p>
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
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';

const route = useRoute();
const AnimalsStore = useAnimalsStore();
const AuthStore = useAuthStore();
const { animalsData, favoriteAnimalId } = storeToRefs(AnimalsStore);
const isLoading = ref(false);

onMounted(async () => {
  try {
    if (animalsData.value.length === 0) {
      isLoading.value = true;
      await AnimalsStore.getAnimalsData();
      isLoading.value = false;
    }
    if (AuthStore.isLoggedIn()) {
      isLoading.value = true;
      await AnimalsStore.getFavoriteAnimalId();
      isLoading.value = false;
    }
  } catch (error) {
    console.log('發生錯誤', error);
  }
});

const animalDetails = computed(() => {
  const animalId = Number(route.params.animalId);
  return animalsData.value.find((animal) => animal.animal_id === animalId);
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
        font-weight: 600;
        div {
          // display: inline-block;
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
