import AuthService from '@/service/auth.service';
<template>
  <aside :class="['sidebar', { 'sidebar-open': isOpen }]">
    <div class="flex items-center p-4">
      <button @click="toggleSidebar" class="text-white">
        <i class="fas fa-bars"></i>
      </button>
      <!-- <span class="text-xl font-bold ml-5 sidebar-logo" v-if="isOpen">Logo</span> -->
    </div>
    <nav class="flex-1">
      <ul>
        <li>
          <router-link
            to="/home"
            class="flex items-center px-4 py-2 hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            <i class="fas fa-tachometer-alt mr-6 ml-4"></i>
            <span class="sidebar-text">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/home/transactions"
            class="flex items-center px-4 py-2 hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            <i class="fas fa-exchange-alt mr-6 ml-4"></i>
            <span class="sidebar-text">Transactions</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/home/users"
            class="flex items-center px-4 py-2 hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            <i class="fas fa-users mr-6 ml-4"></i>
            <span class="sidebar-text">Users</span>
          </router-link>
        </li>
        <li>
          <a
            @click.prevent="logout"
            class="flex items-center px-4 py-2 mt-96 hover:bg-gray-700"
            active-class="bg-gray-700"
          >
            <i class="fas fa-sign-out-alt mr-4 ml-6"></i>
            <span class="sidebar-text">Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import AuthService from '../services/auth.service.js'

export default {
  name: 'AppSidebar',
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    async logout() {
      await AuthService.logout()
      this.$router.push('/')
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 64px;
  height: 100vh;
  background-color: #2d2d2d;
  color: white;
  overflow: hidden;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}
.sidebar-open {
  width: 256px;
}
.sidebar button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}
.sidebar-logo {
  transition: opacity 0.3s;
}
.sidebar:not(.sidebar-open) .sidebar-logo {
  display: none;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar li {
  margin: 0;
}
.sidebar a {
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}
.sidebar a:hover {
  background-color: #4a4a4a;
}
/* .sidebar-text {
  transition: opacity 0.3s;
  white-space: nowrap;
}
.sidebar:not(.sidebar-open) .sidebar-text {
  display: none;
} */
</style>
