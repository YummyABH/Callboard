<script setup>
import WhatsappSmall from '@/components/ui/icons/WhatsappSmall.vue'
import TelegramSmall from '@/components/ui/icons/TelegramSmall.vue'
import PhoneSmall from '@/components/ui/icons/PhoneSmall.vue'
import slugify from "slugify"
// import FavoriteSmall from '@/components/ui/icons/FavoriteSmall.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  created_at: String,
  price: Number,
  title: String,
  subtitle: String,
  region: String,
  photoUrl: String,
  name: String,
  surname: String,
  whatsapp: String,
  telegram: String,
  phone: String,
  id: Number
})
const slugTitle = ref(slugify(props.title, { lower: true, strict: true }));

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
const formatedWhatsapp = computed(() => (props.whatsapp.replace(/[^\d]/g, '').replace(/^[+7|8]/, '7')))
const container = ref()
const img = ref()

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы с 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

const date_create = formatDate(props.created_at)
</script>

<template>
  <div class="max-sm:hidden col-span-1 max-md:grid-cols-12 p-3 grid grid-cols-10 gap-5 max-sm:gap-x-0 bg-black-500 rounded-xl" ref="container">
    
    <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle" class="max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden">
      <img
        class="aspect-1/1 max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden"
        :src="'https://apsny-billboard-production.up.railway.app/' + photoUrl" ref="img" alt="упс..." />
    </RouterLink>
    <div class="max-md:col-span-6 max-lg:col-span-5 max-sm:col-span-full col-span-6">
      <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
        <h2 class="max-md:text-base max-sm:text-base max-lg:text-xl text-2xl font-semibold text-green-300 inline-block mb-2">
          {{ props.title }}
        </h2>
      </RouterLink>
      <h3 class="max-md:text-sm max-sm:text-lg max-lg:mb-2 block text-xl font-medium text-text-custom mb-4">
        {{ formattedPrice }}
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
        <span class="max-lg:text-base max-md:text-sm text-xl font-semibold text-text-custom">{{ props.name }}</span>
      </div>
      <div class="grid max-md:gap-1 grid-cols-4 gap-2 ">
        <div class="max-md:text-xs col-span-4  max-lg:my-0 my-1 font-light text-text-custom">
          Регион: <span class=" font-medium text-green-300">{{ props.region }}</span>
          <div class="text-custom text-sm">От: <span class="text-green-300">{{ date_create }}</span></div>
        </div>
        <a v-if="whatsapp && whatsapp !== 'null'" :href="'https://wa.me/' + formatedWhatsapp">
          <WhatsappSmall :whatsapp="whatsapp" class="max-[374px]:hidden" />
        </a>
        <a v-if="telegram && telegram !== 'null'" :href="telegram">
          <TelegramSmall :telegram="telegram" class="max-[374px]:hidden" />
        </a>
        <a v-if="phone && phone !== 'null'" :href="'tel:' + phone">
          <PhoneSmall :phone="phone" class="max-[374px]:hidden" />
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
