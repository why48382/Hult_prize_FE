import {createRouter, createWebHistory} from 'vue-router'
import Select from "@/views/Select.vue";
import Demo from "@/views/Demo.vue";
import Pairing from "@/views/Pairing.vue";
import Loading from "@/views/PairingLoadingView.vue"
import GuardianHome from "@/views/guardian/GuardianHome.vue";
import ParentHome from "@/views/parent/ParentHome.vue";
import RequestComplete from "@/views/parent/RequestComplete.vue";
import { useAuthStore } from '@/stores/auth'
import RequestLoading from "@/views/parent/RequestLoading.vue";
import RequestItems from "@/views/RequestItems.vue";
import Settings from "@/views/Settings.vue";
import OrderComplete from "@/views/guardian/OrderComplete.vue";
import Question from "@/views/guardian/Question.vue";
import QuestionLoading from "@/views/guardian/QuestionLoading.vue";
import PriceCompare from "@/views/guardian/PriceCompare.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Select
        },
        {
            path: '/oauth2/success',
            beforeEnter: (to, from, next) => {
                // 쿠키에 JWT가 세팅된 상태로 진입 → role이 있으면 홈, 없으면 선택 화면
                const auth = useAuthStore()
                if (auth.role) {
                    next(auth.role === 'guardian' ? '/home/guardian' : '/home/parent')
                } else {
                    next('/')
                }
            },
            component: Select
        },
        {
            path: '/test',
            component: Demo
        },
        {
            path:'/pairing/:type',
            component: Pairing
        },
        {
            path:'/pairing/loading',
            component: Loading
        },
        {
            path: '/home/guardian',
            component: GuardianHome
        },
        {
            path: '/home/parent',
            component: ParentHome
        },
        {
            path: '/parent/loading',
            component: RequestLoading
        },
        {
            path: '/parent/complete',
            component: RequestComplete
        },
        {
            path: '/home',
            redirect: () => {
                const auth = useAuthStore()

                // 백엔드 붙기 전이므로 role 없으면 튕김
                if (!auth.role) return '/'

                return auth.role === 'guardian'
                    ? '/home/guardian'
                    : '/home/parent'
            }
        },
        {
            path: '/home/guardian',
            component: GuardianHome
        },
        {
            path: '/home/parent',
            component: ParentHome
        },
        {
            path: '/requests',
            component: RequestItems
        },
        {
            path: '/settings',
            component: Settings
        },
        {
            path: '/guardian/complete',
            component: OrderComplete
        },
        {
            path: '/shop/questions',
            component: Question
        },
        {
            path: '/shop/loading',
            component: QuestionLoading
        },
        {
            path: '/shop/price-compare',
            component: PriceCompare
        },
    ],
})

export default router
// OAuth2 로그인 성공 후 BE가 리다이렉트하는 경로
// JWT는 HttpOnly 쿠키로 자동 저장됨 → 역할 선택 화면으로 이동