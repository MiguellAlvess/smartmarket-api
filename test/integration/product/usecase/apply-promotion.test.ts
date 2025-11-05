import { type PrismaClient } from "@prisma/client"

import ApplyPromotionUseCase from "../../../../src/application/usecase/product/apply-promotion.js"
import CreateProduct from "../../../../src/application/usecase/product/create-product.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Apply Promotion Use Case", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let createProduct: CreateProduct
  let applyPromotion: ApplyPromotionUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    createProduct = new CreateProduct(repository)
    applyPromotion = new ApplyPromotionUseCase(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should activate promotion for existing product", async () => {
    const createProductInput = await createProduct.execute({
      name: "Chocolate",
      description: "Dark 70%",
      type: "FOOD",
      priceInCents: 1000,
      stockQuantity: 10,
      promoActive: false,
      expiresAt: new Date("2026-01-01"),
    })
    const output = await applyPromotion.execute({
      productId: createProductInput.productId,
      promoInCents: 800,
      promoActive: true,
      promoStartsAt: new Date("2025-01-01"),
      promoEndsAt: new Date("2025-01-31"),
    })
    expect(output.productId).toBe(createProductInput.productId)
    const product = await prisma.product.findUnique({
      where: { id: output.productId },
    })
    expect(product?.promoActive).toBe(true)
    expect(product?.promoInCents).toBe(800)
  })
})
