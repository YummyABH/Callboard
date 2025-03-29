<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import BaseUploadAd from '@/components/ad/BaseUploadAd.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back(); // Аналог window.history.back()
}
</script>

<template>
    <div class="mt-20 mb-16 text-white pt-10 max-sm:pt-6 max-md:mt-16">
        <ContentContainer class="max-md:hidden">
            <div class="mb-4 cursor-pointer flex gap-2 items-center" @click="goBack">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="var(--text-custom)"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </svg>
    <span class="text-text-custom">
      Назад
    </span>
  </div>
            <h1 class="text-2xl mb-6 text-text-custom">Выстовить объявление</h1>
        </ContentContainer>
        <div class="max-w-[1460px] max-md:max-w-auto max-md:px-0 mx-auto px-10 ">
            <BaseUploadAd/>
        </div>
    </div>
</template>