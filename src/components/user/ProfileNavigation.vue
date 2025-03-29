<script setup>
import IconUser from '@/components/ui/icons/IconUser.vue';
import IconList from '@/components/ui/icons/IconList.vue';
import { useRoute } from 'vue-router'
// import IconHeart from '@/components/ui/icons/IconHeart.vue';

const route = useRoute()


const getNavItemClass = (to) => {
    return route.path === to
      ? 'before:duration-200 before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-green-400'
      : '';
}
</script>

<template>
    <nav class="overflow-auto my-6">
        <ul class="text-lg text-text-custom flex gap-3">
            <RouterLink to="/user/profile">
                <li :class="getNavItemClass('/user/profile')" class="relative hover:before:bg-green-200 before:duration-200 hover:before:bottom-0 hover:before:left-0 hover:before:w-full hover:before:h-[2px] before:absolute cursor-pointer pb-3 flex gap-3 items-center">
                    <IconUser />
                    <span class="max-[440px]:text-xs text-text-custom max-sm:text-xs">Профиль</span>
                </li>
            </RouterLink>
            <RouterLink to="/user/my-ads" >
                <li :class="getNavItemClass('/user/my-ads')" class="relative hover:before:bg-green-200 before:duration-200 hover:before:bottom-0 hover:before:left-0 hover:before:w-full hover:before:h-[2px] before:absolute cursor-pointer pb-3 flex gap-3 items-center">
                    <IconList />
                    <span class="max-[440px]:text-xs text-text-custom max-sm:text-xs">Объявления</span>
                </li>
            </RouterLink>

            <!-- <li class=" cursor-pointer pb-3 flex gap-3 items-center">
                <RouterLink to="/user/favorites" class=" flex gap-3 items-center">
                    <IconHeart />
                    <span class="max-[440px]:text-xs max-sm:text-xs">Избранное</span>
                </RouterLink>
            </li> -->
        </ul>
    </nav>
</template>