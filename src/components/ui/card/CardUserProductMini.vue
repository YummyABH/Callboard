<script setup>
import IconDelete from '@/components/ui/icons/IconDelete.vue'
import IconPencil from '@/components/ui/icons/IconPencil.vue'
import IconEye from '@/components/ui/icons/IconEye.vue'
import { computed, defineModel } from 'vue'

const props = defineProps({
  photoUrl: Object,
  title: String,
  daysRemaining: Number,
  price: Number
})

const isOpen = defineModel('isOpen')
const formattedPrice = computed(() => props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
</script>

<template>
  <div class="flex gap-3 flex-col p-2 bg-black-500 rounded-sm">
    <img
      class="aspect-1/1 object-cover rounded-sm"
      :src="'https://apsnybillboard-production.up.railway.app/' + photoUrl[0].url"
      ref="img"
      alt="упс..."
    />
    <div class="flex flex-col justify-between h-full">
      <span class="text-green-300 inline-block w-full mb-2 max-sm:mb-1 max-lg:text-xs max-sm:text-xs">{{ props.title }}</span>
      <div class="">
          <span class="inline-block w-full mb-1 max-sm:mb-0.5 max-sm:text-xs">{{ formattedPrice }} ₽</span>
      </div>
    </div>
    <div class="grid max-md:gap-1 grid-cols-4 gap-2">
        <div class="max-md:text-xs col-span-full max-lg:my-0 my-1 text-gray-300">
          Осталось: <span class="text-white">{{ props.daysRemaining + ' дней'}}</span>
        </div>
        <IconDelete @click="isOpen = !isOpen" title="Удалить"  />
        <IconPencil title="Редактировать"  />
        <IconEye title="Просмотреть объявление" />
        <div class="mt-2 hover:bg-gray-700 active:bg-gray-800 cursor-pointer duration-200 max-md:py-1 max-md:px-2 text-center col-span-4 py-2 px-4 text-white rounded-lg inline-block bg-gray-500">
          Продлить
        </div>
      </div>
  </div>
</template>
