<template>
  <div class="space-y-4">
    <!-- Hobbies -->
    <div>
      <label class="block font-semibold">Hobbies</label>
      <textarea
        :value="hobbies"
        @input="$emit('update:hobbies', $event)"
        rows="2"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.hobbies }"
      ></textarea>
      <p v-if="errors.hobbies" class="text-red-500 text-sm">{{ errors.hobbies }}</p>
    </div>

    <!-- Sports -->
    <div>
      <label class="block font-semibold">Favorite Sports</label>
      <textarea
        :value="sports"
        @input="$emit('update:sports', $event)"
        rows="2"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.sports }"
      ></textarea>
      <p v-if="errors.sports" class="text-red-500 text-sm">{{ errors.sports }}</p>
    </div>

    <!-- Music -->
    <div>
      <label class="block font-semibold">Favorite Music</label>
      <textarea
        :value="music"
        @input="$emit('update:music', $event)"
        rows="2"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.music }"
      ></textarea>
      <p v-if="errors.music" class="text-red-500 text-sm">{{ errors.music }}</p>
    </div>

    <!-- Movies -->
    <div>
      <label class="block font-semibold">Favorite Movies</label>
      <textarea
        :value="movies"
        @input="$emit('update:movies', $event)"
        rows="2"
        class="w-full border rounded px-3 py-2"
        :class="{ 'border-red-500': errors.movies }"
      ></textarea>
      <p v-if="errors.movies" class="text-red-500 text-sm">{{ errors.movies }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hobbies: string
  sports: string
  music: string
  movies: string
  errors: Record<string, string>
}>()

defineEmits([
  'update:hobbies',
  'update:sports',
  'update:music',
  'update:movies',
  'blur:hobbies',
  'blur:sports',
  'blur:music',
  'blur:movies',
])
</script>
