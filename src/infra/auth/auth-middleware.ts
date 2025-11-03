import { NextFunction, Request, Response } from "express"

import { TokenVerifier } from "../../application/ports/auth/token-verifier.js"

interface AuthenticatedRequest extends Request {
  auth?: { accountId: string }
}

export function makeAuthMiddleware(verifier: TokenVerifier) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const header = req.header("Authorization") || ""
      const [scheme, token] = header.split(" ")

      if (scheme !== "Bearer" || !token) {
        return res.status(401).send({ message: "Unauthorized" })
      }
      const { sub } = verifier.verify(token)
      req.auth = { accountId: sub }
      next()
    } catch {
      return res.status(401).send({ message: "Unauthorized" })
    }
  }
}
