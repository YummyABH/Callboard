<script setup>
import UploadImg from '@/components/ad/uploadAd/UploadImg.vue'
import UploadFomMap from './uploadAd/UploadFomMap.vue'
import UploadFeedback from './uploadAd/UploadFeedback.vue'
import { vMaska } from 'maska/vue'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { regionsAPI } from '@/API/regionsRequest.js'
import { useCategoriesAPI } from '@/API/categoriesRequest.js'
import { useAdPostApi } from '@/API/uploadAd'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { normalizedinputValues } from '@/components/composables/normalizedObject'

const { post } = useAdPostApi()
const { create } = useCategoriesAPI()
const { regionList } = regionsAPI()

const router = useRouter()
const toast = useToast()
const checkPriceId = ref(900)
const openCheckPrice = ref(false)
const isLoading = ref(false)
const dataRegion = ref()
const dataCategory = ref()
const dataSubcategory = ref([])
const openCategory = ref(false)
const openSubcategory = ref(false)
const openCities = ref(false)

onMounted(async () => {
  dataRegion.value = await regionList()
  dataCategory.value = await create()
})

const previeImages = ref([null, null, null, null])

const inputValues = reactive({
  expiration_days: null,
  category_id: null,
  subcategory_id: null,
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

const arrayInputTemplate = reactive({
  category_id: 'Категория',
  subcategory_id: 'Подкатегория',
  title: 'Название',
  price: 'Цена',
  description: 'Описание',
  images: 'Фотографии',
  city_id: 'Город',
  feedback: 'Способы связи',
  expiration_days: 'Срок действия'
})

// Создаём ссылки для всех полей формы
const formRefs = {
  expiration_days: ref(null),
  category_id: ref(null),
  subcategory_id: ref(null),
  title: ref(null),
  price: ref(null),
  description: ref(""),
  images: ref(null),
  city_id: ref(null),
  feedback: ref(null)
}

watch(
  () => inputValues.category_id,
  () => {
    if (!inputValues.category_id) return
    dataSubcategory.value = dataCategory.value.find((item) => item.id === inputValues.category_id)
  }
)

const validateLifetime = () => {
  const value = parseInt(inputValues.expiration_days, 10)
  if (value > 30) {
    inputValues.expiration_days = 30
  } else if (value < 1) {
    inputValues.expiration_days = 1
  }
}

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
  formData.append('expiration_days', inputValues.expiration_days)
  formData.append('category_id', inputValues.category_id)
  formData.append('subcategory_id', inputValues.subcategory_id)
  formData.append('title', inputValues.title)
  formData.append('price', checkPriceId.value < 0 ? checkPriceId.value : inputValues.price)
  formData.append('description', inputValues.description)
  formData.append('city_id', inputValues.city_id)
  formData.append('whatsapp', inputValues.feedback.whatsapp)
  formData.append('telegram', inputValues.feedback.telegram)
  formData.append('phone', inputValues.feedback.telephone)
  
  // Добавляем файлы (images)
  if (inputValues.images && inputValues.images.length) {
    for (let i = 0; i < inputValues.images.length; i++) {
      if (inputValues.images[i]) {
        formData.append(`images`, inputValues.images[i]) // Каждый файл добавляется с именем 'images'
      }
    }
  }
  try {
    isLoading.value = true
    await post(formData)
    toast.success('Объявление успешно опубликовано.', {
      timeout: 2000
    })
    isLoading.value = false
    router.push('/user/my-ads')
  } catch (error) {
    toast.error('Произошла ошибка, повторите попытку.', {
      timeout: 2000
    })
  }
}

function chekedPriceFree() {
  if (checkPriceId.value < 0) {
    inputValues.price = checkPriceId.value
  } else {
    inputValues.price = null
  }

}
</script>

<template>
  <div v-if="isLoading"
    class="w-screen h-screen fixed top-0 left-0 z-100 bg-black opacity-50 flex items-center justify-center">
    <div class="loader "></div>
  </div>
  <div class="flex overflow-visible relative gap-10">
    <form enctype="multipart/form-data"
      class="max-md:gap-5 text-text-custom max-w-2/3 px-3 max-lg:max-w-full max-lg:w-full max-sm:grid-cols-5 bg-gray-600 rounded-lg gap-y-8 gap-x-8 p-6 grid grid-cols-4">
      <label for="category" class="max-md:hidden col-span-1 max-sm:col-span-2 text-lg max-xl:text-sm">
        {{ arrayInputTemplate.category_id }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full max-lg:h-8 col-span-2 max-xl:col-span-3">
        <select @click="openCategory = !openCategory" @blur="openCategory = false" :ref="formRefs.category_id"
          v-model="inputValues.category_id" name="category"
          class="max-lg:h-8 w-full border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-700 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="category-select">
          <option @click="openCategory = false" v-for="item in dataCategory" :value="item.id" :key="item.id">
            {{ item.categoryName }}
          </option>
        </select>
        <div :class="openCategory ? 'rotate-180' : 'rotate-0'"
          class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white">
        </div>
      </div>

      <label for="subcategory" class="max-md:hidden max-sm:col-span-2 row-start-2 max-xl:text-sm col-span-1 text-lg">
        {{ arrayInputTemplate.subcategory_id }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative row-start-2 col-span-2 max-md:col-span-full max-xl:col-span-3 max-lg:h-8 max-h-9.5">
        <select @click="openSubcategory = !openSubcategory" @blur="openSubcategory = false"
          :ref="formRefs.subcategory_id" v-model="inputValues.subcategory_id" name="subcategory"
          class="w-full max-lg:h-8 max-h-9.5 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-700 focus:outline-hidden focus:ring-0 max-lg:py-0 px-2 py-2 m-0"
          id="sort-select">
          <template v-if="inputValues.category_id">
            <option @click="openSubcategory = false" v-for="item in dataSubcategory.subcategories" :value="item.id"
              :key="item.id">
              {{ item.subcategoryName }}
            </option>
          </template>
          <template v-else>
            <option :disabled="true" :value="9999" :key="9999">
              Выберите категорию.
            </option>
          </template>
        </select>
        <div :class="openSubcategory ? 'rotate-180' : 'rotate-0'"
          class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white">
        </div>
      </div>

      <label for="name" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-3 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.title }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <input :ref="formRefs.title" v-model="inputValues.title" type="text" autocomplete="off" name="name" maxlength="50"
        class="max-md:col-span-full max-lg:h-8 row-start-3 col-span-2 max-xl:col-span-3 rounded-sm border border-px border-gray-400 focus:border-white box-border duration-100 bg-gray-700 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
        placeholder="Название" id="1" />

      <label for="price"
        class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-4 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.price }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full max-lg:h-8 flex gap-2 row-start-4 col-span-2 max-xl:col-span-3">
        <input :disabled="checkPriceId < 0" :ref="formRefs.price" v-model="inputValues.price" type="text"
          v-maska="'########'" autocomplete="off" name="price" :class="checkPriceId < 0 ? 'text-transparent' : ''"
          class="rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-700 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
          placeholder="Цена" id="1" />
        <span class="absolute top-1/2 right-1.5 transform -translate-1/2 flex items-center">₽</span>
      </div>
      <div class="relative row-start-4 items-center gap-3 flex">
        <select @change="chekedPriceFree()" @click="openCheckPrice = !openCheckPrice" @blur="openCheckPrice = false"
          v-model="checkPriceId" name="subcategory"
          class="w-full max-lg:h-8 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-700 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="check-price">
          <option value="900" disabled selected>Изменить тип</option>
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

      <label for="description"
        class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-5 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.description }}:
      </label>
      <div class="max-md:col-span-full flex flex-col w-full gap-1 row-start-5 col-span-3">
        <textarea :ref="formRefs.description" autocomplete="off" name="description" v-model="inputValues.description"
          maxlength="3000"
          class="max-sm:text-xs max-md:min-h-8 rounded-md border border-px border-gray-400 focus:border-white py-0.5 min-h-20 field-sizing-content flex items-start lining-nums box-border outline-hidden duration-100 bg-gray-700 px-2"
          placeholder="Описание">
        </textarea>
        <span class="text-xs">{{ inputValues?.description?.length ? inputValues.description.length : '0' }} /
          3000</span>
      </div>

      <label :ref="formRefs.images" for="images"
        class="max-md:hidden max-sm:hidden max-xl:text-sm max-sm:col-span-2 row-start-6 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.images }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <UploadImg v-model:inputValues="inputValues.images" v-model:previeImages="previeImages"
        class="max-md:col-span-full row-start-6 col-span-2 max-2xl:col-span-3 max-sm:col-span-5" />

      <label for="subcategory" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-7 col-span-1 text-lg">
        {{ arrayInputTemplate.city_id }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full col-span-2 max-xl:col-span-3">
        <select @click="openCities = !openCities" @blur="openCities = false" :ref="formRefs.city_id"
          v-model="inputValues.city_id" name="subcategory"
          class="w-full max-lg:h-8 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-700 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="sort-select">
          <option @click="openCities = false" v-for="item in dataRegion" :value="item.id" :key="item.id">
            {{ item.name }}
          </option>
        </select>
        <div :class="openCities ? 'rotate-180' : 'rotate-0'"
          class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white">
        </div>
      </div>

      <label for="price"
        class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-8 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.feedback }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="max-md:col-span-full overflow-hidden flex gap-2 row-start-8 col-span-2 flex-wrap max-xl:col-span-3">
        <UploadFeedback v-model:feedbackRefs="formRefs.feedback"
          v-model:feedbackTelegram="inputValues.feedback.telegram"
          v-model:feedbackTelephon="inputValues.feedback.telephone"
          v-model:feedbackWhatsapp="inputValues.feedback.whatsapp" />
      </div>

      <label for="expiration_days"
        class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-9 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.expiration_days }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full max-lg:h-8 flex gap-2 row-start-9 col-span-2 max-xl:col-span-3">
        <input :ref="formRefs.expiration_days" v-model="inputValues.expiration_days" type="number" min="3" max="30"
          step="1" autocomplete="off" name="expiration_days"
          class="rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-700 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
          placeholder="от 1 до 30 дней" id="9" @input="validateLifetime" @blur="validateLifetime" />
      </div>

      <button @click.prevent="submitDataAd()"
        class="cursor-pointer text-white max-md:col-span-3 max-md:col-start-2 row-start-10 col-span-2 w-max justify-self-center col-start-2 px-2 py-2 rounded-md duration-200 bg-green-500 hover:bg-green-400 active:bg-green-300">
        Опубликовать объявление
      </button>
    </form>

    <div class="sticky max-lg:hidden top-34 max-w-3/9 self-start">
      <UploadFomMap v-model:formRefs="formRefs" v-model:inputValues="inputValues"
        v-model:arrayInputTemplate="arrayInputTemplate" />
    </div>
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