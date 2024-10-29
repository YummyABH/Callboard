<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import { categoriesAPI } from '@/API/categoriesRequest.js'
import { ref, onMounted } from 'vue';

const data = ref()

onMounted(async () => {
	try {
		data.value = await categoriesAPI.create()
		console.log(data.value)
	} catch (error) {
	}
})
</script>

<template>
	<div class="bg-black-500 pb-20 pt-40">
		<ContentContainer>
			<div class="grid grid-cols-5 grid-rows-2 gap-5">
				<div v-for="(item) in data" class="inline-block min-w-10 min-h-10 bg-red-900">{{ item.categoryName }}
				</div>
			</div>
		</ContentContainer>
	</div>
</template>