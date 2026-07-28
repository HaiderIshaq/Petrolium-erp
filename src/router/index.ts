import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue'
import AppShell from '../components/AppShell.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'app',
      component: AppShell
    }
  ]
})

export default router
