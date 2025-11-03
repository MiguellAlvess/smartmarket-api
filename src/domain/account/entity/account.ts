import UUID from "../../product/vo/uuid.js"
import { Password } from "../vo/password.js"

export class Account {
  private id: UUID
  private name: string
  private email: string
  private cpf: string
  private password: Password

  constructor(
    id: string,
    name: string,
    email: string,
    cpf: string,
    password: Password
  ) {
    this.id = new UUID(id)
    this.name = name
    this.email = email
    this.cpf = cpf
    this.password = password
  }

  static create(name: string, email: string, cpf: string, password: Password) {
    const id = UUID.create().getValue()
    return new Account(id, name, email, cpf, password)
  }

  getId() {
    return this.id.getValue()
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  getCpf() {
    return this.cpf
  }

  getPasswordHash() {
    return this.password.getValue()
  }
}
