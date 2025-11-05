import { ZodError } from "zod"

import { EmployeeNotFoundError } from "../../../application/errors/employee/index.js"
import DeleteEmployeeUseCase from "../../../application/usecase/employee/delete-employee.js"
import { employeeNotFoundResponse } from "../../http/employee-response.js"
import { http } from "../../http/http.js"
import { getEmployeeByIdSchema } from "../../schemas/employee/employee-schema.js"

export default class DeleteEmployeeController {
  constructor(private deleteEmployeeUseCase: DeleteEmployeeUseCase) {}

  async execute(httpRequest: HttpRequest) {
    try {
      const { employeeId } = await getEmployeeByIdSchema.parseAsync({
        employeeId: httpRequest.params?.employeeId,
      })
      const employee = await this.deleteEmployeeUseCase.execute({ employeeId })
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
