import { PrismaClient } from "@prisma/client"
import axios from "axios"

import { BcryptAdapter } from "../../../../src/infra/cryptography/bcrypt-adapter.js"

axios.defaults.validateStatus = () => true

describe("Product Endpoints", () => {
  const prisma = new PrismaClient()
  const hasher = new BcryptAdapter()
  let accessToken: string

  beforeAll(async () => {
    const passwordHash = await hasher.hash("admin123")
    await prisma.account.upsert({
      where: { email: "admin@smartmarket.com" },
      update: {},
      create: {
        name: "Administrador",
        email: "admin@smartmarket.com",
        cpf: "000.000.000-00",
        passwordHash,
      },
    })

    const loginInput = { email: "admin@smartmarket.com", password: "admin123" }
    const loginOutput = await axios.post(
      "http://localhost:8080/api/accounts/login",
      loginInput
    )
    expect(loginOutput.status).toBe(200)
    accessToken = loginOutput.data.accessToken
  })

  afterEach(async () => {
    await prisma.product.deleteMany({})
  })

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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
    const output = await axios.post(
      "http://localhost:8080/api/products",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
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
      createProductInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    const productId = createProductOutput.data.productId
    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(product.status).toBe(200)
    expect(product.data.effectivePriceInCents).toBe(1200)
  })

  test("should return 404 when product is not found", async () => {
    const productId = "5cf9233d-6c2b-4e9a-aeb4-629105b48a36"
    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(product.status).toBe(404)
  })

  test("should return 400 when product id is not valid", async () => {
    const invalidId = "invalid-id"
    const product = await axios.get(
      `http://localhost:8080/api/products/${invalidId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(product.status).toBe(400)
  })

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
      createProductInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    const productId = createProductOutput.data.productId

    const productDeleted = await axios.delete(
      `http://localhost:8080/api/products/me/${productId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(productDeleted.status).toBe(200)

    const product = await axios.get(
      `http://localhost:8080/api/products/${productId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(product.status).toBe(404)
  })

  test("should return 200 when listing all products", async () => {
    const product1 = {
      name: "ProductOne",
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
    const product2 = {
      name: "ProductTwo",
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
    await axios.post("http://localhost:8080/api/products", product1, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    await axios.post("http://localhost:8080/api/products", product2, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const products = await axios.get("http://localhost:8080/api/products", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    expect(products.status).toBe(200)
    expect(products.data.products.length).toBeGreaterThanOrEqual(2)
    for (const p of products.data.products) {
      expect(p.effectivePriceInCents).toBeDefined()
      expect(p.effectivePriceInCents).toBe(p.promoInCents ?? p.priceInCents)
    }
  })

  test("should return 200 when product is updated", async () => {
    const createInput = {
      name: "API Prod",
      description: "API Desc",
      type: "OTHER",
      priceInCents: 1000,
      stockQuantity: 5,
      promoActive: false,
      expiresAt: new Date("2026-01-01"),
    }
    const createOutput = await axios.post(
      "http://localhost:8080/api/products",
      createInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(createOutput.status).toBe(201)
    const productId = createOutput.data.productId

    const updateInput = {
      name: "API Prod Updated",
      priceInCents: 1200,
      promoInCents: 1100,
      promoActive: true,
    }
    const updateOutput = await axios.patch(
      `http://localhost:8080/api/products/${productId}`,
      updateInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(updateOutput.status).toBe(200)
  })

  test("should return 200 when promotion is deactivated", async () => {
    const createInput = {
      name: "API Promo",
      description: "API Promo Desc",
      type: "OTHER",
      priceInCents: 1000,
      stockQuantity: 5,
      promoInCents: 900,
      promoActive: true,
      promoStartsAt: new Date("2025-01-01"),
      promoEndsAt: new Date("2025-01-31"),
      expiresAt: new Date("2026-01-01"),
    }
    const createOutput = await axios.post(
      "http://localhost:8080/api/products",
      createInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    const productId = createOutput.data.productId

    const deactivateOutput = await axios.delete(
      `http://localhost:8080/api/products/${productId}/promotion`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(deactivateOutput.status).toBe(200)
  })
})
