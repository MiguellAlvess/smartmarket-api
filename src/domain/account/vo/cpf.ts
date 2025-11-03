import { InvalidCpfError } from "../../errors/account/account-errors.js"

export default class Cpf {
  private value: string

  constructor(cpf: string) {
    if (!this.validateCpf(cpf)) throw new InvalidCpfError()
    this.value = cpf
  }

  private validateCpf(cpf: string): boolean {
    return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf)
  }

  getValue(): string {
    return this.value
  }
}
