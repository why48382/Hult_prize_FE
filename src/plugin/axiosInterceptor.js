import axios from 'axios'
import {useAuthStore} from '@/stores/auth'

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
            const auth = useAuthStore()
            auth.clear()
            localStorage.removeItem('isLoggedIn')
            alert('로그인 시간이 만료되었습니다.');
            window.location.href = '/login'
        }
        return Promise.reject(error)
    },
)

export default api