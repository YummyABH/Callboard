import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { adAPIFilters } from '@/API/adRequest.js'

export const useFiltersProductsStore = defineStore('filter', () => {
  const route = useRoute()

  const data = ref([])
  const sortArg = ref()

  watch(data, () => {
    sortData(sortArg.value)
  })

  const filterParams = reactive({
    adName: route?.query?.adName,
    minPrice: route?.query?.minPrice,
    maxPrice: route?.query?.maxPrice,
    regionId: route?.query?.regionId,
    categoriesId: route?.query?.categoriesId,
    subcategoryId: route?.query?.subcategoryId
  })

  /*const minPriceQuery = computed(() => route?.query?.minPrice)
  const maxPriceQuery = computed(() => route?.query?.maxPrice)*/

  async function requestAd() {
    try {
      data.value = await adAPIFilters.create()
    } catch (error) {}
  }

  /*watch((maxPriceQuery, minPriceQuery), () => {
    if (maxPriceQuery === undefined && minPriceQuery === undefined) {
      console.log(maxPriceQuery.value, minPriceQuery.value)
      filterParams.minPrice = minPriceQuery
      filterParams.maxPrice = maxPriceQuery
      requestAd()
    }
  })*/

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
        console.log(data.value)
    }
  }

  const filteredParams = computed(() => {
    return Object.fromEntries(Object.entries(filterParams).filter(([key, value]) => value != null))
  })
  return { filterParams, data, filteredParams, sortArg, requestAd, sortData }
})
