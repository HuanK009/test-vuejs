<template>
  <div class="space-y-4">
    <!-- Salutation -->
    <div>
      <label class="block font-semibold">Salutation*</label>
      <select
        :value="salutation"
        @input="$emit('update:salutation', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur:salutation')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.salutation }"
      >
        <option value="">Select salutation</option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
      </select>
      <p v-if="errors.salutation" class="text-red-500 text-sm">{{ errors.salutation }}</p>
    </div>

    <!-- First Name -->
    <div>
      <label class="block font-semibold">First name*</label>
      <input
        type="text"
        :value="firstName"
        @input="$emit('update:firstName', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur:firstName')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.first_name }"
      />
      <p v-if="errors.first_name" class="text-red-500 text-sm mt-1">
        {{ errors.first_name }}
      </p>
    </div>

    <!-- Last Name -->
    <div>
      <label class="block font-semibold">Last name*</label>
      <input
        type="text"
        :value="lastName"
        @input="$emit('update:lastName', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur:lastName')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.last_name }"
      />
      <p v-if="errors.last_name" class="text-red-500 text-sm mt-1">
        {{ errors.last_name }}
      </p>
    </div>

    <!-- Email -->
    <div>
      <label class="block font-semibold">Email address*</label>
      <input
        type="email"
        :value="email"
        @input="$emit('update:email', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur:email')"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  salutation: string
  firstName: string
  lastName: string
  email: string
  errors: {
    salutation?: string
    first_name?: string
    last_name?: string
    email?: string
  }
}>()

defineEmits([
  'update:salutation',
  'update:firstName',
  'update:lastName',
  'update:email',
  'blur:salutation',
  'blur:firstName',
  'blur:lastName',
  'blur:email',
])
</script>
