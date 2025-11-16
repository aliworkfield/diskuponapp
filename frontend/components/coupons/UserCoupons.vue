<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">My Coupons</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>View coupons assigned to you.</p>
      </div>
      
      <div v-if="loading" class="mt-4 text-center">
        <p>Loading coupons...</p>
      </div>
      
      <div v-else-if="couponStore.assignedCoupons.length === 0" class="mt-4 text-center">
        <p>You don't have any coupons assigned yet.</p>
      </div>
      
      <div v-else class="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Brand</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tag</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Code</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expiration</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="coupon in couponStore.assignedCoupons" :key="coupon.id">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ coupon.brand }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.tag }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.code }}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.expiration_date || 'None' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore, useTokenStore, useCouponStore } from '@/stores'
import type { ICoupon } from '@/interfaces'

const authStore = useAuthStore()
const tokenStore = useTokenStore()
const couponStore = useCouponStore()

const loading = ref(true)

onMounted(async () => {
  await loadCoupons()
})

const loadCoupons = async () => {
  try {
    // Load coupons using the coupon store
    await couponStore.fetchMyCoupons()
  } catch (error) {
    console.error('Error loading coupons:', error)
  } finally {
    loading.value = false
  }
}
</script>