<template>
  <button
      @click="handleClick"
      class="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
  >
    <div class="flex gap-4">
      <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-orange-200 to-pink-200 flex-shrink-0"></div>
      <div class="flex-1">
        <h3 class="font-medium text-gray-900 mb-2 line-clamp-2">{{ name }}</h3>
        <div class="flex items-center gap-1 mb-2">
          <span class="text-yellow-500">⭐</span>
          <span class="text-sm font-medium">{{ rating }}</span>
          <span class="text-sm text-gray-500">({{ formattedReviews }})</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-gray-900">{{ formattedPrice }}원</span>
          <span class="text-sm font-bold text-red-500">{{ discount }}%</span>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: String,
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 5569
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['click'])

const formattedPrice = computed(() => props.price.toLocaleString())
const formattedReviews = computed(() => props.reviews.toLocaleString())

const handleClick = () => {
  emit('click')
}
</script>