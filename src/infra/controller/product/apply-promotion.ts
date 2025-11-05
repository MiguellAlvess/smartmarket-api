import { ZodError } from "zod"

import { ProductNotFoundError } from "../../../application/errors/product/index.js"
import ApplyPromotionUseCase from "../../../application/usecase/product/apply-promotion.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import {
  applyPromotionBodySchema,
  applyPromotionParamsSchema,
} from "../../schemas/product/product-schema.js"

export default class ApplyPromotionController {
  constructor(private readonly applyPromotion: ApplyPromotionUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { productId } = await applyPromotionParamsSchema.parseAsync(
        httpRequest.params
      )
      const body = await applyPromotionBodySchema.parseAsync(httpRequest.body)
      const out = await this.applyPromotion.execute({ productId, ...body })
      return http.ok(out)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues?.[0]?.message ?? "Invalid payload",
        })
      }
      if (error instanceof ProductNotFoundError) {
        return http.notFound({ message: "Product not found." })
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
  params?: {
    productId?: string
  }
  body?: {
    promoInCents?: number
    promoActive?: boolean
    promoStartsAt?: Date
    promoEndsAt?: Date
  }
}
