<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Debug Page</h1>
    <p>This page is for debugging routing issues.</p>
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Current Route Info:</h2>
      <pre>{{ route }}</pre>
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Available Pages:</h2>
      <ul>
        <li><NuxtLink to="/" class="text-blue-500 hover:text-blue-700">Home</NuxtLink></li>
        <li><NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">Login</NuxtLink></li>
        <li><NuxtLink to="/dashboard" class="text-blue-500 hover:text-blue-700">Dashboard</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const route = useRoute();
</script>