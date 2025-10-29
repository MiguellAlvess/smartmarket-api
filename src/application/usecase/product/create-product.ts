import Product from "../../../domain/product/entity/product.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const product = Product.create(
      input.name,
      input.description,
      input.type,
      input.priceInCents,
      input.promoInCents,
      input.promoActive,
      input.promoStartsAt,
      input.promoEndsAt,
      input.stockQuantity,
      input.expiresAt
    )
    await this.productRepository.create(product)
    return {
      productId: product.getId(),
    }
  }
}

type Input = {
  name: string
  description: string
  type: string
  priceInCents: number
  stockQuantity: number
  promoActive: boolean
  promoInCents?: number
  promoStartsAt?: Date
  promoEndsAt?: Date
  expiresAt?: Date
}

type Output = {
  productId: string
}
