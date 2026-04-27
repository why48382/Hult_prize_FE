import GuardianHome from '@/views/voice/GuardianHome.vue'
import ParentHome from '@/views/voice/ParentHome.vue'
import RequestLoading from '@/views/voice/RequestLoading.vue'
import RequestComplete from '@/views/voice/RequestComplete.vue'
import RequestItems from '@/views/voice/RequestItems.vue'
import OrderComplete from '@/views/voice/OrderComplete.vue'
import {useAuthStore} from '@/stores/auth'

export default [
    {path: '/home/guardian', component: GuardianHome},
    {path: '/home/parent', component: ParentHome},
    {path: '/home', redirect: () => {
            const auth = useAuthStore()
            if (!auth.role) return '/'
            return auth.role === 'guardian' ? '/home/guardian' : '/home/parent'
        }},
    {path: '/parent/loading', component: RequestLoading},
    {path: '/parent/complete', component: RequestComplete},
    {path: '/requests', component: RequestItems},
    {path: '/guardian/complete', component: OrderComplete},
]