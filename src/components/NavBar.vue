<template>
  <nav class="navbar navbar-expand-md navbar-light">
    <div class="nav-box">
      <button
        class="navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="logo-box">
        <a class="navbar-brand m-0" href="#"
          ><img src="../assets/img/logo.svg" alt="img" /><span class="websiteName"
            >Pet world</span
          ></a
        >
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-3 ms-md-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Animals' }">公立領養</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">領養認養</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">走失協尋</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">寵物送別</a>
          </li>
          <li class="nav-item" v-if="!AuthStore.isLoggedIn">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
          <li class="nav-item" v-if="!AuthStore.isLoggedIn">
            <router-link class="nav-link" to="/register">註冊</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn">
            <router-link class="nav-link" to="/favoriteAnimals">我的收藏</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn">
            <router-link class="nav-link" :to="{ name: 'MemberProfile' }">會員中心</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn" @click="AuthStore.logout">
            <router-link class="nav-link" to="/login">登出</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const AuthStore = useAuthStore();
</script>

<style scoped lang="scss">
nav {
  background: #e9e7e7;
  .nav-box {
    width: 100vw;

    .logo-box {
      position: absolute;
      left: 50%;
      top: 5px;
      transform: translateX(-50%);
      a {
        img {
          width: 25px;
          height: 25px;
        }
        .websiteName {
          // font-weight: 400;
          font-style: normal;
          position: relative;
          top: 0.2rem;
          // color: aliceblue;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  nav {
    .nav-box {
      display: flex;
      .logo-box {
        position: static;
        transform: none;
        margin: 0 2rem;
      }
      #navbarSupportedContent {
        ul {
          position: absolute;
          right: 5px;
          top: 12px;
        }
      }
    }
  }
}

@media (min-width: 992px) {
  nav {
    .nav-box {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo-box {
        a {
          position: relative;
          top: -20px;
          img {
            width: 70px;
            height: 70px;
            position: relative;
            bottom: 15px;
          }
          span {
            font-size: 3.5rem;
          }
        }
      }

      #navbarSupportedContent {
        ul {
          position: static;
        }
      }
    }
    .collapse {
      margin-top: -30px;
    }
  }
}
</style>
