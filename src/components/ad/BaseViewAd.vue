<script setup>
import ModalImage from '@/components/ui/modal/ModalImage.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const adId = route.params.id

const swiperMain = ref(null) // Основной слайдер
const swiperThumbs = ref(null) // Вертикальный слайдер
const activeIndex = ref(0) // Текущий индекс слайда
const modalImg = ref()
const modelOpen = ref(false)
const isLoading = ref(true)

const body = document.body

watch(modelOpen, () => {
  modelOpen.value ? (body.style.overflowY = 'hidden') : (body.style.overflowY = 'auto')
})

const goBack = () => {
  router.back(); // Аналог window.history.back()
}

const onMainSwiper = (swiper) => {
  swiperMain.value = swiper
}

const onThumbsSwiper = (swiper) => {
  swiperThumbs.value = swiper
}

// Обновляем индекс обоих слайдеров при смене слайда
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
  if (swiperMain.value && swiperThumbs.value) {
    swiperMain.value.slideTo(activeIndex.value)
    swiperThumbs.value.slideTo(activeIndex.value)
    modalImg.value = dataAd.value.images[activeIndex.value]
  }
}

function formatPhoneNumber(number) {
  return number.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4')
}

const { create } = adAPIFilters()


const dataAd = ref([])

async function requestAd() {
  const response = await create('?id=' + adId)
  dataAd.value = response.listings[0]
  modalImg.value = dataAd.value.images[0]
  isLoading.value = false
}

onMounted(() => {
  requestAd()
})

const formattedPrice = computed(() => { 
  let formattedString = dataAd.value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  switch (dataAd.value.price) {
    case -1:
      formattedString = 'Бесплатно'
      break;
    case -2:
      formattedString = 'Цена не указана'
      break; 
    case -3:
      formattedString = 'Обмен'
      break; 
  }
  return formattedString
})
</script>

