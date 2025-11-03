import { PrismaClient } from "@prisma/client"
import axios from "axios"

import { BcryptAdapter } from "../../../../src/infra/cryptography/bcrypt-adapter.js"

axios.defaults.validateStatus = () => true

describe("Account Endpoints - Login", () => {
  const prisma = new PrismaClient()
  const hasher = new BcryptAdapter()

  afterEach(async () => {
    await prisma.account.deleteMany({})
  })

  test("should return 200 and an access token when credentials are valid", async () => {
    const plain = "ValidPass123"
    const passwordHash = await hasher.hash(plain)
    const email = `john-${Math.random()}@example.com`

    await prisma.account.create({
      data: {
        name: "John Doe",
        email,
        cpf: "123.456.789-10",
        passwordHash,
      },
    })
    const input = { email, password: plain }
    const output = await axios.post(
      "http://localhost:8080/api/accounts/login",
      input
    )
    expect(output.status).toBe(200)
    expect(output.data).toHaveProperty("userId")
    expect(output.data).toHaveProperty("accessToken")
  })

  test("should return 401 when password is wrong", async () => {
    const rightPass = "CorrectPass123"
    const passwordHash = await hasher.hash(rightPass)
    const email = `kent-${Math.random()}@example.com`

    await prisma.account.create({
      data: {
        name: "Kent Beck",
        email,
        cpf: "987.654.321-00",
        passwordHash,
      },
    })
    const input = { email, password: "WrongPass999" }
    const output = await axios.post(
      "http://localhost:8080/api/accounts/login",
      input
    )
    expect(output.status).toBe(401)
  })

  test("should return 401 when account does not exist", async () => {
    const input = { email: "ghost@example.com", password: "AnyPass123" }
    const output = await axios.post(
      "http://localhost:8080/api/accounts/login",
      input
    )
    expect(output.status).toBe(401)
  })

  test("should return 400 when email format is invalid", async () => {
    const input = { email: "not-an-email", password: "AnyPass123" }
    const output = await axios.post(
      "http://localhost:8080/api/accounts/login",
      input
    )
    expect(output.status).toBe(400)
  })
})
