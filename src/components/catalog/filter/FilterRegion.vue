<script setup>
import { regionsAPI } from '@/API/regionsRequest.js'
import { ref, onMounted } from 'vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const dataRegion = ref()
const regionValue = ref('default')

onMounted(async () => {
  try {
    dataRegion.value = await regionsAPI.create()
  } catch (error) {
    console.log(error)
  }
})

function APIFilterRegion() {
  const params = useFiltersProductsStore().filterParams
  if (regionValue.value !== 'default') {
    params.regionId = regionValue.value
  } else {
    params.regionId = null
  }
}
</script>

<template>
  <form class="flex text-white flex-col border-y-[1px] border-green-400">
    <label for="region-select" class="px-4 py-3 font-semibold text-xl text-white bg-gray-500"
      >Выбор региона:</label
    >
    <select
      @click="APIFilterRegion()"
      name="region"
      v-model="regionValue"
      class="cursor-pointer hover:bg-gray-700 active:bg-gray-400 duration-200 font-semibold text-base appearance-none bg-gray-800 border-none focus:outline-none focus:ring-0 px-4 py-3 m-0"
      id="region-select"
    >
      <option value="default" class="text-white">Все регионы</option>
      <option v-for="item in dataRegion" :value="item.id" :key="item.id">
        {{ item.regionName }}
      </option>
    </select>
  </form>
</template>
