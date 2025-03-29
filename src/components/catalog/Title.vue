<script setup>
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';

const {totalItems} = storeToRefs(useFiltersProductsStore())
const labelList = useFiltersProductsStore().labelList

const categoryName = computed(() => {
	let name = 'Все товары'
	if (labelList.subcategory) {
		name = labelList.subcategory
	} else if (labelList.category) {
		name = labelList.category
	}
	return name
})
</script>

<template>
	<div class="text-text-custom font-semibold mb-2 max-xl:mb-0.5 text-2xl max-lg:text-xl max-sm:mb-0">Найдено товаров: {{totalItems}}</div>
</template>