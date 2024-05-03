import { defineStore } from 'pinia';

export const useAuthStore = defineStore('Auth', () => {
  const isLoggedIn = () => {
    if (!localStorage.getItem('jwt')) {
      alert('請先登入！');
      return false;
    }
    return true;
  };

  const handleClick = (callBack) => {
    if (isLoggedIn()) {
      callBack();
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    alert('已登出！');
  };

  return {
    handleClick,
    logout,
    isLoggedIn,
  };
});
