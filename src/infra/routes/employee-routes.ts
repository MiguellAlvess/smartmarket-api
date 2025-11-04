import { Router } from "express"

import { makeAuth } from "../factories/auth.js"
import { makeCreateEmployeeController } from "../factories/employee.js"

export const employeeRouter = Router()
const auth = makeAuth()
employeeRouter.use(auth)

employeeRouter.post("/", async (req, res) => {
  const createEmployeeController = makeCreateEmployeeController()
  const { statusCode, body } = await createEmployeeController.execute(req)
  res.status(statusCode).send(body)
})
