import {createRouter, createWebHistory} from 'vue-router'
import Select from "@/views/Select.vue";
import Demo from "@/views/Demo.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Select
        },
        {
            path: '/test',
            component: Demo,
        },
    ],
})

export default router
