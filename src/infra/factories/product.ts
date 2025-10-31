import CreateProduct from "../../application/usecase/product/create-product.js"
import GetProductById from "../../application/usecase/product/get-pet-by-id.js"
import CreateProductController from "../controller/product/create-product.js"
import GetProductByIdController from "../controller/product/get-product-by-id.js"
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

const makeGetProductByIdController = () => {
  const productRepository = new ProductRepositoryDatabase(prisma)
  const getProductByIdUseCase = new GetProductById(productRepository)
  const getProductByIdController = new GetProductByIdController(
    getProductByIdUseCase
  )
  return getProductByIdController
}
