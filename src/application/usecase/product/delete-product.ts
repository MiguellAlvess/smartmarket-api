import { ProductNotFoundError } from "../../errors/product/index.js"
import { ProductRepository } from "../../ports/repository/product-repository.js"

export default class DeleteProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: Input) {
    const product = await this.productRepository.findById(input.productId)
    if (!product) {
      throw new ProductNotFoundError()
    }
    await this.productRepository.deleteById(input.productId)
  }
}

interface Input {
  productId: string
}
