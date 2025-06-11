<template>
  <div class="absolute top-6 right-6 z-10">
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-10" @click="toggleMenu(false)"></div>
    <aside
      class="w-64 bg-white/90 shadow-md p-6 space-y-4 block fixed top-0 right-0 h-full z-20 transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
    >
      <button
        class="absolute top-6 right-6 text-gray-600 hover:text-black cursor-pointer text-xl"
        @click="toggleMenu(false)"
      >
        ✕
      </button>
      <div class="text-xl font-bold mb-6">Menu</div>
      <nav class="space-y-2">
        <router-link
          to="/"
          class="block text-gray-700 hover:text-blue-600 font-medium"
          active-class="text-blue-800 font-bold"
        >
          Home
        </router-link>
        <router-link
          to="/my-profile"
          class="block text-gray-700 hover:text-blue-600 font-medium"
          active-class="text-blue-800 font-bold"
        >
          My Profile
        </router-link>
        <router-link
          to="/edit-profile"
          class="block text-gray-700 hover:text-blue-600 font-medium"
          active-class="text-blue-800 font-bold"
        >
          Edit Profile
        </router-link>
        <button
          @click="logout"
          class="mt-4 w-fit rounded text-left text-white px-4 py-1.5 bg-red-600 hover:text-red-800 hover:bg-white border hover:border-red-800 font-semibold cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </aside>
    <button class="text-2xl cursor-pointer" @click="toggleMenu(true)">☰</button>
  </div>
</template>
<script setup lang="ts">
// import { logoutUser } from '@/services/api'
import { logoutUser } from '@/services/demoAPI'
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = (value = false) => {
  isOpen.value = value
}

const logout = async () => {
  console.log('aaloo')

  const result = await logoutUser()

  if (result.success) {
    location.reload()
  } else {
    console.warn('Logout failed:', result.msg || 'Unknown error')
  }
}
</script>

<style scoped>
aside {
  min-height: 100vh;
}
</style>
