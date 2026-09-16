import { z } from "zod";

const passwordSchema = z.string().min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

export const customerRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  password: passwordSchema
});

export const sellerRegisterSchema = customerRegisterSchema.extend({
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  storeName: z.string().min(1, "Store name is required"),
  storeDescription: z.string().min(10, "Store description must be at least 10 characters"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  bankName: z.string().min(1, "Bank name is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
  accountNumber: z.string().min(4, "Account number is required"),
  branchName: z.string().min(1, "Branch name is required")
});

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(7, "Phone number is required").optional()
});

export type LoginValues = z.infer<typeof loginSchema>;
export type CustomerRegisterValues = z.infer<typeof customerRegisterSchema>;
export type SellerRegisterValues = z.infer<typeof sellerRegisterSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
