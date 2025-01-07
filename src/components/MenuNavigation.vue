<script setup>
import ButtonDarkMode from './ButtonDarkMode.vue';
import AuthorizationButton from '@/components/ui/buttons/AuthorizationButton.vue'
import GlowingButton from '@/components/ui/buttons/GlowingButton.vue'
import Cart from '@/components/ui/icons/Cart.vue'
import { ref } from 'vue'

const isOpen = defineModel()
const buttons = ref([{ text: 'Каталог', to: '/catalog' }, { text: 'Личный кабинет', to: '/user' }])
</script>

<template>
	<ul :class="isOpen ? 'max-md:before:absolute max-md:before:top-20 max-md:before:w-full max-md:before:h-[1px] max-md:before:bg-black-700 max-md:top-0 max-md:left-0' : 'max-md:-left-full max-md:top-0'"
		class=" duration-500 max-md:min-h-full max-md:flex-col max-md:gap-y-4 max-md:w-full max-md:pt-40 max-md:px-10 max-md:bg-black-400 max-md:z-10 text-gray-300 flex gap-x-8 items-center max-md:fixed">
		<div class="max-md:hidden flex gap-8 items-center">
			<li v-for="(item, index) in buttons" :key="index">
				<RouterLink class="text-white hover:bg-inherit" :to="item.to">
					<GlowingButton>{{ item.text }}</GlowingButton>
				</RouterLink>
			</li>
			<li>
				<AuthorizationButton />
			</li>
			<li class="max-md:w-full max-md:h-full">
				<Cart />
			</li>
		</div>
		<div class="flex items-center flex-col w-screen md:hidden">
			<div to="/catalog"
				class="w-full text-center text-xl py-3 before:w-full before:h-px before:absolute relative before:top-0 before:left-0 before:bg-black-301">
				Каталог</div>
			<div
				class="w-full text-center text-xl py-3 before:w-full before:h-px before:top-0 before:absolute relative before:left-0 before:bg-black-301">
				Личный
				кабинет</div>
			<div
				class="w-full text-center text-xl py-3 after:absolute after:w-full after:left-0 after:bottom-0 after:bg-black-301 after:h-px before:w-full before:h-px before:absolute relative before:top-0 before:left-0 before:bg-black-301">
				Корзина</div>
		</div>
		<ButtonDarkMode />
	</ul>
</template>

<style scoped></style>