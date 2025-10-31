import CreateProduct from "../../application/usecase/product/create-product.js"
import CreateProductController from "../controller/product/create-product.js"
import { prisma } from "../database/prisma.js"
import ProductRepositoryDatabase from "../repository/product/product-repository.js"

export const makeCreateProductController = () => {
  const productRepository = new ProductRepositoryDatabase(prisma)
  const createProductUseCase = new CreateProduct(productRepository)
  const createProductController = new CreateProductController(
    createProductUseCase
  )
  return createProductController
}
