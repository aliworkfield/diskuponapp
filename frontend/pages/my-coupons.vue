<template>
  <div>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">My Coupons</h1>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <!-- Loading indicator -->
        <div v-if="couponStore.isLoading" class="mt-4 text-center">
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-rose-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
        </div>
        
        <!-- Error message -->
        <div v-if="couponStore.error" class="mt-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ couponStore.error }}</h3>
            </div>
          </div>
        </div>
        
        <!-- Coupon List -->
        <div v-if="!couponStore.isLoading && couponStore.assignedCoupons.length > 0" class="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Your Assigned Coupons</h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
              <p>These are the coupons that have been assigned to you.</p>
            </div>
            
            <div class="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Brand</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tag</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Code</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expiration</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="coupon in couponStore.assignedCoupons" :key="coupon.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ coupon.brand }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.tag }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.code }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.expiration_date || 'N/A' }}</td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" class="text-rose-600 hover:text-rose-900">View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div v-else-if="!couponStore.isLoading && couponStore.assignedCoupons.length === 0" class="mt-6 text-center">
          <p class="text-sm text-gray-500">You don't have any assigned coupons yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { useCouponStore } from '@/stores'

definePageMeta({
  middleware: ['authenticated']
})

const couponStore = useCouponStore()

onMounted(() => {
  couponStore.fetchMyCoupons()
})
</script>