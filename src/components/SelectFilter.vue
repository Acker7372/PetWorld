<template>
  <div class="container">
    <!-- <div class="displaySelectBox text-center">
       <button class="btn d-lg-none text-center mb-3" @click="selectBox = !selectBox">
        ➤ 條件搜尋
      </button> 
    </div> -->
    <transition name="slide-fade">
      <div
        v-if="selectBox"
        class="search-box row d-flex justify-content-center align-items-center text-center"
      >
        <div class="col-3 col-lg-1">區域</div>
        <div class="col-8 col-lg-2 p-1">
          <select
            v-model="selectRegion"
            class="form-select text-center"
            aria-label="Default select example"
          >
            <option selected value="">全部地區</option>
            <option value="2">台北市</option>
            <option value="3">新北市</option>
            <option value="4">基隆市</option>
            <option value="5">宜蘭縣</option>
            <option value="6">桃園縣</option>
            <option value="7">新竹縣</option>
            <option value="8">新竹市</option>
            <option value="9">苗栗縣</option>
            <option value="10">台中市</option>
            <option value="11">彰化縣</option>
            <option value="12">南投縣</option>
            <option value="13">雲林縣</option>
            <option value="14">嘉義縣</option>
            <option value="15">嘉義市</option>
            <option value="16">台南市</option>
            <option value="17">高雄市</option>
            <option value="18">屏東縣</option>
            <option value="19">花蓮縣</option>
            <option value="20">台東縣</option>
            <option value="21">澎湖縣</option>
            <option value="22">金門縣</option>
            <option value="23">連江縣</option>
          </select>
        </div>
        <div class="col-3 col-lg-1 ms-lg-3">種類</div>
        <div class="col-8 col-lg-2 p-1 me-lg-3">
          <select
            v-model="selectType"
            class="form-select text-center"
            aria-label="Default select example"
          >
            <option selected value="">全部種類</option>
            <option value="貓">貓</option>
            <option value="狗">狗</option>
          </select>
        </div>
        <div class="col-3 col-lg-1">性別</div>
        <div class="col-8 col-lg-2 p-1">
          <select
            v-model="selectGender"
            class="form-select text-center"
            aria-label="Default select example"
          >
            <option selected value="">全部性別</option>
            <option value="M">男生</option>
            <option value="F">女生</option>
          </select>
        </div>
        <button
          @click="handleSearch"
          type="button"
          class="btn btn-success col-11 col-lg-2 mt-2 mt-lg-0 ms-lg-2"
        >
          搜尋
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.container {
  .displaySelectBox {
    button {
      background-color: #1a8754;
      padding: 0;
      width: 90px;
      height: 40px;
      font-size: xx-small;
      color: aliceblue;
    }
  }
  .row {
    .col-lg-1 {
      background-color: #1a8754;
      color: aliceblue;
      border-radius: 5px;
      padding: 7px 0px;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

<script setup>
import { ref } from 'vue';
import { useAnimalsStore } from '@/stores/animals';

import { storeToRefs } from 'pinia';

const AnimalStore = useAnimalsStore();
const { selectRegion, selectGender, selectType } = storeToRefs(AnimalStore);

const selectBox = ref(true);
const isLoading = ref(false);
async function handleSearch() {
  isLoading.value = true;
  await AnimalStore.getAnimalsData();
  AnimalStore.goToPage(1);
  isLoading.value = false;
}
</script>
