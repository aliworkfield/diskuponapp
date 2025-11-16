import type {
    ICoupon,
    ICouponUpload,
    ICouponAssign,
    IUserCoupon
  } from "@/interfaces"
import { apiCoupons } from "@/api"
import { useTokenStore } from "./tokens"
import { useToastStore } from "./toasts"

export const useCouponStore = defineStore("coupons", {
  state: () => ({
    coupons: [] as ICoupon[],
    userCoupons: [] as ICoupon[],
    assignments: [] as IUserCoupon[],
    loading: false,
    error: null as string | null
  }),
  getters: {
    allCoupons: (state) => state.coupons,
    assignedCoupons: (state) => state.userCoupons,
    couponAssignments: (state) => state.assignments,
    isLoading: (state) => state.loading
  },
  actions: {
    // UPLOAD COUPONS
    async uploadCoupons(data: ICouponUpload) {
      this.loading = true
      this.error = null
      try {
        const tokenStore = useTokenStore()
        const { data: response } = await apiCoupons.uploadCoupons(tokenStore.token, data)
        if (response.value) {
          const toastStore = useToastStore()
          toastStore.addNotice({
            title: "Success",
            content: response.value.msg,
          })
          // Refresh coupons after upload
          await this.fetchAllCoupons()
        }
      } catch (error) {
        this.error = "Failed to upload coupons"
        const toastStore = useToastStore()
        toastStore.addNotice({
          title: "Error",
          content: "Failed to upload coupons. Please try again.",
          icon: "error"
        })
      } finally {
        this.loading = false
      }
    },

    // ASSIGN COUPONS
    async assignCoupons(data: ICouponAssign) {
      this.loading = true
      this.error = null
      try {
        const tokenStore = useTokenStore()
        const { data: response } = await apiCoupons.assignCoupons(tokenStore.token, data)
        if (response.value) {
          const toastStore = useToastStore()
          toastStore.addNotice({
            title: "Success",
            content: response.value.msg,
          })
          // Refresh coupons and assignments after assignment
          await this.fetchAllCoupons()
          await this.fetchAllAssignments()
        }
      } catch (error) {
        this.error = "Failed to assign coupons"
        const toastStore = useToastStore()
        toastStore.addNotice({
          title: "Error",
          content: "Failed to assign coupons. Please try again.",
          icon: "error"
        })
      } finally {
        this.loading = false
      }
    },

    // FETCH ALL COUPONS
    async fetchAllCoupons() {
      this.loading = true
      this.error = null
      try {
        const tokenStore = useTokenStore()
        const { data: response } = await apiCoupons.getAllCoupons(tokenStore.token)
        if (response.value) {
          this.coupons = response.value
        }
      } catch (error) {
        this.error = "Failed to fetch coupons"
        const toastStore = useToastStore()
        toastStore.addNotice({
          title: "Error",
          content: "Failed to fetch coupons. Please try again.",
          icon: "error"
        })
      } finally {
        this.loading = false
      }
    },

    // FETCH USER'S COUPONS
    async fetchMyCoupons() {
      this.loading = true
      this.error = null
      try {
        const tokenStore = useTokenStore()
        const { data: response } = await apiCoupons.getMyCoupons(tokenStore.token)
        if (response.value) {
          this.userCoupons = response.value
        }
      } catch (error) {
        this.error = "Failed to fetch your coupons"
        const toastStore = useToastStore()
        toastStore.addNotice({
          title: "Error",
          content: "Failed to fetch your coupons. Please try again.",
          icon: "error"
        })
      } finally {
        this.loading = false
      }
    },

    // FETCH ALL ASSIGNMENTS
    async fetchAllAssignments() {
      this.loading = true
      this.error = null
      try {
        const tokenStore = useTokenStore()
        const { data: response } = await apiCoupons.getAllAssignments(tokenStore.token)
        if (response.value) {
          this.assignments = response.value
        }
      } catch (error) {
        this.error = "Failed to fetch assignments"
        const toastStore = useToastStore()
        toastStore.addNotice({
          title: "Error",
          content: "Failed to fetch assignments. Please try again.",
          icon: "error"
        })
      } finally {
        this.loading = false
      }
    }
  }
})