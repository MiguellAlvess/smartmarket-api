import { type PrismaClient } from "@prisma/client"

import CreateProductUseCase from "../../../../src/application/usecase/product/create-product.js"
import GetProductByIdUseCase from "../../../../src/application/usecase/product/get-pet-by-id.js"
import UpdateProductUseCase from "../../../../src/application/usecase/product/update-product.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Update Product Use Case", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let createProduct: CreateProductUseCase
  let getProductById: GetProductByIdUseCase
  let updateProduct: UpdateProductUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    createProduct = new CreateProductUseCase(repository)
    getProductById = new GetProductByIdUseCase(repository)
    updateProduct = new UpdateProductUseCase(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should update a product successfully", async () => {
    const createInput = {
      name: "ProductA",
      description: "Desc A",
      type: "OTHER",
      priceInCents: 1000,
      stockQuantity: 10,
      promoActive: false,
      expiresAt: new Date("2026-01-01"),
    }
    const created = await createProduct.execute(createInput)
    const updateInput = {
      productId: created.productId,
      name: "ProductB",
      priceInCents: 1200,
      promoInCents: 1000,
      promoActive: true,
    }
    await updateProduct.execute(updateInput)
    const got = await getProductById.execute({ productId: created.productId })
    expect(got.productId).toBe(created.productId)
    expect(got.name).toBe("ProductB")
    expect(got.priceInCents).toBe(1200)
    expect(got.promoActive).toBe(true)
    expect(got.promoInCents).toBe(1000)
  })
})
