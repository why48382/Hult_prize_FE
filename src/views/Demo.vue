<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 페이지 헤더 -->
    <PageHeader
        title="컴포넌트 데모"
        :showBack="true"
    >
      <template #actions>
        <button class="p-2 text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
      </template>
    </PageHeader>

    <!-- 페이지 내용 -->
    <div class="p-4 space-y-8 max-w-md mx-auto">

      <!-- RequestCard Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">RequestCard</h2>
        <RequestCard
            name="부모님"
            time="10분 전"
            distance="45초"
            status="urgent"
            location="오메가3"
            @purchase="handlePurchase"
        />
        <RequestCard
            name="부모님"
            time="1시간 전"
            distance="45초"
            status="approved"
            location="비타민 D"
            :is-purchased="true"
            @view-details="handleViewDetails"
        />
      </section>

      <!-- SafetyOption Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">SafetyOption</h2>
        <div class="space-y-3">
          <SafetyOption
              title="보호자입니다"
              description="부모님 쇼핑을 확인하고 결제해요"
              :selected="selectedSafety === 'guardian'"
              @click="selectedSafety = 'guardian'"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </template>
          </SafetyOption>
          <SafetyOption
              title="부모님입니다"
              description="자녀에게 필요한 걸 말해요"
              :selected="selectedSafety === 'parent'"
              @click="selectedSafety = 'parent'"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </template>
          </SafetyOption>
        </div>
      </section>

      <!-- VerificationInput Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">VerificationInput</h2>
        <VerificationInput
            type="guardian"
            code="5821"
            @complete="handleVerification"
        />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">VerificationInput</h2>
        <VerificationInput
            type="parent"
            @complete="handleVerification"
        />
      </section>

      <!-- VoiceButton Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">VoiceButton</h2>
        <VoiceButton
            :is-listening="isListening"
            :recognized-text="recognizedText"
            @click="toggleListening"
        />
      </section>

      <!-- ProductCard Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">ProductCard</h2>
        <ProductCard
            name="가는 들불 프리미엄 오메가 3"
            :rating="4.5"
            :reviews="5569"
            :price="24000"
            :discount="38"
            @click="handleProductClick"
        />
        <div class="mt-3">
          <ProductCard
              name="트루탄 빠건강 콘드로이친"
              :rating="4.5"
              :reviews="5569"
              :price="27900"
              :discount="38"
              @click="handleProductClick"
          />
        </div>
      </section>

      <!-- QuestionOption Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">QuestionOption</h2>
        <div class="space-y-3">
          <QuestionOption
              :selected="selectedQuestion === '1'"
              @click="selectedQuestion = '1'"
          >
            기존에 드시던 약
          </QuestionOption>
          <QuestionOption
              :selected="selectedQuestion === '2'"
              @click="selectedQuestion = '2'"
          >
            새로운 처방약
          </QuestionOption>
          <QuestionOption
              :selected="selectedQuestion === '3'"
              @click="selectedQuestion = '3'"
          >
            일반의약품
          </QuestionOption>
        </div>
      </section>

      <!-- BaseButton Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">BaseButton</h2>
        <div class="space-y-3">
          <BaseButton variant="primary" @click="handleClick">다음으로</BaseButton>
          <BaseButton variant="secondary" @click="handleClick">취소</BaseButton>
          <BaseButton variant="success" @click="handleClick">완료</BaseButton>
          <BaseButton variant="danger" @click="handleClick">삭제</BaseButton>
        </div>
      </section>

      <!-- StatusBadge Section -->
      <section>
        <h2 class="text-xl font-bold mb-4 text-gray-900">StatusBadge</h2>
        <div class="flex gap-2 flex-wrap">
          <StatusBadge status="pending">알림</StatusBadge>
          <StatusBadge status="approved">허용</StatusBadge>
          <StatusBadge status="urgent">시급</StatusBadge>
          <StatusBadge status="completed">완료</StatusBadge>
        </div>
      </section>

    </div>

    <!-- 하단 네비게이션 -->
    <BottomNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '@/components/common/PageHeader.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import RequestCard from '@/components/RequestCard.vue'
import SafetyOption from '@/components/SafetyOption.vue'
import VerificationInput from '@/components/VerificationInput.vue'
import VoiceButton from '@/components/VoiceButton.vue'
import ProductCard from '@/components/ProductCard.vue'
import QuestionOption from '@/components/QuestionOption.vue'
import BaseButton from '@/components/BaseButton.vue'
import StatusBadge from '@/components/StatusBadge.vue'

// State
const selectedSafety = ref('guardian')
const isListening = ref(false)
const recognizedText = ref('')
const selectedQuestion = ref(null)

// Event Handlers
const handlePurchase = () => {
  console.log('구매 취소')
}

const handleViewDetails = () => {
  console.log('상세 보기')
}

const handleVerification = () => {
  console.log('인증 완료')
}

const toggleListening = () => {
  isListening.value = !isListening.value
  if (isListening.value) {
    recognizedText.value = '마이크 버튼을 눌러 원하시는 품목을 알려주세요!'
  } else {
    recognizedText.value = ''
  }
}

const handleProductClick = () => {
  console.log('상품 클릭')
}

const handleClick = () => {
  console.log('버튼 클릭')
}
</script>