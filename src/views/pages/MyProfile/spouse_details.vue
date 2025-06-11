<template>
  <div class="flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-light">My <strong class="font-bold">Profile</strong> - Spouse</h1>
      <div class="text-sm text-right">
        <a href="./edit-profile" class="underline">Edit profile</a>
        <span class="ml-1">✎</span>
      </div>
    </div>
    <hr class="border-gray-400 mb-6" />

    <div class="flex flex-wrap items-start">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 w-full md:w-3/4 pl-2 lg:pl-4"
      >
        <div class="min-w-72">
          <label class="font-semibold block">Salutation</label>
          <p class="text-gray-800">{{ user?.spouse_info?.salutation }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">First name</label>
          <p class="text-gray-800">{{ user?.spouse_info?.first_name }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Last name</label>
          <p class="text-gray-800">{{ user?.spouse_info?.last_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@/models'

defineProps<{
  user: User | null
}>()
</script>
