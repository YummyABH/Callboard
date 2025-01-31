<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import { Pagination } from 'swiper/modules'

const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const { create } = adAPIFilters()

const dataAd = ref([])

async function requestAd() {
  const response = await create('/19')
  dataAd.value = response
}

const pagination = {
  clickable: true,
  renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`
}

const modules = [Pagination]

onMounted(() => {
  requestAd()
})
</script>

<template>
  <div class="w-full grid grid-cols-13 gap-13 bg-gray-600 rounded-lg p-6">
    <div class="col-span-7 w-full">
      <div class="text-2xl font-bold mb-5">{{ dataAd.adName }}</div>
      <div class="flex">
        <swiper
          :direction="'vertical'"
          :modules="modules"
          class="mySwiper w-20 flex text-center h-100"
          :slides-per-view="10"
          :space-between="1"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide class="h-14 bg-white w-14">Slide 1</swiper-slide>
          <swiper-slide class="h-14 bg-white w-14">Slide 2</swiper-slide>
          <swiper-slide class="h-14 bg-white w-14">Slide 3</swiper-slide>
          <swiper-slide class="h-14 bg-white w-14">Slide 4</swiper-slide>
          <swiper-slide class="h-14 bg-white w-14">Slide 5</swiper-slide>
        </swiper>
        <swiper
          :modules="modules"
          class="mySwiper flex w-160 text-center h-100"
          :slides-per-view="1"
          :space-between="0"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide class="max-h-40">Slide 1</swiper-slide>
          <swiper-slide class="max-h-40">Slide 2</swiper-slide>
          <swiper-slide class="max-h-40">Slide 3</swiper-slide>
          <swiper-slide class="max-h-40">Slide 1</swiper-slide>
          <swiper-slide class="max-h-40">Slide 2</swiper-slide>
          <swiper-slide class="max-h-40">Slide 3</swiper-slide>
          <swiper-slide class="max-h-40">Slide 1</swiper-slide>
          <swiper-slide class="max-h-40">Slide 2</swiper-slide>
          <swiper-slide class="max-h-40">Slide 3</swiper-slide>
        </swiper>
      </div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum explicabo corporis, maiores
      sunt nostrum cumque molestiae, eligendi saepe magnam atque rerum, recusandae aut qui harum
      ducimus corrupti reiciendis eius minima!
    </div>

    <div class="col-span-6 w-full bg-green-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti eum sed, maiores hic
      unde et repellendus nesciunt a commodi alias itaque, aliquam quis ad veniam accusantium neque
      doloribus consectetur.
    </div>
  </div>
</template>
