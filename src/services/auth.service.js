import { baseApi } from '@/plugins/axios'
import Cookies from 'js-cookie'

class AuthService {
  constructor() {
    this.init()
  }

  init() {
    // baseApi.interceptors.request.use dan baseApi.interceptors.response.use sudah diatur di plugin axios
  }

  login(user) {
    return baseApi
      .post('/auth/login', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log('Login Response:', response.data) // Log respons untuk debugging
        const { token, expiresAt } = response.data // Mengakses data langsung dari response.data
        if (token && expiresAt) {
          Cookies.set('user', JSON.stringify({ token, expiresAt }))
          Cookies.set('token', token, { expires: new Date(expiresAt) })
          return { token, expiresAt } // Kembalikan token dan expiresAt
        } else {
          console.error('Token atau expiresAt tidak tersedia dalam data')
          throw new Error('Token atau expiresAt tidak tersedia dalam data')
        }
      })
      .catch((error) => {
        console.error('Login Error:', error)
        throw error
      })
  }

  logout() {
    Cookies.remove('user')
    Cookies.remove('token')
    console.log('Logout success')
  }

  register(user) {
    console.log('User Data in Service:', {
      name: user.name,
      username: user.username,
      password: user.password
    }) // Log data untuk debugging

    return baseApi
      .post('/auth/register', {
        name: user.name,
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log('Registration Response:', response.data) // Log respons untuk debugging
        return response.data
      })
      .catch((error) => {
        console.error('Registration Error:', error)
        throw error
      })
  }
}

export default new AuthService()
