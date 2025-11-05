import { ZodError } from "zod"

import { CpfAlreadyExistsError } from "../../../application/errors/employee/index.js"
import CreateEmployeeUseCase from "../../../application/usecase/employee/create-employee.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import { createEmployeeSchema } from "../../schemas/employee/employee-schema.js"

export default class CreateEmployeeController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const params = await createEmployeeSchema.parseAsync(httpRequest.body)
      const employeeCreated = await this.createEmployeeUseCase.execute(params)
      return http.created(employeeCreated)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues[0]?.message,
        })
      }
      if (error instanceof DomainError) {
        return http.badRequest({ message: error.message })
      }
      if (error instanceof CpfAlreadyExistsError) {
        return http.conflict({ message: error.message })
      }
      console.error(error)
      return http.serverError()
    }
  }
}

type HttpRequest = {
  body?: {
    name: string
    cpf: string
    age: number
    jobTitle: string
  }
}
