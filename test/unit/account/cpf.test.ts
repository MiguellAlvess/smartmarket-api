import Cpf from "../../../src/domain/account/vo/cpf.js"
import { InvalidCpfError } from "../../../src/domain/errors/account/account-errors.js"

describe("Cpf Value Object", () => {
  test.each([
    "",
    "   ",
    "123",
    "123456789",
    "123.456.78-90",
    "111.111.111-111",
    "abc.def.ghi-jk",
    "123.456.789-0a",
    "1234567890a",
  ])('should reject invalid "%s"', (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(InvalidCpfError)
  })

  test.each(["12345678909", "987.654.321-00"])(
    'should accept valid "%s"',
    (cpf) => {
      const value = new Cpf(cpf)
      expect(value.getValue()).toBe(cpf)
    }
  )
})
