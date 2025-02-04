<script setup>
import ModalImage from '@/components/ui/modal/ModalImage.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { adAPIFilters } from '@/API/adRequest.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { vMaska } from 'maska/vue'
import { regionsAPI } from '@/API/regionsRequest.js'
import UploadFeedback from '@/components/ad/uploadAd/UploadFeedback.vue'
import UploadImg from '@/components/ad/uploadAd/UploadImg.vue'
const { regionList } = regionsAPI()

const inputValues = reactive({
  category: null,
  subcategory: null,
  name: null,
  price: null,
  description: null,
  photo: [null, null, null, null],
  city: null,
  feedback: {
    whatsapp: null,
    telegram: null,
    telephone: null
  }
})

const route = useRoute()
const router = useRouter()
const adId = route.params.id

const dataRegion = ref()
const openCities = ref(false)
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
  router.back() // Аналог window.history.back()
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

const { create } = adAPIFilters()

const dataAd = ref([])

async function requestAd() {
  const response = await create('/' + adId)
  dataAd.value = response
}

onMounted(async () => {
  dataRegion.value = await regionList()
  await requestAd()
  modalImg.value = dataAd.value.photos[0]
  inputValues.price = dataAd.value.price
  inputValues.description = dataAd.value.description
  inputValues.city = dataAd.value.region
  
  inputValues.feedback.whatsapp = dataAd.value.whatsapplink.slice(14)
  inputValues.feedback.telegram = dataAd.value.telegramlink
  inputValues.feedback.telephone = dataAd.value.phonenumber
  inputValues.name = dataAd.value.adName
  for (const key in dataAd.value.photos) {
    console.log(dataAd.value.photos[key].url);
    
    inputValues.photo[key] = 'https://apsnybillboard-production.up.railway.app/' + dataAd.value.photos[key].url
  }
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
      <input
        v-model="inputValues.name"
        type="text"
        autocomplete="off"
        name="name"
        maxlength="50"
        class="max-md:col-span-full mb-6 max-lg:h-8 row-start-3 col-span-2 max-xl:col-span-3 rounded-sm border border-px border-gray-400 focus:border-white box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
        placeholder="Название"
        id="1"
      />

      <div class="flex max-md:flex-col-reverse gap-1.5 max-md:mb-3 mb-6">
        <UploadImg v-model:inputValues="inputValues.photo" class="max-md:col-span-full row-start-6 col-span-2 max-2xl:col-span-3 max-sm:col-span-5" />
      </div>

      <div class="mb-6">
        <span class="text-xl max-md:text-base font-medium inline-block mb-4"
          >Контакты для связи:</span
        >
        <div class="flex flex-col gap-3">
          <UploadFeedback v-model:feedbackTelegram="inputValues.feedback.telegram" v-model:feedbackTelephon="inputValues.feedback.telephone" v-model:feedbackWhatsapp="inputValues.feedback.whatsapp"/>
        </div>
      </div>
    </div>

    <div class="col-span-6 w-full max-md:col-span-full">
      <div class="mb-6 flex max-md:mb-3">
        <span class="text-xl font-medium inline-block mr-4">Цена:</span>
        <div
          class="relative max-md:col-span-full max-lg:h-8 flex gap-2 row-start-4 col-span-2 max-xl:col-span-3"
        >
          <input
            v-model="inputValues.price"
            type="text"
            v-maska="'###################'"
            autocomplete="off"
            name="price"
            class="rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
            id="1"
          />
        </div>
      </div>

      <h2 class="text-2xl max-md:text-xl text-green-200 mb-2">Описание</h2>
      <div class="max-md:col-span-full mb-3 flex flex-col w-full gap-1 row-start-5 col-span-3">
        <textarea
          autocomplete="off"
          name="description"
          v-model="inputValues.description"
          maxlength="3000"
          class="max-sm:text-xs max-md:min-h-8 rounded-md border border-px border-gray-400 focus:border-white py-0.5 min-h-20 field-sizing-content flex items-start lining-nums box-border outline-hidden duration-100 bg-gray-800 px-2"
        >
        </textarea>
        <span class="text-xs"
          >{{ inputValues?.description?.length ? inputValues.description.length : '0' }} /
          3000</span
        >
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
        <div class="relative max-md:col-span-full col-span-2 max-xl:col-span-3">
        <select
          @click="openCities = !openCities"
          @blur="openCities = false"
          v-model="inputValues.city"
          name="subcategory"
          class="w-full max-lg:h-8 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="sort-select"
        >
          <option @click="openCities = false" v-for="item in dataRegion" :value="item.id" :key="item.id">
            {{ item.regionName }}
          </option>
        </select>
        <div :class="openCities ? 'rotate-180' : 'rotate-0'" class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white"></div>
      </div>
      </div>
    </div>
  </div>
</template>
