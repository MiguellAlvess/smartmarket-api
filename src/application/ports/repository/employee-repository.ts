import { Employee } from "../../../domain/employee/entity/employee.js"

export interface EmployeeRepository {
  create(employee: Employee): Promise<void>
  findByCpf(cpf: string): Promise<Employee | null>
}
