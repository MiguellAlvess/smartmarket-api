import { execSync } from "node:child_process"
import path from "node:path"

import { PrismaClient } from "@prisma/client"
import { PostgreSqlContainer } from "@testcontainers/postgresql"

export async function startPostgresTestDb() {
  const container = await new PostgreSqlContainer("postgres:16-alpine")
    .withDatabase("smartmarket-postgres")
    .withUsername("postgres")
    .withPassword("postgres")
    .start()

  const url = container.getConnectionUri()
  const schemaPath = path.resolve(process.cwd(), "prisma", "schema.prisma")
  execSync(
    `npx prisma db push --schema "${schemaPath}" --accept-data-loss --skip-generate`,
    { stdio: "inherit", env: { ...process.env, DATABASE_URL: url } }
  )
  const prisma = new PrismaClient({ datasources: { db: { url } } })
  return { prisma, container, url }
}
