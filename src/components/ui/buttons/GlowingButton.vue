<script setup>
import { ref } from 'vue'

const itemRefs = ref() // ссылки на элементы кнопок

function handleMouseMove() {
	const btn = itemRefs.value
	const x = event.clientX - btn.getBoundingClientRect().x
	const y = event.clientY - btn.getBoundingClientRect().y
	if (!btn) return

	btn.style.setProperty('--x', `${x}px`)
	btn.style.setProperty('--y', `${y}px`)
}
</script>

<template>
	<div ref="itemRefs" @mousemove="handleMouseMove()"
		:class="['max-md:after:hidden max-md:font-bold max-md:text-2xl']"
		class="w-max overflow-hidden text-lg text-text-custom border-text-custom max-md:duration-200 max-md:active:border-green-300 max-md:text-base cursor-pointer after:rounded-lg after:w-full after:bg-glow-button  after:absolute after:inset-[2px] relative hover:before:opacity-100 before:w-20 before:h-20 before:bg-custom-radial-gradient before:absolute before:-translate-x-1/2 before:opacity-0 hover:before:top-(--y)  hover:before:left-(--x) before:-translate-y-1/2 hover:text-shadow-4xl hover:text-text-custom px-5 py-2 rounded-lg border">
		<span class=" relative z-10">
			<slot></slot>
		</span>
	</div>
</template>
