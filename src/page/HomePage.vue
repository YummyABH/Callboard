<script setup>
import Preview from '@/components/home/Preview.vue';
import Advantages from '@/components/home/Advantages.vue'
import Categories from '@/components/home/Categories.vue';

</script>
<template>
	<Preview class="max-md:hidden " />
	<div class="max-md:block hidden h-[50vh] w-screen bg-black-300"></div>
	<Categories />
	<div class="max-md:hidden min-h-20 w-full bg-gradient-to-t from-black-300 to-[#202023] "></div>
	<Advantages />
</template>
