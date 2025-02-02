<script setup>
import CardProduct from '@/components/ui/card/CardProduct.vue'
//Исправить на получение товаров конкретноо пользователя
// import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
// import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { adAPIFilters } from '@/API/adRequest';
import { onMounted } from 'vue';

const { create } = adAPIFilters()

const adsFavorites = ref([])

async function requestAd() {
    const response = await create(`/ad/basket`)
    adsFavorites.value = response.transformedAds
  }

onMounted(() => {
    requestAd()
})

</script>

<template>
    <div class="lining-nums flex flex-col gap-y-3">
        <div class="">Объявлений в избранном: 12</div>
        <div class="flex flex-col gap-4 w-full mt-4  border-t border-px border-gray-600">
            <template >
                <CardProduct v-for="(item, index) in adsFavorites" :key="index" :price="item.price" :title="item.adName"
            :subtitle="item.description" :region="item.region" :photo-url="item.photos" :name="item.firstName"
            :surname="item.lastName" :whatsapp="item.whatsapplink" :telegram="item.telegramlink"
            :phone="item.phonenumber" />
            </template>
            <div  class="perspective-distant relative max-md:mt-6 mt-10 flex flex-col items-center">
                <img class="max-md:inline-block hidden" src="/public/text-empty.png" alt="">
                <img class="md:transform-3d md:inline-block md:translate-x-7 md:transform md:rotate-z-6 md:absolute hidden md:top-37" src="/public/text-empty-black.png" alt="">
                <img class="max-h-120 w-max" src="/public/baner.png" alt="">
            </div>
        </div>
    </div>
</template>