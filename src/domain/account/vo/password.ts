import { InvalidPasswordError } from "../../errors/account/account-errors.js"

export class Password {
  private value: string

  private constructor(password: string, skipValidation = false) {
    if (!skipValidation && !this.validatePassword(password)) {
      throw new InvalidPasswordError()
    }
    this.value = password
  }

  static create(plain: string): Password {
    return new Password(plain)
  }

  static fromHash(hash: string): Password {
    return new Password(hash, true)
  }

  private validatePassword(password: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
  }

  getValue() {
    return this.value
  }
}
