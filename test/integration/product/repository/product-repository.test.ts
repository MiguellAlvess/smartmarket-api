import { PrismaClient } from "@prisma/client"

import Product from "../../../../src/domain/product/entity/product.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Product Repository Database", async () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should create a new product successfully in database", async () => {
    const product = Product.create(
      "Test Product",
      "This is a test product",
      "OTHER",
      1500,
      1200,
      true,
      new Date("2024-07-01"),
      new Date("2024-07-31"),
      100,
      new Date("2025-12-01")
    )
    const output = await repository.create(product)
    expect(output).toBeUndefined()
    expect(product.getId()).toBeDefined()
  })

  test("should return a pet of databaseshould return a product from the database", async () => {
    const product = Product.create(
      "Test Product",
      "This is a test product",
      "OTHER",
      1500,
      1200,
      true,
      new Date("2024-07-01"),
      new Date("2024-07-31"),
      100,
      new Date("2025-12-01")
    )
    const outputCreateProduct = await repository.create(product)
    const prouctId = product.getId()
    const outputGetProduct = await repository.findById(prouctId)
    expect(outputCreateProduct).toBeUndefined()
    expect(outputGetProduct).toBeDefined()
    expect(outputGetProduct?.getId()).toBe(prouctId)
    expect(outputGetProduct?.getName()).toBe("Test Product")
    expect(outputGetProduct?.getDescription()).toBe("This is a test product")
  })
})
