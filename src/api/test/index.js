import api from '@/plugin/axiosInterceptor'

const springTest = async (req) => {
  let data = {}
  let url = '/api/test'

  await api
    .get(url, req)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      data = error.data
    })

  return data
}

export default {
  springTest
}
