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

  test("should update an employee in the database", async () => {
    const employee = Employee.create(
      "John Doe",
      "123.456.789-00",
      30,
      "Software Engineer"
    )
    const outputCreateEmployee = await repository.create(employee)
    employee.update({
      name: "Jane Smith",
      cpf: "987.654.321-00",
      age: 28,
      jobTitle: "Product Manager",
    })
    const outputUpdateEmployee = await repository.update(employee)
    const updatedEmployee = await repository.findById(employee.getId())
    expect(outputCreateEmployee).toBeUndefined()
    expect(outputUpdateEmployee).toBeUndefined()
    expect(updatedEmployee).toBeDefined()
    expect(updatedEmployee?.getName()).toBe("Jane Smith")
    expect(updatedEmployee?.getCpf()).toBe("987.654.321-00")
    expect(updatedEmployee?.getAge()).toBe(28)
    expect(updatedEmployee?.getJobTitle()).toBe("Product Manager")
  })

  test("should return an employee from the database", async () => {
    const employee = Employee.create(
      "John Doe",
      "123.456.789-00",
      30,
      "Software Engineer"
    )
    const outputCreateEmployee = await repository.create(employee)
    const employeeId = employee.getId()
    const outputGetEmployee = await repository.findById(employeeId)
    expect(outputCreateEmployee).toBeUndefined()
    expect(outputGetEmployee).toBeDefined()
    expect(outputGetEmployee?.getId()).toBe(employeeId)
    expect(outputGetEmployee?.getName()).toBe("John Doe")
    expect(outputGetEmployee?.getCpf()).toBe("123.456.789-00")
  })

  test("should delete an employee from the database", async () => {
    const employee = Employee.create(
      "John Doe",
      "123.456.789-00",
      30,
      "Software Engineer"
    )
    const outputCreateEmployee = await repository.create(employee)
    const employeeId = employee.getId()
    const outputDeleteEmployee = await repository.deleteById(employeeId)
    const outputGetEmployee = await repository.findById(employeeId)
    expect(outputCreateEmployee).toBeUndefined()
    expect(outputDeleteEmployee).toBeUndefined()
    expect(outputGetEmployee).toBeNull()
  })

  test("should return all employees from the database", async () => {
    const employee1 = Employee.create(
      "John Doe",
      "123.456.789-00",
      30,
      "Software Engineer"
    )
    const employee2 = Employee.create(
      "Jane Smith",
      "987.654.321-00",
      28,
      "Product Manager"
    )
    await repository.create(employee1)
    await repository.create(employee2)
    const employees = await repository.findAll()
    expect(employees.length).toBe(2)
  })
})
