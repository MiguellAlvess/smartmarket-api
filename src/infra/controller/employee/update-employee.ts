import { ZodError } from "zod"

import {
  CpfAlreadyExistsError,
  EmployeeNotFoundError,
} from "../../../application/errors/employee/index.js"
import { UpdateEmployeeUseCase } from "../../../application/usecase/employee/update-employee.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import {
  updateEmployeeBodySchema,
  updateEmployeeParamsSchema,
} from "../../schemas/employee/employee-schema.js"

export default class UpdateEmployeeController {
  constructor(private readonly updateEmployeeUseCase: UpdateEmployeeUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { employeeId } = await updateEmployeeParamsSchema.parseAsync(
        httpRequest.params
      )
      const body = await updateEmployeeBodySchema.parseAsync(httpRequest.body)
      const updated = await this.updateEmployeeUseCase.execute({
        employeeId,
        ...body,
      })
      return http.ok(updated)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({ message: error.issues[0]?.message })
      }
      if (error instanceof CpfAlreadyExistsError) {
        return http.conflict({ message: error.message })
      }
      if (error instanceof EmployeeNotFoundError) {
        return http.notFound({ message: error.message })
      }
      if (error instanceof DomainError) {
        return http.badRequest({ message: error.message })
      }
      console.error(error)
      return http.serverError()
    }
  }
}

type HttpRequest = {
  params?: {
    employeeId?: string
  }
  body?: {
    name?: string
    cpf?: string
    age?: number
    jobTitle?: string
  }
}
