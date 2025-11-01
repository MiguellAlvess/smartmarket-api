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
    expect(output.status).toBe(201)
  })

  test("should return 400 when type is not valid", async () => {
    const input = {
      name: "Test Product",
      description: "This is a test product",
      type: "INVALID_TYPE",
      priceInCents: 1500,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 100,
      expiresAt: new Date("2025-12-01"),
    }
    const output = await axios.post("http://localhost:8080/api/products", input)
    expect(output.status).toBe(400)
  })

  test("should return 400 when priceInCents is not valid", async () => {
    const input = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: -1000,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 100,
      expiresAt: new Date("2025-12-01"),
    }
    const output = await axios.post("http://localhost:8080/api/products", input)
    expect(output.status).toBe(400)
  })

  test("should return 400 when expiresAt is not valid", async () => {
    const input = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: 1000,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 100,
      expiresAt: new Date("1999-12-01"),
    }
    const output = await axios.post("http://localhost:8080/api/products", input)
    expect(output.status).toBe(400)
  })

  test("should return 400 when stockQuantity is not valid", async () => {
    const input = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: 1000,
      promoInCents: 1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: -10000,
      expiresAt: new Date("1999-12-01"),
    }
    const output = await axios.post("http://localhost:8080/api/products", input)
    expect(output.status).toBe(400)
  })

  test("should return 400 when promoInCents is not valid", async () => {
    const input = {
      name: "Test Product",
      description: "This is a test product",
      type: "OTHER",
      priceInCents: 1000,
      promoInCents: -1200,
      promoActive: true,
      promoStartsAt: new Date("2024-07-01"),
      promoEndsAt: new Date("2024-07-31"),
      stockQuantity: 10,
      expiresAt: new Date("1999-12-01"),
    }
    const output = await axios.post("http://localhost:8080/api/products", input)
    expect(output.status).toBe(400)
  })

  test("should return 200 when product is found", async () => {
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
    const createProductOutput = await axios.post(
      "http://localhost:8080/api/products",
      createProductInput
    )
    const productId = createProductOutput.data.productId
    console.log(productId)
    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`
    )
    expect(product.status).toBe(200)
  })

  test("should return 200 when product is found", async () => {
    const productId = "5cf9233d-6c2b-4e9a-aeb4-629105b48a36"
    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`
    )
    expect(product.status).toBe(404)
  })

  test("should return 400 when product id is not valid", async () => {
    const invalidId = "invalid-id"
    const product = await axios.get(
      `http://localhost:8080/api/products/${invalidId}`
    )
    expect(product.status).toBe(400)
  })

  test("should return 404 when product is not found")

  test("should return 200 when product is deleted", async () => {
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
    const createProductOutput = await axios.post(
      "http://localhost:8080/api/products",
      createProductInput
    )
    const productId = createProductOutput.data.productId
    const productDeleted = await axios.delete(
      `http://localhost:8080/api/products/${productId}`
    )
    expect(productDeleted.status).toBe(200)
    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`
    )
    expect(product.status).toBe(404)
  })
})
