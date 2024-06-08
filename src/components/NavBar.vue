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
            <router-link class="nav-link" :to="{ name: 'LostPetFinder' }">走失協尋</router-link>
          </li>
          <li class="nav-item" @click="showSorryAlert">
            <a class="nav-link" href="#" @click.prevent>寵物送別</a>
          </li>
          <li class="nav-item" v-if="!AuthStore.isLoggedIn()">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
          <li class="nav-item" v-if="!AuthStore.isLoggedIn()">
            <router-link class="nav-link" to="/register">註冊</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn()">
            <router-link class="nav-link" to="/favoriteAnimals">我的收藏</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn()">
            <router-link class="nav-link" :to="{ name: 'MemberProfile' }">會員中心</router-link>
          </li>
          <li class="nav-item" v-if="AuthStore.isLoggedIn()" @click="AuthStore.logout">
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
import { ref, onMounted } from 'vue';
const AuthStore = useAuthStore();

const showSorryAlert = () => {
  alert('這個功能正在施工中! Sorry!');
};
// const navbarToggle = ref(null);

// onMounted(() => {
//   navbarToggle.value = document.querySelector('.navbar-toggler');
// });

// const collapseNavbar = () => {
//   navbarToggle.value.click();
// };
</script>

<style scoped lang="scss">
nav {
  border-bottom: 1px solid #a2dcc11e;
  background: #f5ebeb;
  .nav-box {
    width: 100vw;
    .logo-box {
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translateX(-50%);
      a {
        img {
          width: 40px;
          height: 40px;
        }
        .websiteName {
          // font-weight: 400;
          font-style: normal;
          position: relative;
          top: 0.2rem;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  nav {
    .nav-box {
      display: flex;
      margin-bottom: 10px;
      .logo-box {
        position: static;
        transform: none;
        margin: 0 2rem;
        margin-top: 3px;
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
      margin-bottom: 0px;
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
