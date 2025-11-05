import { PrismaClient } from "@prisma/client"

import { EmployeeNotFoundError } from "../../../../src/application/errors/employee/index.js"
import CreateEmployeeUseCase from "../../../../src/application/usecase/employee/create-employee.js"
import GetEmployeeByIdUseCase from "../../../../src/application/usecase/employee/get-employee-by-id.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Get Employee By ID Use Case", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase
  let createEmployee: CreateEmployeeUseCase
  let getEmployeeById: GetEmployeeByIdUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
    createEmployee = new CreateEmployeeUseCase(repository)
    getEmployeeById = new GetEmployeeByIdUseCase(repository)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })

  test("should get an employee by id successfully", async () => {
    const createEmployeeInput = {
      name: "Alice Johnson",
      cpf: "987.654.321-00",
      jobTitle: "Designer",
      age: 27,
    }
    const createEmployeeOutput =
      await createEmployee.execute(createEmployeeInput)
    const getEmployeeInput = {
      employeeId: createEmployeeOutput.employeeId,
    }
    const getEmployeeOutput = await getEmployeeById.execute(getEmployeeInput)
    expect(getEmployeeOutput.employeeId).toBe(createEmployeeOutput.employeeId)
    expect(getEmployeeOutput.name).toBe(createEmployeeInput.name)
    expect(getEmployeeOutput.cpf).toBe(createEmployeeInput.cpf)
    expect(getEmployeeOutput.jobTitle).toBe(createEmployeeInput.jobTitle)
    expect(getEmployeeOutput.age).toBe(createEmployeeInput.age)
  })

  test("should throw an error when employee not found", async () => {
    const getEmployeeInput = {
      employeeId: "non-existent-id",
    }
    await expect(getEmployeeById.execute(getEmployeeInput)).rejects.toThrow(
      EmployeeNotFoundError
    )
  })
})
