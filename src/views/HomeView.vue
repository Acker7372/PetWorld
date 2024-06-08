<template>
  <Loading v-if="!isLoaded" />
  <div v-if="isLoaded" class="container min-vh-100">
    <div class="logo">
      <img src="../assets/img/homeImg/PetWorldLogo-removebg.png" alt="" />
    </div>
    <div class="slogan">
      <p>來領養</p>
      <p>可愛的浪浪吧!</p>
    </div>
    <div class="sloganImgLeft">
      <transition name="fade">
        <img :src="leftImages[currentImage]" alt="" key="leftImages[currentImage]" />
      </transition>
    </div>
    <div class="sloganImgRight">
      <transition name="fade">
        <img :src="rightImages[currentImage]" alt="" key="rightImages[currentImage]" />
      </transition>
    </div>
    <div class="publicAdopt router">
      <router-link class="nav-link" :to="{ name: 'Animals' }">公立領養</router-link>
    </div>
    <div class="lostPetFinder router">
      <router-link class="nav-link" :to="{ name: 'LostPetFinder' }">走失協尋</router-link>
    </div>
    <div class="petFuneral router" @click="showSorryAlert">寵物送別</div>
    <div class="loginOrRegister router">
      <router-link v-if="!AuthStore.isLoggedIn()" class="nav-link" to="/login"
        >會員登入或註冊</router-link
      >
      <router-link
        v-if="AuthStore.isLoggedIn()"
        @click="AuthStore.logout"
        class="nav-link"
        to="/login"
        >登出帳號</router-link
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/style/fonts/font.css';
.container {
  font-family: ChenYuluoyan-center;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  .logo {
    grid-column: 2/6;
    grid-row: 1/3;
    align-self: center;
    display: flex;
    justify-content: center;
    img {
      width: min(100%, 300px);
      height: auto;
      // transform: rotate(-10deg);
    }
  }
  .slogan {
    grid-column: 2/6;
    grid-row: 3/5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-size: min(8vw, 60px);
      white-space: nowrap;
      font-weight: 900;
      color: #49a971;
      margin: 0;
    }
  }
  .sloganImgRight,
  .sloganImgLeft {
    display: flex;
    align-items: center;
  }
  .sloganImgLeft {
    grid-column: 1/2;
    grid-row: 7/9;
    justify-content: end;
    img {
      width: min(100%, 150px);
      height: auto;
    }
  }
  .sloganImgRight {
    grid-column: 6/7;
    grid-row: 4/6;
    img {
      width: min(100%, 150px);
      height: auto;
    }
  }
  .publicAdopt {
    grid-column: 2/6;
    grid-row: 6/7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: min(5vw, 30px);
    color: #000000;
  }
  .lostPetFinder {
    grid-column: 2/6;
    grid-row: 7/8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: min(5vw, 30px);
    color: #000000;
  }
  .petFuneral {
    grid-column: 2/6;
    grid-row: 8/9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: min(5vw, 30px);
    color: #000000;
  }
  .loginOrRegister {
    grid-column: 2/6;
    grid-row: 9/10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: min(5vw, 30px);
    color: #000000;
  }
  .router {
    font-family: 'Taipei';
    cursor: pointer;
    // font-weight: 900;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

//slogan入場動畫
.container {
  .slogan {
    p:nth-child(1) {
      animation: slideInFromLeft 5s ease-out;
    }
    p:nth-child(2) {
      animation: slideInFromRight 5s ease-out;
    }
  }
  // .sloganImgLeft {
  //   animation: slideInFromLeft 2s ease-out;
  // }
  // .sloganImgRight {
  //   animation: slideInFromRight 2s ease-out;
  // }
}
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideInFromRight {
  0% {
    transform: translateX(10%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 2;
  }
}
</style>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 1;
}
</style>
<script setup>
import { ref, onMounted, h } from 'vue';
import sadDog from '@/assets/img/homeImg/sadDog.png';
import sadCat from '@/assets/img/homeImg/sadCat.png';
import studentCat from '@/assets/img/homeImg/studentCat.png';
import sanpoDog from '@/assets/img/homeImg/sanpoDog.png';
import catAndMan from '@/assets/img/homeImg/catAndMan.png';
import dogAndWoman from '@/assets/img/homeImg/dogAndWoman.png';
import { useAuthStore } from '@/stores/auth';
import Loading from '@/components/Loading.vue';
import FontFaceObserver from 'fontfaceobserver';
import { ElNotification } from 'element-plus';

// const AuthStore = useAuthStore();
const rightImages = ref([sadDog, sadCat, studentCat]);
const leftImages = ref([sanpoDog, catAndMan, dogAndWoman]);
const currentImage = ref(0);
const AuthStore = useAuthStore();

const isLoaded = ref(false);
const imageSources = [...rightImages.value, ...leftImages.value];
const font = new FontFaceObserver('ChenYuluoyan-center');

const loadImage = (image) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.src = image;
  });
};

const loadFontsAndImages = async () => {
  await Promise.all(imageSources.map(loadImage));
  await font.load(null, 20000);
  isLoaded.value = true;
};

const showSorryAlert = () => {
  ElNotification({
    title: '道歉訊息',
    message: h('i', { style: 'color: teal' }, '這個頁面還在施工中！不好意思！！！'),
  });
};
onMounted(async () => {
  loadFontsAndImages();
  setInterval(() => {
    currentImage.value = (currentImage.value + 1) % leftImages.value.length;
  }, 3000);
});
</script>
