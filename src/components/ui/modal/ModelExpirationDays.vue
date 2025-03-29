<script setup>
import { defineModel, ref } from 'vue'
import { useAdUpdateDateApi } from '@/API/updataDateAd.js'
import { useToast } from 'vue-toastification'

const { updateDateAd } = useAdUpdateDateApi()
const toast = useToast()

const isLoading = defineModel('isLoading')
const totalAds = defineModel('totalAds')
const myAds = defineModel('myAds')
const activeId = defineModel('activeId')
const isOpen = defineModel('isOpen')
const daysExpiration = ref(null)

const validateLifetime = () => {
  const value = parseInt(daysExpiration.value, 10)
  if (value > 30) {
    daysExpiration.value = 30
  } else if (value < 1) {
    daysExpiration.value = 1
  }
}

async function updateDayListing(id) {
  if (!daysExpiration.value) {
    toast.info('Введите количество дней.', {
          timeout: 2000
        })
    return
  }
  isLoading.value = true
  const response = await updateDateAd(id, daysExpiration.value)
  myAds.value = response.listings
  totalAds.value = response.total
  isLoading.value = false
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="overflow-hidden w-screen h-screen bg-black/60 fixed top-0 left-0 z-50"></div>
  <div
    class="overflow-hidden bg-black-301 pb-6 pt-12 max-sm:px-6 px-20 flex items-center justify-center fixed rounded z-51 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div
      @click="isOpen = !isOpen"
      class="after:w-10 after:h-0.5 after:top-0 after:-left-1 after:absolute after:transform after:translate-y-4 after:bg-text-custom after:-rotate-45 before:w-10 before:h-0.5 before:-left-1 before:rotate-45 before:transform before:translate-y-4 before:absolute before:bg-text-custom w-8 h-8 transform cursor-pointer absolute top-3 right-3"
    ></div>
    <form class="flex flex-col items-center gap-4">
      <label for="code" class="text-xl max-md:text-base">Укажите колчиство дней.</label>
      <div class="flex gap-4">
        <input
          type="number"
          v-model="daysExpiration"
          min="3"
          max="30"
          step="1"
          autocomplete="off"
          placeholder="от 1 до 30 дней"
          name="expiration_days"
          @input="validateLifetime"
          @blur="validateLifetime"
          class="px-2 py-2 border border-text-custom w-32 cursor-pointer duration-200 rounded "
        >
        <button
            @click.prevent="updateDayListing(activeId)"
          type="submit"
          class="px-2 py-2 cursor-pointer hover:bg-green-400 active:bg-green-300 duration-200 rounded bg-green-500"
        >
        <span class="text-white ">
          Подтвердить
        </span>
        </button>
      </div>
    </form>
  </div>
</template>
