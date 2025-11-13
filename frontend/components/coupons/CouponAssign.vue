<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Assign Coupons</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Assign coupons to users based on brand and tag.</p>
      </div>
      
      <form @submit.prevent="assignCoupons" class="mt-5 space-y-6">
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="brand" class="block text-sm font-medium text-gray-700">Brand</label>
            <div class="mt-1">
              <input
                type="text"
                id="brand"
                v-model="assignmentData.brand"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-3">
            <label for="tag" class="block text-sm font-medium text-gray-700">Tag</label>
            <div class="mt-1">
              <input
                type="text"
                id="tag"
                v-model="assignmentData.tag"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-3">
            <label for="target-type" class="block text-sm font-medium text-gray-700">Assignment Type</label>
            <div class="mt-1">
              <select
                id="target-type"
                v-model="assignmentData.target_type"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              >
                <option value="all">All Users</option>
                <option value="by_tag">By Role</option>
                <option value="manual">Manual Selection</option>
              </select>
            </div>
          </div>
          
          <div v-if="assignmentData.target_type === 'by_tag'" class="sm:col-span-3">
            <label for="target-value" class="block text-sm font-medium text-gray-700">Role Name</label>
            <div class="mt-1">
              <input
                type="text"
                id="target-value"
                v-model="assignmentData.target_value"
                placeholder="Enter role name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div v-if="assignmentData.target_type === 'manual'" class="sm:col-span-3">
            <label for="target-value" class="block text-sm font-medium text-gray-700">User IDs</label>
            <div class="mt-1">
              <input
                type="text"
                id="target-value"
                v-model="assignmentData.target_value"
                placeholder="Enter comma-separated user IDs"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-6">
            <label for="exclude-users" class="block text-sm font-medium text-gray-700">Exclude Users (Optional)</label>
            <div class="mt-1">
              <input
                type="text"
                id="exclude-users"
                v-model="assignmentData.exclude_users"
                placeholder="Enter comma-separated user IDs to exclude"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-end">
          <button
            type="submit"
            :disabled="assigning"
            class="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <span v-if="assigning">Assigning...</span>
            <span v-else>Assign Coupons</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore, useTokenStore } from '@/stores'

const authStore = useAuthStore()
const tokenStore = useTokenStore()

const assigning = ref(false)
const assignmentData = ref({
  brand: '',
  tag: '',
  target_type: 'all',
  target_value: '',
  exclude_users: ''
})

const assignCoupons = async () => {
  assigning.value = true
  try {
    // Here you would make an API call to assign the coupons
    // For now, we'll just show a success message
    alert('Coupons assigned successfully!')
    
    // Reset form
    assignmentData.value = {
      brand: '',
      tag: '',
      target_type: 'all',
      target_value: '',
      exclude_users: ''
    }
  } catch (error) {
    console.error('Error assigning coupons:', error)
    alert('Error assigning coupons')
  } finally {
    assigning.value = false
  }
}
</script>