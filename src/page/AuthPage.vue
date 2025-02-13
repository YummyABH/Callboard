<script setup>
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

import { onMounted } from 'vue';

const botUsername = 'samplebot'; // Замени на своего бота

// Функция обработки авторизации
const onTelegramAuth = (user) => {
  alert(`Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? ', @' + user.username : ''})`);
};

onMounted(() => {
  // Добавляем скрипт Telegram, если его нет
  if (!document.getElementById('telegram-widget-script')) {
    const script = document.createElement('script');
    script.id = 'telegram-widget-script';
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    document.body.appendChild(script);
  }

  // Создаём контейнер для Telegram Login Widget
  const container = document.getElementById('telegram-login-container');
  if (container) {
    container.innerHTML = ''; // Очищаем контейнер перед вставкой нового виджета

    const widget = document.createElement('script');
    widget.src = 'https://telegram.org/js/telegram-widget.js?22';
    widget.setAttribute('data-telegram-login', botUsername);
    widget.setAttribute('data-size', 'large');
    widget.setAttribute('data-onauth', 'onTelegramAuth(user)');
    widget.setAttribute('data-request-access', 'write');
    widget.async = true;
    container.appendChild(widget);
  }

  // Делаем функцию доступной в глобальном контексте
  window.onTelegramAuth = onTelegramAuth;
});
</script>



<template>
  <div class="relative bg-[#353535] w-sceen h-screen flex justify-center" style=" background-image: url(/public/pattern2.svg)">
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
  
    <!-- Telegram Login Widget -->
    <div id="telegram-login-container">asdasdasd</div>
    
  </div>
</template>
