<template>
  <div class="space-y-4">
    <!-- Salutation -->
    <div>
      <label class="block font-semibold">Salutation*</label>
      <select
        :value="salutation"
        @input="$emit('update:salutation', $event)"
        @blur="$emit('blur:salutation')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.salutation }"
      >
        <option value="">Select salutation</option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Dr.">Dr.</option>
        <option value="Other">Other</option>
      </select>
      <p v-if="errors.salutation" class="text-red-500 text-sm">{{ errors.salutation }}</p>
    </div>

    <!-- First Name -->
    <div>
      <label class="block font-semibold">First Name*</label>
      <input
        type="text"
        :value="firstName"
        @input="$emit('update:firstName', $event)"
        @blur="$emit('blur:firstName')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.firstName }"
      />
      <p v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</p>
    </div>

    <!-- Last Name -->
    <div>
      <label class="block font-semibold">Last Name*</label>
      <input
        type="text"
        :value="lastName"
        @input="$emit('update:lastName', $event)"
        @blur="$emit('blur:lastName')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.lastName }"
      />
      <p v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  salutation: string
  firstName: string
  lastName: string
  errors: Record<string, string>
}>()

defineEmits([
  'update:salutation',
  'update:firstName',
  'update:lastName',
  'blur:salutation',
  'blur:firstName',
  'blur:lastName',
])
</script>
