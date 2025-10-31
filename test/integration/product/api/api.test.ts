import axios from "axios"

axios.defaults.validateStatus = () => true

describe("Product Endpoints", () => {
  test("should return 201 when product is created", async () => {
    const input = {
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
    const output = await axios.post("http://localhost:8080/api/products", input)
    console.log(output)
    expect(output.status).toBe(201)
  })
})
