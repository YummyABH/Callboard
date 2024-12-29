<script setup>
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push({ name: 'login' })
}

const goToRegister = () => {
  router.push({ name: 'register' })
}
</script>

<template>
  <div class="w-sceen h-screen flex justify-center">
    <div class="flex m-auto flex-col w-1/4 px-16 py-20 bg-black rounded-xl">
      <h1 class="text-center mb-4 text-2xl" :class="[$route.name === 'login' ? 'hidden' : '']">
        Создайте учётную запись
      </h1>
      <h1 class="text-center mb-4 text-2xl" :class="[$route.name === 'register' ? 'hidden' : '']">
        Войдите в учётную запись
      </h1>
      <div class="flex justify-around">
        <button @click="goToLogin()">Вход</button>
        <button @click="goToRegister()">Регистрация</button>
      </div>
      <div class="form-container">
        <LoginForm v-if="$route.name === 'login'" />
        <RegisterForm v-else />
      </div>
    </div>
  </div>
</template>
