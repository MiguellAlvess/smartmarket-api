import { ZodError } from "zod"

import { InvalidCredentialsError } from "../../../application/errors/account/index.js"
import LoginAccount from "../../../application/usecase/account/login.js"
import { DomainError } from "../../../domain/errors/domain-errors.js"
import { http } from "../../http/http.js"
import { loginSchema } from "../../schemas/account/account-schema.js"

export default class LoginAccountController {
  constructor(private readonly login: LoginAccount) {}
  async execute(req: any) {
    try {
      const params = await loginSchema.parseAsync(req.body)
      const output = await this.login.execute(params)
      return http.ok(output)
    } catch (error) {
      if (error instanceof ZodError) {
        return http.badRequest({
          message: error.issues[0]?.message,
        })
      }
      if (error instanceof InvalidCredentialsError) {
        return http.unauthorized({ message: error.message })
      }
      if (error instanceof DomainError) {
        return http.badRequest({ message: error.message })
      }
      return http.serverError()
    }
  }
}
