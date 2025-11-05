import GetAllEmployeesUseCase from "../../../application/usecase/employee/get-all-employees.js"
import { http } from "../../http/http.js"

export default class GetAllEmployeesController {
  constructor(private readonly getAllEmployees: GetAllEmployeesUseCase) {}

  async execute() {
    try {
      const employees = await this.getAllEmployees.execute()
      return http.ok({ employees })
    } catch (error) {
      console.error(error)
      return http.serverError()
    }
  }
}
