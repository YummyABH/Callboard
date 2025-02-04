import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsnybillboard-production.up.railway.app/api',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhcnMuaGFyY2hpbGF2YUBtYWlsLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4NjY1OTAwLCJleHAiOjE3Mzg3NTIzMDB9.kZZv7anCGvK2GGrXsCp4FWbO42OsnIhNujSs-IFopFQ'
  },
  async onResponse({ response }) {
    // console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})