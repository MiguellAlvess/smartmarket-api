import JobTitle from "../../../src/domain/employee/vo/job-title.js"
import { InvalidJobTitleError } from "../../../src/domain/errors/employee/employee-errors.js"

describe("JobTitle Value Object", () => {
  const sixtyOneChars = "a".repeat(61)
  test.each([
    "",
    "   ",
    "A",
    sixtyOneChars,
    "@Gerente",
    "Vendedor#",
    "Operador_1",
    "Chefe*",
  ])('should reject invalid title: "%s"', (title) => {
    expect(() => new JobTitle(title)).toThrow(InvalidJobTitleError)
  })

  test.each([
    "Gerente de Vendas",
    "Auxiliar 2",
    "Caixa - Noturno",
    "Supervisor/Estoques",
    "Coordenador & RH",
    "D'Ávila",
    "Operador Nível 1",
    "Professorº",
    "Atendenteª",
  ])('should accept valid title: "%s"', (title) => {
    const jobTitle = new JobTitle(title)
    expect(jobTitle.getValue()).toBe(title)
  })

  test("should normalize extra spaces to single spaces", () => {
    const jobTitle = new JobTitle("  Auxiliar   de    Estoque   ")
    expect(jobTitle.getValue()).toBe("Auxiliar de Estoque")
  })
})
