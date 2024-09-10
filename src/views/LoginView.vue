<template>
  <div class="h-screen font-quicksand animate__animated animate__fadeInDown">
    <div class="max-w-md mx-auto p-4 mt-36">
      <h2 class="text-2xl font-bold mb-4">Login or Sign Up</h2>
      <form @submit.prevent="login" class="mb-4">
        <input
          type="text"
          v-model="user.username"
          placeholder="Email"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <input
          type="password"
          v-model="user.password"
          placeholder="Password"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <button
          type="submit"
          class="bg-slate-800 text-white rounded-md px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
        >
          Login / Sign In
        </button>
      </form>
      <p class="mb-4">
        Don't have an account?
        <router-link to="/login" class="text-blue-900">Sign Up</router-link>
      </p>
      <hr class="mb-4" />
      <p class="mb-2">Login with Google:</p>
      <button
        @click="loginWithGoogle"
        class="bg-slate-800 text-white rounded-md px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
      >
        Login with Google
      </button>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service.js'

export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await AuthService.login(this.user)
        this.$router.push('/home')
      } catch (error) {
        this.errorMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* * {
    border: red 1px solid;
  } */
</style>
