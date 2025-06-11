// src/services/fakeApi.js
import type { LoginForm, RegisterForm, updateForm, User } from '@/models'
import Cookies from 'js-cookie'
import { ref } from 'vue'
const STORAGE_KEY = 'cached-users'

export function loginUser(form: LoginForm) {
  if (!form.email || !form.password) {
    return Promise.reject(new Error('Email and password are required'))
  }
  if (form.email == 'demo@email.com' && form.password == 'demo123') {
    return new Promise((resolve) => {
      const expires_in = form.remember ? 31536000 : 86400
      const token =
        'eyJpc3MiOiJodHRwOi8vY29udmVydGl1bS10ZXN0LmxvY2FsL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ5NjMyMTgxLCJleHAiOjE3NDk2MzU3ODEsIm5iZiI6MTc0OTYzMjE4MSwianRpIjoiek9lOW5waEZ2elBpNVNMMCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0'
      Cookies.set('access_token', token, {
        expires: expires_in, // 1 year or 1 day
      })
      setTimeout(() => {
        resolve({
          access_token: token,
          expires_in: expires_in,
          token_type: 'bearer',
        })
      }, 1000)
    })
  }
  return Promise.reject(new Error('Invalid email or password'))
}

export async function logoutUser(): Promise<{ success: boolean; msg?: unknown }> {
  Cookies.remove('access_token')
  clearCachedUser()
  console.log('alo')
  return { success: true, msg: 'Logout successful' }
}

export async function getUser() {
  const token = Cookies.get('access_token')
  if (!token) {
    return Promise.reject(new Error('No token found'))
  }
  const user = ref({
    data: {
      id: '1',
      first_name: 'demo',
      email: 'demo@email.com',
      email_verified_at: null,
      created_at: '2025-06-09T04:43:55.000000Z',
      updated_at: '2025-06-11T03:44:20.000000Z',
      last_name: 'Nguyen',
      salutation: 'Mr.',
      is_active: true,
      avatar: './avatar_demo.png',
      additional_info: {
        id: 1,
        created_at: '2025-06-10T17:47:13.000000Z',
        updated_at: '2025-06-11T04:32:57.000000Z',
        address: 'Test Address',
        country: 'VN',
        postal_code: '777777',
        date_of_birth: '2000-06-11',
        gender: 'male',
        marital_status: 'married',
        user_id: 1,
      },
      spouse_info: {
        id: 1,
        created_at: '2025-06-10T18:57:50.000000Z',
        updated_at: '2025-06-10T18:57:50.000000Z',
        first_name: 'P',
        last_name: 'Nguyen',
        salutation: 'Ms.',
        user_id: 1,
      },
      personal_pref: {
        id: 1,
        created_at: '2025-06-10T17:47:13.000000Z',
        updated_at: '2025-06-10T19:02:25.000000Z',
        hobbies: null,
        sports: null,
        music: null,
        movies: null,
        user_id: 1,
      },
    },
  })
  const cachedData = localStorage.getItem(STORAGE_KEY)

  if (cachedData) {
    user.value = JSON.parse(cachedData)
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.value)
    }, 1000)
  })
}

export function clearCachedUser() {
  localStorage.removeItem(STORAGE_KEY)
}

export async function updateUser(user: updateForm): Promise<{ success: boolean; msg?: string }> {
  const token = Cookies.get('access_token')
  if (!token) {
    return Promise.reject(new Error('No token found'))
  }
  try {
    // Simulate an API call to update user data
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: user }))
    // console.log('Updating user data:', user)

    return { success: true }
  } catch (err) {
    console.warn('Update user request failed:', err)
    return { success: false, msg: 'Update failed' }
  }
}

export async function registerNewUser(
  form: RegisterForm,
): Promise<{ success: boolean; msg?: string }> {
  if (!form.email || !form.password || !form.first_name || !form.last_name) {
    return Promise.reject(new Error('All fields are required'))
  }
  // Simulate a successful registration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true })
    }, 1000)
  })
}
