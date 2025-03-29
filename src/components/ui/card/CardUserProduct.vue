<script setup>
import IconDelete from '@/components/ui/icons/IconDelete.vue'
import IconPencil from '@/components/ui/icons/IconPencil.vue'
import IconEye from '@/components/ui/icons/IconEye.vue'
import slugify from "slugify"
import { computed, ref, defineModel } from 'vue'

const props = defineProps({
  price: Number,
  title: String,
  subtitle: String,
  daysRemaining: Number,
  photoUrl: String,
  id: Number
})

const activeId = defineModel('activeId')
const formattedPrice = computed(() => { 
  let formattedString = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  switch (props.price) {
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
const slugTitle = ref(slugify(props.title, { lower: true, strict: true }));

const modelExpirationOpen = defineModel('modelExpirationOpen')
const isOpen = defineModel('isOpen')
const container = ref()
const img = ref()
</script>

<template>
  <div class="max-sm:hidden col-span-1 max-md:grid-cols-12 p-3 grid grid-cols-12 gap-5 max-sm:gap-x-0 bg-black-500 rounded-xl" ref="container">
    <img
      class="aspect-1/1 max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden"
      :src="'https://apsny-billboard-production.up.railway.app/' + photoUrl" ref="img" alt="упс..." />
    <div class="max-md:col-span-6 max-lg:col-span-6 max-sm:col-span-full col-span-7">
      <h2 class="max-md:text-base max-sm:text-base max-lg:text-xl text-2xl font-semibold text-green-300 inline-block mb-2">
        {{ props.title }}
      </h2>
      <h3 class="max-md:text-sm max-sm:text-lg max-lg:mb-2 block text-xl font-medium text-text-custom mb-4">
        {{ formattedPrice  }}
      </h3>
      <div class="max-lg:text-xs max-h-[94px] text-text-custom overflow-hidden">
        {{ props.subtitle }}
      </div>
    </div>
    <div class="max-md:col-span-3 max-lg:col-span-3 flex flex-col justify-between col-span-3">
      <div class="max-sm:hidden flex gap-x-7 items-center">
        <span class="max-lg:text-base max-md:text-sm text-xl font-semibold text-gray-300">{{  }}</span>
      </div>
      <div class="grid max-md:gap-1 grid-cols-4 gap-2">
        <div class="max-md:text-xs col-span-4 max-lg:my-0 my-1 text-text-custom">
          Осталось: <span class="text-text-custom max-lg:text-xs">{{ props.daysRemaining + ' дней'}}</span>
        </div>
        <IconDelete @click="isOpen = !isOpen, activeId = id" title="Удалить" class="max-[374px]:hidden" />
        <RouterLink :to="'/user/my-ads/' + id + '/edit'">
          <IconPencil title="Редактировать" class="max-[374px]:hidden" />
        </RouterLink>

        <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
          <IconEye title="Просмотреть объявление" class="max-[374px]:hidden" />
        </RouterLink>

        <div @click="modelExpirationOpen = !modelExpirationOpen, activeId = id" class="hover:bg-gray-700 active:bg-gray-800 cursor-pointer duration-200 max-md:py-1 max-md:px-2 text-center col-span-4 py-2 px-4 text-text-custom rounded-lg inline-block bg-gray-500">
          Продлить
        </div>
      </div>
    </div>
  </div>
</template>
