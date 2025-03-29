<script setup>
import ModalImage from '@/components/ui/modal/ModalImage.vue'
import UploadFeedback from '@/components/ad/uploadAd/UploadFeedback.vue'
import UploadImg from '@/components/ad/uploadAd/UploadImg.vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { requestUserAdApi } from '@/API/adRequest.js'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { vMaska } from 'maska/vue'
import { regionsAPI } from '@/API/regionsRequest.js'
import { normalizedinputValues } from '@/components/composables/normalizedObject'
import { useToast } from 'vue-toastification'
import { useAdUpdateApi } from '@/API/updateAd.js'
const { regionList } = regionsAPI()
const { update } = useAdUpdateApi()

const previeImages = ref([null, null, null, null])
const inputValues = reactive({
  title: null,
  price: null,
  description: "",
  images: [null, null, null, null],
  city_id: null,
  feedback: {
    whatsapp: null,
    telegram: null,
    telephone: null
  }
})

const route = useRoute()
const toast = useToast()
const router = useRouter()
const adId = route.params.id

const openCheckPrice = ref(false)
const checkPriceId = ref(900)
const dataRegion = ref()
const openCities = ref(false)
const modalImg = ref()
const modelOpen = ref(false)

const body = document.body

watch(modelOpen, () => {
  modelOpen.value ? (body.style.overflowY = 'hidden') : (body.style.overflowY = 'auto')
})

const goBack = () => {
  router.back()
}

const { getAd } = requestUserAdApi()

const dataAd = ref([])

async function requestAd() {
  const response = await getAd(adId)
  dataAd.value = response
}

onMounted(async () => {
  dataRegion.value = await regionList()
  await requestAd()
  modalImg.value = dataAd.value.images[0]
  inputValues.price = dataAd.value.price
  inputValues.description = dataAd.value.description
  inputValues.city_id = dataAd.value.city_id
  inputValues.feedback.whatsapp = dataAd.value.whatsapp !== 'null' ? dataAd.value.whatsapp : null
  inputValues.feedback.telegram = dataAd.value.telegram !== 'null' ? dataAd.value.telegram : null
  inputValues.feedback.telephone = dataAd.value.phone !== 'null' ? dataAd.value.phone : null
  inputValues.title = dataAd.value.title
  checkPriceId.value = dataAd.value.price < 0 ? dataAd.value.price : 901
  for (const key in dataAd.value.images) {    
    inputValues.images[key] = dataAd.value.images[key]
    previeImages.value[key] = 'https://apsny-billboard-production.up.railway.app/' + dataAd.value.images[key]
  }
})



const submitDataAd = async () => {
  for (const key in inputValues) {
    if (key !== 'description') {
      const res = normalizedinputValues(inputValues, key)
      if (!res) {
        toast.info('Заполните все необходимые поля.', {
          timeout: 2000
        })
        return
      }
    }
  }

  const formData = new FormData()

  // Добавляем текстовые поля
  formData.append('title', inputValues.title)
  formData.append('price', checkPriceId.value < 0 ? checkPriceId.value : inputValues.price)
  formData.append('description', inputValues.description)
  formData.append('city_id', inputValues.city_id )  
  formData.append('whatsapp', inputValues.feedback.whatsapp)
  formData.append('telegram', inputValues.feedback.telegram)
  formData.append('phone', inputValues.feedback.telephone)
  formData.append('listingId', dataAd.value.listing_id)

  // Добавляем файлы (images)
  if (inputValues.images && inputValues.images.length) {
    for (let i = 0; i < inputValues.images.length; i++) {
      if (inputValues.images[i]) {
        formData.append(`images`, inputValues.images[i]) // Каждый файл добавляется с именем 'images'
      }
    }
  }
  console.log([...formData.entries()])
  try {
    await update(formData)
    toast.success('Объявление успешно опубликовано.', {
      timeout: 2000
    })
    router.push('/user/my-ads')
  } catch (error) {
    toast.error('Произошла ошибка, повторите попытку.', {
      timeout: 2000
    })
  }
}

function chekedPriceFree() {
  console.log(checkPriceId.value);
  if (checkPriceId.value < 0) {
    inputValues.price = checkPriceId.value
  } else {
    inputValues.price = null
  }

}
</script>

