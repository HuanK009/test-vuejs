import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from '@/api'
import axios from '../lib/axios'

import MyProfile from '../views/pages/MyProfile/_index.vue'
import EditProfile from '../views/pages/EditProfile/_index.vue'
import Login from '../views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import HomePage from '@/views/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login, meta: { checkAuth: true } },
    { path: '/register', component: RegisterPage },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/my-profile',
      name: 'my_profile',
      component: MyProfile,
      meta: { requiresAuth: true },
    },
    {
      path: '/edit-profile',
      name: 'edit_profile',
      component: EditProfile,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  if (to.meta.checkAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      try {
        await getUser()
        next('/my-profile')
      } catch {
        next()
      }
    } else {
      next()
    }
  } else if (to.meta.requiresAuth) {
    try {
      await getUser()
      next()
    } catch {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
