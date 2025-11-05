import { PrismaClient } from "@prisma/client"

import CreateEmployeeUseCase from "../../../../src/application/usecase/employee/create-employee.js"
import GetAllEmployeesUseCase from "../../../../src/application/usecase/employee/get-all-employees.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Get All Employees Use Case ", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase
  let createEmployee: CreateEmployeeUseCase
  let getAllEmployees: GetAllEmployeesUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
    createEmployee = new CreateEmployeeUseCase(repository)
    getAllEmployees = new GetAllEmployeesUseCase(repository)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })

  test("should get all employees successfully", async () => {
    const createEmployeeInput1 = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Developer",
      age: 30,
    }
    await createEmployee.execute(createEmployeeInput1)
    const createEmployeeInput2 = {
      name: "Jane Smith",
      cpf: "987.654.321-00",
      jobTitle: "Manager",
      age: 35,
    }
    await createEmployee.execute(createEmployeeInput2)
    const getAllEmployeesOutput = await getAllEmployees.execute()
    expect(getAllEmployeesOutput.length).toBe(2)
  })
})
