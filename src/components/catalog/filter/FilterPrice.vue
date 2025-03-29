<script setup>
import { computed, watch } from 'vue'
import { ref } from 'vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

const minPrice = ref(null)
const maxPrice = ref(null)
const isOpen = ref(true)

function APIFilter() {
  const params = useFiltersProductsStore().filterParams

  if (
    minPrice.value > maxPrice.value &&
    typeof minPrice.value === Number &&
    typeof maxPrice.value === Number
  ) {
    params.minPrice = maxPrice.value
    params.maxPrice = minPrice.value
  } else {
    params.minPrice = minPrice.value
    params.maxPrice = maxPrice.value
  }
}

watch(minPrice, () => {
  APIFilter()
})

watch(maxPrice, () => {
  APIFilter()
})

// Удаляем все нечисловые символы
function validateNumberInput(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

//Стили css
const stateStyle = computed(() => ({
  arrow: isOpen.value === true ? 'rotate-90' : 'rotate-0',
  border: isOpen.value === true ? 'border-t' : ''
}))
</script>

<template>
  <div class="flex flex-col border-b-[1px] border-green-400">
    <div
      @click="isOpen = !isOpen"
      class="hover:bg-gray-900 active:bg-gray-901 duration-200 py-3 px-4 w-full cursor-pointer border-y bg-gray-500 border-gray-500 text-text-custom flex gap-x-3 font-semibold text-xl"
    >
      <span :class="[stateStyle.arrow]" class="duration-500 transition-all inline-block">></span
      >Цена
    </div>
    <Transition>
      <div
        :class="[stateStyle.border]"
        v-show="isOpen"
        class="gap-px flex justify-center flex-wrap w-full"
      >
        <div class="px-4 py-3 flex justify-between w-full bg-gray-700">
          <input
            v-model="minPrice"
            @input="validateNumberInput"
            type="number"
            placeholder="от"
            class="lining-nums appearance-none outline-hidden text-white focus:border w-[47%] px-3 py-2 rounded-lg bg-black-390"
          />
          <input
            v-model="maxPrice"
            @input="validateNumberInput"
            type="number"
            placeholder="до"
            class="lining-nums appearance-none outline-hidden text-white focus:border w-[47%] px-3 py-2 rounded-lg bg-black-390"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
