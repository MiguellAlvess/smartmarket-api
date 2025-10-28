import { DomainError } from "../domain-errors.js"

export class InvalidNameError extends DomainError {
  constructor() {
    super("Invalid name")
  }
}

export class InvalidPriceError extends DomainError {
  constructor() {
    super("Invalid price")
  }
}

export class InvalidTypeError extends DomainError {
  constructor() {
    super("Invalid type")
  }
}

export class InvalidExpirationDateError extends DomainError {
  constructor() {
    super("Invalid expiration date")
  }
}

export class InvalidPromotionError extends DomainError {
  constructor() {
    super("Invalid promotion")
  }
}
