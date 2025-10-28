import { InvalidExpirationDateError } from "../../../src/domain/errors/product/product-errors.js"
import ExpiresAt from "../../../src/domain/product/vo/expires-at.js"

describe("ExpiresAt Value Object", () => {
  test("should create a valid ExpiresAt with a future date", () => {
    const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const expiresAt = new ExpiresAt(futureDate)
    expect(expiresAt.getValue()).toEqual(futureDate)
  })

  test("should throw InvalidExpiresAtError for a past date", () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
    expect(() => new ExpiresAt(pastDate)).toThrow(InvalidExpirationDateError)
  })

  test("should throw InvalidExpiresAtError for an invalid date type", () => {
    // @ts-expect-error testing invalid type
    expect(() => new ExpiresAt("not a date")).toThrow(
      InvalidExpirationDateError
    )
  })
})
