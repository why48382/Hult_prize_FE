<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <div class="max-w-md mx-auto px-4 h-14 flex items-center">
      <div class="w-6 h-6 flex items-center justify-center mr-[10px]">
        <button v-if="showBack" @click="handleBack" class="text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <svg v-else-if="type==='voice'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-500">
          <path d="M12 1v22"/>
          <path d="M8 5v14"/>
          <path d="M16 5v14"/>
        </svg>

        <svg v-else-if="type==='history'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-500">
          <path d="M6 2h12l3 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9l3-7z"/>
          <path d="M3 9h18"/>
        </svg>
      </div>

      <h1 class="text-lg font-bold text-gray-900">{{ title }}</h1>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title:{type:String,required:true},
  type:{type:String,default:null}, // 'voice' | 'history'
  showBack:{type:Boolean,default:false}
})

const router=useRouter()
const handleBack=()=>{router.back()}
</script>
