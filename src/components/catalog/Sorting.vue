<script setup>
import { ref } from 'vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { watch } from 'vue'

const selectSort = ref('default')

watch(selectSort, (newValue) => {
  useFiltersProductsStore().sortArg = newValue
  useFiltersProductsStore().sortData(newValue)
})
</script>

<template>
  <form class="flex text-white bg-gray-800 overflow-hidden">
    <div class="relative">
      <select
        name="sort"
        v-model="selectSort"
        class="cursor-pointer overflow-hidden z-10 font-normal pr-9 max-md:pr-0 text-sm appearance-none border-none bg-gray-800 focus:outline-hidden focus:ring-0 max-lg:py-1 px-2 py-2 m-0"
        id="sort-select"
      >
        <option value="default" class="text-white">По дате</option>
        <option value="maxPrice" class="text-white">Цена (по убыванию)</option>
        <option value="minPrice" class="text-white">Цена (по возрастанию)</option>
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-5 absolute z-0 right-2 top-1/2 -translate-y-1/2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
        />
      </svg>
    </div>
  </form>
</template>
