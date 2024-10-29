<script setup>
import { regionsAPI } from '@/API/regionsRequest.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const router = useRouter()
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
	const paramsActive = useFiltersProductsStore().filteredParams
	router.push({
		query: paramsActive
	})
	useFiltersProductsStore().requestAd()
}
</script>

<template>
	<form class="flex text-white flex-col">
		<label for="region-select" class="px-4 py-3 font-semibold text-xl text-white bg-gray-500">Выбор региона:</label>
		<select name="region" v-model="regionValue"
			class="font-semibold text-base appearance-none bg-gray-800 border-none focus:outline-none focus:ring-0 px-4 py-3 m-0"
			id="region-select">
			<option value="default" class="text-white">Все регионы</option>
			<option v-for="item in dataRegion" :value="item.id" :key="item.id">{{ item.regionName }}</option>
		</select>
	</form>
	<button @click="APIFilterRegion()" class="bg-green-400 inline-block py-2 text-white font-semibold text-base">
		Поиск
	</button>
</template>