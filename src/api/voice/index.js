import api from '@/plugin/axiosInterceptor'

const upload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post('/api/voice/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

const getRequests = async () => {
    const res = await api.get('/api/voice/requests')
    return res.data
}

const updateStatus = async (voiceId, status) => {
    const res = await api.patch(`/api/voice/${voiceId}/status`, null, {
        params: { status }
    })
    return res.data
}

export default { upload, getRequests, updateStatus }