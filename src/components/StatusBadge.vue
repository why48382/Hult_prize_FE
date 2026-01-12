<template>
  <span :class="['px-3 py-1 rounded-md text-sm font-medium', statusStyles[status] || statusStyles.pending]">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'pending'
  }
})

const statusStyles = {
  pending: 'bg-gray-200 text-gray-700',
  approved: 'bg-green-500 text-white',
  urgent: 'bg-orange-500 text-white',
  completed: 'bg-blue-500 text-white'
}
</script>