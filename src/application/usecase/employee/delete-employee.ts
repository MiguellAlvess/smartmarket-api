import { EmployeeNotFoundError } from "../../errors/employee/index.js"
import { EmployeeRepository } from "../../ports/repository/employee-repository.js"

export default class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(input: Input) {
    const employee = await this.employeeRepository.findById(input.employeeId)
    if (!employee) {
      throw new EmployeeNotFoundError()
    }
    await this.employeeRepository.deleteById(input.employeeId)
  }
}

type Input = {
  employeeId: string
}
