import Login from '@/views/member/Login.vue'
import Terms from '@/views/member/Terms.vue'

export default [
    {path: '/login', component: Login},
    {path: '/terms', component: Terms},
    {
        path: '/oauth2/success',
        beforeEnter: (to, from, next) => {
            localStorage.setItem('isLoggedIn', 'true')
            const isNew = new URLSearchParams(window.location.search).get('isNew')
            if (isNew === 'true') next('/terms')
            else next('/')
        },
        component: Login
    },
]