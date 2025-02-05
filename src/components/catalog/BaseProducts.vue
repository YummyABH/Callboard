<script setup>
import CardProduct from '@/components/ui/card/CardProduct.vue'
import FilterName from '@/components/catalog/filter/FilterName.vue'
import Sorting from '@/components/catalog/Sorting.vue'
import Filter from '@/components/ui/icons/Filter.vue'
import SkeleyonAdItem from '../ui/skeleton/SkeleyonAdItem.vue'
import CardProductMini from '@/components/ui/card/CardProductMini.vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { storeToRefs } from 'pinia'

const {data} = storeToRefs(useFiltersProductsStore())

const listAdLoading = defineModel('listAdLoading')
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
    <div v-if="data[0] && !listAdLoading" class="lining-nums grid max-[540px]:grid-cols-2 max-[640px]:grid-cols-3 gap-4">
      <CardProduct v-for="(item, index) in data" :key="index" :price="item.price" :title="item.adName"
        :subtitle="item.description" :region="item.region" :photo-url="item.photos" :name="item.firstName"
        :surname="item.lastName" :whatsapp="item.whatsapplink" :telegram="item.telegramlink"
        :phone="item.phonenumber" :category="item.category" :id="item.adId"/>
      <CardProductMini v-for="(item, index) in data" class="sm:hidden" :key="index" :whatsapp="item.whatsapplink" :telegram="item.telegramlink"
      :phone="item.phonenumber" :title="item.adName" :id="item.adId" :photo-url="item.photos" :price="item.price" :cities="item.region" :name="item.adName"/>
    </div>

    <div v-if="listAdLoading" class="lining-nums grid max-[540px]:grid-cols-2 max-[640px]:grid-cols-3 gap-4">
      <SkeleyonAdItem v-for="(item, index) in 4" :key="index" />
    </div>
  </div>
</template>
