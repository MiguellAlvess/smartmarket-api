import { type PrismaClient } from "@prisma/client"

import { InvalidCredentialsError } from "../../../../src/application/errors/account/index.js"
import LoginAccount from "../../../../src/application/usecase/account/login.js"
import { JwtTokenGeneratorAdapter } from "../../../../src/infra/auth/jwt-token-generator-adapter.js"
import { BcryptAdapter } from "../../../../src/infra/cryptography/bcrypt-adapter.js"
import { startPostgresTestDb } from "../../../../src/infra/database/test-db.js"
import AccountRepositoryDatabase from "../../../../src/infra/repository/account/account-repository.js"

describe("LoginAccount Use Case", () => {
  let prisma: PrismaClient
  let repository: AccountRepositoryDatabase
  let hasher: BcryptAdapter
  let tokenGenerator: JwtTokenGeneratorAdapter
  let loginAccount: LoginAccount

  beforeAll(async () => {
    const ctx = await startPostgresTestDb()
    prisma = ctx.prisma
    process.env.DATABASE_URL = ctx.url

    repository = new AccountRepositoryDatabase(prisma)
    hasher = new BcryptAdapter()
    tokenGenerator = new JwtTokenGeneratorAdapter("test-access-secret")
    loginAccount = new LoginAccount(repository, hasher, tokenGenerator)
  })

  afterEach(async () => {
    await prisma.account.deleteMany({})
  })

  test("should login successfully and return an access token", async () => {
    const plainPassword = "ValidPass123"
    const passwordHash = await hasher.hash(plainPassword)
    const account = await prisma.account.create({
      data: {
        name: "John Doe",
        email: `john-${Math.random()}@example.com`,
        cpf: "123.456.789-10",
        passwordHash,
      },
    })
    const output = await loginAccount.execute({
      email: account.email,
      password: plainPassword,
    })
    expect(output.userId).toBe(account.id)
    expect(output.accessToken).toBeDefined()
  })

  test("should throw InvalidCredentialsError when account does not exist", async () => {
    await expect(
      loginAccount.execute({
        email: "inexistent@example.com",
        password: "inexistentPassword",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
