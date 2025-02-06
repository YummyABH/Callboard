import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsnybillboard-production.up.railway.app/api',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhcnMuaGFyY2hpbGF2YUBtYWlsLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4ODM2NzU2LCJleHAiOjE3Mzg5MjMxNTZ9.ZGGNoe0WPGUVvO8mjVA-fWvSLL9FFgYeNYfhiBH9zOo'
  },
  async onResponse({ response }) {
    // console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})