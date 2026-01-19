<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-bold text-gray-900">{{ parentName }}</h3>
      <StatusBadge :status="status">{{ statusLabel }}</StatusBadge>
    </div>

    <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>{{ time }}</span>
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{{ distance }}</span>
      </div>
    </div>

    <!-- 상품명 + 카테고리 -->
    <div class="bg-gray-50 rounded-xl px-4 py-2.5 mb-5 flex justify-between items-center">
      <span class="text-gray-900 font-medium">{{ productName }}</span>
      <span class="text-gray-700 text-sm bg-white border border-gray-300 rounded-lg px-3 h-8 flex items-center">
        {{ category }}
      </span>
    </div>

    <!-- 상품 구매하러 가기 버튼 -->
    <button
        @click="handleShop"
        class="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors mb-5"
    >
      상품 구매하러 가기
    </button>

    <!-- 구매완료 알려주기 버튼 -->
    <button
        v-if="!isCompleted"
        @click="handleComplete"
        class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
    >
      구매완료 알려주기
    </button>
    <button
        v-else
        disabled
        class="w-full bg-gray-200 text-gray-500 py-3 rounded-xl font-medium cursor-not-allowed"
    >
      구매 완료됨
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  parentName: {
    type: String,
    default: '부모님'
  },
  time: {
    type: String,
    default: '10분 전'
  },
  distance: {
    type: String,
    default: '45초'
  },
  status: {
    type: String,
    default: 'pending' // 'pending', 'urgent'
  },
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: '의약품'
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['shop', 'complete'])

const statusLabel = computed(() => {
  return props.status === 'urgent' ? '시급' : '여유'
})

const handleShop = () => {
  emit('shop')
}

const handleComplete = () => {
  emit('complete')
}
</script>