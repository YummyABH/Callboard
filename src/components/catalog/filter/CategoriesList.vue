<script setup>
import { categoriesAPI } from '@/API/categoriesRequest.js'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { ref, onMounted } from 'vue'
import CategoryItem from '@/components/catalog/filter/CategoryItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = ref()
onMounted(async () => {
  try {
    data.value = await categoriesAPI.create()
  } catch (error) {
    console.log(error)
  }
})

async function APIFilter() {
  const params = useFiltersProductsStore().filterUrl
  const paramsQuery = useFiltersProductsStore().filterParams

  paramsQuery.adName = null
  paramsQuery.maxPrice = null
  paramsQuery.minPrice = null

  params.categoriesId = null
  params.subcategoryId = null

  const paramsActive = useFiltersProductsStore().filteredParams
  router.push({
    path: '/catalog',
    query: paramsActive
  })
  useFiltersProductsStore().requestAd()
}
</script>

<template>
  <ul class="grid gap-y-px border-y-[1px] border-green-400">
    <div
      @click="APIFilter()"
      class="w-full flex self-center text-white bg-black-300 hover:bg-gray-900 active:bg-gray-901 duration-200 font-semibold text-base px-4 py-3 cursor-pointer"
    >
      Все товары
    </div>
    <CategoryItem
      v-for="(item, index) in data"
      :key="index"
      :subcategoryPath="item.path"
      :category="item.categoryName"
      :subcategory="item.subcategories"
    />
  </ul>
</template>
