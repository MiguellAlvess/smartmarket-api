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

  it("should apply promotion on existing product", () => {
    const product = Product.create(
      "Product",
      "This is a sample product",
      "OTHER",
      2000,
      undefined,
      false,
      undefined,
      undefined,
      50,
      new Date("2025-12-31")
    )
    product.applyPromotion(
      1500,
      true,
      new Date("2024-08-01"),
      new Date("2024-08-31")
    )
    expect(product.isPromoActive()).toBe(true)
    expect(product.getPromoInCents()?.getValue()).toBe(1500)
    expect(product.getEffectivePriceInCents().getValue()).toBe(1500)
  })

  it("should update a valid product", () => {
    const product = Product.create(
      "Product",
      "This is a sample product",
      "OTHER",
      2000,
      undefined,
      false,
      undefined,
      undefined,
      50,
      new Date("2025-12-31")
    )
    product.update({
      name: "New Name",
      description: "Updated description",
      type: "FOOD",
      priceInCents: 1800,
      stockQuantity: 60,
    })
    expect(product.getName()).toBe("New Name")
    expect(product.getDescription()).toBe("Updated description")
    expect(product.getType()).toBe("FOOD")
    expect(product.getPriceInCents().getValue()).toBe(1800)
    expect(product.getStockQuantity()).toBe(60)
  })

  it("should deactivate promotion", () => {
    const product = Product.create(
      "Promo Product",
      "With promo",
      "OTHER",
      2000,
      1500,
      true,
      new Date("2024-08-01"),
      new Date("2024-08-31"),
      10,
      new Date("2025-12-31")
    )
    expect(product.isPromoActive()).toBe(true)
    product.deactivatePromotion()
    expect(product.isPromoActive()).toBe(false)
    expect(product.getPromoInCents()?.getValue()).toBe(1500)
    expect(product.getEffectivePriceInCents().getValue()).toBe(2000)
  })
})
