import { InvalidPriceError } from "../../errors/product/product-errors.js"

export default class Price {
  private value: number

  constructor(price: number) {
    if (!this.validatePrice(price)) throw new InvalidPriceError()
    this.value = price
  }

  validatePrice(price: number) {
    if (!Number.isInteger(price)) return false
    if (price <= 0) return false
    if (price > 100_000_000) return false
    return true
  }

  getValue() {
    return this.value
  }
}
