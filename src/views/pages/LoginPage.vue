<template>
  <div class="flex items-center justify-center h-screen bg-login relative">
    <!-- Logo -->
    <div class="absolute top-4 left-4">
      <div class="border border-gray-400 px-3 py-1 text-lg font-bold bg-white text-gray-700 p-2">
        LOGO
      </div>
    </div>
    <div
      class="bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg w-full max-w-[90vw] lg:max-w-md xl:max-w-[1024px] relative"
    >
      <!-- Welcome Text -->
      <h1
        class="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-center mb-3 lg:mb-6 text-gray-700"
      >
        Welcome to <strong class="font-bold text-black">Convertium user profile</strong>
      </h1>
      <hr class="mb-4 border-gray-700 w-1/2 lg:w-[14rem] mx-auto border-1 lg:border-2" />

      <!-- Error Message -->

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 text-sm font-semibold">User ID*</label>
          <input
            v-model="form.email"
            @blur="validateEmail"
            type="text"
            required
            class="w-full px-3 py-2 border rounded focus:outline-none"
            :class="{ 'border-red-500': validationErrors.email }"
          />
          <p v-if="validationErrors.email" class="text-red-500 text-sm mt-1">
            {{ validationErrors.email }}
          </p>
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-sm font-semibold">Password*</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              @blur="validatePassword"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none"
              :class="{ 'border-red-500': validationErrors.password }"
            />
            <span
              @click="togglePassword"
              class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <IconEyeOff v-if="showPassword" class="h-4 w-4" />
              <IconEyeOpen v-if="!showPassword" class="h-4 w-4" />
            </span>
          </div>
          <p v-if="validationErrors.password" class="text-red-500 text-sm mt-1">
            {{ validationErrors.password }}
          </p>
        </div>

        <div class="mb-4 flex items-center">
          <input id="form_remeber" type="checkbox" v-model="form.remember" class="mr-2" />
          <label class="text-sm" for="form_remeber">Keep me logged in</label>
        </div>

        <div class="w-full">
          <button
            type="submit"
            :disabled="!isFormValid"
            class="block w-fit min-w-1/2 lg:min-w-[14rem] mx-auto bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <div v-if="!loading" class="h-8 content-center font-medium">LOGIN</div>
            <div v-else class="loader w-8 h-8 m-auto"></div>
          </button>
        </div>
      </form>

      <div class="text-base text-center mt-4">
        No account? <a href="/register" class="underline text-black">Register here.</a>
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
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import IconEyeOff from '@/components/icons/IconEyeOff.vue'
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue'
import type { LoginForm } from '@/models'
// import { loginUser } from '@/services/api'
import { loginUser } from '@/services/demoAPI'
const loading = ref<boolean>(false)
const router = useRouter()

const form = reactive(<LoginForm>{
  email: '',
  password: '',
  remember: false,
})

const validationErrors = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false)
const error = ref('')

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  loading.value = true
  validateEmail()
  validatePassword()

  if (!isFormValid.value) return
  try {
    await loginUser(form)
    router.push('/my-profile')
  } catch (err: any) {
    loading.value = false
    error.value = err.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

function validateEmail() {
  if (!form.email.trim()) {
    validationErrors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    validationErrors.email = 'Invalid email format.'
  } else {
    validationErrors.email = ''
  }
}

function validatePassword() {
  validationErrors.password = form.password.trim() ? '' : 'Password is required.'
}

// Check if form is valid
const isFormValid = computed(() => {
  return (
    Object.values(validationErrors).every((error) => error === '') &&
    form.email.trim() &&
    form.password
  )
})
</script>
