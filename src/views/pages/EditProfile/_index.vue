<template>
  <div class="min-h-screen bg-cover bg-center bg-blue">
    <!-- Header -->
    <side_menu />
    <header class="flex justify-between items-center p-4">
      <logo_component />
    </header>

    <!-- Sidebar and Content -->
    <div
      class="flex gap-4 max-w-[90vw] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1440px] mx-auto"
    >
      <!-- Sidebar -->
      <div :class="['bg-[#fff9] backdrop-blur-xs border-white shadow-lg p-8 rounded-lg space-y-2']">
        <div
          :class="
            open_basic_details
              ? 'text-base text-black font-semibold border-b pb-1 border-gray-700 cursor-pointer'
              : 'text-base text-gray-700 hover:text-black cursor-pointer border-[#0000]'
          "
          @click="openTab('basic_details')"
        >
          Basic Details
        </div>
        <div
          :class="
            open_additional_info
              ? 'text-base text-black font-semibold border-b pb-1 border-gray-700 cursor-pointer'
              : 'text-base text-gray-700 hover:text-black cursor-pointer border-[#0000]'
          "
          @click="openTab('additional_info')"
        >
          Additional Details
        </div>
        <div
          v-if="form?.additional_info?.marital_status == 'married'"
          :class="
            open_spouse_details
              ? 'text-base text-black font-semibold border-b pb-1 border-gray-700 cursor-pointer'
              : 'text-base text-gray-700 hover:text-black cursor-pointer border-[#0000]'
          "
          @click="openTab('spouse_detail')"
        >
          Spouse Details
        </div>
        <div
          :class="
            open_personal_pref
              ? 'text-base text-black font-semibold border-b pb-1 border-gray-700 cursor-pointer'
              : 'text-base text-gray-700 hover:text-black cursor-pointer border-[#0000]'
          "
          @click="openTab('personal_pref')"
        >
          Personal Preferences
        </div>
      </div>
      <!-- Form Content -->
      <div class="flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-light">Edit <strong class="font-bold">Profile</strong></h1>
          <router-link to="/my-profile" class="text-sm underline"
            >Go back to My Profile</router-link
          >
        </div>
        <hr class="border-gray-400 mb-6" />

        <form @submit.prevent="handleSubmit" class="gap-6">
          <!-- Avatar -->
          <div
            class="w-full md:w-fit md:max-w-1/4 flex-shrink-0 pr-0 pb-4 md:pr-2 lg:pr-4"
            v-if="open_basic_details"
          >
            <!-- Avatar preview -->
            <div class="relative">
              <div
                class="bg-gray-500 rounded-full w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 overflow-hidden flex items-center justify-center p-1"
              >
                <img
                  v-if="form.avatar_url"
                  :src="form.avatar_url"
                  alt="Avatar Preview"
                  class="object-cover w-full h-full"
                />
                <span v-else class="text-gray-500 text-sm">No image</span>
              </div>
            </div>

            <!-- Upload button -->
            <button type="button" class="text-sm underline w-full mt-2" @click="triggerFileInput">
              Upload image
            </button>

            <!-- Hidden file input -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleImageUpload"
            />
          </div>

          <!-- Right: Form -->
          <div class="space-y-4">
            <basic_details
              v-model:email="form.email"
              v-model:firstName="form.first_name"
              v-model:lastName="form.last_name"
              v-model:salutation="form.salutation"
              :errors="errors"
              @blur:email="validateEmail"
              @blur:firstName="validateFirstName"
              @blur:lastName="validateLastName"
              @blur:salutation="validateSalutation"
              v-if="open_basic_details"
            />

            <additional_info
              v-model:address="form.additional_info.address"
              v-model:country="form.additional_info.country"
              v-model:postalCode="form.additional_info.postal_code"
              v-model:dateOfBirth="form.additional_info.date_of_birth"
              v-model:gender="form.additional_info.gender"
              v-model:maritalStatus="form.additional_info.marital_status"
              :errors="errors.additional_info"
              @blur:address="validateAddress"
              @blur:country="validateCountry"
              @blur:postalCode="validatePostalCode"
              @blur:dateOfBirth="validateDOB"
              @blur:gender="validateGender"
              @blur:maritalStatus="validateMaritalStatus"
              v-if="open_additional_info"
            />

            <spouse_details
              v-model:salutation="form.spouse_info.salutation"
              v-model:firstName="form.spouse_info.first_name"
              v-model:lastName="form.spouse_info.last_name"
              :errors="errors.spouse_info"
              @blur:salutation="validateSalutation"
              @blur:firstName="validateFirstName"
              @blur:lastName="validateLastName"
              v-if="open_spouse_details && form.additional_info.marital_status === 'married'"
            />
            <personal_pref
              v-model:hobbies="form.personal_pref.hobbies"
              v-model:sports="form.personal_pref.sports"
              v-model:music="form.personal_pref.music"
              v-model:movies="form.personal_pref.movies"
              :errors="errors.personal_pref"
              v-if="open_personal_pref"
            />
          </div>

          <!-- Buttons -->
          <div class="mt-6 flex gap-4">
            <button
              type="submit"
              :disabled="!isFormValid"
              class="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              SAVE & UPDATE
            </button>
            <button
              type="button"
              class="border px-6 py-2 rounded hover:bg-gray-100"
              @click="handleCancel"
            >
              CANCEL
            </button>
          </div>
        </form>

        <p class="mt-2 text-sm text-gray-600 italic">* Mandatory field</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import logo_component from '@/components/logo_component.vue'
