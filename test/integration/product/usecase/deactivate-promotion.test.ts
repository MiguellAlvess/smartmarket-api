import { type PrismaClient } from "@prisma/client"

import CreateProductUseCase from "../../../../src/application/usecase/product/create-product.js"
import DeactivatePromotionUseCase from "../../../../src/application/usecase/product/deactivate-promotion.js"
import GetProductByIdUseCase from "../../../../src/application/usecase/product/get-pet-by-id.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Deactivate Promotion Use Case", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let createProduct: CreateProductUseCase
  let getProductById: GetProductByIdUseCase
  let deactivatePromotion: DeactivatePromotionUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    createProduct = new CreateProductUseCase(repository)
    getProductById = new GetProductByIdUseCase(repository)
    deactivatePromotion = new DeactivatePromotionUseCase(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should deactivate promotion for existing product", async () => {
    const created = await createProduct.execute({
      name: "Choco",
      description: "Bar",
      type: "FOOD",
      priceInCents: 1000,
      stockQuantity: 5,
      promoInCents: 800,
      promoActive: true,
      promoStartsAt: new Date("2025-01-01"),
      promoEndsAt: new Date("2025-01-31"),
      expiresAt: new Date("2026-01-01"),
    })
    const output = await deactivatePromotion.execute({
      productId: created.productId,
    })
    expect(output.productId).toBe(created.productId)
    const product = await getProductById.execute({
      productId: output.productId,
    })
    expect(product.promoActive).toBe(false)
    expect(product.promoInCents).toBe(800)
  })
})
