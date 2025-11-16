export interface ICoupon {
  id: number
  brand: string
  tag: string
  code: string
  expiration_date: string | null
  is_assigned: boolean
  assigned_to_user_id: number | null
}

export interface ICouponCreate {
  brand: string
  tag: string
  code: string
  expiration_date: string | null
}

export interface ICouponUpload {
  coupons: ICouponCreate[]
}

export interface ICouponAssign {
  brand: string
  tag: string
  target_type: string // "all", "by_tag", "manual"
  target_value: string | null // tag value or comma-separated user IDs
  exclude_users: string | null // comma-separated user IDs to exclude
}

export interface IUserCoupon {
  id: number
  user_id: number
  coupon_id: number
  assigned_by: number
  assigned_at: string
}