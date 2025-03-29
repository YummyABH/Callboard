<script setup>
import CardProduct from '@/components/ui/card/CardProduct.vue'
import FilterName from '@/components/catalog/filter/FilterName.vue'

// Сортировка
// import Sorting from '@/components/catalog/Sorting.vue'
import Filter from '@/components/ui/icons/Filter.vue'
import SkeleyonAdItem from '../ui/skeleton/SkeleyonAdItem.vue'
import CardProductMini from '@/components/ui/card/CardProductMini.vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { storeToRefs } from 'pinia'

const {data} = storeToRefs(useFiltersProductsStore())
  
const listAdLoading = defineModel('listAdLoading')


// Сортировка
const isOpen = defineModel('open')
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <FilterName />
    
    <!-- Сортировка -->
    <div class="flex justify-between">
      <!-- <Sorting class="inline-block" /> -->
      <div @click="isOpen = !isOpen" class="max-xl:flex hidden gap-x-2 items-center">
        <Filter />
        <span class="text-text-custom">
          Фильтры
        </span>
      </div>
    </div>
    <div v-if="data && !listAdLoading" class="lining-nums grid max-[540px]:grid-cols-2 max-[640px]:grid-cols-3 gap-4">
      <CardProduct v-for="(item, index) in data" :key="index" :created_at="item.created_at" :price="item.price" :title="item.title"
        :subtitle="item.description" :region="item.city" :photo-url="item.images[0]" :name="item.author.name"
        :surname="item.author.name" :whatsapp="item.contacts.whatsapp" :telegram="item.contacts.telegram"
        :phone="item.contacts.phone" :category="item.category" :id="item.id"/>
      <CardProductMini v-for="(item, index) in data" class="sm:hidden" :key="index" :created_at="item.created_at" :whatsapp="item.whatsapplink" :telegram="item.telegramlink"
      :phone="item.phonenumber" :title="item.title" :id="item.id" :photo-url="item.images[0]" :price="item.price" :cities="item.city" :name="item.title"/>
    </div>

    <div v-if="listAdLoading" class="lining-nums grid max-[540px]:grid-cols-2 max-[640px]:grid-cols-3 gap-4">
      <SkeleyonAdItem v-for="(item, index) in 4" :key="index" />

        <div
          v-for="index in 6"
          :key="index"
          class=" animate-pulse sm:hidden flex flex-col p-2 bg-black-500 rounded-sm"
        >
          <div class="w-full h-40 max-[1280px]:h-32 max-[768px]:h-28 max-[440px]:h-20 bg-gray-200 rounded-sm"></div>
          <div class="w-3/4 h-4 mt-2 rounded-sm bg-gray-200"></div>
          <div class="w-1/2 h-4 mt-1 rounded-sm bg-gray-200"></div>
        </div>
    </div>
  </div>
</template>