<template>
  <ModalImage v-if="modelOpen" v-model:modalImg="modalImg" v-model:isOpen="modelOpen" />
  <div class="mb-4 cursor-pointer flex gap-2 items-center" @click="goBack">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="var(--text-custom)"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    <span class="text-text-custom">
      Назад
    </span>
  </div>
  <div
    class="w-full mb-16 grid grid-cols-13 max-md:gap-3 gap-13 bg-black-301 rounded-lg max-sm:p-3 p-6"
  >
    <div class="col-span-7 max-md:col-span-full w-full">
      <div v-if="isLoading" class="mb-6 max-md:mb-3 w-full h-5 animate-pulse bg-gray-200 rounded-sm"></div>
      <div v-else class="lining-nums text-2xl text-text-custom max-md:text-lg font-bold mb-5">{{ dataAd.title }}</div>
      <div v-if="isLoading" class="w-full h-100 mb-6 max-md:mb-3 animate-pulse bg-gray-200 rounded-sm"></div>
      <div v-else class="flex max-md:flex-col-reverse gap-1.5 max-md:mb-3 mb-6">
        <swiper
          class="mySwiper w-20 max-md:w-full text-black flex text-center max-md:h-auto max-lg:h-80 h-100"
          :breakpoints="{
            320: { slidesPerView: 6, spaceBetween: 3, direction: 'horizontal' }, // Для экранов от 640px — 2 слайда
            420: { slidesPerView: 7, spaceBetween: 3, direction: 'horizontal' }, // Для экранов от 640px — 2 слайда
            640: { slidesPerView: 8, spaceBetween: 3, direction: 'horizontal' }, // Для экранов от 640px — 2 слайда
            768: { slidesPerView: 7, spaceBetween: 3, direction: 'vertical' }, // От 1024px — 3 слайда
            1280: { slidesPerView: 5, spaceBetween: 3, direction: 'vertical' } // От 1280px — 4 слайда
          }"
          :space-between="3"
          @swiper="onThumbsSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(item, index) in dataAd.images"
            :key="index"
            class="cursor-pointer rounded-md"
            @click="swiperMain.slideTo(index)"
          >
            <img
              :class="{ 'border-4 border-green-300': index === activeIndex }"
              class="aspect-1/1 object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsny-billboard-production.up.railway.app/' + item"
              alt="упс..."
            />
          </swiper-slide>
        </swiper>

        <!-- Основной слайдер -->
        <swiper
          class="mySwiper max-[380px]:h-60 max-[768px]:w-full max-[768px]:h-120 max-[640px]:h-110 flex w-160 text-center max-lg:h-80 h-100"
          :slides-per-view="1"
          :space-between="10"
          @swiper="onMainSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide
            v-for="(item, index) in dataAd.images"
            :key="index"
            class="rounded-md"
            @click="modelOpen = true"
          >
            <img
              class="cursor-pointer h-full object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsny-billboard-production.up.railway.app/' + item"
              alt="упс..."
            />
          </swiper-slide>
        </swiper>
      </div>

      <div class="mb-6 max-md:hidden">
        <span class="text-xl text-text-custom max-md:text-base font-medium inline-block mb-4"
          >Контакты для связи:</span
        >
        <div class="flex flex-wrap gap-3">
          <div
            v-if="dataAd.contacts?.whatsapp && dataAd.contacts.whatsapp !== 'null'"
            class="border w-max rounded-sm border-green-400 flex gap-6 items-center"
          >
            <a
              class="h-full items-center flex text-base px-0 py-1.5 rounded-sm bg-green-400"
              :href="dataAd.contacts.whatsapp"
              >Whatsapp</a
            >
          </div>

          <div
            v-if="dataAd.contacts?.telegram && dataAd.contacts.telegram !== 'null'"
            class="border w-max rounded-sm border-[#546b85] flex gap-6 items-center"
          >
            <a
              class="h-full bg-[#546b85] items-center flex text-base px-0 py-1.5 rounded-sm"
              :href="dataAd.contacts.telegram"
              >Telegram</a
            >
          </div>

          <div
            v-if="dataAd.contacts?.phone && dataAd.contacts.phone !== 'null'"
            class="border w-max rounded-sm pr-2 border-black-300 flex gap-6 items-center"
          >
            <div class="text-center w-max text-base min-w-23 px-1.5 py-1.5 rounded-sm bg-black-300">
              Телефон:
            </div>
            <div class="text-xl text-text-custom lining-nums">{{ formatPhoneNumber(dataAd.contacts.phone) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-6 md:mt-12 w-full text-text-custom max-md:col-span-full">
      <div class="mb-6 max-md:mb-3">
        <span class="text-xl font-medium inline-block mr-4">Цена:</span>
        <div v-if="isLoading" class=" inline-block w-1/3 h-5 mt-1 rounded-sm bg-gray-200 animate-pulse"></div>
        <div v-else class="lining-nums inline-block text-2xl font-semibold">{{ formattedPrice }}</div>
      </div>

      <h2 class="text-2xl max-md:text-xl text-green-300 mb-2">Описание</h2>
      <div v-if="isLoading" class="mb-6 max-md:mb-4">
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
        </div>
      <div v-else class="text-base mb-6 max-sm:text-sm max-md:mb-4">
        {{ dataAd.description }}
      </div>

      <div class="flex gap-4">
        <span
          class="text-xl max-md:text-lg font-medium inline-block max-sm:mb-2 mb-4 text-green-300"
          >Продавец:</span
        >
        <div v-if="isLoading" class="w-1/3 h-4 mt-1 rounded-sm bg-gray-200 animate-pulse"></div>
        <div v-else class="text-xl max-md:text-lg">{{ dataAd.author.name }}</div>
      </div>

      <div class="flex gap-4 max-md:mb-4">
        <span
          class="text-xl max-sm:mb-0 max-md:text-lg font-medium inline-block mb-4 text-green-300"
          >Город:</span
        >
        <div v-if="isLoading" class="w-1/3 h-4 mt-1 rounded-sm bg-gray-200 animate-pulse"></div>
        <div v-else class="text-xl max-md:text-lg">{{ dataAd.city }}</div>
      </div>

      <div class="mb-6 md:hidden">
        <span class="text-xl font-medium inline-block mb-4">Контакты для связи:</span>
        <div class="flex flex-wrap gap-3">
          <div
            v-if="dataAd.author?.whatsapp"
            class="border w-max rounded-sm border-green-400 flex gap-6 items-center"
          >
            <a
              class="h-full items-center flex text-base px-0 py-1.5 rounded-sm bg-green-400"
              :href="dataAd.author?.whatsapp"
              >Whatsapp</a
            >
          </div>

          <div
            v-if="dataAd.author?.telegram"
            class="border w-max rounded-sm border-[#546b85] flex gap-6 items-center"
          >
            <a
              class="h-full bg-[#546b85] items-center flex text-base px-0 py-1.5 rounded-sm"
              :href="dataAd.author?.telegram"
              >Telegram</a
            >
          </div>

          <div
            v-if="dataAd.author?.phone"
            class="border w-max rounded-sm pr-2 border-black-300 flex gap-6 items-center"
          >
            <div class="text-center w-max text-base min-w-23 px-1.5 py-1.5 rounded-sm bg-black-300">
              Телефон:
            </div>
            <div class="text-xl lining-nums max-sm:text-sm">
              {{ formatPhoneNumber(dataAd.author?.phone) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
