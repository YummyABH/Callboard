import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { adAPIFilters } from '@/API/adRequest.js'

export const useFiltersProductsStore = defineStore('filter', () => {
  const route = useRoute()
  const router = useRouter()
  const data = ref([])
  const sortArg = ref('default')
  const { create } = adAPIFilters()

  const filterParams = reactive({
    adName: route?.query?.adName,
    minPrice: route?.query?.minPrice,
    maxPrice: route?.query?.maxPrice,
    regionId: route?.query?.regionId,
    page: route?.query?.page ? route.query.page : 1,
    limit: 7
  })

  const totalItems = ref()

  const totalPages = computed(() => Math.ceil(totalItems.value / filterParams.page))

  watch(data, () => {
    sortData(sortArg.value)
  })

  const filterUrl = reactive({
    categoriesId: route.params.category,
    subcategoryId: route.params.subcategory
  })

  const labelList = reactive({
    category: null,
    subcategory: null
  })

  const urlCreate = computed(() => {
    let pathStr = ''
    if (Object.keys(filteredCategories.value).length === 1) {
      pathStr = `/${filteredCategories.value.categoriesId}`
    } else if (Object.keys(filteredCategories.value).length === 2) {
      pathStr = `/${filteredCategories.value.categoriesId}/${filteredCategories.value.subcategoryId}`
    }
    return pathStr
  })

  async function requestAd() {
    const response = await create(urlCreate.value)
    totalItems.value = response.total
    data.value = response.ads

    sortData(sortArg.value)
  }

  function sortData(sortArg) {
    switch (sortArg) {
      case 'maxPrice':
        return data.value.sort((a, b) => {
          return b.price - a.price
        })
      case 'minPrice':
        return data.value.sort((a, b) => {
          return a.price - b.price
        })
      case 'default':
        return data.value.sort((a, b) => {
          return new Date(b.dateOfPublication) - new Date(a.dateOfPublication)
        })
    }
  }

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      let oldPathArray = oldPath.split('/').filter(Boolean)
      let newPathArray = newPath.split('/').filter(Boolean)
      if (newPathArray.length < oldPathArray.length) {
        APIFilter()
      }

      // if (route.path !== route.matched[0].path) {
      //   console.log('отработало', route.path, route.matched[0].path)
      //   filterParams.regionId = null
      //   APIFilter()
      // }
    }
  )

  const filteredParams = computed(() => {
    return Object.fromEntries(Object.entries(filterParams).filter(([, value]) => value != null))
  })

  const filteredCategories = computed(() => {
    return Object.fromEntries(
      Object.entries(filterUrl).filter(([, value]) => value != null && value != undefined)
    )
  })

  async function APIFilter() {
    filterParams.adName = null
    filterParams.maxPrice = null
    filterParams.minPrice = null
    filterParams.page = 1

    filterUrl.categoriesId = route.params.category
    filterUrl.subcategoryId = route.params.subcategory

    labelList.category = router.options.routes[1].children[0].props().label
    labelList.subcategory = router.options.routes[1].children[0].children[0].props().label

    requestAd()
  }

  return {
    filterParams,
    data,
    filteredParams,
    filteredCategories,
    sortArg,
    filterUrl,
    labelList,
    totalPages,
    totalItems,
    urlCreate,
    requestAd,
    sortData
  }
})
