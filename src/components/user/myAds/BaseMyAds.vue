<script setup>
import GlowingButton from '@/components/ui/buttons/GlowingButton.vue'
import CardUserProduct from '@/components/ui/card/CardUserProduct.vue'
import CardUserProductMini from '@/components/ui/card/CardUserProductMini.vue'
import ModelDelete from '@/components/ui/modal/ModelDelete.vue'
import ModelExpirationDays from '@/components/ui/modal/ModelExpirationDays.vue'
import TelegramAuthButton from '@/components/auth/TelegramAuthButton.vue'
//Исправить на получение товаров конкретноо пользователя
import { requestUserApi } from '@/API/adRequest'
import { onMounted, watch, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/API/auth'

const { logout } = authAPI()
const { getAds } = requestUserApi()
const screenWidth = window.innerWidth
const showTelegram = screenWidth <= 1024 ? true : false
const router = useRouter()
const myAds = ref([])
const totalAds = ref(0)
const storedValue = ref(localStorage.getItem('refresh_token'))
const isLoading = ref(false)
const modelExpirationOpen = ref(false)
const modelOpen = ref(false)
const activeId = ref(null)

async function requestAd() {
  try {
    const response = await getAds()
    myAds.value = response.listings
    totalAds.value = response.total
  } catch (error) {
    console.error('Failed to fetch ads:', error)
  }
}

onMounted(() => {
  if (localStorage.getItem('refresh_token')) {
    requestAd()
  }
})
const remountComponent = () => {
  const currentRoute = router.currentRoute.value.fullPath
  router.replace({ path: '/redirect-temp' }).then(() => {
    router.replace({ path: currentRoute }) // Возвращаемся на текущий маршрут
  })
}
const userLogout = async () => {
  logout(localStorage.getItem('refresh_token'))
  storedValue.value = ''
  sessionStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  remountComponent()
}

const body = document.body

watch(modelOpen, () => {
  modelOpen.value ? (body.style.overflowY = 'hidden') : (body.style.overflowY = 'auto')
})

const styleContainer = computed(() => {
  return myAds.value.length ? 'mb-10' : ''
})
</script>

<template>
  <div class="lining-nums flex flex-col gap-y-3 mb-12">
    <div v-if="!storedValue" class="text-xl">Авторизуйте чтобы получить больше возможностей.</div>
    <!-- <button
      v-if="storedValue && showTelegram"
      @click="userLogout()"
      class="cursor-pointer flex items-center w-min mb-4  h-min py-2 px-5 rounded-3xl bg-[#54a9eb] hover:"
    >
      <span>Выйти</span>
    </button> -->
    <div v-if="storedValue" class="">Выставленно объявлений: {{ totalAds }}</div>
    <div class="max-lg:flex max-lg:items-center gap-12">

        <RouterLink v-if="storedValue" to="/ad/create" class="w-min">
          <GlowingButton class="w-max">Добавить объявление</GlowingButton>
        </RouterLink>
        
        <TelegramAuthButton  
          v-if="showTelegram"
          class=""
          v-model:storedValue="storedValue"
        />
    </div>
    <div
      v-if="storedValue"
      :class="styleContainer"
      class="flex flex-col gap-4 w-full mt-2 pt-3 border-t border-px border-gray-600 max-[640px]:grid max-[640px]:grid-cols-2"
    >
      <template v-if="myAds.length">
        <CardUserProduct
          v-for="(item, index) in myAds"
          :key="index"
          v-model:activeId="activeId"
          v-model:isOpen="modelOpen"
          v-model:modelExpirationOpen="modelExpirationOpen"
          :id="item.listing_id"
          :price="item.price"
          :title="item.title"
          :subtitle="item.description"
          :daysRemaining="item.daysUntilExpiration"
          :photo-url="item.images[0]"
        />
        <CardUserProductMini
          v-for="(item, index) in myAds"
          class="sm:hidden"
          v-model:activeId="activeId"
          :key="index"
          :id="item.listing_id"
          v-model:modelExpirationOpen="modelExpirationOpen"
          v-model:isOpen="modelOpen"
          :price="item.price"
          :title="item.title"
          :subtitle="item.description"
          :daysRemaining="item.daysUntilExpiration"
          :photo-url="item.images[0]"
        />
      </template>
      <div
        v-else
        class="max-sm:col-span-full perspective-distant relative max-md:mt-6 mt-10 flex flex-col items-center"
      >
        <img class="max-md:inline-block hidden" src="/public/text-empty.png" alt="" />
        <img
          class="md:transform-3d md:inline-block md:translate-x-7 md:transform md:rotate-z-6 md:absolute hidden md:top-37"
          src="/public/text-empty-black.png"
          alt=""
        />
        <img class="max-h-120 w-max" src="/public/baner.png" alt="" />
      </div>
    </div>
  </div>
  <ModelDelete
    v-if="modelOpen"
    v-model:isLoading="isLoading"
    v-model:totalAds="totalAds"
    v-model:myAds="myAds"
    v-model:isOpen="modelOpen"
    v-model:activeId="activeId"
  />
  <ModelExpirationDays
    v-if="modelExpirationOpen"
    v-model:isLoading="isLoading"
    v-model:totalAds="totalAds"
    v-model:myAds="myAds"
    v-model:isOpen="modelExpirationOpen"
    v-model:activeId="activeId"
  />
  <div
    v-if="isLoading"
    class="w-screen h-screen fixed top-0 left-0 z-100 bg-black opacity-50 flex items-center justify-center"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3; /* Светлый фон */
  border-top: 4px solid #3498db; /* Цвет спиннера */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
