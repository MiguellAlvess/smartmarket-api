import { http } from "./http.js"

export const employeeCreatedResponse = (out: { productId: string }) => {
  return http.created({ productId: out.productId })
}

export const employeeNotFoundResponse = () =>
  http.notFound({
    message: "Employee not found.",
  })
