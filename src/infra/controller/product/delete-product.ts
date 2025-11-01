import { ZodError } from "zod"

import { ProductNotFoundError } from "../../../application/errors/product/index.js"
import DeleteProduct from "../../../application/usecase/product/delete-product.js"
import { http } from "../../http/http.js"
import { productNotFoundResponse } from "../../http/product-response.js"
import { getProductByIdSchema } from "../../schemas/product/product-schema.js"

export default class DeleteProductController {
  constructor(private readonly deleteProduct: DeleteProduct) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { productId } = await getProductByIdSchema.parseAsync({
        productId: httpRequest.params?.productId,
      })
      const product = await this.deleteProduct.execute({ productId })
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
