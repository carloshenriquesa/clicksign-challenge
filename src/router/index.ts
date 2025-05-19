import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/project/new',
      name: 'Novo Projeto',
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/project/:projectId',
      name: 'Projeto',
      component: () => import('../views/ProjectView.vue'),
      props: true,
    },
  ],
})

export default router
