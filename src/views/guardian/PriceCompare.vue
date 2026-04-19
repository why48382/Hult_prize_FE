<template>
  <div class="min-h-screen bg-gray-50 pb-32">
    <PageHeader title="상품 가격 비교" :show-back="true" description="시중 통해 베스트 상품을 모아봤어요" />

    <!-- 로딩 -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500">추천 상품 불러오는 중...</p>
    </div>

    <template v-else>
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
        <div v-if="sortedProducts.length === 0" class="text-center text-gray-400 py-20">
          추천 상품이 없습니다.
        </div>
        <div v-else class="space-y-3">
          <ProductCompareCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
              @click="goToDetail(product)"
          />
        </div>
      </div>
    </template>

    <!-- 플로팅 버튼 -->
    <div class="fixed bottom-20 left-0 right-0 px-4 max-w-md mx-auto">
      <button
          @click="sendNotification"
          class="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 transition-colors"
      >
        부모님께 완료 알림 보내기
      </button>
    </div>

    <BottomNav/>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import ProductCompareCard from '@/components/ProductCompareCard.vue'
import voiceApi from '@/api/voice/index.js'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(true)
const products = ref([])
const filters = [
  { label: '최신순', value: 'latest' },
  { label: '가격 낮은순', value: 'price_asc' },
  { label: '가격 높은순', value: 'price_desc' },
  { label: '평점순', value: 'rating' }
]
const selectedFilter = ref('latest')

const sortedProducts = computed(() => {
  const list = [...products.value]
  if (selectedFilter.value === 'price_asc') return list.sort((a, b) => a.price - b.price)
  if (selectedFilter.value === 'price_desc') return list.sort((a, b) => b.price - a.price)
  if (selectedFilter.value === 'rating') return list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  return list // latest = rank 순서 유지
})

const mapRecommendations = (res) => {
  if (!res || !res.recommendations) return []
  return res.recommendations.map((r, i) => ({
    id: i + 1,
    name: r.productTitle,
    image: r.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
    price: r.price,
    discount: 0,
    rating: null,
    reviews: null,
    mallName: r.mall,
    productUrl: r.productUrl,
    reason: r.reason,
  }))
}

onMounted(() => {
  const result = auth._recommendResult
  if (result) {
    products.value = mapRecommendations(result)
  }
  loading.value = false
})

const goToDetail = (product) => {
  if (product.productUrl) window.open(product.productUrl, '_blank')
}

const sendNotification = async () => {
  const voiceId = auth.currentVoiceId
  if (voiceId) {
    try {
      await voiceApi.updateStatus(voiceId, 'COMPLETED')
    } catch (e) {
      console.error('상태 업데이트 실패', e)
    }
  }
  router.push('/guardian/complete')
}
</script>