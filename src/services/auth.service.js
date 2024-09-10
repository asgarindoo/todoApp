import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://pp5xdpnc-3500.asse.devtunnels.ms/auth/'

class AuthService {
  constructor() {
    this.init()
  }

  init() {
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          this.logout()
        }
        return Promise.reject(error)
      }
    )
  }

  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        const { token, expiresAt } = response.data.data
        if (token) {
          Cookies.set('user', response.data.data)
          Cookies.set('token', token, { expires: new Date(expiresAt) })
        }
        console.log('Login Response:', response.data)
        return response.data
      })
      .catch((error) => {
        console.error('Login Error:', error)
        throw error
      })
  }

  logout() {
    Cookies.remove('user')
    Cookies.remove('token')
    console.log('logout success')
  }

  register(user) {
    return axios
      .post(API_URL + 'register', {
        name: user.name,
        username: user.username,
        password: user.password
      })
      .then((response) => {
        console.log('Registration Response:', response.data)
        return response.data
      })
      .catch((error) => {
        console.error('Registration Error:', error)
        throw error
      })
  }
}

export default new AuthService()
