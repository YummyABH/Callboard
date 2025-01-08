<script setup>
import CardProduct from '@/components/ui/card/CardProduct.vue'
import FilterName from '@/components/catalog/filter/FilterName.vue'
import Sorting from '@/components/catalog/Sorting.vue'
import Filter from '@/components/ui/icons/Filter.vue'
import { adAPIFilters } from '@/API/adRequest.js'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const { data } = storeToRefs(useFiltersProductsStore())
const totalItems = ref(useFiltersProductsStore().totalItems)
const { create } = adAPIFilters()

onMounted(async () => {
  const urlCreate = useFiltersProductsStore().urlCreate
  const response = await create(urlCreate)
  totalItems.value = response.total
  data.value = response.ads
})
const isOpen = defineModel('open')
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <FilterName />
    <div class="flex justify-between">
      <Sorting class="inline-block" />
      <div @click="isOpen = !isOpen" class="max-xl:flex hidden gap-x-2 items-center">
        <Filter />
        Фильтры
      </div>
    </div>
    <div v-if="data[0]" class="lining-nums grid max-sm:grid-cols-2 gap-4">
      <CardProduct v-for="(item, index) in data" :key="index" :price="item.price" :title="item.adName"
        :subtitle="item.description" :region="item.region" :photo-url="item.photos" :name="item.firstName"
        :surname="item.lastName" :whatsapp="item.whatsapplink" :telegram="item.telegramlink"
        :phone="item.phonenumber" />
    </div>
  </div>
</template>
