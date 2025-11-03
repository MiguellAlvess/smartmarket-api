import { DomainError } from "../domain-errors.js"

export class InvalidEmailError extends DomainError {
  constructor() {
    super("Invalid email")
  }
}

export class InvalidCpfError extends DomainError {
  constructor() {
    super("Invalid CPF")
  }
}
