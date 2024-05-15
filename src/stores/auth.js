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

  const updateUserName = async (newUserName) => {
    try {
      const response = await axios.patch(
        'http://localhost:3000/userInfo/updateName',
        {
          userName: newUserName,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      await getUserInfo();
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  };

  const updateUserBirthdate = async (newUserBirthdate) => {
    try {
      const response = await axios.patch(
        'http://localhost:3000/userInfo/updateBirthdate',
        {
          userBirthdate: newUserBirthdate,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      await getUserInfo();
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  };

  const updateUserEmail = async (newUserEmail) => {
    try {
      const response = await axios.patch(
        'http://localhost:3000/userInfo/updateEmail',
        {
          userEmail: newUserEmail,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem('jwt', response.data.token);
      await getUserInfo();
    } catch (error) {
      console.error('Api調用失敗了', error);
    }
  };

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
    updateUserName,
    updateUserBirthdate,
    updateUserEmail,
  };
});
