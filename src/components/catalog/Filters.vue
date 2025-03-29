<script setup>
import CategoriesList from '@/components/catalog/filter/CategoriesList.vue'
import FilterPrice from '@/components/catalog/filter/FilterPrice.vue'
import FilterRegion from '@/components/catalog/filter/FilterRegion.vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = defineModel('open')

function delateParamsFilter() {
  const params = useFiltersProductsStore().filterParams
  const url = useFiltersProductsStore().filterUrl

  url.categoriesId = null
  url.subcategoryId = null

  params.minPrice = null
  params.maxPrice = null
  params.city = null
  params.page = null

  const paramsActive = useFiltersProductsStore().filteredParams

  router.push({
    path: '/catalog',
    query: paramsActive
  })
  useFiltersProductsStore().requestAd()
}

function APIFilteredRequest() {
  const paramsActive = useFiltersProductsStore().filteredParams
  router.push({
    query: paramsActive
  })
  useFiltersProductsStore().requestAd()
}

</script>

<template>
  <nav
    :ref="'toScrollTop'"
    :class="isOpen ? 'max-xl:left-0' : 'max-xl:-left-[1280px]'"
    class=" top-28 max-md:w-full flex max-xl:fixed transition-all max-md:top-16 max-xl:top-24 max-xl:z-40 flex-col h-min bg-black-400 rounded-xl px-4 py-8"
  >
    <div
      @click="isOpen = !isOpen"
      class="max-xl:flex hidden py-2 mb-2 gap-x-2 text-base items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="var(--text-custom)"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
      <span class="text-text-custom">Каталог</span>
    </div>
    <div class="w-full inline-block">
      <button
        @click="APIFilteredRequest(), isOpen = false"
        class="cursor-pointer bg-green-400 hover:bg-green-700 active:bg-green-800 duration-200 inline-block py-2 w-2/3 text-white font-semibold text-base"
      >
        Поиск
      </button>
      <div
        @click="delateParamsFilter(), isOpen = false"
        class="cursor-pointer inline-block text-white bg-red-700 hover:bg-red-800 active:bg-red-900 duration-200 w-1/3 text-center py-2"
      >
        Очистить
      </div>
    </div>
    <FilterPrice />
    <FilterRegion v-model:isOpen="isOpen" />
    <CategoriesList v-model:isOpen="isOpen" />
  </nav>
</template>
