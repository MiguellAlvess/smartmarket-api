import jwt, { type Algorithm, JwtPayload, type Secret } from "jsonwebtoken"

import { TokenVerifier } from "../../application/ports/auth/token-verifier.js"

interface TokenPayload extends JwtPayload {
  accountId?: string
  sub?: string
}

export class JwtAccessTokenVerifierAdapter implements TokenVerifier {
  constructor(
    private readonly accessSecret: Secret,
    private readonly algorithm: Algorithm = "HS256"
  ) {}

  verify(accessToken: string): { sub: string } {
    const payload = jwt.verify(accessToken, this.accessSecret, {
      algorithms: [this.algorithm],
    }) as TokenPayload
    const sub = payload.accountId
    if (!sub) {
      throw new Error("Invalid token payload")
    }
    return { sub }
  }
}
