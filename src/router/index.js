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

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
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
    ],
})

export default router
