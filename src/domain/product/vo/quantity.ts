import { InvalidQuantityError } from "../../errors/product/product-errors.js"

export default class Quantity {
  private value: number

  constructor(quantity: number) {
    if (!this.validateQuantity(quantity)) throw new InvalidQuantityError()
    this.value = quantity
  }

  validateQuantity(quantity: number) {
    if (!Number.isInteger(quantity)) return false
    if (quantity < 0) return false
    return true
  }

  getValue() {
    return this.value
  }
}
