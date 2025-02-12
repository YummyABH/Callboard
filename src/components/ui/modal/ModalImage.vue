<script setup>
import { defineModel } from 'vue'

const modalImg = defineModel('modalImg')
const isOpen = defineModel('isOpen')
</script>

<template>
<div class="overflow-hidden w-screen h-screen bg-black/60 fixed top-0 left-0 z-50"></div>
  <div
    class="max-w-[90%] max-h-[90%] overflow-hidden bg-gray-500 max-md:w-full max-md:h-auto px-3 pb-3 rounded-md pt-15 flex items-center justify-center fixed z-51 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div
      @click="isOpen = !isOpen"
      class="after:w-10 after:h-0.5 after:bg-text-custom before:bg-text-custom after:top-0 after:-left-1 after:absolute after:transform after:translate-y-4  after:-rotate-45 before:w-10 before:h-0.5 before:-left-1 before:rotate-45 before:transform before:translate-y-4 before:absolute w-8 h-8 transform cursor-pointer absolute top-3 right-3"
    ></div>
    <img class="max-md:w-full max-md:h-full max-h-[90%] max-w-[90%] w-auto h-auto" :src="'https://apsnybillboard-production.up.railway.app/' + modalImg" alt="">
  </div>
</template>