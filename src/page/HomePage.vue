<script setup>
// import Preview from '@/components/home/Preview.vue';
// import Advantages from '@/components/home/Advantages.vue'
import CategoriesGrid from '@/components/home/CategoriesGrid.vue';
import BaseProducts from '@/components/home/BaseProducts.vue'

</script>
<template>
	<!-- <Preview class="max-md:hidden " /> -->
	<!-- <div class="max-md:block hidden h-[50vh] w-screen bg-black-300"></div> -->
	<BaseProducts/>
	<div class="max-lg:min-h-6 min-h-12 w-full bg-linear-to-t from-gradient-from to-gradient-to "></div>
	<CategoriesGrid />
	<!-- <div class="max-lg:min-h-12 min-h-20 w-full bg-linear-to-t from-black-300 to-[#202023] "></div> -->
	<!-- <Advantages /> -->
</template>
