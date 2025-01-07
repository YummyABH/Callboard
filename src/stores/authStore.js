import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authAPI } from '@/API/auth.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const [register, login] = authAPI()

  async function useLogin(credentials) {
    try {
      const response = await login(credentials)
      user.value = response.user
      token.value = response.token
    } catch (error) {
      console.error('Ошибка входа:', error)
    }
  }
  async function useRegister(data) {
    try {
      const response = await register(data)
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

  return { useLogin, useRegister, logout, user, token }
})
