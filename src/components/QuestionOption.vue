<template>
  <button
      @click="handleClick"
      :class="[
      'w-full p-5 rounded-2xl border-2 transition-all text-left',
      selected
        ? 'border-orange-500 bg-orange-50'
        : 'border-gray-200 bg-white hover:border-gray-300'
    ]"
  >
    <div class="flex items-center justify-between">
      <span class="text-gray-900 font-medium">
        <slot></slot>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>