import { InvalidCredentialsError } from "../../errors/account/index.js"
import { TokenGenerator } from "../../ports/auth/token-generator.js"
import { Hasher } from "../../ports/cryptography/hasher.js"
import { AccountRepository } from "../../ports/repository/account-repository.js"

export default class LoginAccount {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly hasher: Hasher,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.findByEmail(input.email)
    if (!account) throw new InvalidCredentialsError()
    const passwordIsValid = await this.hasher.compare(
      input.password,
      account.getPasswordHash()
    )
    if (!passwordIsValid) throw new InvalidCredentialsError()
    const token = await this.tokenGenerator.generateForAccount(account.getId())
    return { userId: account.getId(), accessToken: token.accessToken }
  }
}

type Input = { email: string; password: string }
type Output = { userId: string; accessToken: string }
