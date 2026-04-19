<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center">
    <div class="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-8"></div>
    <h2 class="text-2xl font-bold text-gray-900 mb-2">분석 중...</h2>
    <p class="text-gray-600">최적의 상품을 찾고 있어요</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import shoppingApi from '@/api/shopping/index.js'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const payload = auth._shoppingAnswers
  if (payload && payload.voiceItemId) {
    try {
      const res = await shoppingApi.recommend(payload.voiceItemId, {
        voiceItemId: payload.voiceItemId,
        items: payload.items,
        caregiverAnswers: payload.caregiverAnswers
      })
      // 추천 결과를 store에 저장
      auth._recommendResult = res
    } catch (e) {
      console.error('추천 상품 조회 실패', e)
    }
  }
  router.replace('/shop/price-compare')
})
</script>