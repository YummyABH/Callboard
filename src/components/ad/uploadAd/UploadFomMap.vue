<script setup>
const arrayInputTemplate = defineModel('arrayInputTemplate')
const inputValues = defineModel('inputValues')
const formRefs = defineModel('formRefs')

// Функция для прокрутки к нужному полю
const scrollToField = (field) => {    
  formRefs.value[field].value.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  formRefs.value[field].value.focus()
}

const normalizedinputValues = (key) => {    
    let isFlag
    if (Array.isArray(inputValues?.value[key])) {
        isFlag = inputValues?.value[key].some(value => Boolean(value) === true);
    } else if (typeof inputValues?.value[key] === 'object' && !Array.isArray(inputValues?.value[key])) {
        let keyFeedback = false
        for (keyFeedback in inputValues.value[key]) {
            if (inputValues.value[key][keyFeedback]) {
                return keyFeedback = true
            }
        }
    } else {
        isFlag = inputValues.value[key]
    }
    // console.log(isFlag);
    return isFlag
}
</script>

<template>
        <ul class="flex flex-col gap-4 pl-8">
            <li v-for="(item, index) in arrayInputTemplate" :key="index" @click="scrollToField(index), normalizedinputValues(index)" :class="normalizedinputValues(index) ? 'before:bg-green-400 before:bg-[url(/public/check.svg)] before:bg-[10px_10px] before:bg-center after:bg-green-300' : 'before:bg-white after:bg-white'" class="relative last:after:hidden after:-left-8.25 after:transform after:translate-y-6/10 after:top-0 after:absolute after:h-7 after:w-px  cursor-pointer hover:text-green-300 duration-200 before:absolute before:-left-8 before:top-0 before:w-3 before:h-3 before:rounded-full before:transform before:translate-y-1/2 before:-translate-x-1/2">
                {{ item }}
            </li>
        </ul>
</template>