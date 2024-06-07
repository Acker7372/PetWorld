<template>
  <div class="container vw-100 min-vh-100 background">
    <div class="registerBox">
      <!-- 標題和Logo -->
      <div
        @click="router.push('/')"
        class="logoBox d-flex justify-content-center me-2"
        style="white-space: nowrap; cursor: pointer"
      >
        <img class="logo" src="../../assets/img/logo.svg" alt="Pet World Logo" />
        <h3 class="d-inline-block websiteName">Pet world</h3>
      </div>
      <!-- 創建新帳號提示 -->
      <h6 class="text-center ms-3">建立新帳號</h6>
      <!-- 註冊表單 -->
      <form @submit.prevent="submitForm">
        <!-- 電子郵件輸入 -->
        <div class="mb-3">
          <label for="email" class="form-label">電子郵件</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            aria-describedby="emailHelp"
          />
        </div>
        <!-- 密碼輸入 -->
        <div class="mb-3">
          <label for="Password1" class="form-label">密碼</label>
          <input
            type="password"
            id="Password1"
            class="form-control"
            minlength="5"
            maxlength="20"
            v-model="password"
          />
        </div>
        <!-- 確認密碼輸入 -->
        <div class="mb-3">
          <label for="Password2" class="form-label">確認密碼</label>
          <input
            type="password"
            id="Password2"
            class="form-control"
            v-model="confirmPassword"
            @input="checkPasswordMatch"
          />
          <!-- 密碼不一致時顯示紅色提示文字 -->
          <p v-if="passwordMismatch" class="text-danger">兩次輸入的密碼不一致</p>
        </div>
        <!-- 使用者名稱 -->
        <label for="userName" class="form-label">使用者名稱</label>
        <input type="text" id="userName" class="form-control" v-model="userName" />
        <!-- 出生日期，判斷是否可以領養 -->
        <label for="birthday" class="form-label mt-3">出生日期</label> <br />
        <input type="date" id="birthday" class="birthday" v-model="birthday" />
        <!-- 提交按鈕 -->
        <button type="submit" class="btn btn-primary w-100">繼續</button>
        <!-- 已有帳號導航 -->
        <div>
          <router-link :to="{ name: 'Login' }">已經有一個帳號？</router-link>
        </div>
      </form>
      <div>
        <span>先逛逛？</span>
        <u class="goBack" @click="goBack" style="cursor: pointer">回上一頁</u>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 定義反應性數據
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const userName = ref('');
const birthday = ref('');
const router = useRouter();
// 計算屬性，用於檢查密碼是否匹配
const passwordMismatch = computed(
  () => password.value !== confirmPassword.value && confirmPassword.value !== '',
);

// 表單提交處理函數
const submitForm = async () => {
  if (
    !email.value ||
    !password.value ||
    !confirmPassword.value ||
    !userName.value ||
    !birthday.value
  ) {
    alert('請填寫所有欄位。');
    return;
  }
  if (passwordMismatch.value) {
    alert('兩次輸入的密碼不一致！');
    return;
  }

  // 創建一個對象來保存用戶數據
  const userData = {
    userName: userName.value,
    password: password.value,
    email: email.value,
    birthdate: birthday.value,
  };

  try {
    // 發送POST請求到後端
    const response = await axios.post('https://petworld-server.zeabur.app/register', userData);

    // 檢查響應是否成功
    if (response.status === 200) {
      alert('註冊成功！');
      router.push({ name: 'Login' });
    }
  } catch (error) {
    console.error(error);
    if (error.response.data === 'Email已被註冊') {
      alert('您提供的Email已被註冊，請使用其他Email');
      return;
    } else {
      alert('註冊失敗。');
      return;
    }
  }
};
const goBack = () => {
  window.history.back();
};
</script>

<style scoped lang="scss">
.logoBox {
  position: relative;
  top: 10px;
}
h3 {
  font-family: 'Concert One', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.logo {
  width: 40px;
  height: 40px;
}
.birthday {
  border: 1px solid gainsboro;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 7px;
}
.goBack {
  color: #327cfb;
}

@media (min-width: 486px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: none;
    background-image: url(../../assets/img/background.gif);
    background-size: cover;
    .registerBox {
      background-color: #ffffffeb;
      width: 20rem;
      height: auto;
      border: 1px solid gainsboro;
      border-radius: 10px;
      padding: 1rem;
      margin: 20px 0;
      /* Logo樣式 */
      .logoBox {
        top: 0;
        img {
          width: 3rem;
          height: 3rem;
        }
        /* 網站名稱樣式 */
        .websiteName {
          font-size: 2rem;
          position: relative;
          top: 0.3rem;
        }
      }
      /* 提示文字樣式 */
      h6 {
        font-size: 1.5rem;
        //   position: relative;
        //   left: 10px;
        margin-bottom: 1rem;
      }
      .birthday {
        margin-bottom: 15px;
      }
    }
  }
}

/* 錯誤訊息文字樣式 */
.text-danger {
  color: #dc3545;
}
</style>
