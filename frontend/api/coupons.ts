import type {
    ICoupon,
    ICouponUpload,
    ICouponAssign,
    IUserCoupon,
    IMsg
  } from "@/interfaces"
import { apiCore } from "./core"

export const apiCoupons = {
  // UPLOAD COUPONS
  async uploadCoupons(token: string, data: ICouponUpload) {
    return await useFetch<IMsg>(`${apiCore.url()}/coupons/upload`,
      {
        method: "POST",
        body: data,
        headers: apiCore.headers(token)
      }
    )
  },

  // ASSIGN COUPONS
  async assignCoupons(token: string, data: ICouponAssign) {
    return await useFetch<IMsg>(`${apiCore.url()}/coupons/assign`,
      {
        method: "POST",
        body: data,
        headers: apiCore.headers(token)
      }
    )
  },

  // GET ALL COUPONS
  async getAllCoupons(token: string) {
    return await useFetch<ICoupon[]>(`${apiCore.url()}/coupons/`,
      {
        headers: apiCore.headers(token)
      }
    )
  },

  // GET USER'S COUPONS
  async getMyCoupons(token: string) {
    return await useFetch<ICoupon[]>(`${apiCore.url()}/coupons/my-coupons`,
      {
        headers: apiCore.headers(token)
      }
    )
  },

  // GET ALL ASSIGNMENTS
  async getAllAssignments(token: string) {
    return await useFetch<IUserCoupon[]>(`${apiCore.url()}/coupons/assignments`,
      {
        headers: apiCore.headers(token)
      }
    )
  }
}