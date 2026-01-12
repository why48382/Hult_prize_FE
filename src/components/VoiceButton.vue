<template>
  <div class="text-center">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">음성 주문</h2>
      <p class="text-gray-600">필요한 물건을 말씀해주세요</p>
    </div>

    <button
        @click="handleClick"
        :class="[
        'w-64 h-64 mx-auto rounded-full flex flex-col items-center justify-center transition-all',
        isListening
          ? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-xl scale-105'
          : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg hover:scale-105'
      ]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white mb-4">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
      </svg>
      <span class="text-white text-xl font-bold">
        {{ isListening ? '듣는 중 입니다.' : '눌러서 말하기' }}
      </span>
    </button>

    <div v-if="recognizedText" class="mt-8 bg-white rounded-2xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span class="font-medium">인식된 내용</span>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
      </div>
      <p class="text-gray-700">{{ recognizedText }}</p>
    </div>

    <button class="w-full mt-6 bg-gray-200 text-gray-700 py-4 rounded-xl font-medium">
      다음 단계로
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  isListening: {
    type: Boolean,
    default: false
  },
  recognizedText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>