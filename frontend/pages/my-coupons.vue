<template>
  <div>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">My Coupons</h1>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div class="mt-6">
          <UserCoupons />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCoupons from '@/components/coupons/UserCoupons.vue'

definePageMeta({
  middleware: ['authenticated']
})
</script>