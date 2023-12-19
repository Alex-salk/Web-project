import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/login/LoginPage';
import HomePage from '../pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginPage },
    { path: '/Home', component: HomePage, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;