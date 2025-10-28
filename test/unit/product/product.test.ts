import Product from "../../../src/domain/product/entity/product.js"

describe("Product Entity", () => {
  it("should create a valid product", () => {
    const product = Product.create(
      "123e4567-e89b-12d3-a456-426614174000",
      "Sample Product",
      "This is a sample product description.",
      "OTHER",
      10000,
      8000,
      true,
      new Date("2026-01-01"),
      new Date("2026-01-31"),
      50,
      new Date("2026-01-01"),
      "http://example.com/image.jpg"
    )

    expect(product.getName()).toBe("Sample Product")
    expect(product.isPromoActive()).toBe(true)
  })
})
