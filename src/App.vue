<template>
  <div class="body">
    <NavBar v-if="!$route.meta.hide" class="sticky-top" />
    <router-view />
    <Footer v-if="!$route.meta.hide" class="footer" />
  </div>
</template>
<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
</script>
<style>
@import '../src/assets/style/fonts/font.css';
.body {
  min-height: 100vh;
  box-sizing: border-box;
  font-family: Open Huninn;
  background: #f8f0e5;
}
/* @media (min-width: 768px) {
  .body {
    margin-top: 73px;
  }
}
@media (min-width: 992px) {
  .body {
    margin-top: 154.703px;
  }
} */
</style>
