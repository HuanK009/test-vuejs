<template>
  <div class="min-h-screen bg-cover bg-center bg-blue">
    <side_menu />
    <header class="flex justify-between items-center p-4">
      <logo_component />
    </header>

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
          v-if="user?.additional_info?.marital_status == 'married'"
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
      <div
        v-if="loading"
        class="flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg"
      >
        <div class="flex items-center justify-center h-full">
          <div class="text-gray-700 text-lg font-semibold">Loading user data...</div>
        </div>
      </div>
      <basic_details :user="user" v-if="!loading && user && open_basic_details" />
      <additional_info :user="user" v-if="!loading && user && open_additional_info" />
      <spouse_details
        :user="user"
        v-if="
          !loading &&
          user &&
          open_spouse_details &&
          user?.additional_info?.marital_status == 'married'
        "
      />
      <personal_pref :user="user" v-if="!loading && user && open_personal_pref" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getUser } from '@/api'
import type { User } from '@/models'
import logo_component from '@/components/logo_component.vue'
import side_menu from '@/components/side_menu.vue'

import basic_details from './basic_details.vue'
import additional_info from './additional_info.vue'
import spouse_details from './spouse_details.vue'
import personal_pref from './personal_pref.vue'

const user = ref<User | null>(null)
const loading = ref<boolean>(true)
const open_basic_details = ref<boolean>(true)
const open_additional_info = ref<boolean>(false)
const open_spouse_details = ref<boolean>(false)
const open_personal_pref = ref<boolean>(false)

const fetchUser = async () => {
  try {
    const res = await getUser()
    user.value = res.data
    console.log('User fetched successfully:', user.value)
  } catch (err) {
    console.error('Error fetching user:', err)
    user.value = null
  } finally {
    loading.value = false
  }
}

const openTab = (tab: string) => {
  switch (tab) {
    case 'additional_info':
      open_basic_details.value = false
      open_additional_info.value = true
      open_spouse_details.value = false
      open_personal_pref.value = false
      break
    case 'spouse_detail':
      open_basic_details.value = false
      open_additional_info.value = false
      open_spouse_details.value = true
      open_personal_pref.value = false
      break
    case 'personal_pref':
      open_basic_details.value = false
      open_additional_info.value = false
      open_spouse_details.value = false
      open_personal_pref.value = true
      break
    default:
      open_basic_details.value = true
      open_additional_info.value = false
      open_spouse_details.value = false
      open_personal_pref.value = false
  }
}
onMounted(fetchUser)
</script>
