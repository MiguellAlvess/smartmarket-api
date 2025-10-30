import { ProductNotFoundError } from "../../errors/product/index.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class GetProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.findById(input.productId)
    if (!product) {
      throw new ProductNotFoundError()
    }
    return {
      productId: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      type: product.getType(),
      priceInCents: product.getPriceInCents().getValue(),
      stockQuantity: product.getStockQuantity(),
      promoActive: product.isPromoActive(),
      promoInCents: product.getPromoInCents()?.getValue(),
      promoStartsAt: product.getPromoStartsAt(),
      promoEndsAt: product.getPromoEndsAt(),
      expiresAt: product.getExpiresAt(),
    }
  }
}

type Input = {
  productId: string
}

type Output = {
  productId: string
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
