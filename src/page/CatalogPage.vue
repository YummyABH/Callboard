<script setup>
import ContentContainer from '@/components/ContentContainer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Title from '@/components/catalog/Title.vue'
import Filters from '@/components/catalog/Filters.vue'
import BaseProducts from '@/components/catalog/BaseProducts.vue'
import PaginationProducts from '@/components/catalog/PaginationProducts.vue'
import { adAPIFilters } from '@/API/adRequest.js'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

const {data} = storeToRefs(useFiltersProductsStore())
const {totalItems} = storeToRefs(useFiltersProductsStore())
const { create } = adAPIFilters()
const params = useFiltersProductsStore().filteredParams

const isOpen = ref(false)
const body = document.body
const listAdLoading = ref(true)

onMounted(async () => {
  const urlCreate = useFiltersProductsStore().urlCreate
  const response = await create(urlCreate, params)
  listAdLoading.value = false
  totalItems.value = response.total
  data.value = response.listings
})

watch(isOpen, () => {
  if (isOpen.value === true) {
    body.style.overflowY = 'hidden'
  } 
  isOpen.value ? body.style.overflowY = 'hidden' : body.style.overflowY = 'auto'
})
</script>

<template>
  <div class="max-md:pt-16 max-md:pb-10 max-xl:pb-16 max-lg:pb-12 pt-24 pb-20">
    <ContentContainer>
      <Breadcrumbs />
      <div class="max-sm:gap-y-2 relative max-xl:gap-x-0 grid gap-x-8 gap-y-4 grid-cols-12">
        <Title class="max-sm:text-base col-span-full" />
        <Filters v-model:open="isOpen" class="max-xl:max-h-[calc(100vh-96px)] overflow-y-auto col-span-3" />
        <BaseProducts v-model:listAdLoading="listAdLoading" v-model:open="isOpen"  class="max-xl:col-span-12 col-span-9" />
        <PaginationProducts v-if="data" class="max-xl:col-span-12 col-span-9" />
      </div>
    </ContentContainer>
  </div>
</template>

