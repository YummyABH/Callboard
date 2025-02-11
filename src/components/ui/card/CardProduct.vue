<script setup>
import WhatsappSmall from '@/components/ui/icons/WhatsappSmall.vue'
import TelegramSmall from '@/components/ui/icons/TelegramSmall.vue'
import PhoneSmall from '@/components/ui/icons/PhoneSmall.vue'
import slugify from "slugify"
// import FavoriteSmall from '@/components/ui/icons/FavoriteSmall.vue'
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
  phone: String,
  category: String,
  id: Number
})

const slugTitle = ref(slugify(props.title, { lower: true, strict: true }));
const surname = computed(() => props.surname.slice(0, 1) + '.')

console.log(props.category);

const formattedPrice = computed(() => props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))

const container = ref()
const img = ref()
</script>

<template>
  <div class="max-sm:hidden col-span-1 max-md:grid-cols-12 p-3 grid grid-cols-10 gap-5 max-sm:gap-x-0 bg-black-500 rounded-xl" ref="container">
    
    <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle" class="max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden">
      <img
        class="aspect-1/1 max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden"
        :src="'https://apsnybillboard-production.up.railway.app/' + photoUrl[0].url" ref="img" alt="упс..." />
    </RouterLink>
    <div class="max-md:col-span-6 max-lg:col-span-5 max-sm:col-span-full col-span-6">
      <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
        <h2 class="max-md:text-base max-sm:text-base max-lg:text-xl text-2xl font-semibold text-green-300 inline-block mb-2">
          {{ props.title }}
        </h2>
      </RouterLink>
      <h3 class="max-md:text-sm max-sm:text-lg max-lg:mb-2 block text-xl font-medium text-text-custom mb-4">
        {{ formattedPrice }} ₽
      </h3>
      <div class="max-lg:text-xs max-h-[94px] text-text-custom overflow-hidden">
        <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
          <span class="text-text-custom">
            {{ props.subtitle }}
          </span>
        </RouterLink>
      </div>
    </div>
    <div class="max-md:col-span-3 max-lg:col-span-2 flex flex-col justify-between col-span-2">
      <div class="max-sm:hidden flex gap-x-7 items-center">
        <span class="max-lg:text-base max-md:text-sm text-xl font-semibold text-text-custom">{{ props.name + ' ' + surname }}</span>
      </div>
      <div class="grid max-md:gap-1 grid-cols-4 gap-2 ">
        <div class="max-md:text-xs col-span-4 max-lg:my-0 my-1 font-light text-text-custom">
          Регион: <span class=" font-medium text-text-custom">{{ props.region }}</span>
        </div>
        <a :href="whatsapp">
          <WhatsappSmall v-if="props.whatsapp" :whatsapp="whatsapp" class="max-[374px]:hidden" />
        </a>
        <a :href="telegram">
          <TelegramSmall v-if="props.telegram" :telegram="telegram" class="max-[374px]:hidden" />
        </a>
        <a :href="'tel:' + phone">
          <PhoneSmall v-if="props.phone" :phone="phone" class="max-[374px]:hidden" />
        </a>
        <!-- <FavoriteSmall class="max-[374px]:hidden" /> -->
        <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle" class="hover:bg-gray-700 active:bg-gray-800 cursor-pointer duration-200 max-md:py-1 max-md:px-2 text-center col-span-4 py-2 px-4 text-text-custom rounded-lg inline-block bg-gray-500">
          <span class="text-text-custom">
            Подробнее
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