import side_menu from '@/components/side_menu.vue'
import basic_details from './basic_details.vue'
import additional_info from './additional_info.vue'
import spouse_details from './spouse_details.vue'
import personal_pref from './personal_pref.vue'
import { getUser, updateUser } from '@/api'
import axios from 'axios'
import { gender, marital_status, salutation, type updateForm } from '@/models'

const loading = ref<boolean>(true)
const router = useRouter()
const open_basic_details = ref<boolean>(true)
const open_additional_info = ref<boolean>(false)
const open_spouse_details = ref<boolean>(false)
const open_personal_pref = ref<boolean>(false)
const userId = ref<string>('')
const form = ref<updateForm>({
  section: 'basic_details',
  avatar: null as File | null,
  avatar_url: '',
  // Basic Details
  salutation: 'Mr.' as salutation,
  first_name: '',
  last_name: '',
  email: '',
  // Additional Info
  additional_info: {
    address: '',
    country: '',
    postal_code: '',
    date_of_birth: '',
    gender: 'other' as gender,
    marital_status: 'single' as marital_status,
  },
  // Spouse Info
  spouse_info: {
    salutation: 'Mr.' as salutation,
    first_name: '',
    last_name: '',
  },
  // Personal Preferences
  personal_pref: {
    hobbies: '',
    sports: '',
    music: '',
    movies: '',
  },
})
const errors = ref({
  salutation: '',
  first_name: '',
  last_name: '',
  email: '',
  additional_info: {
    address: '',
    country: '',
    postal_code: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
  },
  spouse_info: {
    salutation: '',
    first_name: '',
    last_name: '',
  },
  personal_pref: {
    hobbies: '',
    sports: '',
    music: '',
    movies: '',
    books: '',
    food: '',
  },
})

