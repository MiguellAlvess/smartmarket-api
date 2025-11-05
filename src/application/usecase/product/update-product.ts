import { ProductNotFoundError } from "../../errors/product/index.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.findById(input.productId)
    if (!product) throw new ProductNotFoundError()
    product.update({
      name: input.name,
      description: input.description,
      type: input.type,
      priceInCents: input.priceInCents,
      stockQuantity: input.stockQuantity,
      expiresAt: input.expiresAt,
      promoInCents: input.promoInCents,
      promoActive: input.promoActive,
      promoStartsAt: input.promoStartsAt,
      promoEndsAt: input.promoEndsAt,
    })
    await this.productRepository.update(product)
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
  name?: string
  description?: string
  type?: string
  priceInCents?: number
  stockQuantity?: number
  expiresAt?: Date
  promoInCents?: number
  promoActive?: boolean
  promoStartsAt?: Date
  promoEndsAt?: Date
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
