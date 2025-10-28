import { InvalidExpirationDateError } from "../../errors/product/product-errors.js"

export default class ExpiresAt {
  private value: Date

  constructor(date: Date) {
    if (!this.validateDate(date)) throw new InvalidExpirationDateError()
    this.value = date
  }

  private validateDate(date: Date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) return false // data inválida
    const now = new Date()
    return date.getTime() > now.getTime()
  }

  getValue() {
    return this.value
  }
}
