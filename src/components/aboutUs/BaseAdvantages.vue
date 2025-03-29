<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import CardAdvantages from '@/components/ui/card/CardAdvantages.vue'
import { reactive } from 'vue';

const styleCard = reactive({
	left: 'max-sm:justify-self-start max-sm:before:w-0 bg-linear-to-l max-lg:bg-linear-to-r from-black-700  border-r-4 max-lg:border-l-4 max-lg:border-r-0 before:-right-[17%] max-lg:before:-left-[7%] max-lg:justify-self-end',
	right: 'max-sm:justify-self-start max-sm:before:w-0 bg-linear-to-r from-black-700 border-l-4 before:-left-[17%] max-lg:before:-left-[7%] justify-self-end'
})
</script>

<template>
	<div class="bg-black-300">
		<ContentContainer>
			<h2 class="text-3xl max-lg:text-4xl max-sm:text-3xl max-lg:mb-16 text-white mb-14 text-center">
				Причины выбрать Rich
			</h2>
			<div
				class="text-white py-10 box-border relative before:absolute before:left-1/2 max-lg:before:left-0 before:h-full before:-translate-x-1/3 before:w-1 before:bg-white grid gap-x-40 max-lg:gap-y-7 gap-y-5 grid-cols-2 grid-rows-6">
				<CardAdvantages :class="styleCard.left" />
				<CardAdvantages :class="styleCard.right" />
				<CardAdvantages :class="styleCard.left" />
				<CardAdvantages :class="styleCard.right" />
				<CardAdvantages :class="styleCard.left" />
				<CardAdvantages :class="styleCard.right" />
			</div>
		</ContentContainer>
	</div>
</template>