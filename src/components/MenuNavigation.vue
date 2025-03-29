<script setup>
import ButtonDarkMode from './ButtonDarkMode.vue';
// import AuthorizationButton from '@/components/ui/buttons/AuthorizationButton.vue'
import GlowingButton from '@/components/ui/buttons/GlowingButton.vue'
import TelegramAuthButton from '@/components/auth/TelegramAuthButton.vue'
import { ref } from 'vue'
// import IconList from './ui/icons/IconList.vue';

const buttons = ref([{ text: 'Каталог', to: '/catalog' }, { text: 'Личный кабинет', to: '/user/my-ads' }])
const screenWidth = window.innerWidth
const showTelegram = screenWidth > 1024 ? true : false
</script>

<template>
	<ul
		class="max-md:-left-full max-md:top-0 duration-500 max-md:min-h-full max-md:flex-col max-md:gap-y-4 max-md:w-full max-md:pt-40 max-md:px-10 max-md:bg-black-400 max-md:z-10 text-gray-300 flex gap-x-8 items-center max-md:fixed">
		<div class="max-md:hidden flex gap-8 items-center">
			<li v-for="(item, index) in buttons" :key="index">
				<RouterLink class="text-white hover:bg-inherit" :to="item.to">
					<GlowingButton>{{ item.text }}</GlowingButton>
				</RouterLink>
			</li>
			<li>
				<TelegramAuthButton v-if="showTelegram"/>
			</li>
			<!-- <li class="max-md:w-full max-md:h-full">
				<RouterLink to="/user/my-ads">
					<GlowingButton>
						<IconList/>
					</GlowingButton>
				</RouterLink>
			</li> -->
		</div>
		<ButtonDarkMode />
	</ul>
</template>

<style scoped></style>