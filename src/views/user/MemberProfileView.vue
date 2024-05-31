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
        <div @click="displayNameInput" class="">
          <font-awesome-icon :icon="['fas', 'pencil']" />編輯
        </div>
      </div>
      <div v-if="nameInputBox">
        <input type="text" placeholder="請輸入新名稱" class="form-control" v-model="newUserName" />
        <button class="btn btn-success mt-1 mb-3 w-100" @click="saveUserName">更新</button>
      </div>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex flex-wrap">
          <p class="me-2">生日:</p>
          <p>{{ myBirthdate }}</p>
        </div>
        <div @click="displayBirthdateInput">
          <font-awesome-icon :icon="['fas', 'pencil']" />編輯
        </div>
      </div>
      <div v-if="birthdateInputBox">
        <input type="date" class="form-control" v-model="newUserBirthdate" />
        <button @click="saveUserBirthdate" class="btn btn-success mt-1 mb-3 w-100">更新</button>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-wrap">
          <p class="me-2">電子郵件:</p>
          <p>{{ userInfo.email }}</p>
        </div>
        <div @click="displayEmailInput" style="white-space: nowrap">
          <font-awesome-icon :icon="['fas', 'pencil']" />編輯
        </div>
      </div>
      <div v-if="emailInputBox">
        <input
          type="text"
          placeholder="請輸新電子郵件"
          class="form-control"
          v-model="newUserEmail"
        />
        <button @click="saveUserEmail" class="btn btn-success mt-1 mb-3 w-100">更新</button>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-wrap">
          <p class="me-2">密碼:</p>
          <p>＊＊＊＊＊＊</p>
        </div>
        <div @click="displayPasswordInput" style="white-space: nowrap">
          <font-awesome-icon :icon="['fas', 'pencil']" />編輯
        </div>
      </div>
      <div v-if="passwordInputBox">
        <input
          type="text"
          placeholder="請輸新密碼"
          class="form-control"
          v-model="newUserPassword"
        />
        <button @click="saveUserPassword" class="btn btn-success mt-1 mb-3 w-100">更新</button>
      </div>
    </div>
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

const nameInputBox = ref(false);
const birthdateInputBox = ref(false);
const emailInputBox = ref(false);
const passwordInputBox = ref(false);

const newUserName = ref('');
const newUserBirthdate = ref('');
const newUserEmail = ref('');
const newUserPassword = ref('');

const displayNameInput = () => {
  nameInputBox.value = !nameInputBox.value;
};
const displayBirthdateInput = () => {
  birthdateInputBox.value = !birthdateInputBox.value;
};
const displayEmailInput = () => {
  emailInputBox.value = !emailInputBox.value;
};
const displayPasswordInput = () => {
  passwordInputBox.value = !passwordInputBox.value;
};

const saveUserName = async () => {
  await AuthStore.updateUserName(newUserName.value);
  nameInputBox.value = false;
};

const saveUserBirthdate = async () => {
  await AuthStore.updateUserBirthdate(newUserBirthdate.value);
  birthdateInputBox.value = false;
};

const saveUserEmail = async () => {
  await AuthStore.updateUserEmail(newUserEmail.value);
  emailInputBox.value = false;
};

const saveUserPassword = async () => {
  await AuthStore.updateUserPassword(newUserPassword.value);
  passwordInputBox.value = false;
};

onMounted(async () => {
  if (!userInfo.value.id) {
    isLoading.value = true;
    await AuthStore.getUserInfo();
    isLoading.value = false;
  }
});
</script>
