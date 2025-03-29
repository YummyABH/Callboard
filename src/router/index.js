import HomePage from '@/page/HomePage.vue'
import UserPage from '@/page/UserPage.vue'
import CatalogPage from '@/page/CatalogPage.vue'
// import AuthPage from '@/page/AuthPage.vue'
// import BaseProfile from '@/components/user/profile/BaseProfile.vue'
// import ForgotPasswordPage from '@/components/auth/ForgotPasswordForm.vue'
import BaseMyAds from '@/components/user/myAds/BaseMyAds.vue'
import ViewAdPage from '@/page/ViewAdPage.vue'
// import BaseFavorites from '@/components/user/favorites/BaseFavorites.vue'
import UploadingAdPage from '@/page/UploadingAdPage.vue'
import UserEditAd from '@/page/UserEditAd.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
// import AboutUs from '@/page/AboutUs.vue'

const authGuard = function (to, from, next) {
  const isAuth = localStorage.getItem('refresh_token') || null   
  // const responce = authAPI.check(isAuth)
  if (isAuth == null) next({ path: '/catalog' })
  else next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { noBreadcrumbs: true }
    },
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
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: AuthPage,
    //   meta: { noBreadcrumbs: true, noHeader: true, noFooter: true, guestOnly: true } // Только для гостей
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: AuthPage,
    //   meta: { noBreadcrumbs: true, noHeader: true, noFooter: true, guestOnly: true } // Только для гостей
    // },
    {
      path: '/user',
      name: 'user',
      component: UserPage,
      meta: { noBreadcrumbs: true },
      children: [
        {
          path: '/create',
          name: 'uploadingAd',
          component: UploadingAdPage,
          beforeEnter: authGuard,
          meta: { noBreadcrumbs: true }
        },
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: BaseProfile,
        //   meta: { requiresAuth: true }
        //  },
         {
          path: 'my-ads',
          name: 'my-ads',
          component: BaseMyAds,
          meta: {noBreadcrumbs: true},
         },
        //  {
        //   path: 'favorites',
        //   name: 'favorites',
        //   component: BaseFavorites,
        //   meta: {noBreadcrumbs: true}
        //  },
        ]
    },
    {
      path: '/ad/create',
      name: 'uploadingAd',
      component: UploadingAdPage,
      beforeEnter: authGuard,
      meta: { noBreadcrumbs: true }
    },
    {
      path: '/ad/:category/:id/:slug',
      name: 'ViewAdPage',
      component: ViewAdPage,
      meta: { noBreadcrumbs: true }
    },
    {
      path: '/user/my-ads/:id/edit',
      name: 'UserEditAd',
      component: UserEditAd,
      beforeEnter: authGuard,
      meta: { noBreadcrumbs: true }
    },
    // {
    //   path: '/about-us',
    //   name: 'AboutUs',
    //   component: AboutUs,
    //   meta: { noBreadcrumbs: true }
    // }
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
