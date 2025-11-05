import { ZodError } from "zod"

import { ProductNotFoundError } from "../../../application/errors/product/index.js"
import UpdateProductUseCase from "../../../application/usecase/product/update-product.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import {
  updateProductBodySchema,
  updateProductParamsSchema,
} from "../../schemas/product/product-schema.js"

export default class UpdateProductController {
  constructor(private readonly updateProduct: UpdateProductUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { productId } = await updateProductParamsSchema.parseAsync(
        httpRequest.params
      )
      const body = await updateProductBodySchema.parseAsync(httpRequest.body)
      const out = await this.updateProduct.execute({ productId, ...body })
      return http.ok(out)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({ message: error.issues?.[0]?.message })
      }
      if (error instanceof ProductNotFoundError) {
        return http.notFound({ message: error.message })
      }
      if (error instanceof DomainError) {
        return http.badRequest({ message: error.message })
      }
      console.error(error)
      return http.serverError()
    }
  }
}

type HttpRequest = {
  params?: { productId?: string }
  body?: {
    name?: string
    description?: string
    type?: string
    priceInCents?: number
    stockQuantity?: number
    promoInCents?: number
    promoActive?: boolean
    promoStartsAt?: Date
    promoEndsAt?: Date
    expiresAt?: Date
  }
}
