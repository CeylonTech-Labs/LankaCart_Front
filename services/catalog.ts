import { api, ApiResponse } from "@/services/api";
import { Brand, Cart, Category, Product, WishlistItem } from "@/types";

export type ProductListParams = {
  q?: string;
  keyword?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type PaginatedProducts = {
  products: Product[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const catalogApi = {
  categories: async () => (await api.get<ApiResponse<Category[]>>("/categories")).data.data,
  category: async (slug: string) => (await api.get<ApiResponse<Category>>(`/categories/${slug}`)).data.data,
  brands: async () => (await api.get<ApiResponse<Brand[]>>("/brands")).data.data,
  products: async (params?: ProductListParams): Promise<PaginatedProducts> => {
    const response = await api.get<ApiResponse<Product[]> & { meta?: PaginatedProducts["meta"] }>("/products", {
      params
    });
    return { products: response.data.data, meta: response.data.meta };
  },
  featured: async () => (await api.get<ApiResponse<Product[]>>("/products/featured")).data.data,
  newArrivals: async () => (await api.get<ApiResponse<Product[]>>("/products/new-arrivals")).data.data,
  topSelling: async () => (await api.get<ApiResponse<Product[]>>("/products/top-selling")).data.data,
  product: async (slug: string) => (await api.get<ApiResponse<Product>>(`/products/${slug}`)).data.data,
  productsByCategory: async (slug: string, params?: ProductListParams) => {
    const response = await api.get<ApiResponse<Product[]> & { meta?: PaginatedProducts["meta"] }>(
      `/products/category/${slug}`,
      { params }
    );
    return { products: response.data.data, meta: response.data.meta };
  }
};

export const cartApi = {
  get: async () => (await api.get<ApiResponse<Cart>>("/cart")).data.data,
  add: async (productId: string, quantity = 1) =>
    (await api.post<ApiResponse<Cart>>("/cart/items", { productId, quantity })).data.data,
  update: async (itemId: string, quantity: number) =>
    (await api.put<ApiResponse<Cart>>(`/cart/items/${itemId}`, { quantity })).data.data,
  remove: async (itemId: string) => (await api.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`)).data.data,
  clear: async () => (await api.delete<ApiResponse<Cart>>("/cart/clear")).data.data
};

export const wishlistApi = {
  get: async () => (await api.get<ApiResponse<WishlistItem[]>>("/wishlist")).data.data,
  add: async (productId: string) => (await api.post<ApiResponse<WishlistItem>>(`/wishlist/${productId}`)).data.data,
  remove: async (productId: string) => (await api.delete<ApiResponse<void>>(`/wishlist/${productId}`)).data.data
};

export const adminCatalogApi = {
  createCategory: async (payload: Partial<Category>) =>
    (await api.post<ApiResponse<Category>>("/admin/categories", payload)).data.data,
  updateCategory: async (id: string, payload: Partial<Category>) =>
    (await api.put<ApiResponse<Category>>(`/admin/categories/${id}`, payload)).data.data,
  deleteCategory: async (id: string) => (await api.delete<ApiResponse<void>>(`/admin/categories/${id}`)).data.data,
  createBrand: async (payload: Partial<Brand>) => (await api.post<ApiResponse<Brand>>("/admin/brands", payload)).data.data,
  updateBrand: async (id: string, payload: Partial<Brand>) =>
    (await api.put<ApiResponse<Brand>>(`/admin/brands/${id}`, payload)).data.data,
  deleteBrand: async (id: string) => (await api.delete<ApiResponse<void>>(`/admin/brands/${id}`)).data.data,
  products: async () => (await api.get<ApiResponse<Product[]>>("/admin/products")).data.data,
  pendingProducts: async () => (await api.get<ApiResponse<Product[]>>("/admin/products/pending")).data.data,
  approveProduct: async (id: string) => (await api.put<ApiResponse<Product>>(`/admin/products/${id}/approve`)).data.data,
  rejectProduct: async (id: string) => (await api.put<ApiResponse<Product>>(`/admin/products/${id}/reject`)).data.data,
  featureProduct: async (id: string, isFeatured: boolean) =>
    (await api.put<ApiResponse<Product>>(`/admin/products/${id}/feature`, { isFeatured })).data.data,
  deleteProduct: async (id: string) => (await api.delete<ApiResponse<void>>(`/admin/products/${id}`)).data.data
};

export const sellerProductApi = {
  products: async () => (await api.get<ApiResponse<Product[]>>("/seller/products")).data.data,
  product: async (id: string) => (await api.get<ApiResponse<Product>>(`/seller/products/${id}`)).data.data,
  create: async (payload: Record<string, unknown>) =>
    (await api.post<ApiResponse<Product>>("/seller/products", payload)).data.data,
  update: async (id: string, payload: Record<string, unknown>) =>
    (await api.put<ApiResponse<Product>>(`/seller/products/${id}`, payload)).data.data,
  delete: async (id: string) => (await api.delete<ApiResponse<void>>(`/seller/products/${id}`)).data.data,
  uploadImages: async (id: string, files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    return (await api.post<ApiResponse<unknown>>(`/seller/products/${id}/images`, formData)).data.data;
  }
};
