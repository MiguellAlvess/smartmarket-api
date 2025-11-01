import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class GetAllProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    const products = await this.productRepository.findAll()
    const ouput: Output[] = products.map((product) => ({
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
    }))
    return ouput
  }
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
