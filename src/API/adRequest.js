import { computed } from 'vue'
import { APIInstance } from './config'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

export const adAPIFilters = {
  async create() {
    try {
      const filterUrl = useFiltersProductsStore().filterUrl
      const url = computed(() => {
        let strUrl = '/ad'
        if (filterUrl.categoriesId) {
          strUrl = strUrl + '/' + filterUrl.categoriesId
        }
        if (filterUrl.subcategoryId) {
          strUrl = strUrl + '/' + filterUrl.subcategoryId
        }
        return strUrl
      })
      console.log('воооооот', url.value)

      return await APIInstance(url.value, {
        method: 'GET',
        params: useFiltersProductsStore().filteredParams
      })
    } catch (error) {
      console.log(error)
    }
  }
}
