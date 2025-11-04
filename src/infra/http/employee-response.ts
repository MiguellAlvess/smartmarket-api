import { http } from "./http.js"

export const employeeCreatedResponse = (out: { productId: string }) => {
  return http.created({ productId: out.productId })
}

export const employeeNotFoundResponse = (out: { message: string }) => {
  return http.notFound({ message: out.message })
}
