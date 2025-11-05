import cors from "cors"
import express from "express"

import { accountRouter } from "../routes/account-routes.js"
import { employeeRouter } from "../routes/employee-routes.js"
import { productRouter } from "../routes/product-routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", productRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/employees", employeeRouter)

app.listen(8080, () => {
  console.log("Server running on port 8080")
})
