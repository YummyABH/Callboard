import { APIInstance } from './config'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const adAPIFilters = () => {
  const create = async (pathStr) => {
    return await APIInstance(`/ad${pathStr}`, {
      method: 'GET',
      params: useFiltersProductsStore().filteredParams
    })
  }
  return { create }
}

export { adAPIFilters }
