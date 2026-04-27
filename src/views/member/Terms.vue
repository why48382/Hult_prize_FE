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
          <button @click="openModal(item)" class="p-1 text-gray-400">
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
          <button @click="openModal(item)" class="p-1 text-gray-400">
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

    <!-- 세부 내용 모달 -->
    <div v-if="modalItem" class="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div class="bg-white w-full rounded-t-2xl max-h-[80vh] flex flex-col">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="font-bold text-gray-900 text-base">{{ modalItem.label }}</h2>
          <button @click="modalItem = null" class="p-1 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="overflow-y-auto px-6 py-4 flex-1">
          <pre class="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{{ modalItem.content }}</pre>
        </div>
        <div class="px-6 pb-8 pt-4">
          <button
              @click="() => { checked[modalItem.key] = true; modalItem = null }"
              class="w-full py-4 rounded-2xl font-bold text-white text-base bg-orange-500 hover:bg-orange-600"
          >
            동의
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'
import memberApi from '@/api/member/index.js'

const router = useRouter()

const requiredTerms = [
  {
    key: 'service', label: '[필수] 온숨 서비스 이용약관',
    content: `온숨 서비스 이용약관
2026. 04. 19. 개정, 2026.04.21 시행

제1조 (목적)
본 약관은 온숨 서비스 운영팀이 제공하는 온숨(Onsoom) 서비스의 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.

제2조 (정의)
① '서비스'란 고령층 이용자의 음성 기반 구매 요청을 보호자에게 전달하고 AI 기반 쇼핑 어시스턴트를 제공하는 온숨 앱 및 관련 서비스 일체를 말합니다.
② '요청자'란 음성으로 구매 요청을 하는 고령층 이용자를 말합니다.
③ '보호자'란 요청자의 구매 요청을 확인하고 결제를 진행하는 이용자를 말합니다.
④ '음성 데이터'란 요청자가 서비스 이용 중 녹음된 음성 파일 및 이를 변환한 텍스트 데이터를 말합니다.

제3조 (음성 데이터 수집 및 처리)
① 서비스는 구매 요청 처리를 위해 요청자의 음성 데이터를 수집합니다.
② 음성 데이터는 아래 목적으로만 사용됩니다.
- 음성 텍스트 변환(STT)을 통한 구매 요청 내용 파악
- AI 쇼핑 어시스턴트의 상품 추천 근거 생성
- 보호자의 요청 내용 확인을 위한 원본 음성 제공
- 구매 요청 이력 관리 및 서비스 품질 개선
③ 음성 녹음 파일(원본)은 STT 처리 후에도 Google Cloud Storage(GCS)에 암호화되어 보관되며, 이용자 탈퇴 시 즉시 삭제됩니다.
④ 변환된 텍스트(구매 요청 내용)는 구매 요청 이력 확인을 위해 데이터베이스에 보관되며, 탈퇴 시 즉시 삭제됩니다.
⑤ 회사는 음성 데이터를 제3자에게 판매하거나 마케팅 목적으로 활용하지 않습니다.
⑥ 이용자는 언제든지 보관 중인 음성 파일 및 텍스트 데이터의 삭제를 요청할 수 있으며, 요청 즉시 삭제처리됩니다.

제4조 (쇼핑 어시스턴트)
① 쇼핑 어시스턴트는 네이버 쇼핑, 쿠팡 등 외부 API를 활용하여 상품을 검색·추천합니다.
② 추천 상품의 가격·재고·배송 정보는 외부 플랫폼에 의존하여 운영자는 정확성을 보증하지 않습니다.
③ 실제 구매·결제는 해당 외부 플랫폼에서 이루어집니다.
④ AI 추천 결과는 참고용이며, 최종 구매 결정에 따른 책임은 보호자에게 있습니다.

제5조 (서비스 이용 제한)
다음 각 호에 해당하는 경우 서비스 이용이 제한될 수 있습니다.
① 타인의 음성을 무단으로 녹음하여 서비스에 업로드하는 행위
② 요청자를 기망하거나 요청자의 의사에 반하는 구매를 진행하는 행위
③ 서비스의 AI 시스템을 악용하여 비정상적인 주문을 반복하는 행위
④ 기타 관련 법령 또는 본 약관을 위반하는 행위

제6조 (책임의 한계)
① 운영자는 천재지변, 통신장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
② 외부 쇼핑 플랫폼의 상품 정보 오류로 인한 피해에 대해 운영자는 책임을 지지 않습니다.
③ Google Cloud Storage 등 외부 인프라 장애로 인한 데이터 손실에 대해 운영자는 책임을 지지 않습니다.

제7조 (약관의 변경)
① 운영자는 약관을 변경할 경우 시행일 7일 전(이용자에게 불리한 변경의 경우 30일 전)에 앱 내 공지합니다.
② 이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.

제8조 (분쟁 해결)
본 약관에 관한 분쟁은 대한민국 법률을 준거법으로 하며, 소송 발생 시 운영자 소재지 관할 법원을 전속 관할법원으로 합니다.
시행일: 2026년 04월 21일 | v2.0 | 온숨(Onsoom)`
  },
  {
    key: 'voice', label: '[필수] 음성 정보 수집/이용 동의',
    content: `음성 데이터 수집·처리 동의
2026. 04. 19. 개정, 2026.04.21 시행

제1조 (수집 목적)
온숨 서비스는 요청자(고령층 사용자)의 구매 요청을 파악하고, 보호자가 요청 내용을 정확히 확인할 수 있도록 음성 데이터를 수집하며, 아래 목적 외에는 사용하지 않습니다.
① 음성 텍스트 변환(STT)을 통한 구매 요청 내용 파악
② AI 쇼핑 어시스턴트의 상품 추천 근거 생성
③ 보호자의 요청 내용 확인을 위한 원본 음성 제공
④ 구매 요청 이력 관리 및 서비스 품질 개선

제2조 (수집 항목 및 보유 기간)
- 음성 녹음 파일(원본) / Google Cloud Storage(미국) / 탈퇴 즉시 삭제
- 변환된 텍스트(구매 요청 내용) / 국내 데이터베이스 / 탈퇴 즉시 삭제

제3조 (국외 이전 안내)
음성 녹음 파일(원본)은 아래와 같이 국외로 이전됩니다.
이전받는 자: Google Cloud Platform
이전 국가: 미국(GCS us 멀티 리전)
이전 목적: 음성 파일 저장 및 관리
보유 기간: 탈퇴 즉시 삭제
이전 방법: 네트워크를 통한 암호화 전송(TLS 1.2 이상)
연락처: https://cloud.google.com/terms/data-processing-terms

제4조 (보호 조치)
① 음성 파일은 전송 중 TLS 1.2 이상 암호화가 적용됩니다.
② Google Cloud Storage 저장 시 AES-256 암호화가 적용됩니다.
③ 음성 파일 및 텍스트 데이터 접근 권한은 최소 인원으로 제한하며, 접근 이력을 기록합니다.
④ 변환된 텍스트는 암호화된 국내 데이터베이스에 안전하게 보관됩니다.

시행일: 2026년 04월 21일 | v4.0 | 온숨(Onsoom)`
  },
  {
    key: 'privacy', label: '[필수] 개인정보 수집/이용 동의',
    content: `개인정보 처리방침
2026. 04. 19. 개정, 2026.04.21 시행

제1조 (수집하는 개인정보)
구분 / 수집 항목 / 수집 목적 / 보유 기간
보호자(필수) / 이메일, 휴대폰번호 / 회원 식별 및 민증 / 탈퇴 후 즉시 삭제
요청자(필수) / 이름(별명), 보호자 관계 / 서비스 연결·처리 / 탈퇴 후 즉시 삭제

제2조 (개인정보 수집 방법)
① 앱 설치 및 이용자가 직접 입력 ② 서비스 이용 과정에서 자동 수집(음성 녹음, 기기 정보 등) ③ 보호자의 요청자 초대 및 등록 절차를 통해 수집

제3조 (개인정보 제3자 제공)
회사는 이용자의 개인정보를 원칙으로 외부에 제공하지 않습니다.

제7조 (이용자의 권리 및 행사 방법)
이용자는 언제든지 다음의 권리를 행사할 수 있습니다.
① 개인정보 열람 요청 ② 개정 또는 삭제 요청 ③ 개인정보 정책 정지 요청

이메일: onsoom.kr@gmail.com
시행일: 2026년 04월 21일 | v1.0 | 온숨(Onsoom)`
  },
]

