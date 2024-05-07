<template>
  <div class="container">
    <SelectFilter class="my-lg-5 my-3" />
    <div class="row justify-content-center">
      <AnimalCard />
    </div>
    <Pagination class="d-flex justify-content-center" />
  </div>
</template>
<style scoped lang="scss">
</style>

<script setup>
import AnimalCard from '@/components/AnimalCard.vue';
import Pagination from '@/components/Pagination.vue';
import SelectFilter from '@/components/SelectFilter.vue';
</script>
