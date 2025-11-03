import Account from "../../../domain/account/entity/account.js"

export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>
}
