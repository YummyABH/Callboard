<script setup>
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const {totalItems} = storeToRefs(useFiltersProductsStore())
onMounted(() => {
	console.log(totalItems.value);
	
})
</script>

<template>
	<div class=" text-white font-semibold mb-2 max-xl:mb-0.5 text-2xl max-lg:text-xl max-sm:mb-0">Смартфоны и планшеты {{totalItems}} товара</div>
</template>