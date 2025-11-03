import UUID from "../../product/vo/uuid.js"
import Cpf from "../vo/cpf.js"
import Email from "../vo/email.js"
import Name from "../vo/name.js"
import { Password } from "../vo/password.js"

export default class Account {
  private accountId: UUID
  private name: Name
  private email: Email
  private cpf: Cpf
  private password: Password

  constructor(
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    passwordHash: string
  ) {
    this.accountId = new UUID(accountId)
    this.name = new Name(name)
    this.email = new Email(email)
    this.cpf = new Cpf(cpf)
    this.password = new Password(passwordHash)
  }

  static create(
    name: string,
    email: string,
    cpf: string,
    passwordHash: string,
    imageUrl?: string
  ) {
    const accountId = UUID.create().getValue()
    return new Account(accountId, name, email, cpf, passwordHash)
  }

  getId() {
    return this.accountId.getValue()
  }

  getName() {
    return this.name.getValue()
  }

  getEmail() {
    return this.email.getValue()
  }

  getCpf() {
    return this.cpf.getValue()
  }

  getPasswordHash() {
    return this.password.getValue()
  }
}
