<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

const handleNext = () => {
  router.push('/home/parent')
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6">
    <!-- 이미지 영역 -->
    <div class="w-full max-w-52 sm:max-w-60 md:max-w-72 mb-3">
      <img src="@/images/request_success.png" alt="부모님과 쇼핑" class="w-full h-auto" />
    </div>

    <!-- 텍스트 영역 -->
    <div class="text-center mb-8 sm:mb-10">
      <h1 class="text-3xl mb-2">요청을 완료했어요!</h1>
      <p class="text-lg sm:text-base leading-relaxed text-gray-900">
        자녀분께 알림을 보냈습니다
      </p>
    </div>

    <!-- 다음 버튼 -->
    <div class="w-full max-w-md mb-2">
      <BaseButton variant="primary" @click="handleNext">
        홈으로 돌아가기
      </BaseButton>
    </div>
  </div>
</template>