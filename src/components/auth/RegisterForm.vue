<script setup>
import FormInput from '@/components/ui/input/FormInput.vue'
import { reactive, ref } from 'vue'
import { authAPI } from '@/API/auth.js'
import { vMaska } from "maska/vue"


const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref()
const telegram = ref(null)
const whatsapp = ref(null)
const {register} = authAPI()

const REGEX_NAME = ref(/^[а-яА-ЯёЁ]{0,32}$/)

const options = reactive({
  tokens: {
    '*': {
      pattern: /^[a-zA-Z0-9]$/,
      multiple: true
    }
  },
  mask: '*!@*.*'
})

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают')
    return
  }
  
  try {
    await register({
      firstName: name.value,
      lastName: surname.value,
      email: email.value,
      password: password.value,
      phoneNumber: +phoneNumber.value,
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
    <FormInput id="phone" v-maska="'+ 7 (###) ###-##-##'" label="Phone" type="tel" colorLabel="bg-black" v-model="phoneNumber" required pattern="" />
    <FormInput id="name" :maxlength="22" :pattern="REGEX_NAME" label="Имя" type="text" colorLabel="bg-black" v-model="name" required />
    <FormInput id="surname" :maxlength="22" :pattern="REGEX_NAME" label="Фамилия" type="text" colorLabel="bg-black" v-model="surname" required />
    <FormInput
      v-maska="options"
      id="email"
      label="Email"
      type="email"
      colorLabel="bg-black"
      v-model="email"
      required
      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    />
    <FormInput
      id="password"
      label="Пароль"
      type="password"
      colorLabel="bg-black"
      v-model="password"
      required
      :minlength="8"
    />
    <FormInput
      id="confirm-password"
      label="Подтверждение пароля"
      type="password"
      colorLabel="bg-black"
      v-model="confirmPassword"
      required
      :minlength="8"
    />
    <button
      type="submit"
      class="cursor-pointer hover:bg-blue-600 active:bg-blue-700  duration-200 w-full py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-hidden"
    >
      Зарегистрироваться
    </button>
  </form>
</template>
