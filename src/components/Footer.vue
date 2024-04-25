<template>
  <div class="footerBox d-flex justify-content-center py-3">
    <div class="logoBox d-flex align-items-center">
      <img src="../assets/img/logo.svg" alt="img" />

      <span class="websiteName">Pet world</span>
    </div>
    <div class="logoBox d-flex align-items-center ms-1">流浪動物領養平台</div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.footerBox {
  background: rgb(236, 231, 231);
  .logoBox {
    img {
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 15px;
      font-family: 'Concert One', sans-serif;
      font-weight: 100;
      font-style: normal;
    }
  }
  div {
    font-size: 15px;
  }
}
</style>
