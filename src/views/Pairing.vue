<script setup>
import PageHeader from "@/components/common/PageHeader.vue";
import VerificationInput from "@/components/VerificationInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";

import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const type = computed(() => route.params.type); // guardian | parent
const code = computed(() => (type.value === "guardian" ? "5816" : null));

const inputCode = ref("");

// 부모 입력 완료 시 값 저장
const handleVerification = (value) => {
  inputCode.value = value;
};

// 버튼 클릭 처리
const handleClick = () => {
  // 보호자: 바로 다음 단계
  if (type.value === "guardian") {
    router.push("/pairing/loading");
    return;
  }

  // 부모: 코드 검증
  if (inputCode.value === "5816") {
    router.push("/pairing/loading");
  } else {
    alert("인증번호가 일치하지 않습니다");
  }
};

// role 저장 (백엔드 붙기 전 임시)
onMounted(() => {
  if (type.value === "guardian") {
    auth.setRole("guardian");
  } else {
    auth.setRole("parent");
  }
});
</script>

<template>
  <PageHeader title="연동" :showBack="true" />

  <div class="p-4 space-y-8 max-w-md mx-auto">
    <VerificationInput
        :type="type"
        :code="code"
        @complete="handleVerification"
    />
  </div>

  <div class="mt-16 p-4 max-w-md mx-auto">
    <BaseButton variant="primary" @click="handleClick">
      {{ type === "guardian" ? "다음으로" : "연결하기" }}
    </BaseButton>
  </div>
</template>

<style></style>
