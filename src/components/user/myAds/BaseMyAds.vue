<script setup>
import GlowingButton from '@/components/ui/buttons/GlowingButton.vue'
import CardUserProduct from '@/components/ui/card/CardUserProduct.vue'
import CardUserProductMini from '@/components/ui/card/CardUserProductMini.vue'
import ModelDelete from '@/components/ui/modal/ModelDelete.vue'
//Исправить на получение товаров конкретноо пользователя
import { adAPIFilters } from '@/API/adRequest';
import { onMounted, watch, computed, ref  } from 'vue';

const { create } = adAPIFilters()

const myAds = ref([])
const totalAds = ref(0)
const modelOpen = ref(false) 

async function requestAd() {
    const response = await create(`/userads`)
    myAds.value = response.transformedAds
    totalAds.value = response.total
  }

onMounted(() => {
    requestAd()
})

const body = document.body

watch(modelOpen, () => {
  modelOpen.value ? (body.style.overflowY = 'hidden') : (body.style.overflowY = 'auto')
})

const styleContainer = computed(() => {
    return myAds.value[0] ? 'mb-10' : ''
})
</script>

<template>
    <div class="lining-nums flex flex-col gap-y-3">
        <div class="">Выставленно объявлений: {{ totalAds }}</div>
        <RouterLink to="/ad/create">
            <GlowingButton class="w-max">Добавить объявление</GlowingButton>
        </RouterLink>
        <div :class="styleContainer" class="flex flex-col gap-4 w-full mt-2 pt-3  border-t border-px border-gray-600 max-[640px]:grid max-[640px]:grid-cols-2">
            <template v-if="myAds[0]">
                <CardUserProduct v-for="(item, index) in myAds" :key="index" v-model:isOpen="modelOpen" :price="item.price" :title="item.adName"
            :subtitle="item.description" :daysRemaining="item.daysRemaining" :photo-url="item.photos" />
            <CardUserProductMini v-for="(item, index) in myAds" class="sm:hidden" :key="index" v-model:isOpen="modelOpen" :price="item.price" :title="item.adName"
            :subtitle="item.description" :daysRemaining="item.daysRemaining" :photo-url="item.photos" />
            </template>
            <div v-else class="max-sm:col-span-full perspective-distant relative max-md:mt-6 mt-10 flex flex-col items-center">
                <img class="max-md:inline-block hidden" src="/public/text-empty.png" alt="">
                <img class="md:transform-3d md:inline-block md:translate-x-7 md:transform md:rotate-z-6 md:absolute hidden md:top-37" src="/public/text-empty-black.png" alt="">
                <img class="max-h-120 w-max" src="/public/baner.png" alt="">
            </div>
        </div>
    </div>
    <ModelDelete v-if="modelOpen" v-model:isOpen="modelOpen"/>
</template>