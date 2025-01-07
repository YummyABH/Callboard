<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import CategoriesItem from '@/components/home/CategoriesItem.vue'
import { useCategoriesAPI } from '@/API/categoriesRequest.js'
import { ref, onMounted } from 'vue';

const data = ref()
const { create } = useCategoriesAPI()

onMounted(async () => {
	data.value = await create()
})
</script>

<template>
	<div class="bg-black-500 pb-20 pt-40">
		<ContentContainer>
			<div class="grid grid-cols-7 gap-6 ">
				<CategoriesItem v-for="(item, index) in data" :key="index" :path="data[index].path">{{
					item.categoryName }}
				</CategoriesItem>
			</div>
		</ContentContainer>
	</div>
</template>