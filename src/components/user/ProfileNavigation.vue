<script setup>
import IconUser from '@/components/ui/icons/IconUser.vue';
import IconList from '@/components/ui/icons/IconList.vue';
import IconHeart from '@/components/ui/icons/IconHeart.vue';
</script>

<template>
    <nav class="overflow-auto my-6">
        <ul class="text-lg text-white flex gap-3">
            <li
                class=" relative hover:before:bg-green-200 before:duration-200 before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-400 before:absolute cursor-pointer pb-3 flex gap-3 items-center">
                <IconUser />
                <span class="max-[440px]:text-xs max-sm:text-xs">Профиль</span>
            </li>
            <li class=" cursor-pointer  pb-3 flex gap-3 items-center">
                <IconList />
                <span class="max-[440px]:text-xs max-sm:text-xs">Объявления</span>
            </li>

            <li class=" cursor-pointer pb-3 flex gap-3 items-center">
                <IconHeart />
                <span class="max-[440px]:text-xs max-sm:text-xs">Избранное</span>
            </li>
        </ul>
    </nav>
</template>