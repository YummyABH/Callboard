<script setup>
import ContentContainer from '@/components/ContentContainer.vue'
import MenuNavigation from '@/components/MenuNavigation.vue'
import Search from '@/components/ui/icons/IconSearch.vue'
import MenuNavigationBottom from '@/components/MenuNavigationBottom.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const searchInput = ref('')
const searchOpen = ref(false)

const goToPage = async (strPath) => {
  const strFormated = strPath ? '/catalog?adName=' + strPath + '&page=1&limit=6' : '/catalog'
  searchOpen.value = false
  await router.push(strFormated)
  window.location.reload()
}
</script>

<template>
  <header id="#top" class="fixed left-0 top-0 z-50 bg-black-400 w-full min-h-16 shadow-2xl">
    <ContentContainer>
      <nav
        class="max-md:h-16 flex items-center h-24 z-20 gap-x-5 max-xl:justify-between max-xl:relative"
      >
        <RouterLink to="/" class="hover:bg-inherit z-30 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12.5 max-md:h-10"
            viewBox="178.4 50.1 306.7 408.4"
          >
            <g fill="#8c7b27">
              <path
                d="m180.8 51.7c-2.4.6-2.4 5.5 0 7.6 1.6 1.5 6 1.7 36.2 1.9 30.9.3 34.4.5 35.3 2 .9 1.3.7 2.2-.7 3.7-1.8 1.9-3.2 2-33.7 2.3l-31.8.3-3.5 3.4-3.6 3.5v9.1c0 9.6.8 11.5 4.5 11.5 3.4 0 4.5-2 4.5-8 0-9.7.5-10 17.9-10 15.2 0 20.3.9 30.1 5.4 3.9 1.8 4.6 2.2 13.8 8.3 6.8 4.6 9.2 5.2 11.6 2.7 3.1-3 1.2-6.6-5.9-11-2.5-1.6-4.5-3.4-4.5-4s1.8-2 3.9-3.2c9.7-5.5 10.9-17.3 2.3-23.7-2.6-1.9-4.4-2-38.7-2.2-19.8 0-36.8.1-37.7.4zm96 .4c-1.6.9-1.8 3-1.8 21.7 0 21.8.3 23.2 4.5 23.2s4.5-1.3 4.5-23.6c0-21.1 0-21.2-2.2-21.8-2.9-.7-3-.7-5 .5zm32.7-.4c-3.1.6-9 6.3-11.4 11-1.6 3.2-2.1 6-2.1 11.5 0 6.3.4 8 3 12.5 1.7 2.9 4.7 6.4 6.7 7.8l3.8 2.5h35.5c26.4 0 35.9-.3 36.8-1.2.7-.7 1.2-2.5 1.2-4 0-2.1-.6-3.1-2.6-3.8-1.4-.6-16.2-1-34.6-1-30.8 0-32.1-.1-34.9-2.1-5.7-4-7.4-11-4.3-17.1 3.6-7 2.3-6.7 39.5-6.8 31.2 0 33.7-.1 35.2-1.8 2.5-2.8 2.2-6.8-.5-7.6-2.5-.6-68-.6-71.3.1zm87.3.4c-1.6.9-1.8 3-1.8 21.4 0 22.1.3 23.5 5.5 23.5 3.3 0 4.5-2.7 4.5-10.4 0-6 .2-6.6 2.3-7.1 1.2-.3 15.7-.4 32.2-.3l30 .3.3 7.5c.3 8.5 1.3 10.2 5.6 9.8 2.2-.2 3.2-.9 3.7-2.8.9-3.2 1.1-34.7.3-38.9-.7-3.6-3.9-5-7.3-3.1-1.8.9-2.1 2-2.1 7.8 0 4-.5 7.3-1.2 8-.9.9-9.3 1.2-31.5 1.2-34.7 0-32.3.7-32.3-9.9 0-4.9-.4-6.2-1.9-7.1-2.4-1.2-4.1-1.2-6.3.1zm-7.2 72.7c-.8 1.4-2.1 24.4-3.1 55.7-.4 10.4-1.2 19.7-1.9 22-.8 2.2-2.1 6.9-3.1 10.5-.9 3.6-2.4 8.6-3.1 11.2-.8 2.7-2 6.9-2.8 9.5-.7 2.7-2.2 7.7-3.1 11.3-3.5 13.3-3.8 13.7-21.3 31.2-9.2 9.3-17.1 16.8-17.7 16.8s-8.8-7.8-18.1-17.3c-15.5-15.6-17.2-17.7-18.3-22.2-.7-2.8-1.9-7-2.6-9.5-.8-2.5-2.1-7-2.9-10-4.4-15.5-7.2-25.4-9.2-31.9-.9-2.7-1.4-9.3-1.4-16.5 0-8.6-2.2-53.7-3-60.4 0-.1-.4-.2-1-.2-.5 0-1.2 1.7-1.5 3.7-1.4 9-3.7 22.4-5 29.3-.8 4.1-2.1 11.3-2.9 16s-2 11.5-2.6 15.2c-1.3 7-.8 12.3 2.5 26.3 2 8.7-.6 9.8-5.9 2.6-1.3-1.8-4-4.9-5.8-6.9-4.8-5.3-10.8-12.8-10.8-13.5 0-.4-2.6-6.2-5.9-12.9-3.2-6.8-6-14.1-6.3-16.3-.8-6.2-3.6-12.1-5-10.7-1.9 1.9-1.5 13.1.6 18.5 3.4 9 .6 7.4-13.4-7.3-18.9-19.8-18.8-18.2.5 7.9 25.7 34.8 44.2 59.9 48.5 65.9 2.5 3.5 11.4 15.6 19.8 26.9s16.4 22.2 17.7 24.2c2.1 3.4 4.2 9.5 6.4 19.1.5 1.9 1.9 7.1 3.1 11.5s2.6 9.3 3 11c.4 1.6 1.8 6.6 3 11s2.6 9.3 3 11c.4 1.6 1.8 6.6 3 11s2.6 9.6 3.1 11.5c2.4 10.2 6.6 24.1 7.3 24.3.8.2 2.3-4.3 6.1-18.3.9-3.6 2.3-8.5 3-11s2-7.4 2.9-11c1-3.6 2.3-8.8 3.1-11.5.7-2.8 2.1-7.9 3-11.5 1-3.6 2.4-8.8 3.1-11.5.8-2.8 2.1-7.3 2.8-10 .8-2.8 2.2-7.9 3.1-11.5 3-11.7 3.6-12.6 31.8-50.5 8.2-11 16-21.6 17.3-23.5 1.4-1.9 10-13.7 19.2-26.1 24.8-33.4 34.5-46.9 36.1-49.7l1.3-2.5-2.8 2c-2.3 1.7-16 16-20.9 21.8-1.5 1.8-4.3 2.6-4.7 1.3-.2-.6.5-3.6 1.5-6.7 1.5-4.5 1.8-6.7 1.1-11-.5-3-1.4-5.6-2-5.8-1-.3-4.4 9.8-4.4 13.2 0 .8-1.4 4.5-3.1 8.2-8.4 18.3-11.3 23.1-19.6 32.8-8.9 10.4-13.1 13.2-11.9 7.8 3.9-17.9 3.8-26.6-.4-48.8-2.9-15.1-4.1-21.7-5.6-31-2.2-13.9-2.8-16.3-3.8-14.7zm-200.6 307.9c-4.6.9-9 6.6-9 11.6 0 3.7 2.7 9.4 5.2 11.1 3.3 2.3 38.6 2.4 39.4.1 1.5-3.8-1-4.4-18.9-4.3-16.5 0-17.2-.1-18.9-2.2-2.2-2.7-2.3-5.9-.4-8.6 1.3-1.7 3.1-1.9 19.2-2.4 15.2-.4 17.8-.7 18.8-2.2.5-.9.7-2.1.2-2.5-.8-.9-31.6-1.4-35.6-.6zm95.3.3c-1.3.5-2.3 1.4-2.3 1.9 0 2.6 4.6 3.1 23.6 2.9 17.3-.3 19.8-.5 20.8-2 .5-.9.7-2.1.2-2.5-1.1-1.1-39.7-1.4-42.3-.3zm51.4 0c-1.3.9-1.5 1.5-.7 3.1 1 1.8 2.3 1.9 18.4 1.9 13.3 0 17.6.3 18.5 1.3.6.8.8 1.7.4 2-.3.4-8.2.7-17.4.7h-16.8l-2 2.6c-3.1 3.9-2.7 12.4.5 12.4 1.3 0 1.9-1.5 2.6-6.5.3-1.8 1.2-2 10.6-2.3 10.7-.3 13.3.5 22.4 6.9 1.4 1.1 3.1 1.9 3.6 1.9 2.2 0 2-3.1-.3-5.6-1.9-2-2.2-3.1-1.5-4.4.5-1 1.4-2 2-2.2s1.3-1.9 1.6-3.8c.4-2.7.1-4.2-1.4-6-2-2.5-2.2-2.5-20.4-2.8-11.8-.1-18.9.1-20.1.8zm57.3-.3c-6.1 1.2-10.2 9.2-8 15.9.7 2.2 2.4 4.9 3.9 6.1 2.5 2.1 3.5 2.2 20.3 2.3h17.7l2-2.6c2.8-3.5 2.6-6.9-.4-9.9-2.3-2.4-3-2.5-15-2.5-10.5 0-12.7.3-13.2 1.6-1.2 3.1 1.4 3.9 11.2 3.6 10-.4 13.5.2 13.5 2.3 0 1.8-2.6 2-18.8 1.7l-14.3-.3-1.6-3.5c-1.6-3.3-1.6-3.5.4-6.2l2-2.7 17.8-.5c15.3-.4 17.9-.7 18.9-2.2.5-.9.7-2.1.2-2.5-.8-.9-32.5-1.4-36.6-.6zm-160 2.9c-1.1 2.8-1.4 17.3-.4 19.8.3.9 1.2 1.6 1.9 1.6 1.9 0 2.5-2.4 2.5-9.5s1.7-9.8 4.6-7.4c1.6 1.3 4.1 2.9 7.9 4.9 1.1.6 3.2 1.8 4.7 2.8 9.1 5.9 15.2 9.2 16.8 9.2 3.8 0 5.1-4 4.8-14.1-.3-8.6-.5-9.4-2.3-9.4s-2 .8-2.3 7.2c-.4 10.5-1.5 10.9-11.4 4.5-20-12.8-25-14.6-26.8-9.6zm204-.7c0 2.6 5.8 7.5 12.9 10.7 5.4 2.5 5.9 3 6.5 6.5 1 6.4 4.3 6.4 5.1 0 .5-3.9-.4-3.2 7.5-6.9 9.7-4.6 16.1-12.2 10.3-12.2-.8 0-3.2 1.3-5.2 2.9-5.8 4.5-9.6 6.1-15.1 6.1s-9.3-1.6-15.1-6.1c-4.3-3.4-6.9-3.7-6.9-1z"
              />
              <path
                d="m191 444.4v2.5l14.1.3c15.2.3 18.2-.2 17.7-2.9-.3-1.6-2-1.8-16.1-2.1l-15.7-.3zm92.3-1.7c-2.1.8-1.6 8.7.8 11.7l2 2.6h20c16.9 0 20.1-.2 20.5-1.5 1.5-3.8-1-4.4-19.7-4.3-17.3.1-22.1-.7-18.7-2.8.7-.5 9.4-1.1 19.3-1.4 17.2-.5 18-.6 18-2.5s-.7-2-20.5-2.2c-11.3-.1-21.1.1-21.7.4z"
              />
            </g>
          </svg>
        </RouterLink>
        <div class="w-full max-lg:ml-5 max-sm:ml-2 ml-10 z-10 flex justify-between items-center">
          <form
            :class="searchOpen ? 'md:max-xl:flex' : 'md:max-xl:hidden'"
            class="mr-12 xl:flex max-sm:mr-8 h-8.5 max-md:flex items-center w-full text-text-custom justify-between overflow-hidden bg-black-299 rounded-lg"
          >
            <input
              v-model="searchInput"
              type="text"
              autocomplete="off"
              name="search"
              class="max-sm:px-2.5 hover:bg-black-301 box-border bg-black-301 duration-100 appearance-none border-none outline-hidden h-6 px-5 py-6 w-full"
              placeholder="Найти"
              id="1"
            />
            <button
              @click.prevent="goToPage(searchInput)"
              class="max-sm:hidden text-text-custom h-full duration-200 max-sm:max-w-[20%] hover:bg-gray-800 active:bg-gray-900 flex cursor-pointer text-xl max-md:px-6 px-5 bg-gray-700 items-center"
            >
              Найти
            </button>
            <div
              @click.prevent="goToPage(searchInput)"
              class="max-sm:flex items-center hidden min-h-full px-4 hover:bg-gray-800 active:bg-gray-900 bg-gray-700"
            >
              <Search class="z-20 h-5 w-5" />
            </div>
          </form>
          <div
            :class="searchOpen ? 'md:max-xl:flex' : 'md:max-xl:hidden'"
            class="hidden "
            @click="searchOpen = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="var(--text-custom)"
              class="active:text-green-300 size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div
            @click.prevent="searchOpen = true"
            :class="searchOpen ? 'md:max-xl:hidden' : 'md:max-xl:flex'"
            class="mr-8 items-center min-h-full hidden"
          >
            <Search class="z-20 md:h-6.5 md:w-6.5 h-5 w-5" />
          </div>
          <MenuNavigation :class="searchOpen ? 'md:max-xl:hidden' : ''" />
        </div>
      </nav>
      <div
        class="fixed w-full border-t-0.25 border-gray-900 border-t bottom-0 left-0 max-md:flex items-center hidden"
      >
        <MenuNavigationBottom />
      </div>
    </ContentContainer>
  </header>
</template>
