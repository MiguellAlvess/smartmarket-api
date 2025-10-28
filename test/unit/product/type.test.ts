import { InvalidTypeError } from "../../../src/domain/errors/product/product-errors.js"
import Type from "../../../src/domain/product/vo/type.js"

describe("Type Value Object", () => {
  test("should create a Type value object with valid type", () => {
    const type = new Type("food")
    expect(type.getValue()).toBe("FOOD")
  })

  test("should throw InvalidTypeError for invalid type", () => {
    expect(() => new Type("invalidType")).toThrow(InvalidTypeError)
  })

  test("should throw InvalidTypeError for empty type", () => {
    expect(() => new Type("")).toThrow(InvalidTypeError)
  })

  test("should trim and normalize the type value", () => {
    const type = new Type("  beverage  ")
    expect(type.getValue()).toBe("BEVERAGE")
  })
})
