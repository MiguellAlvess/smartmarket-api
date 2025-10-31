import cors from "cors"
import express from "express"

import { productRouter } from "./infra/routes/product-routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRouter)

app.listen(8080, () => {
  console.log("Server running on port 8080")
})
