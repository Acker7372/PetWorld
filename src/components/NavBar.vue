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
      <div class="test">
        <div class="logo-box">
          <a class="navbar-brand" href="#"
            ><img src="../assets/img/logo.svg" alt="img" /><span class="websiteName"
              >Pet world</span
            ></a
          >
        </div>
        <div class="no-box"></div>
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
          <li class="nav-item">
            <router-link class="nav-link" to="/login">登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">註冊</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped lang="scss">
nav {
  background: #e9e7e7;
  .nav-box {
    width: 100vw;
    .test {
      width: 70%;
      display: inline-flex;
      justify-content: center;
      position: relative;
      left: 5%;
      .logo-box {
        a {
          img {
            width: 50px;
            height: 50px;
          }
          .websiteName {
            font-family: 'Concert One', sans-serif;
            font-weight: 400;
            font-style: normal;
            position: relative;
            top: 0.2rem;
            // color: aliceblue;
          }
        }
      }
      .no-box {
        width: 69.5px;
        height: 49.5px;
      }
    }
  }
}
@media (min-width: 768px) {
  nav {
    .nav-box {
      display: flex;
      .test {
        width: auto;
        justify-content: flex-start;
        .logo-box {
          margin-left: 5px;
        }
        .no-box {
          width: 8vw;
        }
      }
      .collapse {
        margin-top: 3px;
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
      .test {
        left: 0;
        bottom: 20px;
        .no-box {
          display: none;
        }
        .logo-box {
          a {
            img {
              width: 80px;
              height: 80px;
              position: relative;
              bottom: 20px;
            }
            span {
              font-size: 4rem;
            }
          }
        }
      }
      .collapse {
        margin-top: -30px;
      }
    }
  }
}
</style>
