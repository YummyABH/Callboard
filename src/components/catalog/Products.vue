<script setup>
import CardProduct from '@/components/ui/card/CardProduct.vue'
import FilterName from '@/components/catalog/filter/FilterName.vue'
import Sorting from '@/components/catalog/Sorting.vue'
import Filter from '@/components/ui/icons/Filter.vue'
import PaginationProducts from '@/components/catalog/PaginationProducts.vue'
import { adAPIFilters } from '@/API/adRequest.js'
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { useRouter } from 'vue-router';

const { data } = storeToRefs(useFiltersProductsStore())
onMounted(async () => {
	try {
		data.value = await adAPIFilters.create()
	} catch (error) {
		console.log(error);
	}
})
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
		<div v-if="data[0]" class="lining-nums grid max-sm:grid-cols-2 gap-4">
			<CardProduct v-for="(item, index) in data" :key="index" :price="item.price" :title="item.adName"
				:subtitle="item.description" :region="item.region" :photo-url="item.photos" />
		</div>
		<PaginationProducts />
	</div>
</template>