import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('Auth', () => {
  const router = useRouter();
  const userInfo = ref({});

  async function getUserInfo() {
    try {
      const response = await axios.get('http://localhost:3000/userInfo', {
        headers: {
          Authorization: `${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      userInfo.value = response.data;
      console.log(userInfo.value);
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  }

  const isLoggedIn = () => {
    if (!localStorage.getItem('jwt')) {
      alert('請先登入！');
      router.push({ name: 'Login' });
      return false;
    }
    return true;
  };

  const executeIfLoggedIn = async (callBack) => {
    if (isLoggedIn()) {
      await callBack();
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    alert('您已登出！');
  };

  const reloadPage = () => {
    location.reload(true);
  };

  return {
    userInfo,
    logout,
    isLoggedIn,
    reloadPage,
    executeIfLoggedIn,
    getUserInfo,
  };
});
