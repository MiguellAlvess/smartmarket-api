import { Router } from "express"

import {
  makeCreateProductController,
  makeDeleteProductController,
  makeGetAllProductsController,
  makeGetProductByIdController,
} from "../factories/product.js"

export const productRouter = Router()

productRouter.get("/", async (req, res) => {
  const getAllProductsController = makeGetAllProductsController()
  const { statusCode, body } = await getAllProductsController.execute()
  res.status(statusCode).send(body)
})

productRouter.get("/:productId", async (req, res) => {
  const getProductByIdController = makeGetProductByIdController()
  const { statusCode, body } = await getProductByIdController.execute({
    params: req.params,
  })
  res.status(statusCode).send(body)
})

productRouter.post("/", async (req, res) => {
  const createProductController = makeCreateProductController()
  const { statusCode, body } = await createProductController.execute(req)
  res.status(statusCode).send(body)
})

productRouter.delete("/me/:productId", async (req, res) => {
  const deleteProductController = makeDeleteProductController()
  const { statusCode, body } = await deleteProductController.execute({
    params: req.params,
  })
  res.status(statusCode).send(body)
})
