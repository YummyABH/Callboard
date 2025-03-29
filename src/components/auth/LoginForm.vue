<script setup>
import FormInput from '@/components/ui/input/FormInput.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value })
  } catch (error) {
    console.error('Ошибка входа:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <FormInput
      id="email"
      label="Email"
      type="email"
      v-model="email"
      required
      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    />
    <FormInput
      id="password"
      label="Пароль"
      type="password"
      v-model="password"
      required
      :minlength="8"
    />
    <button
      type="submit"
      class="cursor-pointer duration-200 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 "
    >
      Войти
    </button>
    <p class="text-center text-sm  mt-2 hover:underline">
      <router-link to="/forgot-password" class="text-blue-500 hover:text-gray-700 active:green-400">
        Забыли пароль?
      </router-link>
    </p>
  </form>
</template>
