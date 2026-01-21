<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
    <div class="max-w-md mx-auto flex justify-around items-center h-16">
      <button
          v-for="item in navItems"
          :key="item.path"
          @click="navigateTo(item.path)"
          :class="[
          'flex flex-col items-center justify-center flex-1 h-full transition-colors',
          isActive(item.path) ? 'text-orange-500' : 'text-gray-400'
        ]"
      >
        <component
            :is="item.icon"
            class="w-6 h-6"
        />
        <span class="text-xs mt-1 font-medium">
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import HomeIcon from "@/components/icon/HomeIcon.vue";
import NavBoxIcon from "@/components/icon/NavBoxIcon.vue";
import SettingIcon from "@/components/icon/SettingIcon.vue";

const router = useRouter()
const route = useRoute()

/* nav 설정 */
const navItems = [
  { path: '/home', label: '홈', icon: HomeIcon },
  { path: '/requests', label: '요청내역', icon: NavBoxIcon },
  { path: '/settings', label: '설정', icon: SettingIcon }
]

/* 활성 상태 판정 */
const isActive = (path) => {
  if (path === '/home') {
    return route.path.startsWith('/home')
  }
  return route.path.startsWith(path)
}

/* 이동 */
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
