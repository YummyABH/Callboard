<script setup>
// import IconHeart from '@/components/ui/icons/IconHeart.vue'
import IconList from '@/components/ui/icons/IconList.vue'
import IconUser from '@/components/ui/icons/IconUser.vue'
</script>

<template>
  <div class="text-xs w-full flex items-center justify-around h-13 bg-black-400">
    <!-- <RouterLink to="/" class="active:text-green-300 duration-200 gap-0.5 flex h-max justify-center flex-col items-center">
      <IconHeart />
      <span>Избранное</span>
    </RouterLink> -->
    <!-- <RouterLink to="/user/my-ads" class="active:text-green-300 duration-200 gap-0.5 flex h-max justify-center flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="var(--text-custom)"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
        />
      </svg>

      <span class="text-text-custom">Мои объявления</span>
    </RouterLink> -->
    <RouterLink to="/user/my-ads" class="active:text-green-300 duration-200 gap-0.5 flex h-max justify-center flex-col items-center">
      <IconUser />
      <span class="text-text-custom">Профиль</span>
    </RouterLink>
    <RouterLink to="/catalog" class="active:text-green-300 duration-200 gap-0.5 flex h-max justify-center flex-col items-center">
      <IconList />
      <span class="text-text-custom">Катлог</span>
    </RouterLink>
  </div>
</template>
