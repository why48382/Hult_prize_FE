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
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
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
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import RequestCard from '@/components/RequestCard.vue'

const authStore = useAuthStore()
const role = computed(() => authStore.role)

// role에 따른 헤더 설명
const headerDescription = computed(() => {
  return role.value === 'guardian'
      ? '지금까지 부모님이 요청하신 내역입니다'
      : '자녀에게 요청한 내역입니다'
})

// 빈 화면 메시지
const emptyMessage = computed(() => {
  return role.value === 'guardian'
      ? '부모님이 요청을 보내면\n여기에 표시됩니다'
      : '음성 주문으로 요청하면\n여기에 표시됩니다'
})

// 요청 목록 (백엔드에서 가져올 데이터)
const requests = ref([
  {
    id: 1,
    name: '부모님',
    time: '10분 전',
    distance: '45초',
    status: 'urgent',
    location: '오메가3',
    category: '의약품',
    isPurchased: false
  },
  {
    id: 2,
    name: '부모님',
    time: '30분 전',
    distance: '45초',
    status: 'pending',
    location: '비타민 D',
    category: '건강식품',
    isPurchased: true
  },
  {
    id: 3,
    name: '부모님',
    time: '1시간 전',
    distance: '45초',
    status: 'approved',
    location: '감기약',
    category: '의약품',
    isPurchased: false
  }
])

// 빈 상태로 테스트하려면 아래 주석 해제
// const requests = ref([])

// 요청 취소 (부모님만)
const handleCancelRequest = (request) => {
  console.log('요청 취소:', request)
  // 백엔드 API 호출
  // await api.cancelRequest(request.id)
  // requests.value = requests.value.filter(r => r.id !== request.id)
}
</script>