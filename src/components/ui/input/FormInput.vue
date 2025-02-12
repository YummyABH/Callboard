<script setup>
import { computed } from 'vue';

const props = defineProps({
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
    default: 1 // Минимальная длина для пароля (по умолчанию)
  },
  maxlength: {
    type: Number,
    default: 255 // Максимальная длина для всех полей (по умолчанию)
  },
  pattern: {
    type: [RegExp, String],
    default: '' // Паттерн для поля (например, для email)
  },
  colorLabel: {
    type: String,
    default: 'black-381'
  },
  errorMessage: String // Сообщение об ошибке
})

const modelValue = defineModel()

function handleInput(event) {
  
  if (!(props.pattern instanceof RegExp))  return
  
  const inputValue = event.target.value
  
  if (!props.pattern.test(inputValue)) {
    event.target.value = inputValue.replace(/[^а-яА-ЯёЁ]/g, '').slice(0, 32)
    modelValue.value = event.target.value
  } else {
    modelValue.value = inputValue
  }
}

const formClass = computed(() => ({
  'top-3': !modelValue.value,
  '-top-[10px] bg-black-381 px-1': modelValue.value,
  'peer-focus:bg-black-381': props.colorLabel === 'bg-black-381' ? true : false,
  ' peer-focus:bg-black': props.colorLabel === 'bg-black' ? true : false
}))
</script>

<template>
  <div class=" relative">
    <input :id="id" :type="type" v-model="modelValue" :placeholder="placeholder" :minlength="minlength" :maxlength="maxlength"
    @input="handleInput"  
    class="peer autofill:bg-transparent block z-10 w-full px-3 py-3 border-[1px] border-input-border rounded-none appearance-none bg-transparent focus:outline-hidden focus:ring-0"
      :required="required" />
    <label :for="id" :class="formClass"
      class="peer-focus:-top-[10px] peer-focus:text-green-300 left-3 peer-focus:left-3 peer-focus:px-1 cursor-text select-none duration-200 absolute block text-sm font-medium ">{{
        label }}</label>
  </div>
</template>
