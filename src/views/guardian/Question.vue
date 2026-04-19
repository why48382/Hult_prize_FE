<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="AI 주문 도우미" type="back"/>

    <!-- 로딩 -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32">
      <div class="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500">질문을 불러오는 중...</p>
    </div>

    <template v-else-if="questions.length > 0">
      <!-- 진행 바 -->
      <div class="px-4 mt-2">
        <div class="w-full h-2 bg-gray-200 rounded-full">
          <div class="h-2 bg-orange-500 rounded-full transition-all" :style="{ width: progress + '%' }" />
        </div>
      </div>

      <div class="p-4 max-w-md mx-auto">

        <!-- 인식된 내용 -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-green-500 text-lg">✔</span>
            <h3 class="font-bold text-gray-900">인식된 내용</h3>
          </div>
          <p class="text-gray-700">" {{ originalText }} "</p>
        </div>

        <!-- 질문 영역 -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <p class="text-sm text-gray-500 mb-1">질문 {{ step }}/{{ questions.length }}</p>
          <h3 class="font-bold text-gray-900 mb-4">{{ currentQuestion.question }}</h3>

          <div class="space-y-3">
            <QuestionOption
                v-for="option in currentQuestion.options"
                :key="option"
                :selected="currentAnswer === option"
                @click="selectOption(option)"
            >
              {{ option }}
            </QuestionOption>
          </div>
        </div>

        <!-- 선택 내역 -->
        <div v-if="selectedSummary.length" class="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700">
          <p class="font-medium mb-1">선택 내역</p>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="item in selectedSummary" :key="item">{{ item }}</li>
          </ul>
        </div>

      </div>
    </template>

    <!-- 질문이 없는 경우 바로 이동 -->
    <div v-else class="flex flex-col items-center justify-center py-32">
      <p class="text-gray-500">질문을 불러올 수 없습니다.</p>
      <button @click="router.back()" class="mt-4 text-orange-500 underline">돌아가기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/common/PageHeader.vue'
import QuestionOption from '@/components/QuestionOption.vue'
import shoppingApi from '@/api/shopping/index.js'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(true)
const step = ref(1)
const questions = ref([])   // FollowUpQuestion[]
const items = ref([])       // Item[] - 원본 item 목록
const originalText = ref('')
const answers = ref([])     // CaregiverAnswers[]

const currentQuestion = computed(() => questions.value[step.value - 1] || {})
const currentAnswer = computed(() => {
  const a = answers.value.find(a => a.itemName === currentQuestion.value?.itemName)
  return a?.answer || null
})
const progress = computed(() => (step.value / (questions.value.length || 1)) * 100)
const selectedSummary = computed(() => answers.value.map(a => `${a.itemName}: ${a.answer}`))

const selectOption = (value) => {
  const q = currentQuestion.value
  const idx = answers.value.findIndex(a => a.itemName === q.itemName)
  if (idx >= 0) {
    answers.value[idx].answer = value
  } else {
    answers.value.push({ itemName: q.itemName, answer: value })
  }

  if (step.value < questions.value.length) {
    step.value += 1
  } else {
    // 마지막 → 로딩 화면으로 (answers를 store나 query로 전달)
    router.push({ path: '/shop/loading', query: { done: '1' } })
    // store에 answers 임시 저장
    auth._shoppingAnswers = { voiceItemId: auth.currentVoiceItemId, items: items.value, caregiverAnswers: answers.value }
  }
}

onMounted(async () => {
  const voiceItemId = auth.currentVoiceItemId
  if (!voiceItemId) {
    loading.value = false
    return
  }
  try {
    const res = await shoppingApi.getQuestions(voiceItemId)
    originalText.value = res.originalText || ''
    questions.value = res.followUpQuestions || []
    items.value = res.items || []
  } catch (e) {
    console.error('질문 불러오기 실패', e)
  } finally {
    loading.value = false
  }
})
</script>