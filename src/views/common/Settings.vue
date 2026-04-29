<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="설정" description="계정 연동 및 기기 관리" type="setting"/>

    <div class="p-4 max-w-md mx-auto">

      <!-- 연결 상태 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" class="text-orange-500">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">연결 상태</h3>
              <p class="text-sm text-gray-600">삼성 Galaxy S23 Ultra</p>
            </div>
          </div>
          <span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">연결됨</span>
        </div>
      </div>

      <!-- 화면 설정 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 class="font-bold text-gray-900 mb-4">화면 설정</h3>
        <label class="text-sm text-gray-600 mb-3 block">글자 크기</label>
        <div class="flex gap-2">
          <button @click="setFontSize(16)" :class="fontSize===16?activeBtn:normalBtn">작게</button>
          <button @click="setFontSize(18)" :class="fontSize===18?activeBtn:normalBtn">보통</button>
          <button @click="setFontSize(20)" :class="fontSize===20?activeBtn:normalBtn">크게</button>
        </div>
      </div>

      <button @click="handleUnpair"
              class="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-red-600 mb-3">
        페어링 해제
      </button>
      <button @click="handleLogout"
              class="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-orange-600">
        로그아웃
      </button>
    </div>

    <BottomNav/>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth.js'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import pairingApi from '@/api/pairing/index.js'
import memberApi from '@/api/member/index.js'

const router = useRouter()
const authStore = useAuthStore()

/* 글자 크기 */
const fontSize = ref(18)

const setFontSize = (size) => {
  fontSize.value = size
  document.documentElement.style.fontSize = `${size}px`
  localStorage.setItem('fontSize', size)
}

onMounted(() => {
  const saved = localStorage.getItem('fontSize')
  if (saved) setFontSize(Number(saved))
})

/* 버튼 스타일 */
const activeBtn = 'flex-1 py-3 bg-orange-500 text-white rounded-xl font-medium'
const normalBtn = 'flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200'

/* 페어링 해제 */
const handleUnpair = async () => {
  if (confirm('정말 페어링을 해제하시겠습니까?')) {
    await pairingApi.unpair()
    authStore.clear()
    router.push('/')
  }
}

/* 로그아웃 */
const handleLogout = async () => {
  if (confirm('정말 로그아웃하시겠습니까?')) {
    await memberApi.logout()
    authStore.clear()
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }
}
</script>