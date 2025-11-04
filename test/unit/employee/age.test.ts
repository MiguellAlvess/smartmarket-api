import Age from "../../../src/domain/employee/vo/age.js"
import { InvalidAgeError } from "../../../src/domain/errors/employee/employee-errors.js"

describe("Age Value Object", () => {
  test.each([
    -1 as any,
    0 as any,
    15 as any,
    101 as any,
    150 as any,
    20.5 as any,
    "18" as any,
    null as any,
    undefined as any,
  ])("should reject invalid age: %p", (value) => {
    expect(() => new Age(value)).toThrow(InvalidAgeError)
  })

  test.each([16, 18, 35, 60, 100])("should accept valid age: %p", (value) => {
    const age = new Age(value)
    expect(age.getValue()).toBe(value)
  })
})
