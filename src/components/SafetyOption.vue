<template>
  <button
      @click="handleClick"
      :class="[
      'w-full p-5 rounded-2xl border-2 transition-all text-left',
      selected
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 bg-white hover:border-gray-300'
    ]"
  >
    <div class="flex items-start gap-4">
      <div :class="['p-3 rounded-xl', selected ? 'bg-blue-500' : 'bg-gray-100']">
        <slot name="icon"></slot>
      </div>
      <div class="flex-1">
        <h3 class="font-bold text-gray-900 mb-1">{{ title }}</h3>
        <p class="text-sm text-gray-600">{{ description }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
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