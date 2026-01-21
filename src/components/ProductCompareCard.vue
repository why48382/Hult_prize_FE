<template>
  <button
      @click="handleClick"
      class="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
  >
    <div class="flex gap-4">
      <!-- 상품 이미지 -->
      <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-orange-200 to-pink-200 flex-shrink-0 overflow-hidden">
        <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
        />
      </div>

      <!-- 상품 정보 -->
      <div class="flex-1 min-w-0">
        <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">{{ product.name }}</h3>

        <!-- 별점 -->
        <div class="flex items-center gap-1 mb-2">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm font-medium">{{ product.rating }}</span>
          <span class="text-sm text-gray-500">({{ formattedReviews }})</span>
        </div>

        <!-- 가격 -->
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-gray-900">{{ formattedPrice }}원</span>
          <span class="text-sm font-bold text-red-500">{{ product.discount }}%</span>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const formattedPrice = computed(() => {
  return props.product.price.toLocaleString()
})

const formattedReviews = computed(() => {
  return props.product.reviews.toLocaleString()
})

const handleClick = () => {
  emit('click')
}
</script>