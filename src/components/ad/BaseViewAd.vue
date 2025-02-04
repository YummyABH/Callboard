<script setup>
import ModalImage from '@/components/ui/modal/ModalImage.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const adId = route.params.id

const swiperMain = ref(null) // Основной слайдер
const swiperThumbs = ref(null) // Вертикальный слайдер
const activeIndex = ref(0) // Текущий индекс слайда
const modalImg = ref()
const modelOpen = ref(false)

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
    modalImg.value = dataAd.value.photos[activeIndex.value]
  }
}

function formatPhoneNumber(number) {
  return number.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4')
}

const { create } = adAPIFilters()

const dataAd = ref([])

async function requestAd() {
  const response = await create('/' + adId)
  dataAd.value = response
  modalImg.value = dataAd.value.photos[0]
}

onMounted(() => {
  requestAd()
})
</script>

<template>
  <ModalImage v-if="modelOpen" v-model:modalImg="modalImg.url" v-model:isOpen="modelOpen" />
  <div class="mb-4 cursor-pointer flex gap-2 items-center" @click="goBack">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    Назад
  </div>
  <div
    class="w-full mb-16 grid grid-cols-13 max-md:gap-3 gap-13 bg-black-301 rounded-lg max-sm:p-3 p-6"
  >
    <div class="col-span-7 max-md:col-span-full w-full">
      <div class="text-2xl max-md:text-lg font-bold mb-5">{{ dataAd.adName }}</div>
      <div class="flex max-md:flex-col-reverse gap-1.5 max-md:mb-3 mb-6">
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
            v-for="(item, index) in dataAd.photos"
            :key="index"
            class="cursor-pointer rounded-md"
            @click="swiperMain.slideTo(index)"
          >
            <img
              :class="{ 'border-4 border-green-300': index === activeIndex }"
              class="aspect-1/1 object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsnybillboard-production.up.railway.app/' + item.url"
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
            v-for="(item, index) in dataAd.photos"
            :key="index"
            class="rounded-md"
            @click="modelOpen = true"
          >
            <img
              class="cursor-pointer h-full object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsnybillboard-production.up.railway.app/' + item.url"
              alt="упс..."
            />
          </swiper-slide>
        </swiper>
      </div>

      <div class="mb-6 max-md:hidden">
        <span class="text-xl max-md:text-base font-medium inline-block mb-4"
          >Контакты для связи:</span
        >
        <div class="flex flex-wrap gap-3">
          <div
            v-if="dataAd.whatsapplink"
            class="border w-max rounded-sm border-green-400 flex gap-6 items-center"
          >
            <a
              class="h-full items-center flex text-base px-0 py-1.5 rounded-sm bg-green-400"
              :href="dataAd.whatsapplink"
              >Whatsapp</a
            >
          </div>

          <div
            v-if="dataAd.telegramlink"
            class="border w-max rounded-sm border-[#546b85] flex gap-6 items-center"
          >
            <a
              class="h-full bg-[#546b85] items-center flex text-base px-0 py-1.5 rounded-sm"
              :href="dataAd.telegramlink"
              >Telegram</a
            >
          </div>

          <div
            v-if="dataAd.phonenumber"
            class="border w-max rounded-sm pr-2 border-black-300 flex gap-6 items-center"
          >
            <div class="text-center w-max text-base min-w-23 px-1.5 py-1.5 rounded-sm bg-black-300">
              Телефон:
            </div>
            <div class="text-xl lining-nums">{{ formatPhoneNumber(dataAd.phonenumber) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-6 w-full max-md:col-span-full">
      <div class="mb-6 max-md:mb-3">
        <span class="text-xl font-medium inline-block mr-4">Цена:</span>
        <div class="inline-block text-3xl font-semibold">{{ dataAd.price }} ₽</div>
      </div>

      <h2 class="text-2xl max-md:text-xl text-green-200 mb-2">Описание</h2>
      <div class="text-base mb-6 max-sm:text-sm max-md:mb-4">
        {{ dataAd.description }}
      </div>

      <div class="flex gap-4">
        <span
          class="text-xl max-md:text-lg font-medium inline-block max-sm:mb-2 mb-4 text-green-200"
          >Продавец:</span
        >
        <div class="text-xl max-md:text-lg">{{ dataAd.firstName }}</div>
      </div>

      <div class="flex gap-4 max-md:mb-4">
        <span
          class="text-xl max-sm:mb-0 max-md:text-lg font-medium inline-block mb-4 text-green-200"
          >Город:</span
        >
        <div class="text-xl max-md:text-lg">{{ dataAd.region }}</div>
      </div>

      <div class="mb-6 md:hidden">
        <span class="text-xl font-medium inline-block mb-4">Контакты для связи:</span>
        <div class="flex flex-wrap gap-3">
          <div
            v-if="dataAd.whatsapplink"
            class="border w-max rounded-sm border-green-400 flex gap-6 items-center"
          >
            <a
              class="h-full items-center flex text-base px-0 py-1.5 rounded-sm bg-green-400"
              :href="dataAd.whatsapplink"
              >Whatsapp</a
            >
          </div>

          <div
            v-if="dataAd.telegramlink"
            class="border w-max rounded-sm border-[#546b85] flex gap-6 items-center"
          >
            <a
              class="h-full bg-[#546b85] items-center flex text-base px-0 py-1.5 rounded-sm"
              :href="dataAd.telegramlink"
              >Telegram</a
            >
          </div>

          <div
            v-if="dataAd.phonenumber"
            class="border w-max rounded-sm pr-2 border-black-300 flex gap-6 items-center"
          >
            <div class="text-center w-max text-base min-w-23 px-1.5 py-1.5 rounded-sm bg-black-300">
              Телефон:
            </div>
            <div class="text-xl lining-nums max-sm:text-sm">
              {{ formatPhoneNumber(dataAd.phonenumber) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
