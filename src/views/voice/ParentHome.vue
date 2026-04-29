<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="음성 주문" type="voice" />

    <div class="p-4 max-w-md mx-auto">
      <VoiceButton
          :is-listening="isListening"
          :recognized-text="recognizedText"
          :loading="uploading"
          @click="toggleListening"
          @reset="handleReset"
          @next="handleNext"
      />

      <!-- 에러 메시지 -->
      <p v-if="errorMsg" class="mt-4 text-center text-red-500 text-sm">{{ errorMsg }}</p>
    </div>

    <BottomNav/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth.js'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import VoiceButton from '@/components/VoiceButton.vue'
import voiceApi from '@/api/voice/index.js'

const router = useRouter()
const auth = useAuthStore()

const isListening = ref(false)
const recognizedText = ref('')
const audioBlob = ref(null)
const uploading = ref(false)
const errorMsg = ref('')

let mediaRecorder = null
let audioChunks = []

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    mediaRecorder = new MediaRecorder(stream)
    audioChunks = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      audioBlob.value = new Blob(audioChunks, {type: 'audio/webm'})
      stream.getTracks().forEach(t => t.stop())
    }

    mediaRecorder.start()
  } catch (e) {
    console.error('마이크 접근 실패', e)
    errorMsg.value = '마이크 권한이 필요합니다.'
    isListening.value = false
  }
}

const stopRecording = () => {
  return new Promise((resolve) => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.onstop = () => {
        audioBlob.value = new Blob(audioChunks, {type: 'audio/webm'})
        mediaRecorder.stream?.getTracks().forEach(t => t.stop())
        resolve()
      }
      mediaRecorder.stop()
    } else {
      resolve()
    }
  })
}

const toggleListening = async () => {
  errorMsg.value = ''

  if (!isListening.value) {
    isListening.value = true
    audioBlob.value = null
    await startRecording()
  } else {
    await stopRecording()
    isListening.value = false
    await uploadAndProcess()
  }
}

const uploadAndProcess = async () => {
  if (!audioBlob.value) {
    errorMsg.value = '음성을 먼저 녹음해주세요.'
    return
  }

  try {
    uploading.value = true
    recognizedText.value = '요청을 처리하는 중...'
    const file = new File([audioBlob.value], 'voice.webm', {type: 'audio/webm'})
    const result = await voiceApi.upload(file)
    if (!result.originalText) {
      errorMsg.value = '음성을 인식하지 못했습니다. 다시 시도해주세요.'
      recognizedText.value = ''
      return
    }
    recognizedText.value = result.originalText
  } catch (e) {
    console.error('음성 업로드 실패', e)
    errorMsg.value = '요청 전송에 실패했습니다. 다시 시도해주세요.'
    recognizedText.value = ''
  } finally {
    uploading.value = false
  }
}

const handleNext = () => {
  router.replace('/parent/complete')
}

const handleReset = () => {
  recognizedText.value = ''
  isListening.value = false
  audioBlob.value = null
  errorMsg.value = ''
}
</script>