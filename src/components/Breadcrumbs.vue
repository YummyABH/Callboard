<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'

// Получение текущего маршрута
const route = useRoute()
const router = useRouter()
const labelList = useFiltersProductsStore().labelList

// Определение массива хлебных крошек
const items = ref([])
const labelArray = ref([])

const paramsClear = useFiltersProductsStore().APIFilter

// Функция для генерации хлебных крошек на основе текущего маршрута
const generateBreadcrumbs = () => {
  const pathArray = route.path.split('/').filter((path) => path) // Получаем массив путей
  for (const item of router.options.routes) {
    for (const path of pathArray) {
      if (path === item.name) {
        labelArray.value.push(item.label)
      }
    }
  }

  if (pathArray.length === 2) {
    labelArray.value[1] = router.options.routes[1].children[0].props().label
  } else if (pathArray.length >= 3) {
    labelArray.value[1] = router.options.routes[1].children[0].props().label
    labelArray.value[2] = router.options.routes[1].children[0].children[0].props().label
  }

  items.value = pathArray.map((path, index) => {
    const routePath = '/' + pathArray.slice(0, index + 1).join('/') // Создаем полный путь для каждого элемента
    return {
      label: labelArray.value[index], // Форматируем текст ссылки (первую букву заглавной)
      to: routePath
    }
  })
}

onMounted(() => {
  // Вызываем функцию для генерации хлебных крошек при загрузке компонента
  generateBreadcrumbs()
})
watch(labelList, () => {
  generateBreadcrumbs()
})
watch(
  () => route.path,
  () => {
    paramsClear()
    generateBreadcrumbs()
  }
)
</script>

<template>
  <ol class="flex my-4 gap-6 max-lg:mt-3 max-lg:mb-2 overflow-x-auto">
    <li>
      <RouterLink class="text-white-theme hover:bg-inherit hover:text-green-300 active:text-green-400 duration-200" to="/">
        <span class="text-text-custom">
          Главная
        </span>
      </RouterLink>
    </li>
    <li v-for="(item, index) in items" :key="index" 
      class="relative before:absolute before:content-['>'] before:text-green-300 before:-left-4 before:-top-px">
      <RouterLink class="hover:bg-inherit hover:text-green-300 active:text-green-400 duration-200" :to="item.to" >
         <span class="text-text-custom hover:text-green-300 duration-200 active:text-green-400">{{item.label }}</span> 
      </RouterLink>
    </li>
  </ol>
</template>
