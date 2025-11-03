export interface TokenGenerator {
  generateForAccount(accountId: string): Promise<{ accessToken: string }>
}
