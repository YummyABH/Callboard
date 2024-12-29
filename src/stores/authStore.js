import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authAPI } from '@/API/auth.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)

  async function login(credentials) {
    try {
      const response = await authAPI.login(credentials)
      user.value = response.user
      token.value = response.token
    } catch (error) {
      console.error('Ошибка входа:', error)
    }
  }
  async function register(data) {
    try {
      const response = await authAPI.register(data)
      user.value = response.user
      token.value = response.token
    } catch (error) {
      console.error('Ошибка регистрации:', error)
    }
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { login, register, logout, user, token }
})
