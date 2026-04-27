import Login from '@/views/member/Login.vue'
import Terms from '@/views/member/Terms.vue'

export default [
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
]