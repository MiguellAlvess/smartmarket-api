import { InvalidJobTitleError } from "../../errors/employee/employee-errors.js"

export default class JobTitle {
  private value: string

  constructor(title: string) {
    const normalized = this.normalize(title)
    if (!this.validate(normalized)) throw new InvalidJobTitleError()
    this.value = normalized
  }

  private normalize(str: string): string {
    return (str ?? "").trim().replace(/\s+/g, " ")
  }

  private validate(title: string): boolean {
    if (title.length < 2 || title.length > 60) return false
    return /^[-A-Za-zÀ-ÖØ-öø-ÿ0-9\s/&.'ºª/]+$/.test(title)
  }

  getValue(): string {
    return this.value
  }
}
