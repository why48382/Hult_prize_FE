<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 페이지 헤더 -->
    <PageHeader title="음성 주문" type="voice" />

    <!-- 페이지 내용 -->
    <div class="p-4 max-w-md mx-auto">
      <VoiceButton
          :is-listening="isListening"
          :recognized-text="recognizedText"
          @click="toggleListening"
          @reset="handleReset"
          @next="handleNext"
      />
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import VoiceButton from '@/components/VoiceButton.vue'

const router = useRouter()

const isListening = ref(false)
const recognizedText = ref('')

const toggleListening = () => {
  isListening.value = !isListening.value

  if (isListening.value) {
    // 실제로는 음성 인식 API 시작
    console.log('음성 인식 시작...')

    // 테스트용: 2초 후 자동으로 텍스트 입력
    setTimeout(() => {
      recognizedText.value = '오메가3 주세요'
      isListening.value = false
    }, 2000)
  }
}

const handleReset = () => {
  recognizedText.value = ''
  isListening.value = false
}

const handleNext = () => {
  if (recognizedText.value) {
    console.log('다음 단계:', recognizedText.value)
    router.push('/parent/loading')
  }
}
</script>