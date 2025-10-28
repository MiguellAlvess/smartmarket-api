import { InvalidTypeError } from "../../errors/product/product-errors.js"

export default class Type {
  private value: string

  constructor(type: string) {
    if (!this.validateType(type)) throw new InvalidTypeError()
    this.value = type.trim().toUpperCase()
  }

  private validateType(type: string) {
    if (!type) return false
    const allowedTypes = ["FOOD", "BEVERAGE", "CLEANING", "HYGIENE", "OTHER"]
    const normalized = type.trim().toUpperCase()
    return allowedTypes.includes(normalized)
  }

  getValue() {
    return this.value
  }
}
