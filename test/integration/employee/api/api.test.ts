import { PrismaClient } from "@prisma/client"
import axios from "axios"

import { BcryptAdapter } from "../../../../src/infra/cryptography/bcrypt-adapter.js"

axios.defaults.validateStatus = () => true

describe("Employee Endpoints", () => {
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
    await prisma.employee.deleteMany({})
  })

  test("should return 201 when employee is created", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
      age: 30,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(201)
  })

  test("should return 400 when name is not valid", async () => {
    const input = {
      name: "",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
      age: 30,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 400 when cpf is not valid", async () => {
    const input = {
      name: "John Doe",
      cpf: "",
      jobTitle: "Software Engineer",
      age: 30,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 400 when jobTitle is not valid", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "",
      age: 30,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 400 when age is less than 16", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
      age: 15,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 400 when age is greater than 100", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
      age: 101,
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 400 when age is not provided", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
    }
    const output = await axios.post(
      "http://localhost:8080/api/employees",
      input,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(output.status).toBe(400)
  })

  test("should return 409 when cpf already exists", async () => {
    const cpfDuplicate = "123.456.789-00"
    const input1 = {
      name: "John Doe",
      cpf: cpfDuplicate,
      jobTitle: "Software Engineer",
      age: 30,
    }
    const input2 = {
      name: "Jane Smith",
      cpf: cpfDuplicate,
      jobTitle: "Product Manager",
      age: 28,
    }

    const firstOutput = await axios.post(
      "http://localhost:8080/api/employees",
      input1,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(firstOutput.status).toBe(201)

    const secondOutput = await axios.post(
      "http://localhost:8080/api/employees",
      input2,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(secondOutput.status).toBe(409)
  })

  test("should return 200 when employee is found by id", async () => {
    const createInput = {
      name: "Alice Johnson",
      cpf: "987.654.321-00",
      jobTitle: "Designer",
      age: 25,
    }
    const createOutput = await axios.post(
      "http://localhost:8080/api/employees",
      createInput,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(createOutput.status).toBe(201)
    const employeeId = createOutput.data.employeeId
    const getOutput = await axios.get(
      `http://localhost:8080/api/employees/${employeeId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(getOutput.status).toBe(200)
  })

  test("should return 404 when employee is not found by id", async () => {
    const nonExistentEmployeeId = "00000000-0000-0000-0000-000000000000"
    const getOutput = await axios.get(
      `http://localhost:8080/api/employees/${nonExistentEmployeeId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(getOutput.status).toBe(404)
  })

  test("should return 400 when employeeId is not a valid UUID", async () => {
    const invalidEmployeeId = "invalid-uuid"
    const getOutput = await axios.get(
      `http://localhost:8080/api/employees/${invalidEmployeeId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    expect(getOutput.status).toBe(400)
  })
})
