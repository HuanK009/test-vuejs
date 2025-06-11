<template>
  <div class="flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-light">
        My <strong class="font-bold">Profile</strong> - Additional
      </h1>
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
          <label class="font-semibold block">Home address</label>
          <p class="text-gray-800">{{ user?.additional_info?.address }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Country</label>
          <p class="text-gray-800">{{ user?.additional_info?.country }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Postal code</label>
          <p class="text-gray-800">{{ user?.additional_info?.postal_code }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Date of birth</label>
          <p class="text-gray-800">
            {{
              user?.additional_info?.date_of_birth
                ? formatDate(user?.additional_info?.date_of_birth)
                : ''
            }}
          </p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Gender</label>
          <p class="text-gray-800">{{ user?.additional_info?.gender }}</p>
        </div>
        <div class="min-w-72">
          <label class="font-semibold block">Marital status </label>
          <p class="text-gray-800 capitalize">{{ user?.additional_info?.marital_status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '@/models'
const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
defineProps<{
  user: User | null
}>()
</script>
