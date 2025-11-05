import { Employee } from "../../../src/domain/employee/entity/employee.js"

describe("Employee Entity", () => {
  test("should create a valid employee", () => {
    const employee = Employee.create("João", "12345678901", 30, "Atendente")
    expect(employee.getName()).toBe("João")
    expect(employee.getCpf()).toBe("12345678901")
    expect(employee.getAge()).toBe(30)
    expect(employee.getJobTitle()).toBe("Atendente")
  })

  test("should update a valid employee", () => {
    const employee = Employee.create("João", "12345678901", 30, "Atendente")
    const input = {
      name: "João Silva",
      cpf: "98765432100",
      age: 31,
      jobTitle: "Gerente",
    }
    employee.update(input)
    expect(employee.getName()).toBe("João Silva")
    expect(employee.getCpf()).toBe("98765432100")
    expect(employee.getAge()).toBe(31)
    expect(employee.getJobTitle()).toBe("Gerente")
  })
})
