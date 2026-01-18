<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">보안 연결 중...</h2>
    <p class="text-gray-600">잠시만 기다려주세요</p>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
  setTimeout(() => {
    if (auth.role === 'guardian') {
      router.replace('/home/guardian')
    } else if (auth.role === 'parent') {
      router.replace('/home/parent')
    } else {
      router.replace('/') // 예외 처리
    }
  }, 2000)
})
</script>