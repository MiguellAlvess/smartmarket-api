import { Router } from "express"

import { makeCreateProductController } from "../factories/product.js"

export const productRouter = Router()

productRouter.post("/", async (req, res) => {
  const controller = makeCreateProductController()
  const { statusCode, body } = await controller.execute(req)
  res.status(statusCode).send(body)
})

productRouter.get("/:productId", async (req, res) => {})
