<template>
  <div class="flex justify-center items-center h-screen">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-2xl mb-8">Page not found</p>
      <router-link
        to="/"
        class="bg-slate-800 text-white rounded-md px-4 py-2 hover:bg-slate-900 focus:outline-none"
        >Back to Home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppView404'
}
</script>

<style></style>
