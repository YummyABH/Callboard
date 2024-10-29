<script setup>
import { computed } from 'vue';
import { ref } from 'vue';
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { useRouter } from 'vue-router'

const minPrice = ref(null)
const maxPrice = ref(null)
const isOpen = ref(true)
const router = useRouter()

function APIFilter() {
	const params = useFiltersProductsStore().filterParams
	if (minPrice.value > maxPrice.value && typeof minPrice.value === Number && typeof maxPrice === Number) {
		params.minPrice = maxPrice.value
		params.maxPrice = minPrice.value
	} else {
		params.minPrice = minPrice.value
		params.maxPrice = maxPrice.value
	}
	const paramsActive = useFiltersProductsStore().filteredParams
	router.push({
		query: paramsActive
	})
	useFiltersProductsStore().requestAd()
}

// Удаляем все нечисловые символы
function validateNumberInput(event) {
	event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

//Стили css
const stateStyle = computed(() => ({
	arrow: isOpen.value === true ? 'rotate-90' : 'rotate-0',
	border: isOpen.value === true ? 'border-t' : ''
}))
</script>

<template>
	<div class="flex flex-col mb-px">
		<div @click="isOpen = !isOpen"
			class="py-3 px-4 w-full cursor-pointer  border-y bg-gray-500 border-gray-500 text-white flex gap-x-3 font-semibold text-xl">
			<span :class="[stateStyle.arrow]" class=" duration-500 transition-all inline-block">></span>Цена
		</div>
		<Transition>
			<div :class="[stateStyle.border]" v-show="isOpen" class=" gap-px flex justify-center flex-wrap w-full">
				<div class="px-4 py-3 flex justify-between w-full bg-gray-700">
					<input v-model="minPrice" @input="validateNumberInput" type="number" placeholder="от 2000"
						class="appearance-none outline-none text-white focus:border w-[47%] px-3 py-2 rounded-lg bg-black-390"></input>
					<input v-model="maxPrice" @input="validateNumberInput" type="number" placeholder="до 868599"
						class="appearance-none outline-none text-white focus:border w-[47%] px-3 py-2 rounded-lg bg-black-390"></input>
				</div>
				<div class="w-full inline-block">
					<button @click="APIFilter()"
						class="bg-green-400 inline-block py-2 w-2/3 text-white font-semibold text-base">
						Поиск
					</button>
					<div @click="minPrice = null, maxPrice = null"
						class="cursor-pointer inline-block text-white bg-red-800 w-1/3 text-center py-2">Очистить</div>
				</div>
			</div>
		</Transition>

	</div>
</template>

<style scoped>
.v-enter-active {
	transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>