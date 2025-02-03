<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'

const swiperMain = ref(null) // Основной слайдер
const swiperThumbs = ref(null) // Вертикальный слайдер
const activeIndex = ref(0) // Текущий индекс слайда

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
    }
}

function formatPhoneNumber(number) {
    return number.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7 ($1) $2-$3-$4");
}

const { create } = adAPIFilters()

const dataAd = ref([])

async function requestAd() {

  const response = await create('/5')
  dataAd.value = response
}

onMounted(() => {
  requestAd()
})
</script>

<template>
  <div class="w-full mb-16 grid grid-cols-13 gap-13 bg-black-301 rounded-lg p-6">
    <div class="col-span-7 w-full">
      <div class="text-2xl font-bold mb-5">{{ dataAd.adName }}</div>
      <div class="flex gap-1.5 mb-6">
        <swiper
          :direction="'vertical'"
          class="mySwiper w-20 text-black flex text-center h-100"
          :slides-per-view="5"
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
          class="mySwiper flex w-160 text-center h-100"
          :slides-per-view="1"
          :space-between="6"
          @swiper="onMainSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(item, index) in dataAd.photos" :key="index" class="rounded-md">
            <img
              class="h-full object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsnybillboard-production.up.railway.app/' + item.url"
              alt="упс..."
            />
          </swiper-slide>
        </swiper>
      </div>

      <div class="mb-6">
        <span class="text-xl font-medium inline-block mb-4">Контакты для связи:</span>
        <div class="flex flex-wrap gap-3">
          <div
            v-if="dataAd.whatsapplink"
            class="border w-max rounded-sm border-green-400 flex gap-6 items-center"
          >
            <a class="h-full  items-center flex text-base px-0 py-1.5 rounded-sm bg-green-400" :href="dataAd.whatsapplink">Whatsapp</a>
          </div>
  
          <div
            v-if="dataAd.telegramlink"
            class="border w-max rounded-sm border-[#546b85] flex gap-6 items-center"
          >
            <a class="h-full bg-[#546b85] items-center flex text-base px-0 py-1.5 rounded-sm" :href="dataAd.telegramlink">Telegram</a>
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
    
    <div class="col-span-6 w-full">
      <div class="mb-6">
        <span class="text-xl font-medium inline-block mr-4">Цена:</span>
        <div class="inline-block text-3xl font-semibold">{{ dataAd.price }} ₽</div>
      </div>
      
      
      
      <h2 class="text-2xl text-green-200 mb-2">Описание</h2>
      <div class="text-base mb-6">
        {{ dataAd.description }}
      </div>

      <div class=" flex gap-4">
        <span class="text-xl font-medium inline-block mb-4 text-green-200">Продавец:</span>
        <div class="text-xl">{{ dataAd.firstName }}</div>
      </div>
      
      <div class="flex gap-4">
        <span class="text-xl font-medium inline-block mb-4 text-green-200">Город:</span>
        <div class="text-xl">{{ dataAd.region }}</div>
      </div>
    </div>
  </div>
</template>
