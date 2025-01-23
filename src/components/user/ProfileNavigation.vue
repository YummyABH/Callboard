<script setup>
import IconUser from '@/components/ui/icons/IconUser.vue';
import IconList from '@/components/ui/icons/IconList.vue';
import IconHeart from '@/components/ui/icons/IconHeart.vue';
</script>

<template>
    <nav class="my-12">
        <ul class="text-lg text-white flex gap-6">
            <li
                class=" relative before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-400 before:absolute cursor-pointer pb-3 flex gap-3 items-center">
                <IconUser />
                <span class="">Мой профиль</span>
            </li>
            <li class=" cursor-pointer  pb-3 flex gap-3 items-center">
                <IconList />
                <span class="">Мои объявления</span>
            </li>

            <li class=" cursor-pointer pb-3 flex gap-3 items-center">
                <IconHeart />
                <span class="">Избранное</span>
            </li>
        </ul>
    </nav>
</template>