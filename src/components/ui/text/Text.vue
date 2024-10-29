<script setup>
import { ref, onMounted, defineModel } from 'vue'
const text = ref(null)

const block = defineModel()
onMounted(() => {
	console.log("asdasdasd", block.value);
	const observer = new ResizeObserver(entries => {
		console.log(entries);
		for (let entry of entries) {
			const width = entry.contentRect.width;
			console.log(width);
			text.value.style.fontSize = `${width / 10}px`; // Изменяем размер текста в зависимости от ширины блока
		}
	});
	console.log(text.value.style.fontSize);
	observer.observe(text.value);
})
</script>

<template>
	<h2 ref="text" class="inline-block text-white">Техника</h2>
</template>