<template>
  <ModalImage v-if="modelOpen" v-model:modalImg="modalImg.url" v-model:isOpen="modelOpen" />
  <div class="mb-4 text-text-custom w-min cursor-pointer flex gap-2 items-center" @click="goBack">
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
        v-model="inputValues.title"
        type="text"
        autocomplete="off"
        name="name"
        maxlength="50"
        class="max-md:col-span-full text-text-custom mb-6 max-lg:h-8 row-start-3 col-span-2 max-xl:col-span-3 rounded-sm border border-px border-gray-400 focus:border-white box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
        placeholder="Название"
        id="1"
      />

      <div class="flex max-md:flex-col-reverse gap-1.5 max-md:mb-3 mb-6">
        <UploadImg v-model:previeImages="previeImages" v-model:inputValues="inputValues.images" class="max-md:col-span-full row-start-6 col-span-2 max-2xl:col-span-3 max-sm:col-span-5" />
      </div>

      <div class="mb-6">
        <span class="text-xl text-text-custom max-md:text-base font-medium inline-block mb-4"
          >Контакты для связи:</span
        >
        <div class="flex text-text-custom flex-col gap-3">
          <UploadFeedback v-model:feedbackTelegram="inputValues.feedback.telegram" v-model:feedbackTelephon="inputValues.feedback.telephone" v-model:feedbackWhatsapp="inputValues.feedback.whatsapp"/>
        </div>
      </div>
    </div>

    <div class="col-span-6 w-full max-md:col-span-full">
      <div class="mb-6 flex max-md:mb-3">
        <span class="text-xl text-text-custom font-medium inline-block mr-4">Цена:</span>
        <div
          class="relative max-md:col-span-full max-lg:h-8 flex gap-2 row-start-4 col-span-2 max-xl:col-span-3"
        >
          <input
            v-model="inputValues.price"
            :disabled="checkPriceId < 0"
            type="text"
            v-maska="'########'"
            autocomplete="off"
            name="price"
            class="  rounded-sm select-none text-text-custom border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
            :class="checkPriceId < 0 ? 'text-transparent' : ''"
            id="1"
          />
          <select @change="chekedPriceFree()" @click="openCheckPrice = !openCheckPrice" @blur="openCheckPrice = false"
          v-model="checkPriceId" name="subcategory"
          class="w-full max-lg:h-8 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-700 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="check-price">
          <option value="900" disabled>Изменить тип</option>
          <option @click="openCheckPrice = false" value="-1" key="1">
            Бесплатно
          </option>
          <option value="901" key="901">
            Цена
          </option>
          <option @click="openCheckPrice = false" value="-2" key="2">
            Не указывать
          </option>
          <option @click="openCheckPrice = false" value="-3" key="3">
            Обмен
          </option>
        </select>
        <div :class="openCheckPrice ? 'rotate-180' : 'rotate-0'"
          class="duration-300 z-10 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white">
        </div>
        </div>
      </div>

      <h2 class="text-2xl max-md:text-xl text-green-300 mb-2">Описание</h2>
      <div class="max-md:col-span-full mb-3 flex flex-col w-full gap-1 row-start-5 col-span-3">
        <textarea
          autocomplete="off"
          name="description"
          v-model="inputValues.description"
          maxlength="3000"
          class="max-sm:text-xs text-text-custom max-md:min-h-8 rounded-md border border-px border-gray-400 focus:border-white py-0.5 min-h-20 field-sizing-content flex items-start lining-nums box-border outline-hidden duration-100 bg-gray-800 px-2"
        >
        </textarea>
        <span class="text-xs text-text-custom"
          >{{ inputValues?.description?.length ? inputValues.description.length : '0' }} /
          3000</span
        >
      </div>

      <div class="flex gap-4">
        <span
          class="text-xl max-md:text-lg font-medium inline-block max-sm:mb-2 mb-4 text-green-300"
          >Продавец:</span
        >
        <div class="text-xl text-text-custom max-md:text-lg">{{ dataAd.author_name }}</div>
      </div>

      <div class="flex gap-4 max-md:mb-4">
        <span
          class="text-xl max-sm:mb-0 max-md:text-lg font-medium inline-block mb-4 text-green-300"
          >Город:</span
        >
        <div class="relative max-md:col-span-full col-span-2 max-xl:col-span-3">
        <select
          @click="openCities = !openCities"
          @blur="openCities = false"
          v-model="inputValues.city_id"
          name="subcategory"
          class="w-full text-text-custom max-lg:h-8 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="sort-select"
        >
          <option @click="openCities = false" v-for="item in dataRegion" :value="item.id" :key="item.id">
            {{ item.name }}
          </option>
        </select>
        <div :class="openCities ? 'rotate-180' : 'rotate-0'" class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white"></div>
      </div>
      </div>
    </div>
      <button type="submit" @click.prevent="submitDataAd" class="w-min py-2 px-4 duration-200 cursor-pointer bg-green-400 active:bg-green-300 text-white rounded-md hover:bg-green-500 focus:outline-hidden">Отправить</button>
  </div>
</template>
