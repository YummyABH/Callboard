<script setup>
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const textSearch = ref()

function APIFilterName() {
  const params = useFiltersProductsStore().filterParams
  params.adName = textSearch.value

  const paramsActive = useFiltersProductsStore().filteredParams
  router.push({
    query: paramsActive
  })
  useFiltersProductsStore().requestAd()
}
</script>

<template>
  <form class="text-white flex justify-between overflow-hidden bg-black-299 rounded-xl">
    <input
      v-model="textSearch"
      type="text"
      autocomplete="off"
      name="search"
      class="hover:bg-black-301 box-border duration-100 appearance-none border-none outline-none bg-inherit h-6 px-5 py-6 w-full"
      placeholder="Найти"
      id="1"
    />
    <button
      @click.prevent="APIFilterName()"
      class="duration-200 hover:bg-gray-800 active:bg-gray-900 flex text-xl max-md:px-6 px-10 bg-gray-700 items-center"
    >
      Найти
    </button>
  </form>
</template>
