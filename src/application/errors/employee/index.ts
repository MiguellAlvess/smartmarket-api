export class CpfAlreadyExistsError extends Error {
  constructor() {
    super("CPF already exists")
  }
}

export class EmployeeNotFoundError extends Error {
  constructor() {
    super("Employee not found")
  }
}
