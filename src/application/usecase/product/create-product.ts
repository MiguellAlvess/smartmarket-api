import { stringify } from "querystring"

import Product from "../../../domain/product/entity/product.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"
import { PhotoInput, PhotoStorage } from "../../ports/storage/photo-storage.js"

export default class CreateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly photoStorage: PhotoStorage
  ) {}

  async execute(input: Input): Promise<Output> {
    let photoUrl: string | undefined
    if (input.imageUrl) {
      photoUrl = await this.photoStorage.upload(input.imageUrl)
    }
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
      input.expiresAt,
      photoUrl
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
  priceInCents: number
  stockQuantity: number
  promoActive: boolean
  imageUrl?: PhotoInput
  type: string
  promoInCents?: number
  promoStartsAt?: Date
  promoEndsAt?: Date
  expiresAt?: Date
}

type Output = {
  productId: string
}
