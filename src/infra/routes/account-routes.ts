import { Router } from "express"

import { makeLoginAccountController } from "../factories/account.js"

export const accountRouter = Router()

accountRouter.post("/login", async (req, res) => {
  const controller = makeLoginAccountController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})
