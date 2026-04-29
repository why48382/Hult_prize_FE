import {createRouter, createWebHistory} from 'vue-router'
import memberRoutes from './member.js'
import pairingRoutes from './pairing.js'
import voiceRoutes from './voice.js'
import shoppingRoutes from './shopping.js'
import memberApi from '@/api/member/index.js'
import {useAuthStore} from '@/stores/auth'
import Settings from '@/views/common/Settings.vue'
import Demo from '@/views/common/Demo.vue'
import Redirect from '@/views/common/Redirect.vue'

const PUBLIC_PATHS = ['/login', '/terms', '/oauth2/success']

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...memberRoutes,
        ...pairingRoutes,
        ...voiceRoutes,
        ...shoppingRoutes,

        // ── common ──────────────────────────────
        {
            path: '/',
            component: Redirect,
            beforeEnter: async (to, from, next) => {
                try {
                    const me = await memberApi.getMe()
                    const auth = useAuthStore()
                    if (me.paired) {
                        auth.setRole(me.role === 'CAREGIVER' ? 'guardian' : 'parent')
                        next(me.role === 'CAREGIVER' ? '/home/guardian' : '/home/parent')
                    } else {
                        next()
                    }
                } catch (e) {
                    if (e.response?.status === 401) {
                        localStorage.removeItem('isLoggedIn')
                        next('/login')
                    } else {
                        next()
                    }
                }
            }
        },
        {path: '/settings', component: Settings},
        {path: '/test', component: Demo},
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