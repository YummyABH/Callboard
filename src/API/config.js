import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsnybillboard-production.up.railway.app/api',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhcnMuaGFyY2hpbGF2YUBtYWlsLnJ1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM5NDM4MDM3LCJleHAiOjE3Mzk1MjQ0Mzd9.NxwggoclflgktzPap0Pi1ewYbgcG0S8rcGc94i2xsEE'
  },
  async onResponse({ response }) {
    // console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})