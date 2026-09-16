"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api, ApiResponse } from "@/services/api";
import { AuthPayload, User, UserRole } from "@/types";
import { CustomerRegisterValues, LoginValues, ProfileValues, SellerRegisterValues } from "@/lib/auth-schemas";

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (values: LoginValues) => Promise<AuthPayload>;
  registerCustomer: (values: CustomerRegisterValues) => Promise<AuthPayload>;
  registerSeller: (values: SellerRegisterValues) => Promise<AuthPayload>;
  fetchMe: () => Promise<User | null>;
  updateProfile: (values: ProfileValues) => Promise<User>;
  logout: () => void;
  redirectPathForRole: (role: UserRole) => string;
};

const persistToken = (token: string | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    localStorage.setItem("lankacart-auth-token", token);
  } else {
    localStorage.removeItem("lankacart-auth-token");
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      login: async (values) => {
        set({ isLoading: true });
        try {
          const response = await api.post<ApiResponse<AuthPayload>>("/auth/login", values);
          const payload = response.data.data;
          set({
            user: payload.user,
            token: payload.tokens.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
          persistToken(payload.tokens.accessToken);
          return payload;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      registerCustomer: async (values) => {
        set({ isLoading: true });
        try {
          const response = await api.post<ApiResponse<AuthPayload>>("/auth/register/customer", values);
          const payload = response.data.data;
          set({
            user: payload.user,
            token: payload.tokens.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
          persistToken(payload.tokens.accessToken);
          return payload;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      registerSeller: async (values) => {
        set({ isLoading: true });
        try {
          const response = await api.post<ApiResponse<AuthPayload>>("/auth/register/seller", values);
          const payload = response.data.data;
          set({
            user: payload.user,
            token: payload.tokens.accessToken,
            isAuthenticated: true,
            isLoading: false
          });
          persistToken(payload.tokens.accessToken);
          return payload;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      fetchMe: async () => {
        if (!get().token) {
          return null;
        }

        const response = await api.get<ApiResponse<User>>("/auth/me");
        set({
          user: response.data.data,
          isAuthenticated: true
        });
        return response.data.data;
      },
      updateProfile: async (values) => {
        const response = await api.put<ApiResponse<User>>("/auth/profile", values);
        set({ user: response.data.data });
        return response.data.data;
      },
      logout: () => {
        persistToken(null);
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },
      redirectPathForRole: (role) => {
        if (role === "ADMIN") return "/admin/dashboard";
        if (role === "SELLER") return "/seller/dashboard";
        return "/";
      }
    }),
    {
      name: "lankacart-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        persistToken(state?.token ?? null);
      }
    }
  )
);
