import { PrismaClient } from "@prisma/client"

import { EmployeeRepository } from "../../../application/ports/repository/employee-repository.js"
import { Employee } from "../../../domain/employee/entity/employee.js"

export default class EmployeeRepositoryDatabase implements EmployeeRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(employee: Employee): Promise<void> {
    await this.db.employee.create({
      data: {
        id: employee.getId(),
        name: employee.getName(),
        cpf: employee.getCpf(),
        age: employee.getAge(),
        jobTitle: employee.getJobTitle(),
      },
    })
  }

  async deleteById(employeeId: string): Promise<void> {
    await this.db.employee.delete({ where: { id: employeeId } })
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employeeRow = await this.db.employee.findUnique({ where: { cpf } })
    if (!employeeRow) return null
    return new Employee(
      employeeRow.id,
      employeeRow.name,
      employeeRow.cpf,
      employeeRow.age,
      employeeRow.jobTitle
    )
  }

  async findById(employeeId: string): Promise<Employee | null> {
    const employeeRow = await this.db.employee.findUnique({
      where: { id: employeeId },
    })
    if (!employeeRow) return null
    return new Employee(
      employeeRow.id,
      employeeRow.name,
      employeeRow.cpf,
      employeeRow.age,
      employeeRow.jobTitle
    )
  }
}
