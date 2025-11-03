import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10)
  await prisma.account.upsert({
    where: { email: "admin@smartmarket.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@smartmarket.com",
      cpf: "000.000.000-00",
      passwordHash,
    },
  })
}

main()
  .then(() => console.log("Admin created"))
  .catch(console.error)
  .finally(() => prisma.$disconnect())
