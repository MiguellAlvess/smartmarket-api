import { Router } from "express"

import { makeAuth } from "../factories/auth.js"
import {
  makeCreateEmployeeController,
  makeGetEmployeeByIdController,
} from "../factories/employee.js"

export const employeeRouter = Router()
const auth = makeAuth()
employeeRouter.use(auth)

employeeRouter.get("/:employeeId", async (req, res) => {
  const getEmployeeByIdController = makeGetEmployeeByIdController()
  const { statusCode, body } = await getEmployeeByIdController.execute({
    params: req.params,
  })
  res.status(statusCode).send(body)
})

employeeRouter.post("/", async (req, res) => {
  const createEmployeeController = makeCreateEmployeeController()
  const { statusCode, body } = await createEmployeeController.execute(req)
  res.status(statusCode).send(body)
})
