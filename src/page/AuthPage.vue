<script setup>
import TelegramAuthButton from "@/components/auth/TelegramAuthButton.vue";
// import LoginForm from '@/components/auth/LoginForm.vue'
// import RegisterForm from '@/components/auth/RegisterForm.vue'
// import modalConfirmationCode from '@/components/auth/modalConfirmationCode.vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()

// const goToLogin = () => {
//   router.push({ name: 'login' })
// }

// const goToRegister = () => {
//   router.push({ name: 'register' })
// }
</script>



<template>
  <div class="relative bg-[#353535] w-sceen h-screen flex justify-center"
    style=" background-image: url(/public/pattern2.svg)">
    <!-- <modalConfirmationCode class="absolute rounded z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/> -->
    <!-- <div class="flex m-auto flex-col w-1/4 px-16 py-20 bg-[#04041f] rounded-xl">
      <h1 class="text-center mb-4 text-2xl" :class="[$route.name === 'login' ? 'hidden' : '']">
        Создайте учётную запись
      </h1>
      <h1 class="text-center mb-4 text-2xl" :class="[$route.name === 'register' ? 'hidden' : '']">
        Войдите в учётную запись
      </h1>
      <div class="flex justify-around mb-6">
        <button @click="goToLogin()" class="cursor-pointer hover:text-green-300 active:text-green-400">Вход</button>
        <button @click="goToRegister()" class="cursor-pointer hover:text-green-300 active:text-green-400">Регистрация</button>
      </div>
      <div class="form-container">
        <LoginForm v-if="$route.name === 'login'" />
        <RegisterForm v-else />
      </div>
    </div> -->
    <TelegramAuthButton/>
  </div>
</template>
