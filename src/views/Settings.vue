<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="설정" description="계정 연동 및 기기 관리" type="setting"/>

    <div class="p-4 max-w-md mx-auto">

      <!-- 연결 상태 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-500">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
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

      <!-- 연락자 설정 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <h3 class="font-bold text-gray-900 mb-4">연락자 설정</h3>

        <label class="text-sm text-gray-600 mb-2 block">자녀 전화번호</label>
        <input
            type="tel"
            v-model="phone"
            @input="formatPhone"
            placeholder="010-1234-5678"
            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
        />

        <button
            v-if="isPhoneValid"
            @click="savePhone"
            class="mt-3 w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600"
        >
          저장하기
        </button>
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

      <button @click="handleDisconnect" class="w-full bg-blue-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-blue-600">
        연동 해제 및 로그아웃
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

const router = useRouter()
const authStore = useAuthStore()

/* 전화번호 */
const phone = ref('')

const formatPhone = () => {
  let digits = phone.value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) phone.value = digits
  else if (digits.length <= 7) phone.value = `${digits.slice(0,3)}-${digits.slice(3)}`
  else phone.value = `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7)}`
}

const isPhoneValid = computed(() =>
    /^010-\d{4}-\d{4}$/.test(phone.value)
)

const savePhone = () => {
  localStorage.setItem('contactPhone', phone.value)
  alert('저장되었습니다')
}

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
  // else setFontSize(18)
})

/* 버튼 스타일 */
const activeBtn = 'flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium'
const normalBtn = 'flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200'

/* 로그아웃 */
const handleDisconnect = () => {
  if (confirm('정말 연동을 해제하시겠습니까?')) {
    authStore.clear()
    router.push('/')
  }
}
</script>
