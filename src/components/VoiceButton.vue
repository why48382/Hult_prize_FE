<template>
  <div class="text-center">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">음성 주문</h2>
      <p class="text-gray-600">필요한 물건을 말씀해주세요</p>
    </div>

    <!-- 고정된 버튼 컨테이너 -->
    <div class="h-80 flex items-center justify-center mb-8 relative">
      <button
          @click="handleClick"
          :class="[
          'rounded-full flex flex-col items-center justify-center absolute transition-all duration-500 ease-out',
          isListening
            ? 'w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-500 shadow-2xl'
            : 'w-64 h-64 bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg hover:shadow-xl'
        ]"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-white mb-4"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
        <span class="text-white text-xl font-bold">
          {{ isListening ? '듣는 중 입니다' : '눌러서 말하기' }}
        </span>
      </button>
    </div>

    <!-- 인식된 내용 박스 - 항상 표시됨 -->
    <div
        :class="[
        'bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300',
        isListening ? 'border-orange-500' : 'border-gray-200'
      ]"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2" :class="recognizedText ? 'text-green-600' : 'text-gray-400'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span class="font-medium">인식된 내용</span>
        </div>
        <button
            v-if="recognizedText"
            @click.stop="handleReset"
            class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
        </button>
      </div>
      <p :class="recognizedText ? 'text-gray-700 text-lg' : 'text-gray-400'">
        {{ recognizedText || '마이크 버튼을 눌러 원하시는 품목을 알려주세요!' }}
      </p>
    </div>

    <!-- 다음 단계로 버튼 -->
    <button
        @click="handleNext"
        :disabled="!recognizedText"
        :class="[
        'w-full mt-6 py-4 rounded-xl font-medium transition-colors',
        recognizedText
          ? 'bg-orange-500 text-white hover:bg-orange-600'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      ]"
    >
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

const emit = defineEmits(['click', 'reset', 'next'])

const handleClick = () => {
  emit('click')
}

const handleReset = () => {
  emit('reset')
}

const handleNext = () => {
  if (props.recognizedText) {
    emit('next')
  }
}
</script>