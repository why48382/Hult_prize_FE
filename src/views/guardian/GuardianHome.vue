<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="쇼핑 요청함" :show-back="false" type="voice" />

    <div class="p-4 max-w-md mx-auto">

      <!-- 로딩 -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-500">요청 목록 불러오는 중...</p>
      </div>

      <!-- 에러 -->
      <div v-else-if="errorMsg" class="flex flex-col items-center justify-center py-20">
        <p class="text-red-500 mb-4">{{ errorMsg }}</p>
        <button @click="fetchRequests" class="text-orange-500 underline">다시 시도</button>
      </div>

      <!-- 요청이 없을 때 -->
      <div v-else-if="requests.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-32 h-32 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" class="text-gray-400">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">아직 들어온 요청이 없어요!</h3>
        <p class="text-gray-600 text-center">부모님이 요청을 보내면<br>여기에 표시됩니다</p>
      </div>

      <!-- 요청 목록 -->
      <div v-else class="space-y-4">
        <ProductCard
            v-for="request in requests"
            :key="request.voiceId"
            :parent-name="request.elderName || '부모님'"
            :time="formatTime(request.createdAt)"
            :distance="''"
            :status="mapStatus(request.urgencyLevel)"
            :product-name="getProductNames(request)"
            :category="''"
            :is-completed="request.status === 'COMPLETED'"
            @shop="handleShop(request)"
            @complete="handleComplete(request)"
        />
      </div>

    </div>

    <BottomNav/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ProductCard from '@/components/ProductCard.vue'
import voiceApi from '@/api/voice/index.js'

const router = useRouter()
const auth = useAuthStore()

const requests = ref([])
const loading = ref(false)
const errorMsg = ref('')

const fetchRequests = async () => {
  try {
    loading.value = true
    errorMsg.value = ''
    requests.value = await voiceApi.getRequests()
  } catch (e) {
    console.error('요청 목록 불러오기 실패', e)
    errorMsg.value = '요청 목록을 불러올 수 없습니다.'
  } finally {
    loading.value = false
  }
}

const formatTime = (dateStr) => {
  if (!dateStr) return ''
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000)
  if (diff < 1) return '방금 전'
  if (diff < 60) return `${diff}분 전`
  return `${Math.floor(diff / 60)}시간 전`
}

const mapStatus = (urgencyLevel) => {
  if (urgencyLevel === 'URGENT') return 'urgent'
  return 'pending'
}

const getProductNames = (request) => {
  if (!request.items || request.items.length === 0) return request.originalText || '요청 상품'
  return request.items.map(i => i.itemName).join(', ')
}

const handleShop = (request) => {
  // 첫 번째 voiceItemId를 store에 저장 후 질문 페이지로
  if (request.items && request.items.length > 0) {
    auth.setCurrentVoice(request.voiceId, request.items[0].voiceItemId)
  }
  router.push('/shop/questions')
}

const handleComplete = async (request) => {
  try {
    await voiceApi.updateStatus(request.voiceId, 'COMPLETED')
    request.status = 'COMPLETED'
    router.push('/guardian/complete')
  } catch (e) {
    console.error('상태 업데이트 실패', e)
    alert('완료 처리에 실패했습니다.')
  }
}

onMounted(fetchRequests)
</script>