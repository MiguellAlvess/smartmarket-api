import { InvalidPriceError } from "../../../src/domain/errors/product/product-errors.js"
import Price from "../../../src/domain/product/vo/price.js"

describe("Price Value Object", () => {
  test("should create a valid price", () => {
    const price = new Price(1999)
    expect(price).toBeDefined()
  })

  test("should reject invalid price", () => {
    expect(() => new Price(-50)).toThrow(InvalidPriceError)
  })
})
