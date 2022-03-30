import axios from 'axios'
import router from './router'
import store from './store'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000/' // the FastAPI backend
axios.defaults.headers = {
  "Content type": "application/json"
}

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      store.dispatch('logOut')
      return router.push('/login')
    }
  }
})

export default axios