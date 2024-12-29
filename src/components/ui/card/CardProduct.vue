<script setup>
import WhatsappSmall from '@/components/ui/icons/WhatsappSmall.vue'
import TelegramSmall from '@/components/ui/icons/TelegramSmall.vue'
import PhoneSmall from '@/components/ui/icons/PhoneSmall.vue'
import FavoriteSmall from '@/components/ui/icons/FavoriteSmall.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  price: Number,
  title: String,
  subtitle: String,
  region: String,
  photoUrl: Array,
  name: String,
  surname: String,
  whatsapp: String,
  telegram: String,
  phone: String
})

const surname = computed(() => props.surname.slice(0, 1) + '.')

const formattedPrice = computed(() => props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))

const container = ref()
const img = ref()
</script>

<template>
  <div class="col-span-1 p-3 grid grid-cols-10 gap-5 max-sm:gap-x-0 bg-black-500 rounded-xl" ref="container">
    <img
      class="aspect-[1/1] max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden"
      :src="'https://apsnybillboard-production.up.railway.app/' + photoUrl[0].url" ref="img" alt="упс..." />
    <div class="max-sm:col-span-full max-lg:col-span-7 col-span-6">
      <h2 class="max-sm:text-base max-lg:text-xl text-2xl font-semibold text-green-300 inline-block mb-2">
        {{ props.title }}
      </h2>
      <h3 class="max-sm:text-lg max-lg:mb-2 block text-xl font-medium text-white mb-4">
        {{ formattedPrice }} ₽
      </h3>
      <div class="max-lg:text-xs max-h-[94px] text-gray-300 overflow-hidden">
        {{ props.subtitle }}
      </div>
    </div>
    <div class="max-lg:col-span-12 flex flex-col justify-between col-span-2">
      <div class="max-sm:hidden flex gap-x-7 items-center">
        <span class="max-lg:text-base text-xl font-semibold text-gray-300">{{ props.name + ' ' + surname }}</span>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <div class="col-span-4 my-1 text-gray-300">
          Регион: <span class="text-white">{{ props.region }}</span>
        </div>
        <WhatsappSmall v-if="props.whatsapp" :whatsapp="whatsapp" class="max-[374px]:hidden" />
        <TelegramSmall v-if="props.telegram" :telegram="telegram" class="max-[374px]:hidden" />
        <PhoneSmall v-if="props.phone" :phone="phone" class="max-[374px]:hidden" />
        <FavoriteSmall class="max-[374px]:hidden" />
        <div class="text-center col-span-4 py-2 px-4 text-white rounded-lg inline-block bg-gray-500">
          Подробнее
        </div>
      </div>
    </div>
  </div>
</template>
