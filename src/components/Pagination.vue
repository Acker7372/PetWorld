<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link prev" @click.prevent="handlePageClick(currentPage - 1)">
          <span class="d-none d-md-inline">上一頁</span>
          <span class="d-inline d-md-none"><<</span>
        </button>
      </li>
      <li
        class="page-item"
        v-for="page in pageNumbers"
        :class="{ active: currentPage === page }"
        :key="page"
        :aria-current="currentPage === page ? 'page' : undefined"
      >
        <button class="page-link" @click.prevent="handlePageClick(page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link next" @click.prevent="handlePageClick(currentPage + 1)">
          <span class="d-none d-md-inline">下一頁</span>
          <span class="d-inline d-md-none">>></span>
        </button>
      </li>
    </ul>
  </nav>
</template>
<style scoped></style>

<script setup>
import { ref, computed } from 'vue';
import { useAnimalsStore } from '@/stores/animals';
import { storeToRefs } from 'pinia';

const AnimalsStore = useAnimalsStore();
const { currentPage, totalPages } = storeToRefs(AnimalsStore);

const siblingCount = 2; // 當前頁碼前後顯示的頁碼數量
const pageNumbers = computed(() => {
  const totalNumbers = siblingCount * 2 + 0; // 總顯示的頁碼數量
  const totalBlocks = totalNumbers + 2; // 總顯示的頁碼數量加上首尾頁碼

  if (totalPages.value > totalBlocks) {
    const startPage = Math.max(1, currentPage.value - siblingCount);
    const endPage = Math.min(totalPages.value - 1, currentPage.value + siblingCount);

    let pages = range(startPage, endPage);

    const hasLeftSpill = startPage > 2;
    const hasRightSpill = totalPages.value - endPage > 1;
    const spillOffset = totalNumbers - (pages.length + 1);

    if (hasLeftSpill && !hasRightSpill) {
      const extraPages = range(startPage - spillOffset, startPage - 1);
      pages = [1, ...extraPages, ...pages];
    } else if (!hasLeftSpill && hasRightSpill) {
      const extraPages = range(endPage + 1, endPage + spillOffset);
      pages = [...pages, ...extraPages, totalPages.value];
    } else {
      pages = [1, ...pages, totalPages.value];
    }

    return pages;
  }

  return range(1, totalPages.value);
});

function range(start, end) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

function handlePageClick(page) {
  AnimalsStore.goToPage(page);
  window.scrollTo(0, 0); // 在AnimalsStore.goToPage(page)完成後滾動到頁面頂部
}
</script>
