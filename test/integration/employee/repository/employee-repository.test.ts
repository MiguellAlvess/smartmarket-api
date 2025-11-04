import { PrismaClient } from "@prisma/client"

import { Employee } from "../../../../src/domain/employee/entity/employee.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Employee Repository", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })
  test("should create a new product successfully in database", async () => {
    const employee = Employee.create(
      "John Doe",
      "123.456.789-00",
      30,
      "Software Engineer"
    )
    const output = await repository.create(employee)
    expect(output).toBeUndefined()
    expect(employee.getId()).toBeDefined()
  })
})
