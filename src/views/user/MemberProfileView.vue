<template>
  <div class="container min-vh-100">
    <h1>基本資料</h1>
    <Loading v-if="isLoading" />
    <div v-else>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex flex-wrap">
          <p class="me-2">名稱:</p>
          <p class="">{{ userInfo.userName }}</p>
        </div>
        <div class=""><font-awesome-icon :icon="['fas', 'pencil']" />編輯</div>
      </div>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex flex-wrap">
          <p class="me-2">生日:</p>
          <p>{{ myBirthdate }}</p>
        </div>
        <div><font-awesome-icon :icon="['fas', 'pencil']" />編輯</div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-wrap">
          <p class="me-2">電子郵件:</p>
          <p>{{ userInfo.email }}</p>
        </div>
        <div style="white-space: nowrap"><font-awesome-icon :icon="['fas', 'pencil']" />編輯</div>
      </div>
    </div>
    <!-- <button @click="AuthStore.getUserInfo">按鈕</button> -->
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import Loading from '@/components/Loading.vue';
const AuthStore = useAuthStore();
const { userInfo } = storeToRefs(AuthStore);
const myBirthdate = computed(() => new Date(userInfo.value.birthdate).toLocaleDateString());
const isLoading = ref(false);

onMounted(async () => {
  if (!userInfo.value.id) {
    isLoading.value = true;
    await AuthStore.getUserInfo();
    isLoading.value = false;
  }
});
</script>
