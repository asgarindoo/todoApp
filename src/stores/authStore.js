// src/stores/authStore.js
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import AuthService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await AuthService.login({ username, password })
        this.user = response.user
        this.token = response.token
      } catch (error) {
        console.error('Login Error:', error)
        throw error
      }
    },
    logout() {
      AuthService.logout()
      this.user = null
      this.token = null
    },
    async register(name, username, password) {
      try {
        await AuthService.register({ name, username, password })
      } catch (error) {
        console.error('Registration Error:', error)
        throw error
      }
    },
    initialize() {
      // Initialize user and token from cookies if available
      const token = Cookies.get('token')
      const user = Cookies.get('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    }
  }
})
