<script setup>
import CategoriesList from '@/components/catalog/filter/CategoriesList.vue';
import FilterPrice from '@/components/catalog/filter/FilterPrice.vue'
import FilterRegion from '@/components/catalog/filter/FilterRegion.vue'

const isOpen = defineModel('open')
</script>

<template>
	<nav :class="isOpen ? 'max-xl:left-0' : 'max-xl:-left-[1280px]'"
		class=" sticky top-28 max-md:w-full flex max-xl:fixed transition-all max-md:top-0 max-xl:top-24 max-xl:z-50 flex-col h-min bg-black-400 rounded-xl gap-px px-4 py-8">
		<div @click="isOpen = !isOpen" class=" max-xl:flex hidden py-2 mb-2 gap-x-2 text-base items-center">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
				stroke="currentColor" class="size-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
			</svg>
			<span>Каталог</span>
		</div>
		<FilterPrice />
		<FilterRegion />
		<CategoriesList />
	</nav>
</template>