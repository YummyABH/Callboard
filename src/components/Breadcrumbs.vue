<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Получение текущего маршрута
const route = useRoute();
const router = useRouter()

// Определение массива хлебных крошек
const items = ref([]);
const labelArray = ref([])

// Функция для генерации хлебных крошек на основе текущего маршрута
const generateBreadcrumbs = () => {
	const pathArray = route.path.split('/').filter(path => path); // Получаем массив путей
	for (const item of router.options.routes) {
		for (const path of pathArray) {
			if (path === item.name) { labelArray.value.push(item.label) }
		}
	}
	items.value = pathArray.map((path, index) => {
		const routePath = '/' + pathArray.slice(0, index + 1).join('/'); // Создаем полный путь для каждого элемента
		return {
			label: labelArray.value[index], // Форматируем текст ссылки (первую букву заглавной)
			to: routePath
		};
	});
};

// Вызываем функцию для генерации хлебных крошек при загрузке компонента
generateBreadcrumbs();
</script>

<template>
	<ol class="flex  my-6 gap-6">
		<li>
			<RouterLink class="hover:bg-inherit" to="/">
				Главная
			</RouterLink>
		</li>
		<li v-for="(item, index) in items"
			class="relative before:absolute before:content-['>'] before:-left-4 before:-top-px">
			<RouterLink class="hover:bg-inherit" :to="item.to">
				{{ item.label }}
			</RouterLink>
		</li>
	</ol>
</template>