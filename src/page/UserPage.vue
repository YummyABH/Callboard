<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import ProfileNavigation from '@/components/user/ProfileNavigation.vue'
</script>

<template>
    <div class="mt-24 text-white py-10 max-md:mt-16">
        <ContentContainer>
            <h1 class="text-2xl">Личный кабинет</h1>
            <ProfileNavigation />
            <router-view/>
        </ContentContainer>
    </div>
</template>