<template>
  <div class="min-h-screen bg-gray-50 p-4 max-w-md mx-auto">
    <div class="space-y-8">
      <section>
        <h2 class="text-xl font-bold mb-4">RequestCard</h2>
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
            time="10분 전"
            distance="45초"
            status="approved"
            location="오메가3"
            :is-purchased="true"
            @view-details="handleViewDetails"
        />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">SafetyOption</h2>
        <div class="space-y-3">
          <SafetyOption
              title="보호자입니다"
              description="부모님 쇼핑을 확인하고 결제해요"
              :selected="selectedSafety === 'guardian'"
              @click="selectedSafety = 'guardian'"
          >
            <template #icon>
              <div class="w-6 h-6 bg-blue-300 rounded"></div>
            </template>
          </SafetyOption>
          <SafetyOption
              title="부모님입니다"
              description="자녀에게 필요한 걸 말해요"
              :selected="selectedSafety === 'parent'"
              @click="selectedSafety = 'parent'"
          >
            <template #icon>
              <div class="w-6 h-6 bg-green-300 rounded"></div>
            </template>
          </SafetyOption>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">VerificationInput</h2>
        <VerificationInput type="guardian" @complete="handleVerification" />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">VoiceButton</h2>
        <VoiceButton
            :is-listening="isListening"
            :recognized-text="recognizedText"
            @click="toggleListening"
        />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">ProductCard</h2>
        <ProductCard
            name="가는 들불 프리미엄 오메가 3"
            :rating="4.5"
            :reviews="5569"
            :price="24000"
            :discount="38"
            @click="handleProductClick"
        />
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">QuestionOption</h2>
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

      <section>
        <h2 class="text-xl font-bold mb-4">BaseButton</h2>
        <div class="space-y-3">
          <BaseButton variant="primary">다음으로</BaseButton>
          <BaseButton variant="secondary">취소</BaseButton>
          <BaseButton variant="success">완료</BaseButton>
          <BaseButton variant="danger">삭제</BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestCard from '@/components/RequestCard.vue'
import SafetyOption from '@/components/SafetyOption.vue'
import VerificationInput from '@/components/VerificationInput.vue'
import VoiceButton from '@/components/VoiceButton.vue'
import ProductCard from '@/components/ProductCard.vue'
import QuestionOption from '@/components/QuestionOption.vue'
import BaseButton from '@/components/BaseButton.vue'

const selectedSafety = ref('guardian')
const isListening = ref(false)
const recognizedText = ref('')
const selectedQuestion = ref(null)

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
</script>