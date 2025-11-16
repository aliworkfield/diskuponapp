<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Test Page</h1>
    <p>This is a test page to verify routing is working correctly.</p>
    <NuxtLink to="/login" class="text-blue-500 hover:text-blue-700">Go to Login</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>