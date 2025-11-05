import CreateEmployeeUseCase from "../../application/usecase/employee/create-employee.js"
import GetEmployeeByIdUseCase from "../../application/usecase/employee/get-employee-by-id.js"
import CreateEmployeeController from "../controller/employee/create-employee.js"
import GetEmployeeByIdController from "../controller/employee/get-employee-by-id.js"
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

export const makeGetEmployeeByIdController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase(employeeRepository)
  const getEmployeeByIdController = new GetEmployeeByIdController(
    getEmployeeByIdUseCase
  )
  return getEmployeeByIdController
}
