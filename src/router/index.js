import {createRouter, createWebHistory} from 'vue-router'
import Select from "@/views/Select.vue";
import Demo from "@/views/Demo.vue";
import Pairing from "@/views/Pairing.vue";
import Loading from "@/views/PairingLoadingView.vue"
import GuardianHome from "@/views/guardian/GuardianHome.vue";
import ParentHome from "@/views/parent/ParentHome.vue";

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
    ],
})

export default router
