import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

import Login from '@/views/member/Login.vue'
import Terms from '@/views/member/Terms.vue'
import Select from '@/views/common/Select.vue'
import Demo from '@/views/common/Demo.vue'
import Pairing from '@/views/pairing/Pairing.vue'
import Loading from '@/views/pairing/PairingLoadingView.vue'
import GuardianHome from '@/views/voice/GuardianHome.vue'
import ParentHome from '@/views/voice/ParentHome.vue'
import RequestComplete from '@/views/voice/RequestComplete.vue'
import RequestLoading from '@/views/voice/RequestLoading.vue'
import RequestItems from '@/views/voice/RequestItems.vue'
import Settings from '@/views/common/Settings.vue'
import OrderComplete from '@/views/voice/OrderComplete.vue'
import Question from '@/views/shopping/Question.vue'
import QuestionLoading from '@/views/shopping/QuestionLoading.vue'
import PriceCompare from '@/views/shopping/PriceCompare.vue'

// 로그인 없이 접근 가능한 경로
const PUBLIC_PATHS = ['/login', '/terms', '/oauth2/success']

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // ── 인증 불필요 ──────────────────────────────
        {path: '/login', component: Login},
        {path: '/terms', component: Terms},

        {
            path: '/oauth2/success',
            beforeEnter: (to, from, next) => {
                localStorage.setItem('isLoggedIn', 'true')
                const agreed = localStorage.getItem('termsAgreed')
                if (!agreed) next('/terms')
                else next('/')
            },
            component: Login
        },

        // ── 인증 필요 ──────────────────────────────
        {path: '/', component: Select},
        {path: '/test', component: Demo},
        {path: '/pairing/:type', component: Pairing},
        {path: '/pairing/loading', component: Loading},
        {path: '/home/guardian', component: GuardianHome},
        {path: '/home/parent', component: ParentHome},
        {path: '/parent/loading', component: RequestLoading},
        {path: '/parent/complete', component: RequestComplete},
        {
            path: '/home',
            redirect: () => {
                const auth = useAuthStore()
                if (!auth.role) return '/'
                return auth.role === 'guardian' ? '/home/guardian' : '/home/parent'
            }
        },
        {path: '/requests', component: RequestItems},
        {path: '/settings', component: Settings},
        {path: '/guardian/complete', component: OrderComplete},
        {path: '/shop/questions', component: Question},
        {path: '/shop/loading', component: QuestionLoading},
        {path: '/shop/price-compare', component: PriceCompare},
    ],
})

router.beforeEach((to, from, next) => {
    if (PUBLIC_PATHS.includes(to.path)) {
        next()
        return
    }
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) next('/login')
    else next()
})

export default router