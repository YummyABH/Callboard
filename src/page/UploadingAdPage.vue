<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import BaseUploadAd from '@/components/ad/BaseUploadAd.vue'
</script>

<template>
    <div class="mt-24 mb-16 text-white pt-10 max-sm:pt-6 max-md:mt-16">
        <ContentContainer class="max-md:hidden">
            <h1 class="text-2xl mb-6">Выстовить объявление</h1>
        </ContentContainer>
        <div class="max-w-[1460px] max-md:max-w-auto max-md:px-0 mx-auto px-10 ">
            <BaseUploadAd/>
        </div>
    </div>
</template>