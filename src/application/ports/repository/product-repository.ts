import Product from "../../../domain/product/entity/product.js"

export interface ProductRepository {
  create(product: Product): Promise<void>
}
