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
  <form class="text-text-custom flex justify-between overflow-hidden bg-form-gray rounded-xl">
    <input
      v-model="textSearch"
      type="text"
      autocomplete="off"
      name="search"
      class="hover:bg-black-301 box-border duration-100 appearance-none border-none outline-hidden bg-black-301 max-sm:py-4 max-lg:py-5 h-6 px-5 py-6 w-full"
      placeholder="Найти"
      id="1"
    />
    <button
      @click.prevent="APIFilterName()"
      class="cursor-pointer text-text-custom duration-200 hover:bg-gray-800 active:bg-gray-900 flex text-xl max-md:px-6 px-10 bg-gray-700 items-center"
    >
      Найти
    </button>
  </form>
</template>
