<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <div class="max-w-md mx-auto px-4 h-14 flex items-center">
      <div class="w-6 h-6 flex items-center justify-center mr-[10px]">
        <button v-if="showBack" @click="handleBack" class="text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <component v-else-if="iconComponent" :is="iconComponent" class="w-5 h-5 text-blue-500"/>
      </div>

      <h1 class="text-lg font-bold text-gray-900">{{ title }}</h1>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {computed} from "vue";
import VoiceIcon from "@/components/icon/VoiceIcon.vue";
import BoxIcon from "@/components/icon/BoxIcon.vue";

const props=defineProps({
  title:{type:String,required:true},
  type:{type:String,default:null}, // 'voice' | 'history'
  showBack:{type:Boolean,default:false}
})

const router=useRouter()
const handleBack=()=>{router.back()}

const iconComponent=computed(()=>{
  if(props.showBack) return null
  if(props.type==='voice') return VoiceIcon
  if(props.type==='box') return BoxIcon
  return null
})
</script>
