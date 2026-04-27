<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-6">
    <template v-if="errorMsg">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" class="text-red-500">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">연결 실패</h2>
      <p class="text-red-500 text-center mb-8">{{ errorMsg }}</p>
      <button @click="router.replace('/pairing/' + role)"
              class="w-full max-w-md bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600">
        다시 시도
      </button>
    </template>

    <template v-else>
      <div class="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">보안 연결 중...</h2>
      <p class="text-gray-600">잠시만 기다려주세요</p>
    </template>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth.js'
import memberApi from '@/api/member/index.js'

const router = useRouter()
const auth = useAuthStore()
const errorMsg = ref('')
const role = auth.role  // 다시 시도 버튼용

const POLL_INTERVAL = 2000
const TIMEOUT = 60000  // 60초

let pollTimer = null
let timeoutTimer = null

const poll = async () => {
  try {
    const me = await memberApi.getMe()
    if (me.paired) {
      clearInterval(pollTimer)
      clearTimeout(timeoutTimer)
      router.replace('/')
    }
  } catch {
    clearInterval(pollTimer)
    clearTimeout(timeoutTimer)
    errorMsg.value = '연결 중 오류가 발생했습니다. 다시 시도해주세요.'
  }
}

onMounted(() => {
  pollTimer = setInterval(poll, POLL_INTERVAL)
  timeoutTimer = setTimeout(() => {
    clearInterval(pollTimer)
    errorMsg.value = '연결 시간이 초과되었습니다. 다시 시도해주세요.'
  }, TIMEOUT)
})

onUnmounted(() => {
  clearInterval(pollTimer)
  clearTimeout(timeoutTimer)
})
</script>