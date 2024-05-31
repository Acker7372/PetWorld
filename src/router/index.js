import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { hide: true },
    },
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
    },
    {
      path: '/lostPetFinder',
      name: 'LostPetFinder',
      component: () => import('../views/animal/LostPetFinderView.vue'),
    },
    {
      path: '/lostPetFinder/:lostPetId',
      name: 'lostPetDetails',
      component: () => import('../views/animal/LostPetDetailsView.vue'),
    },
  ],
});

router.afterEach(() => {
  const navbar = document.querySelector('.navbar-collapse');
  if (navbar.classList.contains('show')) {
    navbar.classList.remove('show');
  }
});

export default router;
