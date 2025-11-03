import dotenv from "dotenv"
import { defineConfig } from "vitest/config"

dotenv.config({ path: ".env" })

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 30000,
    hookTimeout: 30000,
  },
})
