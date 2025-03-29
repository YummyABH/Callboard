<script setup>
import { ref } from 'vue'

const container = ref()
</script>

<template>
  <div class="max-sm:hidden col-span-1 max-md:grid-cols-12 p-3 grid grid-cols-10 gap-5 max-sm:gap-x-0 bg-black-500 rounded-xl" ref="container">
    <div class="max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden">
      <div
        class="bg-gray-300 animate-pulse aspect-1/1 max-sm:col-span-full object-cover w-full max-lg:col-span-3 col-span-2 inline-block rounded-lg overflow-hidden">
      </div>
    </div>
    <div class="max-md:col-span-6 max-lg:col-span-5 max-sm:col-span-full col-span-6">
      <div>
        <h2 class="max-md:text-base max-sm:text-base max-lg:text-xl text-2xl font-semibold text-green-300 inline-block mb-2">
            <div class="w-100 max-lg:w-50 h-4 mt-2 rounded-sm animate-pulse bg-gray-300"></div>
        </h2>
    </div>
      <h3 class="max-md:text-sm max-sm:text-lg max-lg:mb-2 block text-xl font-medium text-white mb-4">
        <div class="w-1/2 h-5 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
    </h3>
      <div class="max-lg:text-xs max-h-[94px] animate-pulse text-gray-300 overflow-hidden">
        <div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
            <div class="w-9/10 h-3 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
        </div>
      </div>
    </div>
    <div class="max-md:col-span-3 max-lg:col-span-2 flex flex-col justify-between col-span-2">
      <div class="max-sm:hidden flex gap-x-7 items-center">
        <span class="max-lg:text-base max-md:text-sm text-xl font-semibold text-gray-300">
            <div class="w-12 h-4 mt-1 rounded-sm animate-pulse bg-gray-300"></div>
        </span>
      </div>
      <div class="grid max-md:gap-1 grid-cols-4 gap-2 ">
        <div class="max-md:text-xs col-span-4 max-lg:my-0 my-1 text-gray-300">
            <div class=" inline-block animate-pulse ml-1 w-9/10 h-4 mt-1 rounded-sm bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>
