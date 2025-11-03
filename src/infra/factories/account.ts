import LoginAccount from "../../application/usecase/account/login.js"
import { JwtTokenGeneratorAdapter } from "../auth/jwt-token-generator-adapter.js"
import LoginAccountController from "../controller/account/login-controller.js"
import { BcryptAdapter } from "../cryptography/bcrypt-adapter.js"
import { prisma } from "../database/prisma.js"
import AccountRepositoryDatabase from "../repository/account/account-repository.js"

export const makeLoginAccountController = () => {
  const accountRepository = new AccountRepositoryDatabase(prisma)
  const bcryptAdapter = new BcryptAdapter()
  const jwtTokenGeneratorAdapter = new JwtTokenGeneratorAdapter(
    process.env.JWT_SECRET!
  )
  const usecase = new LoginAccount(
    accountRepository,
    bcryptAdapter,
    jwtTokenGeneratorAdapter
  )
  return new LoginAccountController(usecase)
}
