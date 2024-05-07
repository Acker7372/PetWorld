import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/user/LoginView.vue'),
      meta: { hide: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/user/RegisterView.vue'),
      meta: { hide: true },
    },
    {
      path: '/animals',
      name: 'Animals',
      component: () => import('../views/animal/AnimalsView.vue'),
    },
    {
      path: '/animal/:animalId',
      name: 'AnimalDetails',
      component: () => import('../views/animal/AnimalDetailsView.vue'),
    },
    {
      path: '/favoriteAnimals',
      name: 'FavoriteAnimals',
      component: () => import('../views/animal/FavoriteAnimalsView.vue'),
    },
    {
      path: '/memberProfile',
      name: 'MemberProfile',
      component: () => import('../views/user/MemberProfileView.vue'),
    }
  ],
});

export default router;
