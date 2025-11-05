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

  test("should update a product in the database", async () => {
    const product = Product.create(
      "Test Product",
      "This is a test product",
      "OTHER",
      1500,
      undefined,
      false,
      undefined,
      undefined,
      100,
      new Date("2025-12-01")
    )
    await repository.create(product)

    product.update({
      name: "Updated Product",
      description: "Updated description",
      type: "FOOD",
      priceInCents: 2000,
      stockQuantity: 80,
      promoInCents: 1800,
      promoActive: true,
    })
    await repository.update(product)

    const updated = await repository.findById(product.getId())
    expect(updated).toBeDefined()
    expect(updated?.getName()).toBe("Updated Product")
    expect(updated?.getDescription()).toBe("Updated description")
    expect(updated?.getType()).toBe("FOOD")
    expect(updated?.getPriceInCents().getValue()).toBe(2000)
    expect(updated?.getStockQuantity()).toBe(80)
    expect(updated?.isPromoActive()).toBe(true)
    expect(updated?.getPromoInCents()?.getValue()).toBe(1800)
  })

  test("should deactivate promotion in the database", async () => {
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
    await repository.create(product)
    product.deactivatePromotion()
    await repository.update(product)
    const updated = await repository.findById(product.getId())
    expect(updated?.isPromoActive()).toBe(false)
    expect(updated?.getPromoInCents()?.getValue()).toBe(1200)
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

  test("should delete a product from the database", async () => {
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
    await repository.create(product)
    const prouctId = product.getId()
    await repository.deleteById(prouctId)
    const deletedProduct = await repository.findById(prouctId)
    expect(deletedProduct).toBeNull()
  })

  test("should return all products from the database", async () => {
    const product1 = Product.create(
      "ProductOne",
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
    const product2 = Product.create(
      "ProductTwo",
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
    await repository.create(product1)
    await repository.create(product2)
    const products = await repository.findAll()
    expect(products.length).toBe(2)
  })
})
