import { useAuthStore } from "@/stores"

export default defineNuxtRouteMiddleware((to, from) => {
  const routes = ["/login", "/join", "/recover-password", "/reset-password"]
  const authStore = useAuthStore()
  
  // If user is logged in and trying to access anonymous routes, redirect to home
  if (authStore.loggedIn) {
    if (routes.includes(to.path)) {
      return navigateTo("/")
    }
  }
  
  // Always allow access to anonymous routes
  return
})