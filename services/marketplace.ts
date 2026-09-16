import { api, ApiResponse } from "@/services/api";
import { Address, Order, ReturnRequest } from "@/types";

export type CheckoutSummary = {
  cart: { items: unknown[] };
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  coupon?: unknown;
};

export const checkoutApi = {
  summary: async (couponCode?: string) =>
    (await api.get<ApiResponse<CheckoutSummary>>("/checkout/summary", { params: { couponCode } })).data.data,
  applyCoupon: async (code: string) =>
    (await api.post<ApiResponse<CheckoutSummary>>("/checkout/apply-coupon", { code })).data.data,
  placeOrder: async (payload: Record<string, unknown>) =>
    (await api.post<ApiResponse<Order>>("/checkout/place-order", payload)).data.data
};

export const customerApi = {
  stats: async () => (await api.get<ApiResponse<Record<string, number>>>("/customer/dashboard/stats")).data.data,
  addresses: async () => (await api.get<ApiResponse<Address[]>>("/customer/addresses")).data.data,
  orders: async () => (await api.get<ApiResponse<Order[]>>("/customer/orders")).data.data,
  order: async (id: string) => (await api.get<ApiResponse<Order>>(`/customer/orders/${id}`)).data.data,
  cancelOrder: async (id: string, reason?: string) =>
    (await api.put<ApiResponse<Order>>(`/customer/orders/${id}/cancel`, { reason })).data.data,
  tracking: async (id: string) => (await api.get<ApiResponse<unknown>>(`/customer/orders/${id}/tracking`)).data.data,
  returns: async () => (await api.get<ApiResponse<ReturnRequest[]>>("/customer/returns")).data.data,
  createReturn: async (payload: Record<string, unknown>) =>
    (await api.post<ApiResponse<ReturnRequest>>("/customer/returns", payload)).data.data,
  supportTickets: async () => (await api.get<ApiResponse<unknown[]>>("/customer/support-tickets")).data.data,
  createSupportTicket: async (payload: Record<string, unknown>) =>
    (await api.post<ApiResponse<unknown>>("/customer/support-tickets", payload)).data.data
};

export const sellerApi = {
  stats: async () => (await api.get<ApiResponse<Record<string, number>>>("/seller/orders/stats")).data.data,
  orders: async () => (await api.get<ApiResponse<Order[]>>("/seller/orders")).data.data,
  order: async (id: string) => (await api.get<ApiResponse<Order>>(`/seller/orders/${id}`)).data.data,
  updateOrderStatus: async (id: string, status: string) =>
    (await api.put<ApiResponse<Order>>(`/seller/orders/${id}/status`, { status })).data.data,
  reviews: async () => (await api.get<ApiResponse<unknown[]>>("/seller/reviews")).data.data,
  generateDescription: async (payload: Record<string, unknown>) =>
    (await api.post<ApiResponse<Record<string, unknown>>>("/ai/generate-product-description", payload)).data.data
};

export const adminApi = {
  analytics: async () => (await api.get<ApiResponse<Record<string, unknown>>>("/admin/dashboard/analytics")).data.data,
  orders: async () => (await api.get<ApiResponse<Order[]>>("/admin/orders")).data.data,
  order: async (id: string) => (await api.get<ApiResponse<Order>>(`/admin/orders/${id}`)).data.data,
  updateOrderStatus: async (id: string, status: string) =>
    (await api.put<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status })).data.data,
  list: async <T>(path: string) => (await api.get<ApiResponse<T[]>>(path)).data.data,
  create: async <T>(path: string, payload: Record<string, unknown>) => (await api.post<ApiResponse<T>>(path, payload)).data.data,
  update: async <T>(path: string, payload: Record<string, unknown>) => (await api.put<ApiResponse<T>>(path, payload)).data.data,
  remove: async (path: string) => (await api.delete<ApiResponse<void>>(path)).data.data
};

export const publicMarketplaceApi = {
  flashSales: async () => (await api.get<ApiResponse<unknown[]>>("/flash-sales/active")).data.data,
  blogs: async () => (await api.get<ApiResponse<unknown[]>>("/blogs")).data.data,
  blog: async (slug: string) => (await api.get<ApiResponse<Record<string, unknown>>>(`/blogs/${slug}`)).data.data,
  page: async (slug: string) => (await api.get<ApiResponse<Record<string, unknown>>>(`/pages/${slug}`)).data.data,
  banners: async () => (await api.get<ApiResponse<unknown[]>>("/banners")).data.data,
  coupons: async () => (await api.get<ApiResponse<unknown[]>>("/coupons/available")).data.data,
  searchSuggestions: async (q: string) =>
    (await api.get<ApiResponse<{ label: string; slug: string }[]>>("/search/suggestions", { params: { q } })).data.data,
  popularSearches: async () => (await api.get<ApiResponse<{ label: string; slug: string }[]>>("/search/popular")).data.data
};
