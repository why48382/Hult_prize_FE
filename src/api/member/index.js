import api from '@/plugin/axiosInterceptor'

const setRole = async (role) => {
    await api.get('/api/member/role', {params: {role}})
}

const getMe = async () => {
    const res = await api.get('/api/member/me')
    return res.data
}

export default {setRole, getMe}