const fetchUser = async () => {
  try {
    const res = await getUser()
    userId.value = res.data.id || ''
    form.value.avatar_url = 'http://convertium-test.local/' + res.data.avatar || ''
    form.value.email = res.data.email || ''
    form.value.salutation = res.data.salutation || ''
    form.value.first_name = res.data.first_name || ''
    form.value.last_name = res.data.last_name || ''
    form.value.additional_info.address = res.data.additional_info?.address || ''
    form.value.additional_info.country = res.data.additional_info?.country || ''
    form.value.additional_info.postal_code = res.data.additional_info?.postal_code || ''
    form.value.additional_info.date_of_birth = res.data.additional_info?.date_of_birth || ''
    form.value.additional_info.gender = res.data.additional_info?.gender || ''
    form.value.additional_info.marital_status = res.data.additional_info?.marital_status || ''
    form.value.spouse_info.salutation = res.data.spouse_info?.salutation || ''
    form.value.spouse_info.first_name = res.data.spouse_info?.first_name || ''
    form.value.spouse_info.last_name = res.data.spouse_info?.last_name || ''
    form.value.personal_pref.hobbies = res.data.personal_pref?.hobbies || ''
    form.value.personal_pref.sports = res.data.personal_pref?.sports || ''
    form.value.personal_pref.music = res.data.personal_pref?.music || ''
    form.value.personal_pref.movies = res.data.personal_pref?.movies || ''
  } catch (err) {
    console.error('Error fetching user:', err)
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  if (!isFormValid.value) return
  try {
    await updateUser(form.value)

    router.push('/my-profile')
  } catch (error: any) {
    console.error(error.response?.data || error)
  }
}

function handleCancel() {
  router.push('/my-profile')
}
function validateFirstName() {
  if (!form.value.first_name.trim()) {
    errors.value.first_name = 'First name is required'
  } else if (form.value.first_name.trim().length < 2) {
    errors.value.first_name = 'First name must be at least 2 characters'
  } else {
    errors.value.first_name = ''
  }
}
function validateLastName() {
  if (!form.value.last_name.trim()) {
    errors.value.last_name = 'Last name is required'
  } else if (form.value.last_name.trim().length < 2) {
    errors.value.last_name = 'Last name must be at least 2 characters'
  } else {
    errors.value.last_name = ''
  }
}
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}
function validateSalutation() {
  if (!form.value.salutation) {
    errors.value.salutation = 'Please select your salutation.'
  } else {
    errors.value.salutation = ''
  }
}
function validateAddress() {
  if (!form.value.additional_info.address.trim()) {
    errors.value.additional_info.address = 'Address is required'
  } else {
    errors.value.additional_info.address = ''
  }
}
function validateCountry() {
  if (!form.value.additional_info.country.trim()) {
    errors.value.additional_info.country = 'Country is required'
  } else {
    errors.value.additional_info.country = ''
  }
}
function validatePostalCode() {
  if (!form.value.additional_info.postal_code.trim()) {
    errors.value.additional_info.postal_code = 'Postal code is required'
  } else {
    errors.value.additional_info.postal_code = ''
  }
}
function validateDOB() {
  if (!form.value.additional_info.date_of_birth.trim()) {
    errors.value.additional_info.date_of_birth = 'Date of birth is required'
  } else {
    errors.value.additional_info.date_of_birth = ''
  }
}
function validateGender() {
  if (!form.value.additional_info.gender.trim()) {
    errors.value.additional_info.gender = 'gender is required'
  } else {
    errors.value.additional_info.gender = ''
  }
}

function validateMaritalStatus() {
  if (!form.value.additional_info.marital_status.trim()) {
    errors.value.additional_info.marital_status = 'Marital status is required'
  } else {
    errors.value.additional_info.marital_status = ''
  }
}

// Check if form is valid
const isFormValid = computed(() => {
  if (open_additional_info.value) {
    return (
      form.value.additional_info.address.trim() &&
      form.value.additional_info.country.trim() &&
      form.value.additional_info.postal_code.trim() &&
      form.value.additional_info.date_of_birth.trim() &&
      form.value.additional_info.gender.trim() &&
      form.value.additional_info.marital_status.trim()
    )
  } else if (open_spouse_details.value) {
    return (
      form.value.additional_info.address.trim() &&
      form.value.additional_info.country.trim() &&
      form.value.additional_info.postal_code.trim() &&
      form.value.additional_info.date_of_birth.trim() &&
      form.value.additional_info.gender.trim() &&
      form.value.additional_info.marital_status.trim() &&
      form.value.spouse_info.salutation.trim() &&
      form.value.spouse_info.first_name.trim() &&
      form.value.spouse_info.last_name.trim()
    )
  }
  return (
    form.value.email.trim() &&
    form.value.first_name.trim() &&
    form.value.last_name.trim() &&
    form.value.salutation
  )
})
const openTab = (tab: string) => {
  switch (tab) {
    case 'additional_info':
      form.value.section = 'additional_info'
      open_basic_details.value = false
      open_additional_info.value = true
      open_spouse_details.value = false
      open_personal_pref.value = false
      break
    case 'spouse_detail':
      form.value.section = 'spouse_detail'
      open_basic_details.value = false
      open_additional_info.value = false
      open_spouse_details.value = true
      open_personal_pref.value = false
      break
    case 'personal_pref':
      form.value.section = 'personal_pref'
      open_basic_details.value = false
      open_additional_info.value = false
      open_spouse_details.value = false
      open_personal_pref.value = true
      break
    default:
      form.value.section = 'basic_details'
      open_basic_details.value = true
      open_additional_info.value = false
      open_spouse_details.value = false
      open_personal_pref.value = false
  }
}
const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (file) {
    form.value.avatar_url = URL.createObjectURL(file)
    form.value.avatar = file

    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('id', userId.value || '')

    try {
      const res = await axios.post('/api/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // if using token
        },
      })
      form.value.avatar = res.data.avatar_url // update image preview
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }
}

onMounted(fetchUser)
</script>
