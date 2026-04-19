<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- 헤더 -->
    <div class="flex items-center px-4 py-4 border-b border-gray-100">
      <button @click="router.back()" class="p-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
    </div>

    <!-- 타이틀 -->
    <div class="px-6 pt-6 pb-4">
      <p class="text-orange-500 font-semibold text-sm mb-1">온숨계정</p>
      <h1 class="text-2xl font-bold text-gray-900">서비스 약관에 동의해주세요.</h1>
    </div>

    <!-- 약관 목록 -->
    <div class="flex-1 px-6">

      <!-- 모두 동의 -->
      <div class="py-4 border-b border-gray-200">
        <button @click="toggleAll" class="flex items-center gap-3 w-full">
          <div :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            allChecked ? 'border-orange-500 bg-white' : 'border-gray-300 bg-white']">
            <svg v-if="allChecked" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <span class="font-bold text-gray-900 text-base">모두 동의합니다</span>
        </button>
      </div>

      <!-- 필수 항목들 -->
      <div class="py-3 border-b border-gray-100">
        <div v-for="item in requiredTerms" :key="item.key" class="flex items-center justify-between py-3">
          <button @click="toggle(item.key)" class="flex items-center gap-3 flex-1">
            <div :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
              checked[item.key] ? 'border-orange-500' : 'border-gray-300']">
              <svg v-if="checked[item.key]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span class="text-gray-800 text-sm">{{ item.label }}</span>
          </button>
          <button class="p-1 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 선택 항목들 -->
      <div class="py-3">
        <div v-for="item in optionalTerms" :key="item.key" class="flex items-center justify-between py-3">
          <button @click="toggle(item.key)" class="flex items-center gap-3 flex-1">
            <div :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
              checked[item.key] ? 'border-orange-500' : 'border-gray-300']">
              <svg v-if="checked[item.key]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span class="text-gray-800 text-sm">{{ item.label }}</span>
          </button>
          <button class="p-1 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <!-- 동의 버튼 -->
    <div class="px-6 pb-10 pt-4">
      <button
          @click="handleAgree"
          :disabled="!requiredAllChecked"
          :class="['w-full py-4 rounded-2xl font-bold text-white text-base transition-colors',
            requiredAllChecked ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed']"
      >
        동의
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const requiredTerms = [
  { key: 'service', label: '[필수] 온숨 서비스 이용약관' },
  { key: 'voice', label: '[필수] 음성 정보 수집/이용 동의' },
  { key: 'privacy', label: '[필수] 개인정보 수집/이용 동의' },
]

const optionalTerms = [
  { key: 'marketing', label: '[선택] 마케팅 정보 수신 동의' },
  { key: 'notification', label: '[선택] 알림 정보 수신 동의' },
]

const checked = ref({
  service: false,
  voice: false,
  privacy: false,
  marketing: false,
  notification: false,
})

const allChecked = computed(() => Object.values(checked.value).every(Boolean))
const requiredAllChecked = computed(() => requiredTerms.every(t => checked.value[t.key]))

const toggle = (key) => {
  checked.value[key] = !checked.value[key]
}

const toggleAll = () => {
  const next = !allChecked.value
  Object.keys(checked.value).forEach(k => { checked.value[k] = next })
}

const handleAgree = () => {
  if (!requiredAllChecked.value) return
  // 약관 동의 완료 → 역할 선택 화면으로
  localStorage.setItem('termsAgreed', 'true')
  router.push('/')
}
</script>
