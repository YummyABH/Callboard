<script setup>
import WhatsappSmall from '@/components/ui/icons/WhatsappSmall.vue';
import TelegramSmall from '@/components/ui/icons/TelegramSmall.vue';
import PhoneSmall from '@/components/ui/icons/PhoneSmall.vue';
import { vMaska } from 'maska/vue';
import { reactive } from 'vue';

const feedbackRefs = defineModel('feedbackRefs')
const feedbackTelegram = defineModel('feedbackTelegram')
const feedbackTelephon = defineModel('feedbackTelephon')
const feedbackWhatsapp = defineModel('feedbackWhatsapp')

const stateFocusInput = reactive({
  focusWhatsapp: false,
  focusTelegram: false,
  focusTelephon: false
})

</script>

<template>
        <div class="relative w-full">
          <WhatsappSmall :class="stateFocusInput.focusWhatsapp ? 'after:bg-gray-200' : 'after:bg-gray-400'" class="after:duration-200 after:absolute after:-left-1 after:top-1/2 after:transform after:-translate-y-1/2 after:h-9.5 after:rounded-sm after:w-9 
          
          after:-z-10 z-10 size-7 absolute left-1 top-1/2 transform -translate-y-1/2" />
          <input
            :ref="feedbackRefs"
            v-model="feedbackWhatsapp"
            @focus="stateFocusInput.focusWhatsapp = true"
            @blur="stateFocusInput.focusWhatsapp = false"
            type="text"
            v-maska="'+ 7 (###) ###-##-##'"
            autocomplete="off"
            name="whatsapp"
            class="min-h-9.5 pl-10 rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-700 max-lg:h-8 outline-hidden max-sm:py-4 max-lg:py-0 px-2 w-full"
            placeholder="+ 7 (###) ###-##-##"
            id="1"
          />
        </div>

        <div class="relative w-full">
          <TelegramSmall :class="stateFocusInput.focusTelegram ? 'after:bg-gray-200' : 'after:bg-gray-400'" class="after:duration-200 after:absolute after:-left-1 after:top-1/2 after:transform after:-translate-y-1/2 after:h-9.5 after:rounded-sm after:w-9 
          
          after:-z-10 z-10 size-7 absolute left-1 top-1/2 transform -translate-y-1/2" />
          <input
            :ref="feedbackRefs"
            v-model="feedbackTelegram"
            @focus="stateFocusInput.focusTelegram = true"
            @blur="stateFocusInput.focusTelegram = false"
            type="text"
            v-maska="'https://t.me/********************'"
            autocomplete="off"
            maxlength="35"
            name="whatsapp"
            class="min-h-9.5 pl-10  rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-700 max-lg:h-8 outline-hidden max-sm:py-4 max-lg:py-0 px-2 w-full"
            placeholder="https://t.me/_______"
            id="1"
          />
        </div>

        <div class="relative w-full">
          <PhoneSmall :class="stateFocusInput.focusTelephon ? 'after:bg-gray-200' : 'after:bg-gray-400'" class="after:duration-200 after:absolute after:-left-1 after:top-1/2 after:transform after:-translate-y-1/2 after:h-9.5 after:rounded-sm after:w-9 
          
          after:-z-10 z-10 size-7 absolute left-1 top-1/2 transform -translate-y-1/2" />
          <input
            :ref="feedbackRefs"
            v-model="feedbackTelephon"
            @focus="stateFocusInput.focusTelephon = true"
            @blur="stateFocusInput.focusTelephon = false"
            type="text"
            v-maska="'+ 7 (###) ###-##-##'"
            autocomplete="off"
            name="whatsapp"
            class="min-h-9.5 pl-10  rounded-sm border border-px border-gray-400 focus:border-white lining-nums box-border duration-100 bg-gray-700 max-lg:h-8 outline-hidden max-sm:py-4 max-lg:py-0 px-2 w-full"
            placeholder="+ 7 (###) ###-##-##"
            id="1"
          />
        </div>
</template>