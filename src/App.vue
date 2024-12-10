<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <Suspense>
    <template #fallback></template>
    <RouterView v-slot="{ Component, route }">
      <AppHeader v-if="!route.meta.noHeader"></AppHeader>
      <main>
        <component :is="Component"></component>
      </main>
      <AppFooter class=" " v-if="!route.meta.noFooter" />
    </RouterView>
  </Suspense>
</template>

<style scoped></style>
