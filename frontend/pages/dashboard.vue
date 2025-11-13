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
                  <dd class="text-lg font-medium text-gray-900">142</dd>
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
                  <dd class="text-lg font-medium text-gray-900">28</dd>
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
                  <dd class="text-lg font-medium text-gray-900">37</dd>
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
              <li>
                <a href="#" class="block hover:bg-gray-50">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="flex min-w-0 flex-1 items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p class="truncate text-sm font-medium text-rose-600">Nike coupons assigned to Marketing team</p>
                          <p class="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span>Just now</span>
                          </p>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-900">
                              Assigned by <span class="font-medium">Sarah Johnson</span>
                            </p>
                            <p class="mt-2 flex items-center text-sm text-gray-500">
                              <UserGroupIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span>5 users affected</span>
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
              <li>
                <a href="#" class="block hover:bg-gray-50">
                  <div class="flex items-center px-4 py-4 sm:px-6">
                    <div class="flex min-w-0 flex-1 items-center">
                      <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p class="truncate text-sm font-medium text-rose-600">Adidas coupons uploaded</p>
                          <p class="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span>2 hours ago</span>
                          </p>
                        </div>
                        <div class="hidden md:block">
                          <div>
                            <p class="text-sm text-gray-900">
                              Uploaded by <span class="font-medium">Michael Chen</span>
                            </p>
                            <p class="mt-2 flex items-center text-sm text-gray-500">
                              <TicketIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span>50 coupons added</span>
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

definePageMeta({
  middleware: ['authenticated']
})
</script>