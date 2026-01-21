<template>
  <div class="min-h-screen bg-gray-50 pb-32">
    <!-- 페이지 헤더 -->
    <PageHeader
        title="상품 가격 비교"
        :show-back="true"
        description="시중 통해 베스트 상품을 모아봤어요"
    />

    <!-- 필터 버튼들 -->
    <div class="px-4 py-3 flex gap-2 overflow-x-auto">
      <button
          v-for="filter in filters"
          :key="filter.value"
          @click="selectedFilter = filter.value"
          :class="[
          'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
          selectedFilter === filter.value
            ? 'bg-orange-500 text-white'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
        ]"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- 상품 리스트 -->
    <div class="p-4 max-w-md mx-auto">
      <!-- 관절약 카테고리 -->
      <div class="mb-6">
        <h2 class="text-lg font-bold text-gray-900 mb-3">관절약</h2>
        <div class="space-y-3">
          <ProductCompareCard
              v-for="product in jointProducts"
              :key="product.id"
              :product="product"
              @click="goToDetail(product)"
          />
        </div>
      </div>

      <!-- 쌀 카테고리 -->
      <div>
        <h2 class="text-lg font-bold text-gray-900 mb-3">쌀</h2>
        <div class="space-y-3">
          <ProductCompareCard
              v-for="product in riceProducts"
              :key="product.id"
              :product="product"
              @click="goToDetail(product)"
          />
        </div>
      </div>
    </div>

    <!-- 플로팅 버튼 -->
    <div class="fixed bottom-20 left-0 right-0 px-4 max-w-md mx-auto">
      <button
          @click="sendNotification"
          class="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 transition-colors"
      >
        부모님께 완료 알림 보내기
      </button>
    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ProductCompareCard from '@/components/ProductCompareCard.vue'

const router = useRouter()

// 필터 옵션
const filters = [
  { label: '최신순', value: 'latest' },
  { label: '가격 낮은순', value: 'price_asc' },
  { label: '가격 높은순', value: 'price_desc' },
  { label: '평점순', value: 'rating' }
]

const selectedFilter = ref('latest')

// 더미 데이터 - 관절약
const jointProducts = ref([
  {
    id: 1,
    name: '가는 들불 프리미엄 오메가 3',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
    price: 24000,
    discount: 38,
    rating: 4.5,
    reviews: 5569,
    mallName: '네이버쇼핑'
  },
  {
    id: 2,
    name: '트루탄 빠건강 콘드로이친',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop',
    price: 27900,
    discount: 38,
    rating: 4.5,
    reviews: 5569,
    mallName: '쿠팡'
  },
  {
    id: 3,
    name: '콘드로이친 함유량 초과',
    image: 'https://images.unsplash.com/photo-1550572017-4233783946ca?w=200&h=200&fit=crop',
    price: 31000,
    discount: 38,
    rating: 4.5,
    reviews: 5569,
    mallName: 'G마켓'
  }
])

// 더미 데이터 - 쌀
const riceProducts = ref([
  {
    id: 4,
    name: '부모님께 완로 알림 보내기 곡 쌀',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
    price: 45000,
    discount: 20,
    rating: 4.8,
    reviews: 3241,
    mallName: '네이버쇼핑'
  },
  {
    id: 5,
    name: '경기미 추청 쌀 10kg',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&h=200&fit=crop',
    price: 38000,
    discount: 15,
    rating: 4.6,
    reviews: 2156,
    mallName: '쿠팡'
  },
  {
    id: 6,
    name: '햅쌀 백미 20kg',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop',
    price: 72000,
    discount: 25,
    rating: 4.7,
    reviews: 4582,
    mallName: 'G마켓'
  },
  {
    id: 7,
    name: '유기농 현미 5kg',
    image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?w=200&h=200&fit=crop',
    price: 28000,
    discount: 10,
    rating: 4.9,
    reviews: 1893,
    mallName: '11번가'
  }
])

// 상세 페이지로 이동
const goToDetail = (product) => {
  console.log('상품 상세:', product)
  // router.push(`/product/${product.id}`)
}

// 완료 알림 보내기
const sendNotification = () => {
  console.log('부모님께 완료 알림 전송')
  router.push('/guardian/complete')
}
</script>