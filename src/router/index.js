import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/page/HomePage.vue'
import UserPage from '@/page/UserPage.vue'
import CatalogPage from '@/page/CatalogPage.vue'
import AuthPage from '@/page/AuthPage.vue'
import ForgotPasswordPage from '@/components/auth/ForgotPasswordForm.vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { noBreadcrumbs: true }
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
    {
      path: '/user',
      name: 'user',
      component: UserPage,
      meta: { noBreadcrumbs: true }
    }
  ]
})
// const authData = {
//   isAuth: true,
//   role: 'admin'
// }
// const rulesPattern = {
//   admin: ['/', '/login', '/catalog*'],
//   manager: ['']
// }
// router.beforeEach((to, from, next) => {
//   if (!authData.isAuth) next('/login')
//   const isAccess = rulesPattern[authData.role].includes(to.path)

//   if (!isAccess) {
//     // Если текущий маршрут совпадает с предыдущим, предотвратить зацикливание
//     if (to.path === from.path) {
//       return next(false) // Остановить навигацию
//     }
//     return next(from)
//   }
//   next()
// })

export default router
