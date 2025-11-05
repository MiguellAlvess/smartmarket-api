import { PrismaClient } from "@prisma/client"

import { EmployeeNotFoundError } from "../../../../src/application/errors/employee/index.js"
import CreateEmployeeUseCase from "../../../../src/application/usecase/employee/create-employee.js"
import DeleteEmployeeUseCase from "../../../../src/application/usecase/employee/delete-employee.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Delete Employee Use Case", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase
  let createEmployee: CreateEmployeeUseCase
  let deleteEmployee: DeleteEmployeeUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
    createEmployee = new CreateEmployeeUseCase(repository)
    deleteEmployee = new DeleteEmployeeUseCase(repository)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })

  test("should delete an employee successfully", async () => {
    const createEmployeeInput = {
      name: "John Doe",
      cpf: "123.456.789-00",
      jobTitle: "Developer",
      age: 30,
    }
    const createEmployeeOutput =
      await createEmployee.execute(createEmployeeInput)
    const deleteEmployeeInput = {
      employeeId: createEmployeeOutput.employeeId,
    }
    await deleteEmployee.execute(deleteEmployeeInput)
    const deletedEmployee = await prisma.employee.findUnique({
      where: { id: createEmployeeOutput.employeeId },
    })
    expect(deletedEmployee).toBeNull()
  })

  test("should throw an error when trying to delete a non-existing employee", async () => {
    const deleteEmployeeInput = {
      employeeId: "non-existing-id",
    }
    await expect(deleteEmployee.execute(deleteEmployeeInput)).rejects.toThrow(
      EmployeeNotFoundError
    )
  })
})
