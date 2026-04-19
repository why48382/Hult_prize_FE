<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 페이지 헤더 -->
    <PageHeader
        title="요청내역"
        type="box"
        :description="headerDescription"
    />

    <!-- 페이지 내용 -->
    <div class="p-4 max-w-md mx-auto">
      <!-- 요청이 없을 때 -->
      <div v-if="requests.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-32 h-32 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" class="text-gray-400">
            <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">아직 요청 내역이 없어요!</h3>
        <p class="text-gray-600 text-center">
          {{ emptyMessage }}
        </p>
      </div>

      <!-- 요청이 있을 때 -->
      <div v-else class="space-y-4">
        <RequestCard
            v-for="request in requests"
            :key="request.id"
            :name="request.name"
            :time="request.time"
            :distance="request.distance"
            :status="request.status"
            :location="request.location"
            :category="request.category"
            :is-purchased="request.isPurchased"
            :view-mode="role"
            @purchase="handleCancelRequest(request)"
        />
      </div>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import RequestCard from '@/components/RequestCard.vue'
import voiceApi from '@/api/voice/index.js'

const requests = ref([])
const loading = ref(false)

const fetchRequests = async () => {
  try {
    loading.value = true
    const data = await voiceApi.getRequests()
    requests.value = data.map(r => ({
      id: r.voiceId,
      name: '부모님',
      time: formatTime(r.createdAt),
      status: mapStatus(r.urgencyLevel),
      location: r.items?.map(i => i.itemName).join(', ') || r.originalText,
      category: '',
      isPurchased: r.status === 'COMPLETED'
    }))
  } catch (e) {
    console.error('요청 내역 불러오기 실패', e)
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

onMounted(fetchRequests)
</script>