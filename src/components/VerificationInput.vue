<template>
  <div class="text-center">
    <div class="mb-8">
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
        <div class="w-16 h-16 bg-white rounded-full"></div>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ title }}</h2>
      <p class="text-gray-600 text-sm">{{ description }}</p>
    </div>

    <div class="bg-white rounded-3xl p-8 shadow-sm">
      <div class="flex justify-center gap-3 mb-4">
        <div
            v-for="(value, index) in values"
            :key="index"
            class="w-16 h-20 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-300"
        >
          {{ value || '0' }}
        </div>
      </div>
      <div class="h-1 bg-blue-500 rounded-full transition-all" :style="{ width: `${progress}%` }"></div>
      <p class="text-sm text-gray-500 mt-4">숫자 4자리를 입력하면 자동 연결됩니다</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 4
  },
  type: {
    type: String,
    default: 'guardian'
  }
})

const emit = defineEmits(['complete'])

const values = ref(Array(props.length).fill(''))
const loading = ref(false)

const title = computed(() =>
    props.type === 'guardian' ? '보호자와 연동해요' : '부모님과 연동해요'
)

const description = computed(() =>
    props.type === 'guardian'
        ? '보호자 휴대폰 화면에 아래 숫자 4자리를 입력해주세요'
        : '부모님 휴대폰 화면에 아래 숫자 4자리를 입력해주세요'
)

const progress = computed(() => {
  const filledCount = values.value.filter(v => v).length
  return (filledCount / props.length) * 100
})
</script>