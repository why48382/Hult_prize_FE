<template>
  <button
      @click="handleClick"
      :disabled="disabled"
      :class="[
      fullWidth ? 'w-full' : '',
      'py-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm',
      variants[variant]
    ]"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  fullWidth: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  success: 'bg-green-500 text-white hover:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-600'
}

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>