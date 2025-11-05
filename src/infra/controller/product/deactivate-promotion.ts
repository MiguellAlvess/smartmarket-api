import { ZodError } from "zod"

import { ProductNotFoundError } from "../../../application/errors/product/index.js"
import DeactivatePromotionUseCase from "../../../application/usecase/product/deactivate-promotion.js"
import { http } from "../../http/http.js"
import { applyPromotionParamsSchema } from "../../schemas/product/product-schema.js"

export default class DeactivatePromotionController {
  constructor(
    private readonly deactivatePromotion: DeactivatePromotionUseCase
  ) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { productId } = await applyPromotionParamsSchema.parseAsync(
        httpRequest.params
      )
      const out = await this.deactivatePromotion.execute({ productId })
      return http.ok(out)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({ message: error.issues?.[0]?.message })
      }
      if (error instanceof ProductNotFoundError) {
        return http.notFound({ message: error.message })
      }
      console.error(error)
      return http.serverError()
    }
  }
}

type HttpRequest = {
  params?: { productId?: string }
}
