<template>
  <div class="text-center">
    <div class="mb-8">
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full flex items-center justify-center">
        <div class="w-16 h-16 bg-white rounded-full"></div>
      </div>
      <h2 class="text-2xl font-medium text-gray-900 mb-2">{{ title }}</h2>
      <p class="text-gray-600 text-sm">{{ description }}</p>
    </div>

    <div class="p-8 bg-white rounded-xl border-2 border-gray-200">
      <!-- 보호자 모드: 읽기 전용, 파란색 표시 -->
      <div v-if="type === 'guardian'" class="flex justify-center gap-3 mb-4">
        <div
            v-for="(digit, index) in displayCode"
            :key="index"
            class="w-16 h-20 flex items-center justify-center text-6xl font-bold text-blue-500"
        >
          {{ digit }}
        </div>
      </div>

      <!-- 부모님 모드: 입력 가능, 0000 표시 후 입력 -->
      <div v-else class="flex justify-center gap-3 mb-4" style="border-bottom: 3.541px solid #155DFC;">
        <input
            v-for="(value, index) in values"
            :key="index"
            v-model="values[index]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            :ref="el => inputRefs[index] = el"
            :class="[
            'w-16 h-20 text-center text-6xl font-bold border-none outline-none bg-transparent transition-colors',
            values[index] ? 'text-blue-500' : 'text-gray-200'
          ]"
            :placeholder="'0'"
        />
      </div>

      <!-- 부모님일 때만 안내 메시지 표시 -->
      <p v-if="type === 'parent'" class="text-sm text-gray-500 mt-4">
        숫자 4자리를 입력하면 자동 연결됩니다
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  length: {
    type: Number,
    default: 4
  },
  type: {
    type: String,
    default: 'guardian' // 'guardian' | 'parent'
  },
  code: {
    type: String,
    default: '0000' // 보호자용 표시할 코드
  }
})

const emit = defineEmits(['complete'])

const values = ref(Array(props.length).fill(''))
const inputRefs = ref([])

const title = computed(() =>
    props.type === 'guardian' ? '보호자와 연동해요' : '부모님과 연동해요'
)

const description = computed(() =>
    props.type === 'guardian'
        ? '보호자 휴대폰 화면에 아래 숫자 4자리를 입력해주세요'
        : '부모님 휴대폰 화면에 아래 숫자 4자리를 입력해주세요'
)

// 보호자 모드용 표시 코드
const displayCode = computed(() => {
  return props.code.split('').slice(0, props.length)
})

// 부모님 모드 입력 처리
const handleInput = (index, event) => {
  const value = event.target.value

  // 숫자만 허용
  if (!/^\d*$/.test(value)) {
    values.value[index] = ''
    return
  }

  values.value[index] = value

  // 다음 입력칸으로 자동 이동
  if (value && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus()
  }

  // 모두 입력되면 완료 이벤트
  if (values.value.every(v => v)) {
    emit('complete', values.value.join(''))
  }
}

// 백스페이스 처리
const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !values.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}
</script>