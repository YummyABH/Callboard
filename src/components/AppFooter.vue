<script setup>
import ContentContainer from './ContentContainer.vue';
import Telegram from '@/components/ui/icons/Telegram.vue'
</script>

<template>
	<footer class="py-10 bg-black-400">
		<ContentContainer>
			<ul
				class="flex mb-5 text-base text-gray-300 max-sm:gap-y-5 max-sm:flex-wrap max-sm:gap-x-8 max-sm:justify-between gap-x-32 justify-center">
				<li>
					<h3 class=" hover:underline hover:text-gray-400 active:text-white">Контакты</h3>
				</li>
				<li>
					<h3 class="hover:underline hover:text-gray-400 active:text-white">Вопросы и ответы</h3>
				</li>
				<li>
					<h3 class="hover:underline hover:text-gray-400 active:text-white">О нас</h3>
				</li>
			</ul>
			<Telegram />
		</ContentContainer>
	</footer>
</template>