<script setup>
import FormInput from '@/components/ui/input/FormInput.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref()
const telegram = ref(null)
const whatsapp = ref(null)
const authStore = useAuthStore()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают')
    return
  }

  try {
    await authStore.register({
      userName: name.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      telegram: telegram.value,
      whatsapp: whatsapp.value
    })
  } catch (error) {
    console.error('Ошибка регистрации:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
    <FormInput id="phone" label="Phone" type="tel" v-model="phoneNumber" required pattern="" />
    <FormInput id="name" label="Имя" type="text" v-model="name" required />
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
    <FormInput
      id="confirm-password"
      label="Подтверждение пароля"
      type="password"
      v-model="confirmPassword"
      required
      :minlength="8"
    />
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
    >
      Зарегистрироваться
    </button>
  </form>
</template>
