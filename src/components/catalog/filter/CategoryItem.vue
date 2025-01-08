<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFiltersProductsStore } from '@/stores/filtersProducts.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  category: String,
  subcategory: Array,
  subcategoryPath: String
})
const isOpen = ref(false)
const stateStyle = computed(() => ({
  arrow: isOpen.value === true ? 'rotate-90' : 'rotate-0'
}))

const refsArray = ref([])

function labelNamed(category, subcategory, subcategoryName) {
  const params = useFiltersProductsStore().filterUrl
  const labelList = useFiltersProductsStore().labelList

  if (category === params.categoriesId && labelList.category === null) {
    labelList.category = props.category
  } else if (subcategory === params.subcategoryId && labelList.subcategory === null) {
    console.log(props.category, subcategoryName)
    labelList.subcategory = subcategoryName
  }
}

onMounted(() => {
  refsArray.value.forEach((el, index) => {
    labelNamed(
      props.subcategoryPath,
      props.subcategory[index].path,
      props.subcategory[index].subcategoryName
    )
  })
})

async function APIFilter(category, subcategory, subcategoryName) {
  const params = useFiltersProductsStore().filterUrl
  const paramsQuery = useFiltersProductsStore().filterParams
  const labelList = useFiltersProductsStore().labelList
  paramsQuery.adName = null
  paramsQuery.maxPrice = null
  paramsQuery.minPrice = null
  paramsQuery.page = 1

  params.categoriesId = category
  params.subcategoryId = subcategory

  labelList.category = props.category
  labelList.subcategory = subcategoryName

  const paramsActive = useFiltersProductsStore().filteredParams
  const categoriesActive = useFiltersProductsStore().filteredCategories
  const pathStr =
    Object.keys(categoriesActive).length === 0
      ? ''
      : `/${categoriesActive.categoriesId}/${categoriesActive.subcategoryId}`

  router.push({
    path: '/catalog' + pathStr,
    query: paramsActive
  })
  useFiltersProductsStore().requestAd()
}
</script>

<template>
  <div @click="isOpen = !isOpen" :class="[subcategory.length !== 0 ? 'cursor-pointer' : '']"
    class="hover:bg-gray-900 active:bg-gray-901 duration-200 w-full flex self-center text-white bg-gray-500 font-semibold text-base px-4 py-3">
    <li class="select-none flex gap-x-3">
      <span :class="[stateStyle.arrow, subcategory.length === 0 ? 'hidden' : 'inline-block']"
        class="duration-300 flex items-center">></span>
      {{ category }}
    </li>
  </div>
  <Transition>
    <ul v-show="isOpen" v-if="subcategory" class="cursor-pointer">
      <li v-for="(item, index) in subcategory"
        @click="APIFilter(props.subcategoryPath, item.path, item.subcategoryName)"
        @load="labelNamed(props.subcategoryPath, item.path, item.subcategoryName)"
        :ref="(el) => (refsArray[index] = el)" :class="[stateStyle.border]" :key="item"
        class="border-t-[1px] w-full flex self-center text-white bg-gray-800 font-semibold text-base px-4 py-3 hover:bg-gray-700 active:bg-gray-400 duration-300">
        {{ item.subcategoryName }}
      </li>
    </ul>
  </Transition>
</template>

<style scoped>
.v-enter-active {
  transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
