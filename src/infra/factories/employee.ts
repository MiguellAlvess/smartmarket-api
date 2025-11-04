import CreateEmployeeUseCase from "../../application/usecase/employee/create-employee.js"
import CreateEmployeeController from "../controller/employee/create-employee.js"
import { prisma } from "../database/prisma.js"
import EmployeeRepositoryDatabase from "../repository/employee/employee-repository.js"

export const makeCreateEmployeeController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)
  const createEmployeeController = new CreateEmployeeController(
    createEmployeeUseCase
  )
  return createEmployeeController
}
