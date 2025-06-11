import type { LoginForm, RegisterForm, updateForm, User } from '@/models'
import axios from '../lib/axios'
import Cookies from 'js-cookie'

async function loginUser(form: LoginForm) {
  try {
    const response = await axios.post('/api/auth/login', form, { withCredentials: true })
    const token = response.data.access_token
    // Set cookie
    // localStorage.setItem('token', token)
    Cookies.set('access_token', token, {
      expires: response.data.expires_in ? response.data.expires_in / 86400 : 1,
    })
    // Set token for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return response.data
  } catch (error) {}
}

async function logoutUser(): Promise<{ success: boolean; msg?: unknown }> {
  const token = getToken()
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try {
      await axios.post('/api/auth/logout')
    } catch (err) {
      console.warn('Logout request failed:', err)
      return { success: false, msg: 'Logout failed' }
    }
  }

  // Clear token from client
  Cookies.remove('access_token')
  delete axios.defaults.headers.common['Authorization']
  return { success: true, msg: 'Logout successful' }
}

async function getUser() {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await axios.post('/api/auth/me')
}

async function registerNewUser(form: RegisterForm): Promise<{ success: boolean; msg?: string }> {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  try {
    const response = await axios.post('/api/auth/register', form, { withCredentials: true })
    return { success: true }
  } catch (err) {
    console.warn('Logout request failed:', err)
    return { success: false, msg: 'Register failed' }
  }
}

async function updateUser(form: updateForm): Promise<User> {
  const token = getToken()
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  return await axios.post('/api/user/update', form, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

function getToken() {
  // Get cookie
  // const token = localStorage.getItem('token') || null
  const token = Cookies.get('access_token')
  return token
}

export { loginUser, logoutUser, getUser, registerNewUser, updateUser }
