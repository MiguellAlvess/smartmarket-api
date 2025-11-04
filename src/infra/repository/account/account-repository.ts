import { PrismaClient } from "@prisma/client"

import { AccountRepository } from "../../../application/ports/repository/account-repository.js"
import { Account } from "../../../domain/account/entity/account.js"

export default class AccountRepositoryDatabase implements AccountRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByEmail(email: string): Promise<Account | null> {
    const accountRow = await this.db.account.findUnique({ where: { email } })
    if (!accountRow) return null
    return new Account(
      accountRow.id,
      accountRow.name,
      accountRow.email,
      accountRow.cpf,
      accountRow.passwordHash,
      true
    )
  }
}
