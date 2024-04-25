import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimalsStore = defineStore('Animals', () => {
  const animalsData = ref([]);
  const currentPage = ref(1);
  const pageSize = 20;
  const selectRegion = ref('');
  const selectType = ref('');
  const selectGender = ref('');
  const totalPages = computed(() => Math.ceil(animalsData.value.length / pageSize));

  const currentAnimals = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return animalsData.value.slice(start, end);
  });

  async function getAnimalsData() {
    try {
      const response = await axios.get(
        `https://data.coa.gov.tw/service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=&animal_kind=${selectType.value}&animal_sex=${selectGender.value}&animal_area_pkid=${selectRegion.value}`,
      );
      animalsData.value = response.data;
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages.value) {
      return;
    }
    currentPage.value = page;
  }

  return {
    animalsData,
    currentPage,
    totalPages,
    currentAnimals,
    selectRegion,
    selectGender,
    selectType,
    getAnimalsData,
    goToPage,
  };
});
