import CreateEmployeeUseCase from "../../application/usecase/employee/create-employee.js"
import DeleteEmployeeUseCase from "../../application/usecase/employee/delete-employee.js"
import GetAllEmployeesUseCase from "../../application/usecase/employee/get-all-employees.js"
import GetEmployeeByIdUseCase from "../../application/usecase/employee/get-employee-by-id.js"
import CreateEmployeeController from "../controller/employee/create-employee.js"
import DeleteEmployeeController from "../controller/employee/delete-employee.js"
import GetAllEmployeesController from "../controller/employee/get-all-employees.js"
import GetEmployeeByIdController from "../controller/employee/get-employee-by-id.js"
import { prisma } from "../database/prisma.js"
import EmployeeRepositoryDatabase from "../repository/employee/employee-repository.js"

export const makeGetAllEmployeesController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const getAllEmployeesUseCase = new GetAllEmployeesUseCase(employeeRepository)
  const getAllEmployeesController = new GetAllEmployeesController(
    getAllEmployeesUseCase
  )
  return getAllEmployeesController
}

export const makeGetEmployeeByIdController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase(employeeRepository)
  const getEmployeeByIdController = new GetEmployeeByIdController(
    getEmployeeByIdUseCase
  )
  return getEmployeeByIdController
}

export const makeCreateEmployeeController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)
  const createEmployeeController = new CreateEmployeeController(
    createEmployeeUseCase
  )
  return createEmployeeController
}

export const makeDeleteEmployeeController = () => {
  const employeeRepository = new EmployeeRepositoryDatabase(prisma)
  const deleteEmployeeUseCase = new DeleteEmployeeUseCase(employeeRepository)
  const deleteEmployeeController = new DeleteEmployeeController(
    deleteEmployeeUseCase
  )
  return deleteEmployeeController
}
