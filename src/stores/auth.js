// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        role: localStorage.getItem('role') || null, // 'guardian' | 'parent'
        currentVoiceId: null,      // 현재 처리 중인 voice ID (보호자용)
        currentVoiceItemId: null,  // 현재 처리 중인 voiceItem ID (쇼핑 질문용)
        recognizedText: '',        // 부모님이 말한 텍스트 (뷰 간 공유용)
    }),
    actions: {
        setRole(role) {
            this.role = role
            localStorage.setItem('role', role)
        },
        setCurrentVoice(voiceId, voiceItemId) {
            this.currentVoiceId = voiceId
            this.currentVoiceItemId = voiceItemId
        },
        setRecognizedText(text) {
            this.recognizedText = text
        },
        clear() {
            this.role = null
            this.currentVoiceId = null
            this.currentVoiceItemId = null
            this.recognizedText = ''
            localStorage.removeItem('role')
        }
    }
})