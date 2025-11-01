import GetAllProductUseCase from "../../../application/usecase/product/get-all-products.js"
import { http } from "../../http/http.js"

export default class GetAllProductsController {
  constructor(private getAllProducts: GetAllProductUseCase) {}

  async execute() {
    try {
      const products = await this.getAllProducts.execute()
      return http.ok(products)
    } catch (error) {
      console.error(error)
      return http.serverError()
    }
  }
}
