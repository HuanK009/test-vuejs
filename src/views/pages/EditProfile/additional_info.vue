<template>
  <div class="space-y-4">
    <!-- Address -->
    <div>
      <label class="block font-semibold">Address*</label>
      <input
        type="text"
        :value="address"
        @input="$emit('update:address', $event)"
        @blur="$emit('blur:address')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.address }"
      />
      <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
    </div>

    <!-- Country -->
    <div>
      <label class="block font-semibold">Country*</label>
      <input
        type="text"
        :value="country"
        @input="$emit('update:country', $event)"
        @blur="$emit('blur:country')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.country }"
      />
      <p v-if="errors.country" class="text-red-500 text-sm">{{ errors.country }}</p>
    </div>

    <!-- Postal Code -->
    <div>
      <label class="block font-semibold">Postal Code*</label>
      <input
        type="text"
        :value="postalCode"
        @input="$emit('update:postalCode', $event)"
        @blur="$emit('blur:postalCode')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.postalCode }"
      />
      <p v-if="errors.postalCode" class="text-red-500 text-sm">{{ errors.postalCode }}</p>
    </div>

    <!-- Date of Birth -->
    <div>
      <label class="block font-semibold">Date of Birth*</label>
      <input
        type="date"
        :value="dateOfBirth"
        :max="maxDate"
        @input="$emit('update:dateOfBirth', $event)"
        @blur="$emit('blur:dateOfBirth')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.dateOfBirth }"
      />
      <p v-if="errors.dateOfBirth" class="text-red-500 text-sm">{{ errors.dateOfBirth }}</p>
    </div>

    <!-- Gender -->
    <div>
      <label class="block font-semibold">Gender*</label>
      <select
        :value="gender"
        @input="$emit('update:gender', $event)"
        @blur="$emit('blur:gender')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.gender }"
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <p v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender }}</p>
    </div>

    <!-- Marital Status -->
    <div>
      <label class="block font-semibold">Marital Status*</label>
      <select
        :value="maritalStatus"
        @input="$emit('update:maritalStatus', $event)"
        @blur="$emit('blur:maritalStatus')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.maritalStatus }"
      >
        <option value="">Select status</option>
        <option value="single">Single</option>
        <option value="married">Married</option>
      </select>
      <p v-if="errors.maritalStatus" class="text-red-500 text-sm">{{ errors.maritalStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  address: string
  country: string
  postalCode: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  errors: Record<string, string>
}>()

defineEmits([
  'update:address',
  'update:country',
  'update:postalCode',
  'update:dateOfBirth',
  'update:gender',
  'update:maritalStatus',
  'blur:address',
  'blur:country',
  'blur:postalCode',
  'blur:dateOfBirth',
  'blur:gender',
  'blur:maritalStatus',
])

// Calculate max date (17 years ago from today)
const today = new Date()
const maxDate = computed(() => {
  const year = today.getFullYear() - 17
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})
</script>
