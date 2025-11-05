import { EmployeeRepository } from "../../ports/repository/employee-repository.js"

export default class GetAllEmployeesUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute() {
    const employees = await this.employeeRepository.findAll()
    const output: Output[] = employees.map((employee) => ({
      employeeId: employee.getId(),
      name: employee.getName(),
      cpf: employee.getCpf(),
      age: employee.getAge(),
      jobTitle: employee.getJobTitle(),
    }))
    return output
  }
}

type Output = {
  employeeId: string
  name: string
  cpf: string
  age: number
  jobTitle: string
}
