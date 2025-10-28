import { InvalidQuantityError } from "../../../src/domain/errors/product/product-errors.js"
import Quantity from "../../../src/domain/product/vo/quantity.js"

describe("Quantity Value Object", () => {
  test("should create a valid quantity (zero allowed)", () => {
    const quantity = new Quantity(0)
    expect(quantity.getValue()).toBe(0)
  })

  test("should create a valid quantity (positive integer)", () => {
    const quantity = new Quantity(25)
    expect(quantity.getValue()).toBe(25)
  })

  test("should reject negative quantity", () => {
    expect(() => new Quantity(-1)).toThrow(InvalidQuantityError)
  })

  test("should reject non-integer quantity", () => {
    expect(() => new Quantity(1.5)).toThrow(InvalidQuantityError)
  })
})
