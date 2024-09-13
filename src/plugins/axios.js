import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = import.meta.env.VITE_API_BASE_URL

const baseApi = axios.create({
  baseURL
})

baseApi.interceptors.request.use(
  (config) => {
    // Menambahkan token dari cookies ke header
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      Cookies.remove('token')
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

baseApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Menangani kesalahan respons
    const statusCode = error.response?.status
    const errorMessage = error.response?.data?.error || 'An error occurred'

    if (statusCode === 401 && errorMessage === 'jwt expired') {
      Cookies.remove('token')
    }

    return Promise.reject({
      status: statusCode,
      message: errorMessage,
      ...(error.response?.data || {})
    })
  }
)

export { baseApi }
