import Product from "../../../src/domain/product/entity/product.js"

describe("Product Entity", () => {
  it("should create a valid product", () => {
    const product = Product.create(
      "Product",
      "This is a sample product",
      "OTHER",
      2000,
      1500,
      true,
      new Date("2024-08-01"),
      new Date("2024-08-31"),
      50,
      new Date("2025-12-31")
    )
    expect(product.getName()).toBe("Product")
    expect(product.isPromoActive()).toBe(true)
  })
})
