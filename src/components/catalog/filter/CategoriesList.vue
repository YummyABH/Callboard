<script setup>
import { categoriesAPI } from '@/API/categoriesRequest.js'
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/catalog/filter/CategoryItem.vue'

const data = ref()
onMounted(async () => {
	try {
		data.value = await categoriesAPI.create()
	} catch (error) {
		console.log(error);
	}
	console.log("моя дата", data.value)
}
)
</script>

<template>
	<ul class="grid gap-y-px">
		<div
			class="select-none w-full relative after:absolute after:top-0 after:left-0 after:w-full after:h-[2px] after:bg-green-300 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-300 text-white bg-black-400 font-semibold text-xl  px-4 py-4">
			Все товары</div>
		<CategoryItem v-for="(item, index) in data" :key="index" :category="item.categoryName"
			:subcategory="item.subcategories" />
	</ul>
</template>