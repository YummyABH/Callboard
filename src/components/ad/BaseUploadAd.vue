<script setup>
import UploadImg from '@/components/ad/uploadAd/UploadImg.vue'
import UploadFomMap from './uploadAd/UploadFomMap.vue'
import UploadFeedback from './uploadAd/UploadFeedback.vue'
import { vMaska } from 'maska/vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { regionsAPI } from '@/API/regionsRequest.js'
import { useCategoriesAPI } from '@/API/categoriesRequest.js'

const { create } = useCategoriesAPI()
const { regionList } = regionsAPI()

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
    telephone: null,
  }
})

const arrayInputTemplate = reactive({
  category: 'Категория',
  subcategory: 'Подкатегория',
  name: 'Название',
  price: 'Цена',
  description: 'Описание',
  photo: 'Фотографии',
  city: 'Город',
  feedback: 'Способы связи'
})

// Создаём ссылки для всех полей формы
const formRefs = {
  category: ref(null),
  subcategory: ref(null),
  name: ref(null),
  price: ref(null),
  description: ref(null),
  photo: ref(null),
  city: ref(null),
  feedback: ref(null)
}

watch(
  () => inputValues.category,
  () => {
    if (!inputValues.category) return
    dataSubcategory.value = dataCategory.value.find((item) => item.id === inputValues.category)
  }
)
</script>

<template>
  <div class="flex overflow-visible relative gap-10">
    <form class="max-md:gap-5 text-text-custom max-w-2/3 px-3 max-lg:max-w-full max-lg:w-full max-sm:grid-cols-5 bg-gray-600 rounded-lg gap-y-8 gap-x-8 p-6 grid grid-cols-4">
      <label for="category" class="max-md:hidden col-span-1 max-sm:col-span-2 text-lg max-xl:text-sm">
        {{ arrayInputTemplate.category }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full max-lg:h-8 col-span-2 max-xl:col-span-3">
        <select
          @click="openCategory = !openCategory"
          @blur="openCategory = false"
          :ref="formRefs.category"
          v-model="inputValues.category"
          name="category"
          class=" max-lg:h-8 w-full border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
          id="category-select"
        >
        
          <option @click="openCategory = false" v-for="item in dataCategory" :value="item.id" :key="item.id">
            {{ item.categoryName }}
          </option>
        </select>
        <div :class="openCategory ? 'rotate-180' : 'rotate-0'" class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white"></div>
      </div>

      <label for="subcategory" class="max-md:hidden max-sm:col-span-2 row-start-2 max-xl:text-sm col-span-1 text-lg">
        {{ arrayInputTemplate.subcategory }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative row-start-2 col-span-2 max-md:col-span-full max-xl:col-span-3 max-lg:h-8 max-h-9.5">
        <select
          @click="openSubcategory = !openSubcategory"
          @blur="openSubcategory = false"
          :ref="formRefs.subcategory"
          v-model="inputValues.subcategory"
          name="subcategory"
          class="w-full max-lg:h-8 max-h-9.5 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-0 px-2 py-2 m-0"
          id="sort-select"
        >
          <option @click="openSubcategory = false" v-for="item in dataSubcategory.subcategories" :value="item.id" :key="item.id">
            {{ item.subcategoryName }}
          </option>
        </select>
        <div :class="openSubcategory ? 'rotate-180' : 'rotate-0'" class="duration-300 transform pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 border-x-4 border-t-4 border-x-transparent border-t-white"></div>

      </div>

      <label for="name" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-3 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.name }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <input
        :ref="formRefs.name"
        v-model="inputValues.name"
        type="text"
        autocomplete="off"
        name="name"
        maxlength="50"
        class="max-md:col-span-full max-lg:h-8 row-start-3 col-span-2 max-xl:col-span-3 rounded-sm border border-px border-gray-400 focus:border-white box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
        placeholder="Название"
        id="1"
      />

      <label for="price" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-4 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.price }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full max-lg:h-8 flex gap-2 row-start-4 col-span-2 max-xl:col-span-3">
        <input
          :ref="formRefs.price"
          v-model="inputValues.price"
          type="text"
          v-maska="'###################'"
          autocomplete="off"
          name="price"
          class=" rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-800 outline-hidden max-sm:py-4 max-lg:py-3.5 px-2 w-full"
          placeholder="Цена"
          id="1"
        />
        <span class="absolute top-1/2 right-1.5 transform -translate-1/2 flex items-center">₽</span>
      </div>

      <label for="description" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-5 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.description }}:
      </label>
      <div class="max-md:col-span-full flex flex-col w-full gap-1 row-start-5 col-span-3">
        <textarea
          :ref="formRefs.description"
          autocomplete="off"
          name="description"
          v-model="inputValues.description"
          maxlength="3000"
          class="max-sm:text-xs max-md:min-h-8 rounded-md border border-px border-gray-400 focus:border-white py-0.5 min-h-20 field-sizing-content flex items-start lining-nums box-border outline-hidden duration-100 bg-gray-800 px-2"
          placeholder="Описание"
        >
        </textarea>
          <span class="text-xs"
            >{{ inputValues?.description?.length ? inputValues.description.length : '0' }} /
            3000</span
          >
      </div>

      <label :ref="formRefs.photo" for="photo" class="max-md:hidden max-sm:hidden max-xl:text-sm max-sm:col-span-2 row-start-6 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.photo }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <UploadImg v-model:inputValues="inputValues.photo" class="max-md:col-span-full row-start-6 col-span-2 max-2xl:col-span-3 max-sm:col-span-5" />

      <label for="subcategory" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-7 col-span-1 text-lg">
        {{ arrayInputTemplate.city }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="relative max-md:col-span-full col-span-2 max-xl:col-span-3">
        <select
          @click="openCities = !openCities"
          @blur="openCities = false"
          :ref="formRefs.city"
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

      <label for="price" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-8 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.feedback }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="max-md:col-span-full overflow-hidden flex gap-2 row-start-8 col-span-2 flex-wrap max-xl:col-span-3">
        <UploadFeedback v-model:feedbackRefs="formRefs.feedback" v-model:feedbackTelegram="inputValues.feedback.telegram" v-model:feedbackTelephon="inputValues.feedback.telephone" v-model:feedbackWhatsapp="inputValues.feedback.whatsapp"/>
      </div>
      <button @click.prevent="" class="cursor-pointer text-white max-md:col-span-3 max-md:col-start-2 row-start-9 col-span-2 w-max justify-self-center col-start-2 px-2 py-2 rounded-md duration-200 bg-green-500 hover:bg-green-400 active:bg-green-300">
        Опубликовать объявление
      </button>
    </form>

    <div class="sticky max-lg:hidden top-34 max-w-3/9 self-start">
      <UploadFomMap
        v-model:formRefs="formRefs"
        v-model:inputValues="inputValues"
        v-model:arrayInputTemplate="arrayInputTemplate"
      />
    </div>
  </div>
</template>
