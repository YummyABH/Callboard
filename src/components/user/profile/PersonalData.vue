<script setup>
import FormInput from '@/components/ui/input/FormInput.vue'
import { ref } from 'vue'
import { vMaska } from "maska/vue"
import { reactive } from 'vue'

const name = ref('')
const surname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref()
//const telegram = ref(null)
//const whatsapp = ref(null)

const REGEX_NAME = ref(/^[а-яА-ЯёЁ]{0,32}$/)

const options = reactive({
  tokens: {
    '*': {
      pattern: /^[a-zA-Z0-9]$/,
      multiple: true
    }
  },
  mask: '*!@*.*'
})
</script>

<template>
    <div class="mb-10">
        <h2 class="text-2xl mb-6">Персональные данные</h2>
        <form @submit.prevent="handleRegister" class="gap-4 w-3/4 max-md:w-full max-[540px]:grid-cols-1 grid grid-cols-2">
            <FormInput id="phone" v-maska="'+ 7 (###) ###-##-##'" label="Телефон" type="tel" v-model="phoneNumber" required />
            <FormInput id="email" v-maska="options" label="Email" type="text" v-model="email" required/>
            <FormInput id="name" label="Имя" type="text" v-model="name" required :pattern="REGEX_NAME"/>
            <FormInput id="surname" label="Фамилия" type="text" v-model="surname" required :pattern="REGEX_NAME"/>
            <FormInput id="password" label="Пароль" type="password"  v-model="password" required :minlength="8" :maxlength="32" />
            <FormInput id="confirm-password"  label="Подтверждение пароля" type="password" v-model="confirmPassword"
                required :minlength="8" :maxlength="32" />
        </form>
        <button type="submit"
            class="w-min mt-8 py-2 px-4 duration-200 cursor-pointer bg-green-400 active:bg-green-300 text-white rounded-md hover:bg-green-500 focus:outline-hidden">
            Сохранить
        </button>
    </div>
</template>
