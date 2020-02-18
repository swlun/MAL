import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Users from '../views/Users.vue'
import Admins from '../views/Admins.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/admins',
    name: 'admins',
    component: Admins
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
