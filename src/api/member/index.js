import api from '@/plugin/axiosInterceptor'

const setRole = async (role) => {
    await api.get('/api/member/role', {params: {role}})
}

export default {setRole}