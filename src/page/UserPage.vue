<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import ProfileNavigation from '@/components/user/ProfileNavigation.vue'
</script>

<template>
    <div class="mt-24 text-white pb-20 pt-20">
        <ContentContainer>
            <h1 class="text-3xl">Личный кабинет</h1>
            <ProfileNavigation />
            <router-view/>
        </ContentContainer>
    </div>
</template>