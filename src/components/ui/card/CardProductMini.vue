<script setup>
import slugify from "slugify"
import { computed, ref } from 'vue'

const props = defineProps({
  photoUrl: Object,
  name: String,
  title: String,
  cities: String,
  price: Number,
  whatsapp: String,
  telegram: String,
  phone: String,
  id: Number
})

const imgLoading = ref(true)
const slugTitle = ref(slugify(props.title, { lower: true, strict: true }));
const formattedPrice = computed(() => props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
</script>

<template>
  <div class="flex gap-3 flex-col p-2 bg-black-500 rounded-sm">
    <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
      <div v-show="imgLoading == true" class="w-full h-40 max-[1280px]:h-32 max-[768px]:h-28 max-[440px]:h-20 bg-gray-200 rounded-sm" ></div>
      <img
        v-show="imgLoading == false"
        class="aspect-1/1 object-cover rounded-sm"
        :src="'https://apsnybillboard-production.up.railway.app/' + photoUrl[0].url"
        ref="img"
        alt="упс..."
        @load="imgLoading = false"
      />
    </RouterLink>
    <div class="flex flex-col justify-between h-full">
      <RouterLink :to="'/ad/electronics/' + id + '/' + slugTitle">
        <span class="text-green-300 inline-block w-full mb-2 max-sm:mb-1 max-lg:text-xs max-sm:text-xs">{{ props.name }}</span>
      </RouterLink>
      <div class="">
          <span class="inline-block w-full mb-1 max-sm:mb-0.5 max-sm:text-xs">{{ formattedPrice }} ₽</span>
          <span class="inline-block w-full mb-1 max-sm:text-xs">{{ props.cities }}</span>
      </div>
    </div>
  </div>
</template>