const optionalTerms = [
  {
    key: 'notification', label: '[선택] 알림 정보 수신 동의',
    content: `알림 정보 수신 동의
2026. 04. 19. 개정, 2026.04.21 시행

제1조 (알림 서비스 목적)
온숨 서비스는 보호자에게 아래와 같은 알림을 발송하기 위해 기기 정보를 수집합니다.
① 요청자(고령층 부모님)의 새로운 구매 요청 도착 알림
② AI 상품 추천 결과 완료 알림
③ 서비스 공지 및 업데이트 안내

제2조 (수집 항목 및 보유 기간)
- FCM 기기 토큰 / 앱 삭제 또는 동의 철회 시 삭제
- OS 종류 및 버전 / 앱 삭제 시 삭제
- 알림 수신 이력 / 1년 보관 후 삭제

제3조 (알림 발송 방식)
① Google Firebase Cloud Messaging(FCM) 서비스를 통해 발송됩니다.
② FCM 기기 토큰은 Google 서버를 경유하며, Google 개인정보처리방침이 적용됩니다.
③ 알림 발송에 따른 별도 비용은 이용자에게 청구되지 않습니다.

제5조 (동의 거부 시 불이익)
알림 수신에 동의하지 않아도 서비스 이용은 가능합니다. 단, 아래 기능이 제한됩니다.
① 요청자의 구매 요청 도착 시 앱 푸시 알림을 받을 수 없습니다.
② AI 상품 추천 완료 시 알림을 받을 수 없어 앱을 직접 열어 확인해야 합니다.

시행일: 2026년 04월 21일 | v1.0 | 온숨(Onsoom)`
  },
]

const checked = ref({
  service: false,
  voice: false,
  privacy: false,
  notification: false,
})

const modalItem = ref(null)

const allChecked = computed(() => Object.values(checked.value).every(Boolean))
const requiredAllChecked = computed(() => requiredTerms.every(t => checked.value[t.key]))

const toggle = (key) => {
  checked.value[key] = !checked.value[key]
}

const toggleAll = () => {
  const next = !allChecked.value
  Object.keys(checked.value).forEach(k => { checked.value[k] = next })
}

const openModal = (item) => {
  modalItem.value = item
}

const handleAgree = async () => {
  if (!requiredAllChecked.value) return
  await memberApi.signup({
    termsAgreed: checked.value.service,
    voiceAgreed: checked.value.voice,
    privacyAgreed: checked.value.privacy,
    notificationAgreed: checked.value.notification,
  })
  localStorage.setItem('isLoggedIn', 'true')
  router.push('/')
}
</script>