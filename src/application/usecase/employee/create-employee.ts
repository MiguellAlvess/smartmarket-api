import { Employee } from "../../../domain/employee/entity/employee.js"
import { CpfAlreadyExistsError } from "../../errors/employee/index.js"
import { EmployeeRepository } from "../../ports/repository/employee-repository.js"

export default class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(input: Input): Promise<Output> {
    const employee = Employee.create(
      input.name,
      input.cpf,
      input.age,
      input.jobTitle
    )
    const existingEmployee = await this.employeeRepository.findByCpf(
      employee.getCpf()
    )
    if (existingEmployee) {
      throw new CpfAlreadyExistsError()
    }
    await this.employeeRepository.create(employee)
    return {
      employeeId: employee.getId(),
    }
  }
}

type Input = {
  name: string
  cpf: string
  age: number
  jobTitle: string
}

type Output = {
  employeeId: string
}
