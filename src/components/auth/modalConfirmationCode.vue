<script setup>
import { vMaska } from "maska/vue"
</script>

<template>
    <div class=" bg-black-400 pb-6 pt-12 px-20 flex items-center justify-center">
        <div class="after:w-10 after:h-0.5 after:top-0 after:-left-1 after:absolute after:transform after:translate-y-4 after:bg-black-299 after:-rotate-45 before:w-10 before:h-0.5 before:-left-1 before:rotate-45 before:transform before:translate-y-4 before:absolute before:bg-black-299  w-8 h-8 transform  cursor-pointer absolute top-3 right-3">
        </div>
        <form class="flex flex-col items-center gap-4">
            <label for="code" class="text-xl ">Введите код</label>
            <input v-maska="'#####'" placeholder="_ _ _ _ _" class="border-black-299 border-1 lining-nums px-3 py-3 w-32 text-xl text-center bg-black-700" type="text">
            <button type="submit" class="px-2 py-2 cursor-pointer hover:bg-black-299 active:bg-black-300 duration-200 rounded bg-black-301 ">Подтвердить</button>
        </form>
    </div>
</template>