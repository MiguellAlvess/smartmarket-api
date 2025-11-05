import { PrismaClient } from "@prisma/client"

import {
  CpfAlreadyExistsError,
  EmployeeNotFoundError,
} from "../../../../src/application/errors/employee/index.js"
import CreateEmployeeUseCase from "../../../../src/application/usecase/employee/create-employee.js"
import GetEmployeeByIdUseCase from "../../../../src/application/usecase/employee/get-employee-by-id.js"
import { UpdateEmployeeUseCase } from "../../../../src/application/usecase/employee/update-employee.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import EmployeeRepositoryDatabase from "../../../../src/infra/repository/employee/employee-repository.js"

describe("Update Employee Use Case", () => {
  let prisma: PrismaClient
  let repository: EmployeeRepositoryDatabase
  let createEmployee: CreateEmployeeUseCase
  let getEmployeeById: GetEmployeeByIdUseCase
  let updateEmployee: UpdateEmployeeUseCase

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new EmployeeRepositoryDatabase(prisma)
    createEmployee = new CreateEmployeeUseCase(repository)
    getEmployeeById = new GetEmployeeByIdUseCase(repository)
    updateEmployee = new UpdateEmployeeUseCase(repository)
  })

  afterEach(async () => {
    await prisma.employee.deleteMany({})
  })

  test("should update an employee successfully", async () => {
    const createEmployeeInput = {
      name: "Bob Smith",
      cpf: "123.456.789-00",
      jobTitle: "Developer",
      age: 30,
    }
    const createEmployeeOutput =
      await createEmployee.execute(createEmployeeInput)
    const updateEmployeeInput = {
      employeeId: createEmployeeOutput.employeeId,
      name: "Robert Smith",
      age: 31,
    }
    await updateEmployee.execute(updateEmployeeInput)
    const getEmployeeInput = {
      employeeId: createEmployeeOutput.employeeId,
    }
    const getEmployeeOutput = await getEmployeeById.execute(getEmployeeInput)
    expect(getEmployeeOutput.employeeId).toBe(createEmployeeOutput.employeeId)
    expect(getEmployeeOutput.name).toBe(updateEmployeeInput.name)
    expect(getEmployeeOutput.cpf).toBe(createEmployeeInput.cpf)
    expect(getEmployeeOutput.jobTitle).toBe(createEmployeeInput.jobTitle)
    expect(getEmployeeOutput.age).toBe(updateEmployeeInput.age)
  })

  test("should throw an error when updating a non-existent employee", async () => {
    const updateEmployeeInput = {
      employeeId: "non-existent-id",
      name: "Non Existent",
    }
    await expect(updateEmployee.execute(updateEmployeeInput)).rejects.toThrow(
      EmployeeNotFoundError
    )
  })

  test("should throw an error when cpf is already in use", async () => {
    const firstEmployeeInput = {
      name: "First Employee",
      cpf: "111.111.111-11",
      jobTitle: "Tester",
      age: 25,
    }
    const secondEmployeeInput = {
      name: "Second Employee",
      cpf: "222.222.222-22",
      jobTitle: "Analyst",
      age: 28,
    }
    const firstEmployeeOutput = await createEmployee.execute(firstEmployeeInput)
    const secondEmployeeOutput =
      await createEmployee.execute(secondEmployeeInput)
    const updateEmployeeInput = {
      employeeId: secondEmployeeOutput.employeeId,
      cpf: firstEmployeeInput.cpf,
    }
    await expect(updateEmployee.execute(updateEmployeeInput)).rejects.toThrow(
      CpfAlreadyExistsError
    )
  })
})
