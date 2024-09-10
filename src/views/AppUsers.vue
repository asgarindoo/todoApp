<!-- src/views/Users.vue -->
<template>
  <div>
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Contoh data pengguna
const users = ref([
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' }
])
</script>

<style scoped>
/* Tambahkan styling khusus untuk halaman Users jika diperlukan */
</style>
