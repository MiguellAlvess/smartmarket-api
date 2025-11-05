import { ZodError } from "zod"

import { EmployeeNotFoundError } from "../../../application/errors/employee/index.js"
import GetEmployeeByIdUseCase from "../../../application/usecase/employee/get-employee-by-id.js"
import { employeeNotFoundResponse } from "../../http/employee-response.js"
import { http } from "../../http/http.js"
import { getEmployeeByIdSchema } from "../../schemas/employee/employee-schema.js"

export default class GetEmployeeByIdController {
  constructor(private getEmployeeByIdUseCase: GetEmployeeByIdUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { employeeId } = await getEmployeeByIdSchema.parseAsync({
        employeeId: httpRequest.params?.employeeId,
      })
      const employee = await this.getEmployeeByIdUseCase.execute({
        employeeId,
      })
      return http.ok(employee)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues?.[0]?.message ?? "Invalid payload",
        })
      }
      if (error instanceof EmployeeNotFoundError) {
        return employeeNotFoundResponse()
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
}
