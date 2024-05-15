import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimalsStore = defineStore('Animals', () => {
  const animalsData = ref([]);
  const selectedAnimalsData = ref([]);
  const favoriteAnimalId = ref();
  const currentPage = ref(1);
  const pageSize = 10;
  const selectRegion = ref('');
  const selectType = ref('');
  const selectGender = ref('');
  const data = ref([]);
  const isLoading = ref(false);
  const router = useRouter();
  const totalPages = computed(() => Math.ceil(data.value.length / pageSize));
  const currentAnimals = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return data.value.slice(start, end);
  });

  async function getAnimalsData() {
    try {
      const response = await axios.get(
        `https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL`,
      );
      animalsData.value = response.data;
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  }

  async function getSelectedAnimalsData() {
    try {
      const response = await axios.get(
        `https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&$top=&animal_kind=${selectType.value}&animal_sex=${selectGender.value}&animal_area_pkid=${selectRegion.value}`,
      );
      selectedAnimalsData.value = response.data;
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  }

  async function getFavoriteAnimalId() {
    try {
      const response = await axios.get('http://localhost:3000/favoriteAnimal', {
        headers: {
          Authorization: `${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      });
      favoriteAnimalId.value = response.data;
    } catch (error) {
      console.error('getFavoriteAnimalId失敗了', error);
    }
  }

  async function saveAnimalId(animal) {
    try {
      const animalId = { animalId: animal };

      const response = await axios.post('http://localhost:3000/favoriteAnimal', animalId, {
        headers: {
          Authorization: `${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      });
      getFavoriteAnimalId();
    } catch (error) {
      console.error('getFavoriteAnimalId失敗了', error);
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
    selectedAnimalsData,
    favoriteAnimalId,
    data,
    currentPage,
    totalPages,
    currentAnimals,
    selectRegion,
    selectGender,
    selectType,
    pageSize,
    isLoading,
    getAnimalsData,
    getSelectedAnimalsData,
    goToPage,
    getFavoriteAnimalId,
    saveAnimalId,
  };
});
