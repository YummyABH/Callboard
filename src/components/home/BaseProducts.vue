<script setup>
import ContentContainer from '@/components/ContentContainer.vue';
import CardProductMini from '@/components/ui/card/CardProductMini.vue'
import { adAPIFilters } from '@/API/adRequest.js'
import { onMounted, ref } from 'vue';

const { create } = adAPIFilters()

const data = ref([])

async function requestAd() {
    const response = await create('?page=1&limit=12')
    data.value = response.ads
  }

onMounted(() => {
    requestAd()
})
</script>

<template>
    <div class="w-full pb-2 pt-6 max-md:mt-16 mt-24">
        <ContentContainer>
            <div class="text-2xl text-center mb-5 max-lg:text-base max-lg:mb-2 max-[540px]:text-2xl">Последние объявления</div>
            <div class="max-sm:grid-cols-3 max-md:grid-cols-4 max-lg:grid-cols-5 grid grid-cols-6 gap-3">
                <CardProductMini v-for="(item, index) in data" :key="index" :photo-url="item.photos" :price="item.price" :cities="item.region" :name="item.adName"/>
            </div>
        </ContentContainer>
    </div>
</template>