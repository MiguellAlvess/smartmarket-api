import { http } from "./http.js"

export const productNotFoundResponse = () =>
  http.notFound({
    message: "Product not found.",
  })

export const productCreatedResponse = (out: { productId: string }) => {
  return http.created({ productId: out.productId })
}
