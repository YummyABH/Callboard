import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsnybillboard-production.up.railway.app/api',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhcnMuaGFyY2hpbGF2YUBtYWlsLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM3OTA1NjE0LCJleHAiOjE3Mzc5OTIwMTR9.4iuF3smbvxCk6rWoMz6QLJ21cPDv2FGSL5b9JcDmAqE'
  },
  async onResponse({ response }) {
    // console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})