import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/project/new',
      name: 'ProjectNew',
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: () => import('../views/ProjectView.vue'),
      props: true,
    },
  ],
})

export default router
