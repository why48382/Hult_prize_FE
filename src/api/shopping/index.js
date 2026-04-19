import api from '@/plugin/axiosInterceptor'

const getQuestions = async (voiceItemId) => {
    const res = await api.get(`/api/shopping/question/${voiceItemId}`)
    return res.data
}

const recommend = async (voiceItemId, answers) => {
    const res = await api.post(`/api/shopping/recommend/${voiceItemId}`, answers)
    return res.data
}

export default {getQuestions, recommend}