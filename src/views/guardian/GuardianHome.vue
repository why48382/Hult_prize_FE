<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 페이지 헤더 -->
    <PageHeader title="쇼핑 요청함">
      <template #actions>
        <button class="p-2 text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </template>
    </PageHeader>

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
        <h3 class="text-xl font-bold text-gray-900 mb-2">아직 들어온 요청이 없어요!</h3>
        <p class="text-gray-600 text-center">
          부모님이 요청을 보내면<br>
          여기에 표시됩니다
        </p>
      </div>

      <!-- 요청이 있을 때 -->
      <div v-else class="space-y-4">
        <ProductCard
            v-for="request in requests"
            :key="request.id"
            :parent-name="request.parentName"
            :time="request.time"
            :distance="request.distance"
            :status="request.status"
            :product-name="request.productName"
            :category="request.category"
            :is-completed="request.isCompleted"
            @shop="handleShop(request)"
            @complete="handleComplete(request)"
        />
      </div>
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
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()

// 요청 목록 (백엔드에서 가져올 데이터)
const requests = ref([
  {
    id: 1,
    parentName: '부모님',
    time: '10분 전',
    distance: '45초',
    status: 'urgent',
    productName: '오메가3',
    category: '의약품',
    isCompleted: false
  },
  {
    id: 2,
    parentName: '부모님',
    time: '30분 전',
    distance: '45초',
    status: 'pending',
    productName: '비타민 D',
    category: '건강식품',
    isCompleted: false
  }
])

// 빈 상태로 테스트하려면 아래 주석 해제
// const requests = ref([])

const handleShop = (request) => {
  console.log('상품 구매하러 가기:', request)
  // router.push(`/shop/${request.id}`)
}

const handleComplete = (request) => {
  console.log('구매 완료 알림:', request)
  // 백엔드에 구매 완료 알림
  request.isCompleted = true
}
</script>