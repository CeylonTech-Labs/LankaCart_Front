"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema, ProductFormValues } from "@/lib/product-schema";
import { catalogApi } from "@/services/catalog";
import { sellerApi } from "@/services/marketplace";
import { Brand, Category, Product } from "@/types";

type ProductFormProps = {
  product?: Product;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitLabel: string;
};

export function ProductForm({ product, onSubmit, submitLabel }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product?.name ?? "",
      slug: product?.slug ?? "",
      shortDescription: product?.shortDescription ?? "",
      description: product?.description ?? "",
      price: Number(product?.price ?? 0),
      discountPrice: product?.discountPrice ? Number(product.discountPrice) : undefined,
      stock: product?.inventoryRecords?.[0]?.quantity ?? 0,
      sku: product?.sku ?? "",
      categoryId: product?.category?.id ?? "",
      brandId: product?.brand?.id ?? "",
      warranty: product?.warranty ?? "",
      returnPolicy: product?.returnPolicy ?? "",
      deliveryInfo: product?.deliveryInfo ?? "",
      variants: [],
      attributes: []
    }
  });

  useEffect(() => {
    Promise.all([catalogApi.categories(), catalogApi.brands()]).then(([categoryData, brandData]) => {
      setCategories(categoryData);
      setBrands(brandData);
    });
  }, []);

  const submit = async (values: ProductFormValues) => {
    setError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Product save failed");
    }
  };

  const generateWithAi = async () => {
    const values = form.getValues();
    const response = await sellerApi.generateDescription({
      productName: values.title,
      category: categories.find((category) => category.id === values.categoryId)?.name,
      brand: brands.find((brand) => brand.id === values.brandId)?.name,
      keywords: values.shortDescription,
      targetAudience: "Sri Lankan online shoppers"
    });
    form.setValue("title", String(response.improvedTitle ?? values.title));
    form.setValue("shortDescription", String(response.shortDescription ?? values.shortDescription ?? ""));
    form.setValue("description", String(response.fullDescription ?? values.description ?? ""));
  };

  return (
    <form className="grid gap-5" onSubmit={form.handleSubmit(submit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" error={form.formState.errors.title?.message}>
          <Input {...form.register("title")} />
        </Field>
        <Field label="Slug">
          <Input {...form.register("slug")} placeholder="auto-generated if empty" />
        </Field>
        <Field label="SKU" error={form.formState.errors.sku?.message}>
          <Input {...form.register("sku")} />
        </Field>
        <Field label="Stock" error={form.formState.errors.stock?.message}>
          <Input type="number" {...form.register("stock")} />
        </Field>
        <Field label="Price" error={form.formState.errors.price?.message}>
          <Input type="number" {...form.register("price")} />
        </Field>
        <Field label="Discount price">
          <Input type="number" {...form.register("discountPrice")} />
        </Field>
        <Field label="Category" error={form.formState.errors.categoryId?.message}>
          <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" {...form.register("categoryId")}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Brand" error={form.formState.errors.brandId?.message}>
          <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" {...form.register("brandId")}>
            <option value="">Select brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Short description">
        <Input {...form.register("shortDescription")} />
      </Field>
      <Field label="Description" error={form.formState.errors.description?.message}>
        <Textarea {...form.register("description")} />
      </Field>
      <Button className="w-fit" type="button" variant="outline" onClick={generateWithAi}>
        Generate with AI
      </Button>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Warranty">
          <Input {...form.register("warranty")} />
        </Field>
        <Field label="Return policy">
          <Input {...form.register("returnPolicy")} />
        </Field>
        <Field label="Delivery info">
          <Input {...form.register("deliveryInfo")} />
        </Field>
      </div>
      {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
      <Button className="w-fit" type="submit">
        {submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
