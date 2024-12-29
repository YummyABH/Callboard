import { APIInstance } from './config'

export const authAPI = {
  async register(data) {
    const url = '/user/register'
    return await APIInstance(url, {
      method: 'POST',
      body: data
    })
  },

  async login(credentials) {
    const url = '/user/login'
    return await APIInstance(url, {
      method: 'POST',
      body: credentials
    })
  }
}
