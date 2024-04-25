<template>
  <div v-if="animalDetails">
    <div class="container">
      <div class="row">
        <div class="imgBox col-12 col-lg-6">
          <img v-if="animalDetails.album_file === ''" src="../../assets/img/default.jpg" />
          <img v-else :src="animalDetails.album_file" alt="" class="w-100 h-100" />
        </div>

        <div class="animalInfo mt-5 mt-lg-2 row col-lg-6">
          <p class="col-5 text-end">種類：</p>
          <p class="col-7">{{ animalDetails.animal_kind }}</p>

          <p class="col-5 text-end">品種：</p>
          <p class="col-7">{{ animalDetails.animal_Variety }}</p>

          <p class="col-5 text-end">性別：</p>
          <p v-if="animalDetails.animal_Variety === 'M'" class="col-7">公</p>
          <p v-else-if="animalDetails.animal_Variety === 'F'" class="col-7">母</p>
          <p v-else class="col-7">尚未標明性別</p>

          <p class="col-5 text-end">毛色：</p>
          <p class="col-7">{{ animalDetails.animal_colour }}</p>

          <p class="col-5 text-end">收容編號：</p>
          <p class="col-7">{{ animalDetails.animal_subid }}</p>

          <p class="col-5 text-end">收容日期：</p>
          <p class="col-7">{{ animalDetails.animal_createtime }}</p>

          <p class="col-5 text-end">可認養日期：</p>
          <p class="col-7">{{ animalDetails.animal_opendate }}</p>

          <p class="col-5 text-end">公告收容所：</p>
          <p class="col-7">{{ animalDetails.shelter_name }}</p>

          <p class="col-5 text-end">收容所電話：</p>
          <p class="col-7">{{ animalDetails.shelter_tel }}</p>

          <p class="col-5 text-end">收容所地址：</p>
          <p class="col-7">{{ animalDetails.shelter_address }}</p>

          <div v-if="animalDetails.animal_remark === true" class="row">
            <p class="col-5 text-end">備註：</p>
            <p class="col-7">{{ animalDetails.animal_remark }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>找不到動物的詳細資料。</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnimalsStore } from '@/stores/animals';
import { storeToRefs } from 'pinia';

const route = useRoute();
const AnimalsStore = useAnimalsStore();
const { animalsData } = storeToRefs(AnimalsStore);

console.log('路由參數animalId:', route.params.animalId);

onMounted(async () => {
  if (!animalsData.value.length) {
    await AnimalsStore.getAnimalsData();
  }
});

const animalDetails = computed(() => {
  const animalId = Number(route.params.animalId);
  return animalsData.value.find((animal) => animal.animal_id === animalId);
});
console.log(animalDetails);
</script>
