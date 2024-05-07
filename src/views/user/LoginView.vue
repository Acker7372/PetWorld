<template>
  <div class="container vw-100 vh-100 background">
    <div class="loginBox">
      <div class="d-flex justify-content-center me-3 logoBox">
        <img class="logo" src="../../assets/img/logo.svg" alt="" />
        <h3 class="d-inline-block websiteName">Pet world</h3>
      </div>
      <h6 class="text-center ms-4">歡迎回來！</h6>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="Email" class="form-label">電子郵件</label>
          <input
            type="email"
            class="form-control"
            id="Email"
            aria-describedby="emailHelp"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="Password" class="form-label">密碼</label>
          <input type="password" class="form-control" id="Password" v-model="password" />
        </div>
        <div class="mb-3">
          <a href="#">忘記您的密碼？</a>
        </div>
        <button type="submit" class="btn btn-primary w-100">登入</button>
        <div>
          <span>需要一個帳號？</span>
          <router-link :to="{ name: 'Register' }">註冊</router-link>
        </div>
      </form>
      <div>
        <span>先逛逛？</span>
        <u class="goBack" style="cursor: pointer" @click="goBack">回上一頁</u>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const email = ref('');
const password = ref('');

const submitForm = async () => {
  if (!email.value || !password.value) {
    alert('請輸入帳號及密碼！');
    return;
  }
  const userData = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await axios.post('http://localhost:3000/login', userData);
    if (response.status === 200) {
      localStorage.setItem('jwt', response.data.token);
      alert('登錄成功！');
      router.push({ name: 'Animals' });
    }
  } catch (error) {
    console.error(error);
    alert(error.response.data);
    return;
  }
};

const goBack = () => {
  window.history.back();
};
</script>

<style scoped lang="scss">
.background {
  background-color: rgb(252, 249, 249);
}
.goBack {
  color: #327cfb;
}
.logoBox {
  // width: 90vw;
  position: relative;
  top: 10px;
  .logo {
    width: 40px;
    height: 40px;
  }
  .websiteName {
    position: relative;
    top: 0.1rem;
    font-family: 'Concert One', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
}
@media (min-width: 486px) {
  .background {
    background-image: url(../../assets/img/background.gif);
    background-size: cover;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: none;
  }
  .loginBox {
    background-color: #ffffffeb;
    width: 20rem;
    height: auto;
    border: 1px solid gainsboro;
    border-radius: 10px;
    padding: 2rem;
    img {
      width: 4rem;
      height: 4rem;
    }
    .websiteName {
      font-size: 2rem;
      position: relative;
      top: -0.3rem;
    }
    h6 {
      font-size: 1.5rem;
      // position: relative;
      // left: 14px;
      margin-bottom: 1rem;
    }
  }
}
</style>
