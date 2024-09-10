<template>
  <div class="h-screen font-quicksand animate__animated animate__fadeInDown">
    <div class="max-w-md mx-auto p-4 mt-36">
      <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
      <form @submit.prevent="register" class="mb-4">
        <input
          type="text"
          v-model="name"
          placeholder="Name"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          class="border border-gray-300 rounded-md px-3 py-2 w-full mb-2 focus:outline-none focus:ring focus:border-slate-800"
        />
        <button
          type="submit"
          class="bg-slate-800 text-white rounded-md px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
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
        class="bg-slate-800 text-white rounded-md px-4 py-2 w-full hover:bg-slate-900 focus:outline-none"
      >
        Sign Up with Google
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      // Implement registration logic here
    },
    registerWithGoogle() {
      // Implement Google sign-up logic here
    }
  }
}
</script>

<style scoped>
/* * {
      border: red 1px solid;
    } */
</style>
