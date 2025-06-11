<template>
  <div class="flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-light">My <strong class="font-bold">Profile</strong></h1>
      <div class="text-sm text-right">
        <a href="./edit-profile" class="underline">Edit profile</a>
        <span class="ml-1">✎</span>
      </div>
    </div>
    <hr class="border-gray-400 mb-6" />

    <div class="flex flex-wrap items-start">
      <!-- Avatar -->
      <div class="w-full md:w-fit md:max-w-1/4 flex-shrink-0 pr-0 pb-4 md:pr-2 lg:pr-4">
        <div
          class="bg-gray-500 rounded-full w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 overflow-hidden p-1"
        >
          <img :src="'http://convertium-test.local/' + user?.avatar" alt="" />
        </div>
      </div>

      <!-- Profile fields -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 w-full md:w-3/4 pl-2 lg:pl-4"
      >
        <div class="min-w-72">
          <label class="font-semibold block">Salutation</label>
          <p class="text-gray-800">{{ user?.salutation }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">First name</label>
          <p class="text-gray-800">{{ user?.first_name }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Last name</label>
          <p class="text-gray-800">{{ user?.last_name }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Email address</label>
          <p class="text-gray-800">{{ user?.email }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Register</label>
          <p class="text-gray-800">{{ user?.created_at ? formatDate(user?.created_at) : '' }}</p>
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
const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
</script>
