import { Router } from "express"

import { makeAuth } from "../factories/auth.js"
import {
  makeApplyPromotionController,
  makeCreateProductController,
  makeDeactivatePromotionController,
  makeDeleteProductController,
  makeGetAllProductsController,
  makeGetProductByIdController,
  makeUpdateProductController,
} from "../factories/product.js"

export const productRouter = Router()
const auth = makeAuth()
productRouter.use(auth)

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

productRouter.patch("/:productId/promotion", async (req, res) => {
  const applyPromotionController = makeApplyPromotionController()
  const { statusCode, body } = await applyPromotionController.execute({
    params: req.params,
    body: req.body,
  })
  res.status(statusCode).send(body)
})

productRouter.delete("/:productId/promotion", async (req, res) => {
  const deactivatePromotionController = makeDeactivatePromotionController()
  const { statusCode, body } = await deactivatePromotionController.execute({
    params: req.params,
  })
  res.status(statusCode).send(body)
})

productRouter.patch("/:productId", async (req, res) => {
  const updateProductController = makeUpdateProductController()
  const { statusCode, body } = await updateProductController.execute({
    params: req.params,
    body: req.body,
  })
  res.status(statusCode).send(body)
})

productRouter.delete("/me/:productId", async (req, res) => {
  const deleteProductController = makeDeleteProductController()
  const { statusCode, body } = await deleteProductController.execute({
    params: req.params,
  })
  res.status(statusCode).send(body)
})
