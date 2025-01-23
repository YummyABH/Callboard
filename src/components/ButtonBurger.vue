<script setup>
import { ref, watch } from 'vue'

const isOpen = defineModel()
let el = document.querySelector('body')

watch(isOpen, () => {
	el.classList.toggle('max-lg:overflow-hidden')
})
</script>

<template>
	<div @click="isOpen = !isOpen" :class="[
		'cursor-pointer z-10 max-md:flex flex-col justify-between absolute hidden  right-0 transform -translate-y-1/2 top-1/2 w-10 h-6'
	]">
		<div :class="[
		'w-full h-[3px] bg-white transition-transform duration-300',
		isOpen ? 'absolute top-1/2 transform -translate-y-1/2 left-0 rotate-45 ' : ''
	]"></div>
		<div :class="[
		'w-full h-[3px] bg-white transition-opacity duration-300',
		isOpen ? 'invisible' : ''
	]"></div>
		<div :class="[
		'w-full h-[3px] bg-white transition-transform duration-300',
		isOpen ? 'absolute top-1/2 transform -translate-y-1/2 bottom-0 left-0 -rotate-45' : ''
	]"></div>
	</div>
</template>
