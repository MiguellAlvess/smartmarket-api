import UUID from "../../product/vo/uuid.js"
import Cpf from "../vo/cpf.js"
import Email from "../vo/email.js"
import { Password } from "../vo/password.js"

export default class Account {
  private accountId: UUID
  private name: string
  private email: Email
  private cpf: Cpf
  private passwordHash: Password
  private imageUrl?: string

  constructor(
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    passwordHash: string,
    imageUrl?: string
  ) {
    this.accountId = new UUID(accountId)
    this.name = name
    this.email = new Email(email)
    this.cpf = new Cpf(cpf)
    this.passwordHash = new Password(passwordHash)
    this.imageUrl = imageUrl
  }

  static create(
    name: string,
    email: string,
    cpf: string,
    passwordHash: string,
    imageUrl?: string
  ) {
    const accountId = UUID.create().getValue()
    return new Account(accountId, name, email, cpf, passwordHash, imageUrl)
  }

  getId() {
    return this.accountId.getValue()
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email.getValue()
  }

  getCpf() {
    return this.cpf.getValue()
  }

  getPasswordHash() {
    return this.passwordHash.getValue()
  }

  getImageUrl() {
    return this.imageUrl
  }
}
