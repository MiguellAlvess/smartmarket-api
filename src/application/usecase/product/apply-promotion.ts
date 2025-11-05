import { ProductNotFoundError } from "../../errors/product/index.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class ApplyPromotionUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.findById(input.productId)
    if (!product) throw new ProductNotFoundError()
    product.applyPromotion(
      input.promoInCents,
      input.promoActive,
      input.promoStartsAt,
      input.promoEndsAt
    )
    await this.productRepository.update(product)
    return {
      productId: product.getId(),
    }
  }
}

type Input = {
  productId: string
  promoInCents?: number
  promoActive: boolean
  promoStartsAt?: Date
  promoEndsAt?: Date
}

type Output = {
  productId: string
}
