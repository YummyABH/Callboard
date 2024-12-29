<script setup>
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
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      class="cursor-text select-none absolute top-2 left-3 block text-sm font-medium text-green-400"
      >{{ label }}</label
    >
    <input
      :id="id"
      :type="type"
      v-model="modelValue"
      :placeholder="placeholder"
      class="block z-10 w-full px-3 py-2 border-[1px] border-black-299 rounded-none appearance-none bg-transparent focus:outline-none focus:ring-0"
      :required="required"
    />
  </div>
</template>
