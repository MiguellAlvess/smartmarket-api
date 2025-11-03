export interface TokenVerifier {
  verify(accessToken: string): { sub: string }
}
