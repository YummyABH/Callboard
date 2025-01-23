<script setup>
import { computed } from 'vue'

const props = defineProps({
  photoUrl: Object,
  name: String,
  cities: String,
  price: Number
})

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
      <span class="text-green-300 inline-block w-full mb-2 max-sm:mb-1 max-lg:text-xs max-sm:text-xs">{{ props.name }}</span>
      <div class="">
          <span class="inline-block w-full mb-1 max-sm:mb-0.5 max-sm:text-xs">{{ formattedPrice }} ₽</span>
          <span class="inline-block w-full mb-1 max-sm:text-xs">{{ props.cities }}</span>
      </div>
    </div>
  </div>
</template>
