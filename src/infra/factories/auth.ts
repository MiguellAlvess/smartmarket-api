import { makeAuthMiddleware } from "../auth/auth-middleware.js"
import { JwtAccessTokenVerifierAdapter } from "../auth/jwt-token-verifier-adapter.js"

export function makeAuth() {
  const secret = process.env.ACCESS_TOKEN_SECRET!
  const verifier = new JwtAccessTokenVerifierAdapter(secret)
  return makeAuthMiddleware(verifier)
}
