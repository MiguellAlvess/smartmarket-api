import bcrypt from "bcryptjs"

import { Hasher } from "../../application/ports/cryptography/hasher.js"

export class BcryptAdapter implements Hasher {
  hash(plain: string) {
    return bcrypt.hash(plain, 10)
  }
  compare(plain: string, hash: string) {
    return bcrypt.compare(plain, hash)
  }
}
