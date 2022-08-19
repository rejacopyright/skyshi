import ax from 'axios'
import qs from 'qs'

let axios = ax.create({
  baseURL: 'https://todo.api.devcode.gethired.id/',
})
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
// axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.interceptors.request.use(
  (req) => {
    if (req.method === 'get' && req?.params) {
      req.params = qs.parse(req.params)
    }
    return req
  },
  (error) => Promise.reject(error)
)

export default axios
