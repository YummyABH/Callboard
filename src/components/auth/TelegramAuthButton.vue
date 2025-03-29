<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import { authAPI } from '@/API/auth'

const { getIP, login, logout } = authAPI()

const storedValue = defineModel('storedValue')
const telegramContainer = ref(null);
const router = useRouter();
const userInfo = reactive({
  ip: null,
  useragent: navigator.userAgent,
  auth_provider: 'telegram',
  user: null
});

const isAuthenticated = ref(localStorage.getItem('refresh_token'))

const userLogout = async () => {
  logout(localStorage.getItem('refresh_token'))
  storedValue.value = ''
  sessionStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  location.reload()
}

const postUserData = async (userData) => {
  const response = await getIP()
  userInfo.ip = response.ip
  userInfo.user = JSON.parse(userData).auth_data

  const responseLogin = await login(userInfo)
  storedValue.value = responseLogin.refreshToken
  sessionStorage.setItem('access_token', responseLogin.accessToken);
  localStorage.setItem('refresh_token', responseLogin.refreshToken)
  location.reload()
}

onMounted(() => {
  // Настройка Telegram Login Widget
  if (telegramContainer.value) {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.setAttribute("data-telegram-login", "AbhCallboardBot");
    script.setAttribute("data-size", "large");
    // script.setAttribute("data-auth-url", "https://included-exactly-luggage-bars.trycloudflare.com/auth-callback");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    telegramContainer.value.appendChild(script);
  }

  window.addEventListener('message', (event) => {
    if (event.origin === 'https://oauth.telegram.org') {
      try {
        const userData = event.data;
        if (userData && JSON.parse(userData).event === 'auth_user') {
          postUserData(userData);
        }
      } catch (e) {
        console.error('Ошибка обработки данных Telegram:', e);
      }
    }
  });
});

watch(() => localStorage.getItem('refresh_token'), (newValue) => {
  console.log(newValue);
  isAuthenticated.value = newValue
})

</script>

<template>
  <div v-if="!isAuthenticated" class="flex items-center" ref="telegramContainer"></div>
  <!-- Кнопка "Разлогиниться" -->
  <button v-if="isAuthenticated" @click="userLogout()"
    class=" cursor-pointer flex items-center m-auto max-lg:w-min max-lg:m-0 justify-center h-min py-2 px-5 rounded-3xl bg-[#54a9eb] hover:">

    <span>Выйти</span>
  </button>
</template>