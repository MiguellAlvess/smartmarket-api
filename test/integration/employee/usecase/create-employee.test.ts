import { PrismaClient } from "@prisma/client"

import { CpfAlreadyExistsError } from "../../../../src/application/errors/employee/index.js"
import CreateEmployeeUseCase from "../../../../src/application/usecase/employee/create-employee.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Create Employee Use Case", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase
  let createEmployee: CreateEmployeeUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
    createEmployee = new CreateEmployeeUseCase(repository)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })

  test("should create a new employee", async () => {
    const input = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Software Engineer",
      age: 30,
    }
    const output = await createEmployee.execute(input)
    expect(output.employeeId).toBeDefined()
  })

  test("should throw an error when creating an employee with duplicate CPF", async () => {
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
    await createEmployee.execute(input1)
    await expect(createEmployee.execute(input2)).rejects.toThrowError(
      CpfAlreadyExistsError
    )
  })
})
