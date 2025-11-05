import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  description: z
    .string()
    .trim()
    .min(1, {
      message: "Description is required",
    })
    .max(1000),
  type: z.string().min(1, {
    message: "Type is required",
  }),
  priceInCents: z.number({
    message: "Price is required",
  }),
  promoInCents: z.number().optional(),
  promoActive: z.boolean(),
  stockQuantity: z.number({
    message: "Stock quantity is required",
  }),
  promoStartsAt: z.coerce.date().optional(),
  promoEndsAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date({ message: "Expires at is required" }),
})

export const getProductByIdSchema = z.object({
  productId: z.string().uuid({
    message: "Invalid UUID",
  }),
})

export const deleteProductParamsSchema = z.object({
  productId: z.string().uuid({ message: "Invalid UUID" }),
})

export const applyPromotionParamsSchema = z.object({
  productId: z.string().uuid({ message: "Invalid UUID" }),
})

export const applyPromotionBodySchema = z.object({
  promoInCents: z.number().optional(),
  promoActive: z.boolean(),
  promoStartsAt: z.coerce.date().optional(),
  promoEndsAt: z.coerce.date().optional(),
})

export const updateProductParamsSchema = z.object({
  productId: z.string().uuid({ message: "Invalid UUID" }),
})

export const updateProductBodySchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).max(1000).optional(),
    type: z.string().min(1).optional(),
    priceInCents: z.number().optional(),
    stockQuantity: z.number().optional(),
    promoInCents: z.number().optional(),
    promoActive: z.boolean().optional(),
    promoStartsAt: z.coerce.date().optional(),
    promoEndsAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).length > 0 &&
      Object.values(data).some((v) => v !== undefined),
    { message: "At least one field must be provided" }
  )

type CreateProductDTO = z.infer<typeof createProductSchema>
