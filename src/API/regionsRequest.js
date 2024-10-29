import { APIInstance } from './config'

export const regionsAPI = {
  async create() {
    try {
      const url = '/region'
      return await APIInstance(url, {
        method: 'GET'
      })
    } catch (error) {
      throw error
    }
  }
}
