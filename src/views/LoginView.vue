<template>
  <div class="h-screen font-quicksand animate__animated animate__fadeInDown">
    <div class="max-w-md mx-auto p-4 mt-36">
      <h2 class="text-2xl font-bold mb-4">Login or Sign In</h2>
      <form @submit.prevent="login" class="mb-4">
        <input
          type="text"
          v-model="user.username"
          placeholder="Username"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="user.password"
          placeholder="Password"
          class="border border-gray-300 rounded-sm px-3 py-2 w-full mb-2 focus:outline-none focus:border-slate-800"
        />
        <button
          type="submit"
          class="bg-slate-800 text-white rounded-sm px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
        >
          Login / Sign In
        </button>
      </form>
      <p class="mb-4">
        Don't have an account?
        <router-link to="/Register" class="text-blue-900">Sign Up</router-link>
      </p>
      <hr class="mb-4" />
      <p class="mb-2">Login with Google:</p>
      <button
        @click="loginWithGoogle"
        class="bg-slate-800 text-white rounded-sm px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
      >
        Login with Google
      </button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js'
import Swal from 'sweetalert2'

export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const authStore = useAuthStore()
        await authStore.login(this.user.username, this.user.password)
        this.$router.push('/home')

        // Menampilkan alert sukses
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        this.errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()

        // Menampilkan alert kesalahan
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: this.errorMessage,
          showConfirmButton: true
        })
      } finally {
        this.loading = false
      }
    },
    loginWithGoogle() {
      Swal.fire({
        icon: 'info',
        title: 'Login with Google is not implemented yet',
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
