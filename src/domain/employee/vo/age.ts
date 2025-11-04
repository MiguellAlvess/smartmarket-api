import { InvalidAgeError } from "../../errors/employee/employee-errors.js"

export default class Age {
  private value: number

  constructor(age: number) {
    if (!this.validateAge(age)) throw new InvalidAgeError()
    this.value = age
  }

  private validateAge(age: number): boolean {
    return Number.isInteger(age) && age >= 16 && age <= 100
  }

  getValue(): number {
    return this.value
  }
}
