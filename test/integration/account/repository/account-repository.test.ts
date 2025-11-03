import { type PrismaClient } from "@prisma/client"

import { BcryptAdapter } from "../../../../src/infra/cryptography/bcrypt-adapter.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import AccountRepositoryDatabase from "../../../../src/infra/repository/account/account-repository.js"

describe("Account Repository Database", () => {
  let prisma: PrismaClient
  let repository: AccountRepositoryDatabase
  let hasher: BcryptAdapter

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    repository = new AccountRepositoryDatabase(prisma)
    hasher = new BcryptAdapter()
  })

  afterEach(async () => {
    await prisma.account.deleteMany({})
  })

  test("should return an account by email", async () => {
    const plain = "ValidPass123"
    const passwordHash = await hasher.hash(plain)
    const email = `john-${Math.random()}@example.com`
    const created = await prisma.account.create({
      data: {
        name: "John Doe",
        email,
        cpf: "123.456.789-10",
        passwordHash,
      },
    })
    const account = await repository.findByEmail(email)
    expect(account).toBeTruthy()
    expect(account?.getId()).toBe(created.id)
    expect(account?.getName()).toBe("John Doe")
    expect(account?.getEmail()).toBe(email)
    expect(account?.getCpf()).toBe("123.456.789-10")
    expect(account?.getPasswordHash()).toBe(passwordHash)
  })

  test("should return null when account does not exist", async () => {
    const account = await repository.findByEmail("inexistent@example.com")
    expect(account).toBeNull()
  })
})
