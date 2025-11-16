// src/api/coupons.ts
import axios, { AxiosInstance } from 'axios';

// Define interfaces for our data structures
export interface ICoupon {
  id: number;
  brand: string;
  tag: string;
  code: string;
  expiration_date: string | null;
  is_assigned: boolean;
  assigned_to_user_id: number | null;
}

export interface ICouponUpload {
  brand: string;
  tag: string;
  code: string;
  expiration_date?: string;
}

export interface ICouponAssign {
  coupon_ids: number[];
  user_id: number;
}

export interface IMsg {
  msg: string;
}

// Create axios instance with base URL
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// API functions
export const apiCoupons = {
  // Upload coupons
  async uploadCoupons(data: ICouponUpload[]): Promise<IMsg> {
    const response = await apiClient.post<IMsg>('/coupons/upload', data);
    return response.data;
  },

  // Assign coupons to user
  async assignCoupons(data: ICouponAssign): Promise<IMsg> {
    const response = await apiClient.post<IMsg>('/coupons/assign', data);
    return response.data;
  },

  // Get all coupons
  async getAllCoupons(): Promise<ICoupon[]> {
    const response = await apiClient.get<ICoupon[]>('/coupons/');
    return response.data;
  },

  // Get user's coupons
  async getMyCoupons(): Promise<ICoupon[]> {
    const response = await apiClient.get<ICoupon[]>('/coupons/my');
    return response.data;
  },

  // Windows authentication
  async windowsAuth(username: string): Promise<{ token: string; user: any }> {
    const response = await apiClient.post<{ token: string; user: any }>('/auth/windows', { username });
    return response.data;
  }
};