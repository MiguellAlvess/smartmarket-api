import { PrismaClient } from "@prisma/client"

import { ProductNotFoundError } from "../../../../src/application/errors/product/index.js"
import CreateProduct from "../../../../src/application/usecase/product/create-product.js"
import DeleteProduct from "../../../../src/application/usecase/product/delete-product.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import ProductRepositoryDatabase from "../../../../src/infra/repository/product/product-repository.js"

describe("Delete Product Use Case", async () => {
  let prisma: PrismaClient
  let repository: ProductRepositoryDatabase
  let createProduct: CreateProduct
  let deleteProduct: DeleteProduct

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new ProductRepositoryDatabase(prisma)
    createProduct = new CreateProduct(repository)
    deleteProduct = new DeleteProduct(repository)
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

  test("should delete a product successfully", async () => {
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
    const deleteProductInput = {
      productId: createProductOuput.productId,
    }
    await deleteProduct.execute(deleteProductInput)
    const deletedProduct = await prisma.product.findUnique({
      where: { id: createProductOuput.productId },
    })
    expect(deletedProduct).toBeNull()
  })

  test("should throw an error when trying to delete a non-existing product", async () => {
    const deleteProductInput = {
      productId: "non-existing-id",
    }
    await expect(
      deleteProduct.execute(deleteProductInput)
    ).rejects.toThrowError(ProductNotFoundError)
  })
})
