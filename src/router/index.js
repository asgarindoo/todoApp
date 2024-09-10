// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/components/DefaultLayout.vue'
import Dashboard from '@/views/AppDashboard.vue'
import Transactions from '@/views/AppTransactions.vue'
import Users from '@/views/AppUsers.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Dashboard', component: Dashboard },
      { path: 'transactions', name: 'Transactions', component: Transactions },
      { path: 'users', name: 'Users', component: Users }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
