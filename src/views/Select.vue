<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6">
    <!-- 이미지 영역 -->
    <div class="w-full max-w-52 sm:max-w-60 md:max-w-72 mb-5">
      <img src="@/images/select_page.png" alt="부모님과 쇼핑" class="w-full h-auto" />
    </div>

    <!-- 텍스트 영역 -->
    <div class="text-center mb-8 sm:mb-10">
      <p class="text-sm sm:text-base leading-relaxed text-gray-900">
        부모님은 목소리로 쉽게 주문하고<br />
        자녀는 최저가를 찾아 결제해요!
      </p>
    </div>

    <!-- 선택 옵션 -->
    <div class="w-full max-w-md space-y-3 sm:space-y-4 mb-6 sm:mb-8 mb-14">
      <SafetyOption
          title="보호자입니다"
          description="부모님 쇼핑을 확인하고 결제해요"
          :selected="selectedRole === 'guardian'"
          @click="selectedRole = 'guardian'"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </template>
      </SafetyOption>

      <SafetyOption
          title="부모님입니다"
          description="자녀에게 필요한 걸 말해요"
          :selected="selectedRole === 'parent'"
          @click="selectedRole = 'parent'"
      >
        <template #icon>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </template>
      </SafetyOption>
    </div>

    <!-- 다음 버튼 -->
    <div class="w-full max-w-md mb-4">
      <BaseButton variant="primary" :disabled="!selectedRole" @click="handleNext">
        다음으로
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SafetyOption from '@/components/SafetyOption.vue'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()
const selectedRole = ref(null)

const handleNext = () => {
  if (selectedRole.value === 'guardian') {
    router.push('/guardian')
  }
  if (selectedRole.value === 'parent') {
    router.push('/parent')
  }
}
</script>
