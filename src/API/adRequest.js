import { APIInstance } from './config'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

export const adAPIFilters = {
  async create() {
    try {
      const categoriesActive = useFiltersProductsStore().filteredCategories
      let pathStr = ''
      if (Object.keys(categoriesActive).length === 1) {
        pathStr = `/${categoriesActive.categoriesId}`
      } else if (Object.keys(categoriesActive).length === 2) {
        pathStr = `/${categoriesActive.categoriesId}/${categoriesActive.subcategoryId}`
      }
      const url = `/ad${pathStr}`

      return await APIInstance(url, {
        method: 'GET',
        params: useFiltersProductsStore().filteredParams
      })
    } catch (error) {
      console.log(error)
    }
  }
}
