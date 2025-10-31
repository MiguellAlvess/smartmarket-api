import { ZodError } from "zod"

import { ProductNotFoundError } from "../../../application/errors/product/index.js"
import GetProductById from "../../../application/usecase/product/get-pet-by-id.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import { productNotFoundResponse } from "../../http/product-response.js"
import { getProductByIdSchema } from "../../schemas/product/product-schema.js"

export default class GetProductByIdController {
  constructor(private readonly getProductById: GetProductById) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { productId } = await getProductByIdSchema.parseAsync({
        productId: httpRequest.params?.productId,
      })
      const product = await this.getProductById.execute({ productId })
      return http.ok(product)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues?.[0]?.message ?? "Invalid payload",
        })
      }
      if (error instanceof ProductNotFoundError) {
        return productNotFoundResponse()
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
}
