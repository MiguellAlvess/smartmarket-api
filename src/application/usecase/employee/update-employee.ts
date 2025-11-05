import {
  CpfAlreadyExistsError,
  EmployeeNotFoundError,
} from "../../errors/employee/index.js"
import { EmployeeRepository } from "../../ports/repository/employee-repository.js"

export class UpdateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: Input): Promise<Output> {
    const employee = await this.employeeRepository.findById(input.employeeId)
    if (!employee) throw new EmployeeNotFoundError()
    if (input.cpf) {
      const employeeWithCpf = await this.employeeRepository.findByCpf(input.cpf)
      if (employeeWithCpf && employeeWithCpf.getId() !== input.employeeId) {
        throw new CpfAlreadyExistsError()
      }
    }
    employee.update({
      name: input.name,
      cpf: input.cpf,
      age: input.age,
      jobTitle: input.jobTitle,
    })
    await this.employeeRepository.update(employee)
    return {
      employeeId: employee.getId(),
      name: employee.getName(),
      cpf: employee.getCpf(),
      age: employee.getAge(),
      jobTitle: employee.getJobTitle(),
    }
  }
}

type Input = {
  employeeId: string
  name?: string
  cpf?: string
  age?: number
  jobTitle?: string
}

type Output = {
  employeeId: string
  name: string
  cpf: string
  age: number
  jobTitle: string
}
