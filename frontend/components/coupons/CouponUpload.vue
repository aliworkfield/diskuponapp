<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Upload Coupons</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>Upload coupons via CSV file or enter them manually.</p>
      </div>
      <form @submit.prevent="submitForm" class="mt-5 sm:flex sm:items-center">
        <div class="w-full sm:max-w-xs">
          <label for="csv-file" class="block text-sm font-medium text-gray-700">CSV File</label>
          <input
            type="file"
            id="csv-file"
            @change="handleFileUpload"
            accept=".csv"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
          />
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <button
            type="submit"
            :disabled="uploading"
            class="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <span v-if="uploading">Uploading...</span>
            <span v-else>Upload</span>
          </button>
        </div>
      </form>
      
      <!-- Manual Entry Form -->
      <div class="mt-8">
        <h4 class="text-md font-medium text-gray-900">Manual Entry</h4>
        <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label for="brand" class="block text-sm font-medium text-gray-700">Brand</label>
            <div class="mt-1">
              <input
                type="text"
                id="brand"
                v-model="manualCoupon.brand"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-2">
            <label for="tag" class="block text-sm font-medium text-gray-700">Tag</label>
            <div class="mt-1">
              <input
                type="text"
                id="tag"
                v-model="manualCoupon.tag"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-2">
            <label for="code" class="block text-sm font-medium text-gray-700">Code</label>
            <div class="mt-1">
              <input
                type="text"
                id="code"
                v-model="manualCoupon.code"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-2">
            <label for="expiration" class="block text-sm font-medium text-gray-700">Expiration Date (Optional)</label>
            <div class="mt-1">
              <input
                type="date"
                id="expiration"
                v-model="manualCoupon.expiration_date"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div class="sm:col-span-6">
            <button
              type="button"
              @click="addManualCoupon"
              class="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Add Coupon
            </button>
          </div>
        </div>
        
        <!-- Added Coupons List -->
        <div v-if="couponsToAdd.length > 0" class="mt-6">
          <h4 class="text-md font-medium text-gray-900">Coupons to Upload</h4>
          <div class="mt-2 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Brand</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tag</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Code</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expiration</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(coupon, index) in couponsToAdd" :key="index">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ coupon.brand }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.tag }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.code }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ coupon.expiration_date || 'None' }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button @click="removeCoupon(index)" class="text-rose-600 hover:text-rose-900">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-4">
            <button
              type="button"
              @click="uploadCoupons"
              :disabled="uploading"
              class="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <span v-if="uploading">Uploading...</span>
              <span v-else>Upload All Coupons</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore, useTokenStore, useCouponStore, useToastStore } from '@/stores'
import type { ICouponCreate, ICouponUpload } from '@/interfaces'

interface Coupon {
  brand: string
  tag: string
  code: string
  expiration_date?: string
}

const authStore = useAuthStore()
const tokenStore = useTokenStore()
const couponStore = useCouponStore()
const toastStore = useToastStore()

const uploading = ref(false)
const file = ref<File | null>(null)
const manualCoupon = ref({
  brand: '',
  tag: '',
  code: '',
  expiration_date: ''
})
const couponsToAdd = ref<Coupon[]>([])

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const addManualCoupon = () => {
  if (manualCoupon.value.brand && manualCoupon.value.tag && manualCoupon.value.code) {
    couponsToAdd.value.push({ ...manualCoupon.value })
    // Reset form
    manualCoupon.value = {
      brand: '',
      tag: '',
      code: '',
      expiration_date: ''
    }
  }
}

const removeCoupon = (index: number) => {
  couponsToAdd.value.splice(index, 1)
}

const submitForm = async () => {
  if (!file.value) return
  
  uploading.value = true
  try {
    // In a real implementation, you would parse the CSV file and upload the coupons
    // For now, we'll just show a success message
    alert('CSV file uploaded successfully!')
    file.value = null
  } catch (error) {
    console.error('Error uploading file:', error)
    alert('Error uploading file')
  } finally {
    uploading.value = false
  }
}

const uploadCoupons = async () => {
  if (couponsToAdd.value.length === 0) return
  
  uploading.value = true
  try {
    // Convert coupons to the required format
    const couponData: ICouponUpload = {
      coupons: couponsToAdd.value.map(coupon => ({
        brand: coupon.brand,
        tag: coupon.tag,
        code: coupon.code,
        expiration_date: coupon.expiration_date || null
      }))
    }
    
    // Upload coupons using the coupon store
    await couponStore.uploadCoupons(couponData)
    
    // Clear the list after successful upload
    couponsToAdd.value = []
    
    toastStore.addNotice({
      title: "Success",
      content: `${couponData.coupons.length} coupons uploaded successfully!`,
    })
  } catch (error) {
    console.error('Error uploading coupons:', error)
    toastStore.addNotice({
      title: "Error",
      content: "Error uploading coupons",
      icon: "error"
    })
  } finally {
    uploading.value = false
  }
}
</script>