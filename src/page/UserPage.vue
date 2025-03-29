<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
// import ProfileNavigation from '@/components/user/ProfileNavigation.vue'
</script>

<template>
    <div class="mt-24 text-text-custom pt-10 max-sm:pt-6 max-md:mt-16">
        <ContentContainer>
            <h1 class="text-2xl mb-10 max-lg:mb-6">Личный кабинет</h1>
            <!-- <ProfileNavigation /> -->
            <router-view/>
        </ContentContainer>
    </div>
</template>