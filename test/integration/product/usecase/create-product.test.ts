import { type PrismaClient } from "@prisma/client"

import CreateProduct from "../../../../src/application/usecase/product/create-product.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Create Product Use Case", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let createProduct: CreateProduct

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    createProduct = new CreateProduct(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should create a new product successfully", async () => {
    const input = {
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
    const ouput = await createProduct.execute(input)
    expect(ouput.productId).toBeDefined()
  })
})
