import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('Auth', () => {
  const router = useRouter();
  const isLoggedIn = () => {
    if (!localStorage.getItem('jwt')) {
      alert('請先登入！');
      router.push({ name: 'Login' });
      return false;
    }
    return true;
  };

  const executeIfLoggedIn = async(callBack) => {
    if (isLoggedIn()) {
      await callBack();
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    alert('已登出！');
  };

  const reloadPage = () => {
    location.reload(true);
  };

  return {
    logout,
    isLoggedIn,
    reloadPage,
    executeIfLoggedIn,
  };
});
