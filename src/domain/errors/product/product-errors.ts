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

export class InvalidUUIDError extends DomainError {
  constructor() {
    super("Invalid UUID")
  }
}

export class InvalidPromoPeriodError extends DomainError {
  constructor() {
    super("Invalid promo period")
  }
}

export class InvalidPromotionStateError extends DomainError {
  constructor() {
    super("Invalid promotion state")
  }
}

export class InvalidQuantityError extends DomainError {
  constructor() {
    super("Invalid quantity")
  }
}
