<template>
  <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-bold text-gray-900">{{ name }}</h3>
      <StatusBadge :status="status">{{ config.label }}</StatusBadge>
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

    <p class="text-gray-700 mb-4">{{ location }}</p>

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
import {computed} from 'vue'
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
  pending: {label: '알림', color: 'bg-gray-200'},
  approved: {label: '허용', color: 'bg-green-500'},
  urgent: {label: '시급', color: 'bg-orange-500'}
}

const config = computed(() => statusConfig[props.status] || statusConfig.pending)

const handlePurchase = () => {
  emit('purchase')
}

const handleViewDetails = () => {
  emit('viewDetails')
}
</script>