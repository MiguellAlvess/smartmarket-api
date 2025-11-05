import { EmployeeNotFoundError } from "../../errors/employee/index.js"
import { EmployeeRepository } from "../../ports/repository/employee-repository.js"

export default class GetEmployeeByIdUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(input: Input): Promise<Output> {
    const employee = await this.employeeRepository.findById(input.employeeId)
    if (!employee) {
      throw new EmployeeNotFoundError()
    }
    return {
      employeeId: employee.getId(),
      name: employee.getName(),
      cpf: employee.getCpf(),
      jobTitle: employee.getJobTitle(),
      age: employee.getAge(),
    }
  }
}

type Input = {
  employeeId: string
}

type Output = {
  employeeId: string
  name: string
  cpf: string
  jobTitle: string
  age: number
}
