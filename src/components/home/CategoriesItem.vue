<script setup>
defineProps({
    path: String
})
</script>

<template>
    <RouterLink :to="'/catalog/' + path"
        class="cursor-pointer relative group aspect-square text-lg inline-block text-white">
        <div class="group-hover:rotate-[5deg] absolute duration-200 hyphens-auto z-10 w-full h-full bg-black-299 p-2 rounded-md"
            lang="ru">
            <slot></slot>
        </div>
        <div class="group-hover:-rotate-[5deg] duration-200 z-10 w-full  h-full bg-white p-2 rounded-md" lang="ru">
        </div>
    </RouterLink>
</template>