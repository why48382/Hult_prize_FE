<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-between px-6 py-16">

    <!-- 로고 영역 -->
    <div class="flex-1 flex flex-col items-center justify-center">
      <!-- 온숨 아이콘 -->
      <div
          class="w-28 h-28 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-200 mb-6">
        <span class="text-white text-3xl font-bold tracking-tight">온숨</span>
      </div>

      <!-- 글로우 효과 -->
      <div class="w-32 h-4 bg-green-300 rounded-full blur-xl opacity-60 -mt-2 mb-8"></div>

      <p class="text-gray-700 text-base">작은 요청 하나까지</p>
    </div>

    <!-- 카카오 로그인 버튼 -->
    <div class="w-full max-w-sm">
      <button
          @click="kakaoLogin"
          class="w-full flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-bold text-base py-4 rounded-2xl transition-colors shadow-sm"
      >
        <!-- 카카오 말풍선 아이콘 -->
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path
              d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.607 5.082 4.046 6.538L5.09 21l4.573-2.43A11.3 11.3 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
        </svg>
        카카오로 3초만에 시작하기
      </button>
    </div>

  </div>
</template>

<script setup>
const kakaoLogin = () => {
  window.location.href = '/oauth2/authorization/kakao'
}
</script>
