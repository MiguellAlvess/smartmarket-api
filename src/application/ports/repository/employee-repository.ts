import { Employee } from "../../../domain/employee/entity/employee.js"

export interface EmployeeRepository {
  create(employee: Employee): Promise<void>
  update(employee: Employee): Promise<void>
  deleteById(employeeId: string): Promise<void>
  findByCpf(cpf: string): Promise<Employee | null>
  findById(employeeId: string): Promise<Employee | null>
  findAll(): Promise<Employee[]>
}
