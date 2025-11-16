<template>
  <div>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <!-- Stats -->
        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-rose-500 p-3">
                <TicketIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="truncate text-sm font-medium text-gray-500">Total Coupons</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalCoupons }}</dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-rose-500 p-3">
                <UserGroupIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="truncate text-sm font-medium text-gray-500">Active Users</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.activeUsers }}</dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-rose-500 p-3">
                <ClipboardDocumentCheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="truncate text-sm font-medium text-gray-500">Assignments This Month</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.assignmentsThisMonth }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div class="mt-4 overflow-hidden rounded-lg bg-white shadow">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="activity in recentActivities" :key="activity.id">
                <a href="#" class="block hover:bg-gray-50">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="flex min-w-0 flex-1 items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p class="truncate text-sm font-medium text-rose-600">{{ activity.title }}</p>
                          <p class="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span>{{ activity.time }}</span>
                          </p>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-900">
                              {{ activity.description }}
                            </p>
                            <p class="mt-2 flex items-center text-sm text-gray-500">
                              <UserGroupIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span>{{ activity.usersAffected }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TicketIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  CalendarIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'
import { useCouponStore } from '@/stores'

definePageMeta({
  middleware: ['authenticated']
})

// Mock data for stats
const stats = ref({
  totalCoupons: 142,
  activeUsers: 28,
  assignmentsThisMonth: 37
})

// Mock data for recent activities
const recentActivities = ref([
  {
    id: 1,
    title: 'Nike coupons assigned to Marketing team',
    time: 'Just now',
    description: 'Assigned by Sarah Johnson',
    usersAffected: '5 users affected'
  },
  {
    id: 2,
    title: 'Adidas coupons uploaded',
    time: '2 hours ago',
    description: 'Uploaded by Michael Chen',
    usersAffected: '50 coupons added'
  }
])

// In a real application, you would fetch this data from the API
// For example:
// const couponStore = useCouponStore()
// onMounted(() => {
//   // Fetch real data from the API
// })
</script>