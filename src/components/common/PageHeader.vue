<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <div class="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
      <!-- 왼쪽: 뒤로가기 버튼 -->
      <button
          v-if="showBack"
          @click="handleBack"
          class="p-2 -ml-2 text-gray-700 hover:text-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      <div v-else class="w-8"></div>

      <!-- 중앙: 제목 -->
      <h1 class="text-lg font-bold text-gray-900 flex items-center gap-2">
        <component v-if="icon" :is="icon" class="text-blue-500" />
        {{ title }}
      </h1>

      <!-- 오른쪽: 추가 액션 버튼 -->
      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
        <div v-if="!$slots.actions" class="w-8"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  showBack: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['back'])
const router = useRouter()

const handleBack = () => {
  emit('back')
  if (!emit('back')) {
    router.back()
  }
}
</script>