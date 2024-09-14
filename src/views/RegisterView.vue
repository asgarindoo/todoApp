<template>
  <div class="h-screen font-quicksand animate__animated animate__fadeInDown">
    <div class="max-w-md mx-auto p-4 mt-36">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <form @submit.prevent="register" class="mb-4">
        <input
          type="text"
          v-model="user.name"
          placeholder="Name"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />
        <input
          type="text"
          v-model="user.username"
          placeholder="Username"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />
        <input
          v-model="user.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Confirm Password"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />

        <button
          type="submit"
          class="bg-slate-800 text-white rounded-sm px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
      <p class="mb-4">
        Already have an account?
        <router-link to="/" class="text-blue-900">Login</router-link>
      </p>
      <hr class="mb-4" />
      <p class="mb-2">Sign up with Google:</p>
      <button
        @click="registerWithGoogle"
        class="bg-slate-800 text-white rounded-sm px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
      >
        Sign Up with Google
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js'
import Swal from 'sweetalert2'

export default {
  name: 'RegisterView',
  data() {
    return {
      user: {
        name: '',
        username: '',
        password: ''
      },
      confirmPassword: '',
      isPasswordVisible: false,
      errorMessage: '' // Menambahkan errorMessage untuk menampilkan pesan kesalahan
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
    async register() {
      const authStore = useAuthStore() // Panggil store

      // Validasi input
      if (!this.user.name || !this.user.username || !this.user.password) {
        this.errorMessage = 'All fields are required'
        Swal.fire({
          icon: 'error',
          title: 'All fields are required',
          showConfirmButton: true
        })
        return
      }

      if (this.user.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match'
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          showConfirmButton: true
        })
        return
      }

      // Log data menggunakan JSON.stringify
      // console.log('User Data Before Submit:', JSON.stringify(this.user))

      try {
        // Panggil metode register dari store
        const response = await authStore.register(this.user)
        console.log('Registration Response:', response)

        // Menandai pendaftaran berhasil
        this.registrationSuccess = true

        // Menampilkan alert sukses
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500
        })

        // Pindah ke halaman login
        this.$router.push('/')
      } catch (error) {
        console.error('Registration Error:', error)
        this.errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        // Menampilkan alert kesalahan hanya jika pendaftaran tidak berhasil
        if (!this.registrationSuccess) {
          if (
            this.errorMessage.includes('already registered') ||
            this.errorMessage.includes('exists')
          ) {
            Swal.fire({
              icon: 'error',
              title: 'User already registered',
              text: 'The username or email is already in use. Please choose another one.',
              showConfirmButton: true
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration failed',
              text: this.errorMessage,
              showConfirmButton: true
            })
          }
        }
      }
    },

    registerWithGoogle() {
      Swal.fire({
        icon: 'info',
        title: 'Register with Google is not implemented yet',
        showConfirmButton: false
      })
    }
  }
}
</script>

<style scoped>
/* * {
      border: red 1px solid;
    } */
</style>
