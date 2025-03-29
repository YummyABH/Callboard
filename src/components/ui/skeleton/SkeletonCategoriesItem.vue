<script setup>
import { ref, defineModel } from 'vue'

defineProps({
  pathCategory: String,
  subcategories: Array,
  index: Number
})

const openListCategories = defineModel('openListCategories')
const active = defineModel('active')

const styleOpenListCategories = ref('max-md:nth-[n+7]:absolute max-md:nth-[n+7]:-z-10 max-md:nth-[n+7]:opacity-0 max-lg:nth-[n+11]:absolute max-lg:nth-[n+11]:-z-10 max-lg:nth-[n+11]:opacity-0 max-xl:nth-[n+15]:absolute max-xl:nth-[n+15]:-z-10 max-xl:nth-[n+15]:opacity-0')
const styleActiveContainer = ref('rotate-y-180')
const styleActiveItem = ref('min-h-full h-auto min-w-full z-50 rotate-y-360')
</script>

<template>
  <div
    @click="active = index"
    :class="!openListCategories ? styleOpenListCategories : 'static opacity-100'"
    class="text-white all-unset perspective-distant p-0 cursor-pointer relative duration-300 group aspect-square text-lg max-xl:text-sm"
  >
    <div
      :class="active === index ? styleActiveContainer : ''"
      class="max-sm:text-xs group-hover:rotate-y-180  backface-hidden  transform-3d transform absolute duration-500 hyphens-auto z-10 w-full h-full bg-black-299 p-2 rounded-md"
      lang="ru"
    >
      <slot></slot>
    </div>
    <ul
      :class="active === index ? styleActiveItem : 'w-full h-full'"
      class="p-2.5 flex flex-col gap-2 relative overflow-hidden bg-black-299 group-hover:h-auto group-hover:min-h-full duration-500 group-hover:min-w-full group-hover:z-50 group-hover:rotate-y-360 rotate-y-180 backface-hidden transform-3d z-0 rounded-md"
      lang="ru"
    >
    <div class="w-3/4 h-4 mt-2 rounded-sm bg-gray-400"></div>
    </ul>
  </div>
</template>
