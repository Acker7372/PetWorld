import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('Loading', () => {
  const isLoading = ref(true);

  return {
    isLoading,
  };
});
