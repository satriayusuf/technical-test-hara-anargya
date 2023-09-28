import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'heylink',
      component: () => import('@/layouts/Templating.vue'),
      children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/heylink/dashboard/Dashboard.vue')
        },
        {
            path: 'overview',
            name: 'overview',
            component: () => import('@/views/heylink/overview/Overview.vue')
        }
      ]
    },
  ]
})

export default router
