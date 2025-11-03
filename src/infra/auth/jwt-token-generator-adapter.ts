import jwt, {
  type Algorithm,
  type Secret,
  type SignOptions,
} from "jsonwebtoken"

import type { TokenGenerator } from "../../application/ports/auth/token-generator.js"

export class JwtTokenGeneratorAdapter implements TokenGenerator {
  constructor(
    private readonly accessSecret: Secret,
    private readonly accessTtl: SignOptions["expiresIn"] = "1h",

    private readonly algorithm: Algorithm = "HS256"
  ) {}

  async generateForAccount(
    accountId: string
  ): Promise<{ accessToken: string }> {
    const payload = { accountId }
    const accessToken = jwt.sign(payload, this.accessSecret, {
      algorithm: this.algorithm,
      expiresIn: this.accessTtl,
    })
    return { accessToken }
  }
}
