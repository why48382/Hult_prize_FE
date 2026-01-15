<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-bold text-gray-900">{{ name }}</h3>
      <StatusBadge :status="status">{{ config.label }}</StatusBadge>
    </div>

    <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>{{ time }}</span>
      </div>
      <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span>{{ distance }}</span>
      </div>
    </div>

    <!-- 상품명 박스 (아이콘 + 텍스트) -->
    <div class="bg-gray-50 rounded-xl px-4 py-3 mb-3 flex items-center gap-2">
      <!-- 의약품 아이콘 -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600 flex-shrink-0">
        <path d="M10.5 20.5 10 21a2 2 0 0 1-2.828 0L4.343 18.172a2 2 0 0 1 0-2.828l.5-.5"/>
        <path d="m14 14-.5.5a2 2 0 0 0 0 2.828l2.828 2.828a2 2 0 0 0 2.828 0l.5-.5"/>
        <path d="M14 7.343 8.343 13l-1.414 1.414m8.485-8.485 1.414 1.414L14 10"/>
        <path d="M17.657 6.343 8.343 15.657"/>
        <path d="M9.5 4.5 10 4a2 2 0 0 1 2.828 0l2.829 2.828a2 2 0 0 1 0 2.829l-.5.5"/>
      </svg>
      <span class="text-gray-900 font-medium">{{ location }}</span>
    </div>

    <button
        v-if="isPurchased"
        @click="handleViewDetails"
        class="w-full bg-gray-400 text-white py-3 rounded-xl font-medium"
    >
      자녀가 구매를 완료했어요
    </button>
    <button
        v-else
        @click="handlePurchase"
        class="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
    >
      요청 취소하기
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  name: {
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
    default: 'pending'
  },
  location: {
    type: String,
    default: '오메가3'
  },
  isPurchased: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['purchase', 'viewDetails'])

const statusConfig = {
  pending: { label: '알림', color: 'bg-gray-200' },
  approved: { label: '허용', color: 'bg-green-500' },
  urgent: { label: '시급', color: 'bg-orange-500' }
}

const config = computed(() => statusConfig[props.status] || statusConfig.pending)

const handlePurchase = () => {
  emit('purchase')
}

const handleViewDetails = () => {
  emit('viewDetails')
}
</script>