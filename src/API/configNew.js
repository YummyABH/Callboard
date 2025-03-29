import { $fetch } from 'ofetch'
import { authAPI } from '@/API/auth'

const { refresh, logout, check } = authAPI()

export const APIInstance = $fetch.create({
  baseURL: 'https://apsny-billboard-production.up.railway.app/api',

  async onRequest({ request, options }) {
    let statusToken = {};
    if (sessionStorage.getItem('access_token')) {
      statusToken = await check(sessionStorage.getItem('access_token'))
    }
    if (!statusToken?.is_alive && Object.keys(statusToken).includes('is_alive')) {
      const refreshToken = localStorage.getItem('refresh_token')
      const responseRefresh = await refresh(refreshToken)
      if (responseRefresh.accessToken) {
        sessionStorage.setItem('access_token', responseRefresh.accessToken);
        options.headers = request?.headers || {}
        options.headers['Authorization'] = `Bearer ${responseRefresh.accessToken}`
      } else {
        logout(refreshToken)
        sessionStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        location.reload()
      }
    } else {
      const token = sessionStorage.getItem('access_token')
      if (token) {
        options.headers = request?.headers || {}
        options.headers['Authorization'] = `Bearer ${token}`
      }
    }
  },

  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})

export const refreshInstance = $fetch.create({
  baseURL: 'https://apsny-billboard-production.up.railway.app/api',

  async onRequest({ request, options }) {
    const token = localStorage.getItem('refresh_token')
    if (token) {
      options.headers = request?.headers || {}
      options.headers['Authorization'] = `Bearer ${token}`
    }
  },
  async onResponse({ response }) {
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})
