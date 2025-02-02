<script setup>
import { defineModel } from 'vue'

const isOpen = defineModel('isOpen')

</script>

<template>
  <div class="overflow-hidden w-screen h-screen bg-black/60 fixed top-0 left-0 z-50"></div>
  <div
    class="overflow-hidden bg-black-300 pb-6 pt-12 px-20 flex items-center justify-center fixed rounded z-51 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div
      @click="isOpen = !isOpen"
      class="after:w-10 after:h-0.5 after:top-0 after:-left-1 after:absolute after:transform after:translate-y-4 after:bg-black-299 after:-rotate-45 before:w-10 before:h-0.5 before:-left-1 before:rotate-45 before:transform before:translate-y-4 before:absolute before:bg-black-299 w-8 h-8 transform cursor-pointer absolute top-3 right-3"
    ></div>
    <form class="flex flex-col items-center gap-4">
      <label for="code" class="text-xl max-md:text-base">Удалить объявление ?</label>
      <div class="flex gap-4">
        <button
          @click="isOpen = !isOpen"
          type="submit"
          class="px-2 py-2 cursor-pointer hover:bg-red-600 active:bg-red-900 duration-200 rounded bg-red-700"
        >
          Подтвердить
        </button>
        <button
          @click="isOpen = !isOpen"
          type="submit"
          class="px-2 py-2 cursor-pointer hover:bg-green-400 active:bg-green-300 duration-200 rounded bg-green-500"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>
</template>
