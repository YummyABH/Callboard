import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://apsny-billboard-production.up.railway.app/api',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOjEsImF1dGhfcHJvdmlkZXIiOiJ0ZWxlZ3JhbSIsInByb3ZpZGVyX3VzZXJfaWQiOjk0NjE3NDQzMCwiaWF0IjoxNzQyODQ2MTEwLCJleHAiOjE3NDI4NDcwMTB9.Tqr4EBYcqt_Qkudjj-x8M9uBzU2sUnobwallLaYCjxY'
  },
  async onResponse({ response }) {
    // console.log(response)
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  }
})