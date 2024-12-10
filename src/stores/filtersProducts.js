import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { adAPIFilters } from '@/API/adRequest.js'
import { adAPIPagination } from '@/API/paginationRequest.js'

export const useFiltersProductsStore = defineStore('filter', () => {
  const route = useRoute()
  const data = ref([])
  const sortArg = ref()
  const itemsPerPage = 5
  const totatlItems = ref(0)

  watch(data, () => {
    sortData(sortArg.value)
  })

  const filterParams = reactive({
    adName: route?.query?.adName,
    minPrice: route?.query?.minPrice,
    maxPrice: route?.query?.maxPrice,
    regionId: route?.query?.regionId,
    page: route?.query?.page,
    limit: route?.query?.limit
  })

  const filterUrl = reactive({
    categoriesId: route?.query?.categoriesId,
    subcategoryId: route?.query?.subcategoryId
  })

  async function requestAd() {
    try {
      data.value = await adAPIFilters.create()
      totatlItems.value = data.value.length
    } catch (error) {
      console.log(error)
    }
  }

  async function nextPage() {
    data.value = await adAPIPagination.create()
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
      default:
    }
  }

  const filteredParams = computed(() => {
    return Object.fromEntries(Object.entries(filterParams).filter(([, value]) => value != null))
  })
  return { filterParams, data, filteredParams, sortArg, filterUrl, requestAd, sortData }
})
