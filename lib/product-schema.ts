import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price is required"),
  discountPrice: z.coerce.number().positive().optional().or(z.literal("").transform(() => undefined)),
  stock: z.coerce.number().int().min(0),
  sku: z.string().min(1, "SKU is required"),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  warranty: z.string().optional(),
  returnPolicy: z.string().optional(),
  deliveryInfo: z.string().optional(),
  variants: z.array(z.any()).default([]),
  attributes: z.array(z.any()).default([])
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
