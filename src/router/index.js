import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import HomePage from '@/page/HomePage.vue'
import CatalogPage from '@/page/CatalogPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage,
      label: 'Каталог'
    }
  ]
})

export default router