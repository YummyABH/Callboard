import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomePage from '@/page/HomePage.vue'
import CatalogPage from '@/page/CatalogPage.vue'
import AuthPage from '@/page/AuthPage.vue'
import ForgotPasswordPage from '@/components/auth/ForgotPasswordForm.vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { noBreadcrumbs: true }
    },
    {
      path: '/login',
      name: 'login',
      component: AuthPage,
      meta: { noBreadcrumbs: true, noHeader: true, noFooter: true, guestOnly: true } // Только для гостей
    },
    {
      path: '/register',
      name: 'register',
      component: AuthPage,
      meta: { noBreadcrumbs: true, noHeader: true, noFooter: true, guestOnly: true } // Только для гостей
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordPage,
      meta: { noBreadcrumbs: true, noHeader: true, noFooter: true, guestOnly: true }
    },
    //{
    //  path: '/profile',
    //  name: 'profile',
    //  component: ProfilePage,
    //  meta: { requiresAuth: true }
    //},
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogPage,
      label: 'Каталог',
      meta: { noBreadcrumbs: false },
      children: [
        {
          path: ':category', // динамический параметр для категории
          name: 'category',
          props: () => {
            const store = useFiltersProductsStore().labelList
            return { label: store.category }
          },
          component: CatalogPage, // можно оставить тот же компонент, если логика одна
          meta: { noBreadcrumbs: false },
          children: [
            {
              path: ':subcategory', // динамический параметр для подкатегории
              name: 'subcategory',
              props: () => {
                const store = useFiltersProductsStore().labelList
                return { label: store.subcategory }
              },
              component: CatalogPage,
              meta: { noBreadcrumbs: false }
            }
          ]
        }
      ]
    }
  ]
})

//router.beforeEach((to, from, next) => {
//  const isAuthenticated = localStorage.getItem('auth') // Простая проверка авторизации
//
//  // Проверка на доступ для гостей
//  if (to.meta.guestOnly && isAuthenticated) {
//    return next('/') // Редирект на главную, если пользователь уже авторизован
//  }
//
//  next()
//})

export default router
