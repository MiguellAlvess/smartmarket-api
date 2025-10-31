import { ZodError } from "zod"

import CreateProduct from "../../../application/usecase/product/create-product.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import { productCreatedResponse } from "../../http/product-response.js"
import { createProductSchema } from "../../schemas/product/product-schema.js"

export default class CreateProductController {
  constructor(private readonly createProduct: CreateProduct) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(httpRequest: any) {
    try {
      const params = await createProductSchema.parseAsync(httpRequest.body)
      const productCreated = await this.createProduct.execute(params)
      return productCreatedResponse(productCreated)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues[0]?.message,
        })
      }
      if (error instanceof DomainError) {
        return http.badRequest({ message: error.message })
      }
      console.error(error)
      return http.serverError()
    }
  }
}
