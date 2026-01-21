<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <PageHeader title="AI 주문 도우미" type="back"/>

    <!-- 진행 바 -->
    <div class="px-4 mt-2">
      <div class="w-full h-2 bg-gray-200 rounded-full">
        <div
            class="h-2 bg-blue-500 rounded-full transition-all"
            :style="{ width: progress + '%' }"
        />
      </div>
    </div>

    <div class="p-4 max-w-md mx-auto">

      <!-- 인식된 내용 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-green-500 text-lg">✔</span>
          <h3 class="font-bold text-gray-900">인식된 내용</h3>
        </div>
        <p class="text-gray-700">
          “ 영양제가 다 떨어졌어 관절약 좀 사다줘 ”
        </p>
      </div>

      <!-- 질문 영역 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
        <p class="text-sm text-gray-500 mb-1">질문 {{ step }}/3</p>
        <h3 class="font-bold text-gray-900 mb-4">
          {{ currentQuestion.title }}
        </h3>

        <div class="space-y-3">
          <QuestionOption
              v-for="option in currentQuestion.options"
              :key="option.value"
              :selected="currentAnswer === option.value"
              @click="selectOption(option.value)"
          >
            {{ option.label }}
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/common/PageHeader.vue'
import QuestionOption from '@/components/QuestionOption.vue'

const router = useRouter()

/* 단계 */
const step = ref(1)

/* 선택값 */
const answers = ref({
  type: null,
  quantity: null,
  deadline: null
})

/* 질문 정의 */
const questions = [
  {
    key: 'type',
    title: '어떤 종류의 영양제를 찾으시나요?',
    options: [
      { label: '기존에 드시던 약', value: '기존에 드시던 약' },
      { label: '새로운 처방약', value: '새로운 처방약' },
      { label: '일반의약품', value: '일반의약품' }
    ]
  },
  {
    key: 'quantity',
    title: '몇 통을 생각하시나요?',
    options: [
      { label: '1통', value: '1통' },
      { label: '2통', value: '2통' },
      { label: '3통 이상', value: '3통 이상' }
    ]
  },
  {
    key: 'deadline',
    title: '언제까지 필요하신가요?',
    options: [
      { label: '오늘 당장', value: '오늘 당장' },
      { label: '내일까지', value: '내일까지' },
      { label: '이번 주 안에', value: '이번 주 안에' }
    ]
  }
]

/* 현재 질문 */
const currentQuestion = computed(() => questions[step.value - 1])

/* 현재 선택값 */
const currentAnswer = computed(() => answers.value[currentQuestion.value.key])

/* 선택 처리 */
const selectOption = (value) => {
  answers.value[currentQuestion.value.key] = value

  if (step.value < 3) {
    step.value += 1
  } else {
    // 마지막 단계 → 가격 비교 페이지 이동
    router.push({
      path: '/price-compare',
      query: { ...answers.value }
    })
  }
}

/* 진행 바 */
const progress = computed(() => (step.value / 3) * 100)

/* 선택 요약 */
const selectedSummary = computed(() =>
    Object.values(answers.value).filter(Boolean)
)
</script>
