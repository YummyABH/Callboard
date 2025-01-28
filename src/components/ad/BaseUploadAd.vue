<script setup>
import UploadImg from '@/components/ad/uploadAd/UploadImg.vue'
import UploadFomMap from './uploadAd/UploadFomMap.vue'
import { vMaska } from 'maska/vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { regionsAPI } from '@/API/regionsRequest.js'
import { useCategoriesAPI } from '@/API/categoriesRequest.js'

const { create } = useCategoriesAPI()
const { regionList } = regionsAPI()

const dataRegion = ref()
const dataCategory = ref()
const dataSubcategory = ref([])

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
  feedback: null
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
    <form class="max-md:gap-5 max-w-2/3 px-3 max-lg:max-w-full max-lg:w-full max-sm:grid-cols-5 bg-gray-600 rounded-lg gap-y-8 gap-x-8 p-6 grid grid-cols-4">
      <label for="category" class="max-md:hidden col-span-1 max-sm:col-span-2 text-lg max-xl:text-sm">
        {{ arrayInputTemplate.category }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <select
        :ref="formRefs.category"
        v-model="inputValues.category"
        name="category"
        class="max-lg:h-8 max-md:col-span-full col-span-2 max-xl:col-span-3 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
        id="category-select"
      >
        <option v-for="item in dataCategory" :value="item.id" :key="item.id">
          {{ item.categoryName }}
        </option>
      </select>

      <label for="subcategory" class="max-md:hidden max-sm:col-span-2 row-start-2 max-xl:text-sm col-span-1 text-lg">
        {{ arrayInputTemplate.subcategory }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <select
        :ref="formRefs.subcategory"
        v-model="inputValues.subcategory"
        name="subcategory"
        class="max-md:col-span-full max-lg:h-8 row-start-2 col-span-2 max-h-9.5 max-xl:col-span-3 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-0 px-2 py-2 m-0"
        id="sort-select"
      >
        <option v-for="item in dataSubcategory.subcategories" :value="item.id" :key="item.id">
          {{ item.subcategoryName }}
        </option>
      </select>

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
      <div class="max-md:col-span-full max-lg:h-8 flex gap-2 row-start-4 col-span-2 max-xl:col-span-3">
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
        <span class="flex items-center">₽</span>
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
        <div class="flex justify-between">
          <span class="text-xs">До 3000 символов</span>
          <span class="text-xs"
            >{{ inputValues?.description?.length ? inputValues.description.length : '0' }} /
            3000</span
          >
        </div>
      </div>

      <label :ref="formRefs.photo" for="photo" class="max-md:hidden max-sm:hidden max-xl:text-sm max-sm:col-span-2 row-start-6 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.photo }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <UploadImg v-model:inputValues="inputValues.photo" class="max-md:col-span-full row-start-6 col-span-2 max-2xl:col-span-3 max-sm:col-span-5" />

      <label for="subcategory" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-7 col-span-1 text-lg">
        {{ arrayInputTemplate.city }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <select
        :ref="formRefs.city"
        v-model="inputValues.city"
        name="subcategory"
        class="max-md:col-span-full col-span-2 max-lg:h-8 max-xl:col-span-3 border border-px border-gray-400 focus:border-white cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
        id="sort-select"
      >
        <option v-for="item in dataRegion" :value="item.id" :key="item.id">
          {{ item.regionName }}
        </option>
      </select>

      <label for="price" class="max-md:hidden max-xl:text-sm max-sm:col-span-2 row-start-8 col-span-1 text-lg text-left">
        {{ arrayInputTemplate.feedback }}: <span class="text-red-400 text-xl">*</span>
      </label>
      <div class="max-md:col-span-full flex gap-2 row-start-8 col-span-2 max-xl:col-span-3">
        <input
          :ref="formRefs.feedback"
          v-model="inputValues.feedback"
          type="text"
          v-maska="'###################'"
          autocomplete="off"
          name="price"
          class="rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-800 max-lg:h-8 outline-hidden max-sm:py-4 max-lg:py-0 px-2 w-full"
          placeholder=""
          id="1"
        />
      </div>
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
