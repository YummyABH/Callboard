<script setup>
import { toggleDarkMode, applyTheme } from '@/components/composables/useDarkMode.js'
import { computed, onMounted, ref } from 'vue'

const mode = ref(null)
onMounted(() => {
  mode.value = applyTheme()
})
const darkModeStatus = computed(() => ({
  toggleClass: mode.value === 'dark' ? 'right-0' : 'left-0'
}))

const handleToggle = () => {
  mode.value = toggleDarkMode()
}
</script>

<template>
  <div @click="handleToggle()"
    class="cursor-pointer flex max-sm:relative text-orange-300 w-12 h-6 rounded-full bg-black relative hover:border-gray-600 duration-300 border-black border-[2px]">
    <div :class="darkModeStatus.toggleClass"
      class="bg-gray-light absolute top-0 duration-500 transition-all p-px flex items-center h-full w-5 rounded-full">
      <svg v-show="mode === 'dark'" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
      </svg>

      <svg v-show="mode === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fdba74"
        class="size-4">
        <path
          d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
      </svg>
    </div>
  </div>
</template>
