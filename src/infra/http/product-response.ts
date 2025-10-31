import { http } from "./http.js"

export const productNotFoundResponse = () =>
  http.notFound({
    message: "Product not found.",
  })

export const productCreatedResponse = (data: unknown) =>
  http.created({
    message: "Product created successfully.",
    data,
  })
