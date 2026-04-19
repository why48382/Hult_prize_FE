<script setup>
import PageHeader from "@/components/common/PageHeader.vue";
import VerificationInput from "@/components/VerificationInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import {useAuthStore} from "@/stores/auth";
import pairingApi from "@/api/pairing/index.js";
import memberApi from "@/api/member/index.js";

import {ref, computed, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const type = computed(() => route.params.type); // guardian | parent
const issuedCode = ref(null);
const inputCode = ref("");
const loading = ref(false);
const errorMsg = ref("");

const fetchCode = async () => {
  try {
    loading.value = true;
    issuedCode.value = await pairingApi.codeIssue();
  } catch (e) {
    console.error("코드 발급 실패", e);
    errorMsg.value = "코드 발급에 실패했습니다. 다시 시도해주세요.";
  } finally {
    loading.value = false;
  }
};

const handleVerification = (value) => {
  inputCode.value = value;
};

const handleClick = async () => {
  errorMsg.value = "";

  if (type.value === "guardian") {
    if (!inputCode.value || inputCode.value.length < 4) {
      errorMsg.value = "4자리 인증번호를 입력해주세요";
      return;
    }
    try {
      loading.value = true;
      await pairingApi.codeVerify(inputCode.value);
      router.push("/pairing/loading");
    } catch (e) {
      console.error("코드 검증 실패", e);
      errorMsg.value = "인증번호가 일치하지 않거나 만료되었습니다";
    } finally {
      loading.value = false;
    }
  } else {
    router.push("/pairing/loading");
  }
};

onMounted(async () => {
  if (type.value === "guardian") {
    auth.setRole("guardian");
    try {
      await memberApi.setRole("CAREGIVER");
    } catch (e) {
      console.error("역할 설정 실패", e);
    }
  } else {
    auth.setRole("parent");
    try {
      await memberApi.setRole("ELDER");
    } catch (e) {
      console.error("역할 설정 실패", e);
    }
    await fetchCode();
  }
});
</script>

<template>
  <PageHeader title="연동" :showBack="true"/>

  <form @submit.prevent="handleClick">
    <div class="p-4 space-y-8 max-w-md mx-auto">

      <!-- 부모님: 발급된 코드 표시 -->
      <div v-if="type === 'parent'" class="text-center space-y-4">
        <p class="text-gray-600">자녀에게 아래 코드를 알려주세요</p>
        <div v-if="loading" class="text-gray-400 text-lg">코드 발급 중...</div>
        <div v-else-if="issuedCode" class="text-5xl font-bold tracking-widest text-orange-500 py-6">
          {{ issuedCode }}
        </div>
        <div v-else-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</div>
        <p class="text-xs text-gray-400">코드는 10분간 유효합니다</p>
      </div>

      <!-- 보호자: 코드 입력 -->
      <div v-else>
        <VerificationInput :type="type" :code="null" @complete="handleVerification"/>
        <p v-if="errorMsg" class="text-red-500 text-sm mt-2 text-center">{{ errorMsg }}</p>
      </div>

    </div>

    <div class="mt-16 p-4 max-w-md mx-auto">
      <BaseButton
          variant="primary"
          type="submit"
          :disabled="loading || (type === 'guardian' && inputCode.length < 4)"
      >
        <span v-if="loading">처리 중...</span>
        <span v-else>{{ type === "guardian" ? "연결하기" : "다음으로" }}</span>
      </BaseButton>
    </div>
  </form>
</template>

<style></style>