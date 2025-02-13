<script setup>
import { onMounted, ref } from "vue";

const telegramContainer = ref(null);

onMounted(() => {
  if (telegramContainer.value) {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?21";
    script.setAttribute("data-telegram-login", "AbhCallboardBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "https://www.dns-shop.ru/catalog/17a8a58c16404e77/audiokolonki/?order=6&stock=now-today-tomorrow-later&f%5B11%5D=4&utm_referrer=https%3A%2F%2Fwww.dns-shop.ru%2Fcatalog%2F17a8925616404e77%2Fkolonki%2F");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    telegramContainer.value.appendChild(script);
  }
});
</script>

<template>
        <div class="flex items-center" ref="telegramContainer"></div>
</template>