// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        role: null // 'guardian' | 'parent'
    }),
    actions: {
        setRole(role) {
            this.role = role
        },
        clear() {
            this.role = null
        }
    }
})
