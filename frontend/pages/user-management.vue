<template>
  <div>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">User Management</h1>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <!-- User List -->
        <div class="mt-6">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Users</h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage user roles and permissions.</p>
              </div>
              
              <div class="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Sarah Johnson</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">sarah@example.com</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Manager</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" class="text-rose-600 hover:text-rose-900">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Michael Chen</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">michael@example.com</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">User</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" class="text-rose-600 hover:text-rose-900">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})
</script>