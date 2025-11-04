import { DomainError } from "../domain-errors.js"

export class InvalidAgeError extends DomainError {
  constructor() {
    super("Invalid age")
  }
}

export class InvalidJobTitleError extends DomainError {
  constructor() {
    super("Invalid job title")
  }
}
