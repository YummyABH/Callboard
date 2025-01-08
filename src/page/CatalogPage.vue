<script setup>
import ContentContainer from '@/components/ContentContainer.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import Title from '@/components/catalog/Title.vue'
import Filters from '@/components/catalog/Filters.vue'
import BaseProducts from '@/components/catalog/BaseProducts.vue'
import PaginationProducts from '@/components/catalog/PaginationProducts.vue'
import { ref } from 'vue'

const isOpen = ref()
</script>

<template>
  <div class="pt-24 pb-20">
    <ContentContainer>
      <Breadcrumbs />
      <div class="relative max-xl:gap-x-0 grid gap-x-8 gap-y-4 grid-cols-12">
        <Title class="max-md:text-2xl max-sm:text-lg col-span-full" />
        <Filters v-model:open="isOpen" class="col-span-3" />
        <BaseProducts v-model:open="isOpen" class="max-xl:col-span-12 col-span-9" />
        <PaginationProducts class="max-xl:col-span-12 col-span-9" />
      </div>
    </ContentContainer>
  </div>
</template>
