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

type CreateProductDTO = z.infer<typeof createProductSchema>
