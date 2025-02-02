<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'

const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const { create } = adAPIFilters()

const dataAd = ref([])

async function requestAd() {
  const response = await create('/5')
  dataAd.value = response
  console.log(dataAd.value)
}

onMounted(() => {
  requestAd()
})
</script>

<template>
  <div class="w-full grid grid-cols-13 gap-13 bg-gray-600 rounded-lg p-6">
    <div class="col-span-7 w-full">
      <div class="text-2xl font-bold mb-5">{{ dataAd.adName }}</div>
      <div class="flex gap-1.5 mb-6">
        <swiper
          :direction="'vertical'"
          class="mySwiper w-20 text-black flex text-center h-100"
          :slides-per-view="5"
          :space-between="3"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="(item, index) in dataAd.photos" :key="index" class="rounded-md">
            <img
              class="aspect-1/1 object-cover w-full inline-block overflow-hidden rounded-md"
              :src="'https://apsnybillboard-production.up.railway.app/' + item.url"
              alt="упс..."
            />
          </swiper-slide>
        </swiper>
        <swiper
          class="mySwiper flex w-160 text-center h-100"
          :slides-per-view="1"
          :space-between="6"
          @swiper="onSwiper"
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
      <h2 class="text-2xl mb-2">Описание</h2>
      <div class="text-base">
        {{ dataAd.description }}
      </div>
    </div>

    <div class="col-span-6 w-full">
      <div class="mb-6">
        <span class="text-xl font-medium inline-block mr-4">Цена:</span>
        <div class="inline-block text-3xl font-semibold">{{ dataAd.price }} ₽</div>
      </div>
      <div class="mb-6">
        <span class="text-xl font-medium inline-block mb-4">Контакты для связи:</span>
        <div class="flex flex-col gap-3">
          <div
            v-if="dataAd.whatsapplink"
            class="border w-max rounded-sm pr-2 border-green-400 flex gap-6 items-center"
          >
            <div class="w-max text-base px-1.5 py-1.5 rounded-sm bg-green-400">Whatsapp:</div>
            <a class="text-xl lining-nums" :href="dataAd.whatsapplink">{{ dataAd.whatsapplink }}</a>
          </div>

          <div
            v-if="dataAd.telegramlink"
            class="border w-max rounded-sm pr-2 border-[#546b85] flex gap-6 items-center"
          >
            <div class="text-center w-max text-base px-1.5 min-w-23 py-1.5 rounded-sm bg-[#546b85]">
              Telegram:
            </div>
            <a class="text-xl lining-nums" :href="dataAd.telegramlink">{{ dataAd.telegramlink }}</a>
          </div>

          <div
            v-if="dataAd.phonenumber"
            class="border w-max rounded-sm pr-2 border-black-300 flex gap-6 items-center"
          >
            <div class="text-center w-max text-base min-w-23 px-1.5 py-1.5 rounded-sm bg-black-300">
              Телефон:
            </div>
            <a class="text-xl lining-nums" href="dataAd.phonenumber">{{ dataAd.phonenumber }}</a>
          </div>
        </div>
      </div>

      <div class="mb-6 flex gap-4">
        <span class="text-xl font-medium inline-block mb-4">Город:</span>
        <div class="text-xl">{{ dataAd.region }}</div>
      </div>
    </div>
  </div>
</template>
