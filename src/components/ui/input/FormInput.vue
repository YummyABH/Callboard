<script setup>
import { computed } from 'vue';

defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text' // Тип по умолчанию - текст
  },
  placeholder: String,
  required: Boolean,
  minlength: {
    type: Number,
    default: 6 // Минимальная длина для пароля (по умолчанию)
  },
  maxlength: {
    type: Number,
    default: 255 // Максимальная длина для всех полей (по умолчанию)
  },
  pattern: {
    type: String,
    default: '' // Паттерн для поля (например, для email)
  },
  errorMessage: String // Сообщение об ошибке
})

const modelValue = defineModel()
const formClass = computed(() => ({
  'top-3': !modelValue.value,
  '-top-[10px] bg-black-381 px-1': modelValue.value
}))
</script>

<template>
  <div class=" relative">
    <input :id="id" :type="type" v-model="modelValue" :placeholder="placeholder"
      class="peer block z-10 w-full px-3 py-3 border-[1px] border-black-299 rounded-none appearance-none bg-transparent focus:outline-none focus:ring-0"
      :required="required" />
    <label :for="id" :class="formClass"
      class="peer-focus:-top-[10px] left-3 peer-focus:left-3 peer-focus:bg-black-381 peer-focus:px-1 cursor-text select-none duration-200 absolute block text-sm font-medium text-green-400">{{
        label }}</label>
  </div>
</template>
