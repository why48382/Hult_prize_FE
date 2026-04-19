import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: '',
    timeout: 15000,
})

api.interceptors.request.use(
    (config) => {
        console.log("요청 URL:", config.baseURL + config.url)
        return config
    },
    (error) => Promise.reject(error),
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 인증 만료 → 로그인(역할 선택) 화면으로
            const auth = useAuthStore()
            auth.clear()
            window.location.href = '/'
        }
        return Promise.reject(error)
    },
)

export default api