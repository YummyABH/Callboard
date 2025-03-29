<script setup>
import ContentContainer from '@/components/ContentContainer.vue'
import CardProductMini from '@/components/ui/card/CardProductMini.vue'
import { adAPIFilters } from '@/API/adRequest.js'
import { onMounted, ref } from 'vue'

const { create } = adAPIFilters()

const data = ref([])
const isLoading = ref(true)

async function requestAd() {
  const response = await create('?page=1&limit=12')
  data.value = response.listings
  isLoading.value = false
}

onMounted(() => {
  requestAd()
})
</script>

<template>
  <div class="w-full pb-2 pt-6 max-md:mt-16 mt-24">
    <ContentContainer>
      <div class="text-2xl text-text-custom text-center mb-5 max-lg:text-base max-lg:mb-2 max-[540px]:text-2xl">
        Последние объявления
      </div>

      <div
        v-if="isLoading"
        class="grid grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 gap-3"
      >
        <div
          v-for="index in 12"
          :key="index"
          class="animate-pulse flex flex-col p-2 bg-black-500 rounded-sm"
        >
          <div class="w-full h-40 max-[1280px]:h-32 max-[768px]:h-28 max-[440px]:h-20 bg-gray-200 rounded-sm"></div>
          <div class="w-3/4 h-4 mt-2 rounded-sm bg-gray-200"></div>
          <div class="w-1/2 h-4 mt-1 rounded-sm bg-gray-200"></div>
        </div>
      </div>

      <div
        v-else
        class="max-sm:grid-cols-3 max-md:grid-cols-4 max-lg:grid-cols-5 grid grid-cols-6 gap-3"
      >
        <CardProductMini
          v-for="(item, index) in data"
          :key="index"
          :whatsapp="item.whatsapplink"
          :telegram="item.telegramlink"
          :phone="item.phonenumber"
          :title="item.title"
          :id="item.id"
          :photo-url="item.images[0]"
          :price="item.price"
          :cities="item.city"
          :name="item.title"
        />
      </div>
    </ContentContainer>
  </div>
</template>
