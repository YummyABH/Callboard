<script setup>
import { ref } from 'vue'
import { ofetch } from 'ofetch' // Замените на используемую библиотеку

const email = ref('')

const handleForgotPassword = async () => {
  try {
    await ofetch('/api/forgot-password', {
      method: 'POST',
      body: { email: email.value }
    })
    alert('Инструкции отправлены на ваш email')
  } catch (error) {
    console.error('Ошибка сброса пароля:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleForgotPassword" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        id="email"
        type="email"
        v-model="email"
        class="mt-1 block w-full px-3 py-2 border rounded-md shadow-2xs focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-hidden"
    >
      Сбросить пароль
    </button>
    <p class="text-center text-sm text-gray-600 mt-2">
      <router-link to="/user" class="text-blue-500 hover:underline">
        Назад к авторизации
      </router-link>
    </p>
  </form>
</template>
