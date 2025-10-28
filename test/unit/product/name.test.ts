import { InvalidNameError } from "../../../src/domain/errors/product/product-errors.js"
import Name from "../../../src/domain/product/vo/name.js"

describe("Name", () => {
  test("should create a valid name", () => {
    const name = new Name("Miguel")
    expect(name).toBeDefined()
  })

  test("should reject invalid name", () => {
    expect(() => new Name("Test#321")).toThrow(InvalidNameError)
  })
})
