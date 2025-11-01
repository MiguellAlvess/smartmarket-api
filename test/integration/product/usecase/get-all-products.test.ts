import { PrismaClient } from "@prisma/client"

import CreateProduct from "../../../../src/application/usecase/product/create-product.js"
import GetAllProductUseCase from "../../../../src/application/usecase/product/get-all-products.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Get All Products Use Case ", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let getAllProducts: GetAllProductUseCase
  let createProduct: CreateProduct

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    getAllProducts = new GetAllProductUseCase(repository)
    createProduct = new CreateProduct(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should get all products successfully", async () => {
    const createProductInput1 = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: 1500,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 100,
      expiresAt: new Date("2025-12-01"),
    }
    await createProduct.execute(createProductInput1)
    const createProductInput2 = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: 1500,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 100,
      expiresAt: new Date("2025-12-01"),
    }
    await createProduct.execute(createProductInput2)
    const getAllProductsOutput = await getAllProducts.execute()
    expect(getAllProductsOutput.length).toBe(2)
  })
})
