import api from '@/plugin/axiosInterceptor'

const setRole = async (role) => {
    await api.get('/api/member/role', {params: {role}})
}

const getMe = async () => {
    const res = await api.get('/api/member/me')
    return res.data
}

const signup = async (body) => {
    await api.post('/api/member/signup', body)
}

export default {setRole, getMe, signup}