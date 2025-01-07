import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsnybillboard-production.up.railway.app/api',
  headers: {},
  async onResponse({ response }) {
    console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})

// error
// trow error
