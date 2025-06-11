<template>
  <div class="min-h-screen bg-cover bg-center bg-blue">
    <side_menu />
    <header class="flex justify-between items-center p-4">
      <logo_component />
    </header>

    <div
      class="flex gap-4 max-w-[90vw] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1440px] mx-auto"
    >
      <div
        class="text-center flex-1 bg-[#fff9] backdrop-blur-xs border-white shadow-lg border p-8 rounded-lg"
      >
        <h1 class="text-4xl font-bold text-gray-800">Welcome to the Homepage</h1>
        <p class="mt-4 text-gray-600">This is a blank starting point. Customize as needed.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo_component from '@/components/logo_component.vue'
import side_menu from '@/components/side_menu.vue'
</script>
