import api from '@/plugin/axiosInterceptor'

const codeIssue = async () => {
    const res = await api.get('/api/pairing/codeissue')
    return res.data
}

const codeVerify = async (code) => {
    await api.get('/api/pairing/codeverify', {params: {code}})
}

const unpair = async () => {
    await api.delete('/api/pairing/unpair')
}

export default {codeIssue, codeVerify, unpair}