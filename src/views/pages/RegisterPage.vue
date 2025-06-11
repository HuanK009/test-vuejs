<template>
  <div class="min-h-screen bg-cover bg-center flex items-center justify-center bg-login">
    <!-- Logo -->
    <div class="absolute top-4 left-4">
      <div class="border border-gray-400 px-3 py-1 text-lg font-bold bg-white text-gray-700 p-2">
        LOGO
      </div>
    </div>
    <div
      class="bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-3 md:p-6 lg:p-8 rounded-lg w-full max-w-[90vw] lg:max-w-md xl:max-w-[1024px] relative"
    >
      <h1 class="text-2xl font-light text-center mb-6">
        Create your <strong class="font-bold">myApp</strong> account
      </h1>
      <hr class="mb-4 border-gray-400 w-1/2 mx-auto" />

      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">First name*</label>
          <input
            type="text"
            v-model="form.first_name"
            @blur="validateFirstName"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none"
            :class="{ 'border-red-500': validationErrors.first_name }"
          />
          <p v-if="validationErrors.first_name" class="text-red-500 text-xs mt-1">
            {{ validationErrors.first_name }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">Last name*</label>
          <input
            type="text"
            v-model="form.last_name"
            @blur="validateLastName"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none"
            :class="{ 'border-red-500': validationErrors.last_name }"
          />
          <p v-if="validationErrors.last_name" class="text-red-500 text-xs mt-1">
            {{ validationErrors.last_name }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">Email*</label>
          <input
            type="email"
            v-model="form.email"
            @blur="validateEmail"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none"
            :class="{ 'border-red-500': validationErrors.email }"
          />
          <p v-if="validationErrors.email" class="text-red-500 text-xs mt-1">
            {{ validationErrors.email }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">Password*</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              @blur="validatePassword"
              @input="form.confirm_password && validateConfirmPassword()"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none"
              :class="{ 'border-red-500': validationErrors.password }"
            />
            <span
              @click="togglePassword('showPassword')"
              class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <IconEyeOff v-if="showPassword" class="h-4 w-4" />
              <IconEyeOpen v-if="!showPassword" class="h-4 w-4" />
            </span>
          </div>
          <p v-if="validationErrors.password" class="text-red-500 text-xs mt-1">
            {{ validationErrors.password }}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold mb-1">Confirm Password*</label>
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="form.confirm_password"
              @blur="validateConfirmPassword"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none"
              :class="{ 'border-red-500': validationErrors.confirm_password }"
            />
            <span
              @click="togglePassword('showConfirmPassword')"
              class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <IconEyeOff v-if="showConfirmPassword" class="h-4 w-4" />
              <IconEyeOpen v-if="!showConfirmPassword" class="h-4 w-4" />
            </span>
          </div>
          <p v-if="validationErrors.confirm_password" class="text-red-500 text-xs mt-1">
            {{ validationErrors.confirm_password }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          REGISTER
        </button>
      </form>

      <div class="text-sm text-center mt-4">
        Already have an account? <router-link to="/login" class="underline">Log in</router-link>
      </div>
    </div>
    <div
      v-if="error"
      class="bg-red-500 text-white text-base px-6 py-2 rounded-t-lg rounded-tl-lg text-center absolute bottom-0 left-0 right-0 w-fit m-auto"
    >
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RegisterForm } from '@/models'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue'
import { registerNewUser } from '@/api'

const router = useRouter()
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
// const registerSuccessfull = ref(false)

// Validation errors
const validationErrors = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

// This function toggles the visibility of the password input field
function togglePassword(e: string) {
  if (e === 'showPassword') {
    showPassword.value = !showPassword.value
  } else if (e === 'showConfirmPassword') {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}

const form = reactive(<RegisterForm>{
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

// Validation functions
function validateFirstName() {
  if (!form.first_name.trim()) {
    validationErrors.first_name = 'First name is required'
  } else if (form.first_name.trim().length < 2) {
    validationErrors.first_name = 'First name must be at least 2 characters'
  } else {
    validationErrors.first_name = ''
  }
}

function validateLastName() {
  if (!form.last_name.trim()) {
    validationErrors.last_name = 'Last name is required'
  } else if (form.last_name.trim().length < 2) {
    validationErrors.last_name = 'Last name must be at least 2 characters'
  } else {
    validationErrors.last_name = ''
  }
}

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    validationErrors.email = 'Email is required'
  } else if (!emailRegex.test(form.email)) {
    validationErrors.email = 'Please enter a valid email address'
  } else {
    validationErrors.email = ''
  }
}

function validatePassword() {
  if (!form.password) {
    validationErrors.password = 'Password is required'
  } else if (form.password.length < 8) {
    validationErrors.password = 'Password must be at least 8 characters'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
    validationErrors.password =
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  } else {
    validationErrors.password = ''
  }
}

function validateConfirmPassword() {
  if (!form.confirm_password) {
    validationErrors.confirm_password = 'Please confirm your password'
  } else if (form.password !== form.confirm_password) {
    validationErrors.confirm_password = 'Passwords do not match'
  } else {
    validationErrors.confirm_password = ''
  }
}

// Check if form is valid
const isFormValid = computed(() => {
  return (
    Object.values(validationErrors).every((error) => error === '') &&
    form.first_name.trim() &&
    form.last_name.trim() &&
    form.email.trim() &&
    form.password &&
    form.confirm_password
  )
})

async function handleRegister() {
  error.value = ''

  // Run all validations
  validateFirstName()
  validateLastName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  // Check if form is valid before submitting
  if (!isFormValid.value) {
    error.value = 'Please fix the validation errors before submitting'
    return
  }

  try {
    const res = await registerNewUser(form)
    if (res.success) {
      router.push('/login')
    } else {
      error.value = res.msg || 'Registration failed.'
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed.'
  }
}
</script>
