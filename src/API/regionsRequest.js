import { APIInstance } from './config'

export const regionsAPI = {
  async create() {
    return await APIInstance('/region')
  }
}
