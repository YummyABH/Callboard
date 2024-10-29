import { APIInstance } from './config'

export const categoriesAPI = {
  async create() {
    try {
      const url = '/category'
      return await APIInstance(url, {
        method: 'GET'
      })
    } catch (error) {
      throw error
    }
  }
}
