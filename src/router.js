import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import LogIn from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import Transactions from './components/Transactions.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/user/login',
    name: 'logIn',
    component: LogIn,
    meta: { requiresAuth: false, reverseAuth: true }
  },
  {
    path: '/user/signup',
    name: 'signUp',
    component: SignUp,
    meta: { requiresAuth: false, reverseAuth: true }
  },
  {
    path: '/user/transactions',
    name: 'transactions',
    component: Transactions,
    meta: { requiresAuth: true, reverseAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router