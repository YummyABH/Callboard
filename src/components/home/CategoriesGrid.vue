<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import CategoriesItem from '@/components/home/CategoriesItem.vue'
import { useCategoriesAPI } from '@/API/categoriesRequest.js'
import { ref, onMounted, computed } from 'vue';

const data = ref()
const { create } = useCategoriesAPI()

const openListCategories = ref(false)
const activeItem = ref(null)

const textButton = computed(() => {
	return openListCategories.value ? 'Свернуть' : 'Ещё'
})

onMounted(async () => {
	data.value = await create()
	console.log(data.value);
	
})
</script>

<template>
	<div class="bg-black-500 pb-12 pt-2">
		<ContentContainer>
			<h2 class="text-2xl max-sm:text-lg text-center mb-6">Категории</h2>
			<div class="max-sm:grid-cols-2 mb-5 max-lg:grid-cols-5 max-md:grid-cols-4 grid grid-cols-7 gap-6 ">
				<CategoriesItem v-for="(item, index) in data" :index="index" v-model:openListCategories="openListCategories" v-model:active="activeItem" :key="index" :subcategories="item.subcategories" :pathCategory="data[index].path">{{
					item.categoryName }}
				</CategoriesItem>
			</div>
			<div @click="openListCategories = !openListCategories" class="xl:hidden cursor-pointer text-xl py-1 px-4 rounded-sm duration-200 bg-green-500 hover:bg-green-400 active:bg-green-300 flex justify-self-center w-max">{{ textButton }}</div>
		</ContentContainer>
	</div>
</template>