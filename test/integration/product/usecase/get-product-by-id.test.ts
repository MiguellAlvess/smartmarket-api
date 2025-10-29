import { PrismaClient } from "@prisma/client"

import { ProductNotFoundError } from "../../../../src/application/errors/product/index.js"
import CreateProduct from "../../../../src/application/usecase/product/create-product.js"
import GetProductById from "../../../../src/application/usecase/product/get-pet-by-id.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Get Product By Id Use Case", () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let getProductById: GetProductById
  let createProduct: CreateProduct

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    getProductById = new GetProductById(repository)
    createProduct = new CreateProduct(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should get a product by id successfully", async () => {
    const createProductInput = {
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
    const createProductOuput = await createProduct.execute(createProductInput)
    const getProductInput = {
      productId: createProductOuput.productId,
    }
    const getProductOutput = await getProductById.execute(getProductInput)
    expect(getProductOutput.productId).toBe(createProductOuput.productId)
    expect(getProductOutput.name).toBe(createProductInput.name)
    expect(getProductOutput.description).toBe(createProductInput.description)
    expect(getProductOutput.type).toBe(createProductInput.type)
    expect(getProductOutput.priceInCents).toBe(createProductInput.priceInCents)
    expect(getProductOutput.stockQuantity).toBe(
      createProductInput.stockQuantity
    )
    expect(getProductOutput.promoActive).toBe(createProductInput.promoActive)
    expect(getProductOutput.promoInCents).toBe(createProductInput.promoInCents)
    expect(getProductOutput.promoStartsAt).toEqual(
      createProductInput.promoStartsAt
    )
    expect(getProductOutput.promoEndsAt).toEqual(createProductInput.promoEndsAt)
    expect(getProductOutput.expiresAt).toEqual(createProductInput.expiresAt)
  })

  test("should throw an error when product is not found", async () => {
    await expect(
      getProductById.execute({ productId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ProductNotFoundError)
  })
})
